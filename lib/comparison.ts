import fs from "node:fs";
import path from "node:path";

export type CompareCertificate = {
  slug: string;
  name: string;
  shortName: string;
  type: "national" | "private";
  licenseType: string;
  category: string;
  agency: string;
  metrics: {
    difficulty: string;
    studyPeriod: string;
    usefulness: string;
    eligibility: string;
    exam: string;
    cost: string;
    statistics: string;
    source: string;
  };
  indicators: {
    difficultyScore: number | null;
    studyMonths: number | null;
    usefulnessScore: number | null;
  };
};

type RawCertificate = {
  basic?: {
    slug?: string;
    name?: string;
    shortName?: string;
    type?: "national" | "private";
    licenseType?: string;
    category?: string;
    agency?: string;
  };
  keyInfo?: {
    items?: {
      label?: string;
      value?: string;
      note?: string;
    }[];
  };
  eligibility?: {
    statusLabel?: string;
    summary?: string;
  };
  exam?: {
    written?: unknown;
    practical?: unknown;
    passingCriteria?: unknown;
  };
  statistics?: {
    enabled?: boolean;
    status?: string;
    groups?: {
      id?: string;
      title?: string;
      items?: {
        year?: number;
        applicants?: number;
        passed?: number;
        passRate?: number;
      }[];
    }[];
    source?: {
      label?: string;
      url?: string;
      lastVerified?: string;
    };
  };
  cost?: {
    items?: {
      label?: string;
      value?: string;
    }[];
    summary?: string;
  };
};

const CERT_ROOT = path.join(process.cwd(), "data", "certificates");

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch (error) {
    console.error(`비교 데이터 읽기 실패: ${file}`, error);
    return null;
  }
}

function collectJsonFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectJsonFiles(target);
    }

    return entry.isFile() && entry.name.endsWith(".json") ? [target] : [];
  });
}

function findKeyValue(
  cert: RawCertificate,
  keywords: string[],
  fallback = "정보 확인 필요",
) {
  const item = cert.keyInfo?.items?.find((candidate) => {
    const label = candidate.label?.replace(/\s/g, "") ?? "";
    return keywords.some((keyword) => label.includes(keyword));
  });

  return item?.value || fallback;
}


function textValue(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);

  if (Array.isArray(value)) {
    return value.map(textValue).filter(Boolean).join(", ");
  }

  if (value && typeof value === "object") {
    const item = value as Record<string, unknown>;

    const title = textValue(item.title);
    const format = textValue(item.format);
    if (title && format) return `${title} · ${format}`;
    if (title) return title;
    if (format) return format;

    for (const key of ["summary", "text", "value", "label"]) {
      const result = textValue(item[key]);
      if (result) return result;
    }
  }

  return "";
}

function summarizeDifficulty(cert: RawCertificate) {
  const direct = findKeyValue(cert, ["난이도"], "");
  if (direct) return direct;

  return cert.basic?.type === "private"
    ? "기관·과정별 상이"
    : "상세 난이도 확인 필요";
}

function summarizeStatistics(cert: RawCertificate) {
  if (!cert.statistics?.enabled || !cert.statistics.groups?.length) {
    return "대표 공식 통계 미제공";
  }

  const parts = cert.statistics.groups
    .map((group) => {
      const latest = [...(group.items ?? [])]
        .filter((item) => typeof item.year === "number")
        .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))[0];

      if (!latest || typeof latest.passRate !== "number") return "";

      const title = group.title || group.id || "시험";
      const applicants =
        typeof latest.applicants === "number"
          ? ` · 응시 ${new Intl.NumberFormat("ko-KR").format(latest.applicants)}명`
          : "";

      return `${latest.year} ${title} 합격률 ${latest.passRate.toFixed(1)}%${applicants}`;
    })
    .filter(Boolean);

  return parts.length ? parts.join(" / ") : "대표 공식 통계 미제공";
}

function summarizeExam(cert: RawCertificate) {
  const parts = [
    textValue(cert.exam?.written),
    textValue(cert.exam?.practical),
  ].filter(Boolean);

  return parts.length
    ? parts.join(" / ")
    : findKeyValue(cert, ["시험", "검정방식"]);
}

function summarizeCost(cert: RawCertificate) {
  const first = cert.cost?.items?.find((item) => item.value)?.value;

  return (
    first ||
    cert.cost?.summary ||
    findKeyValue(cert, ["비용", "응시료"])
  );
}

function normalize(value: string) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function parseDifficulty(value: string): number | null {
  const text = normalize(value);
  const stars = value.match(/★/g)?.length;

  if (stars && stars >= 1 && stars <= 5) return stars;
  if (/매우어려|최상|극상/.test(text)) return 5;
  if (/어려|상급|높음/.test(text)) return 4;
  if (/보통|중급/.test(text)) return 3;
  if (/쉬움|낮음|초급/.test(text)) return 2;
  if (/매우쉬|입문/.test(text)) return 1;

  return null;
}

function parseStudyMonths(value: string): number | null {
  const text = value.replace(/,/g, "");
  const numbers = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) =>
    Number(match[1]),
  );

  if (!numbers.length) return null;

  const average =
    numbers.length >= 2 ? (numbers[0] + numbers[1]) / 2 : numbers[0];

  if (/년/.test(text)) return average * 12;
  if (/주/.test(text)) return average / 4.345;
  if (/일/.test(text)) return average / 30;
  if (/개월|달|월/.test(text)) return average;

  return null;
}

function parseUsefulness(value: string): number | null {
  const text = normalize(value);
  const stars = value.match(/★/g)?.length;

  if (stars && stars >= 1 && stars <= 5) return stars;
  if (/매우높|최상|탁월|필수/.test(text)) return 5;
  if (/높음|높다|우수|활발|유리/.test(text)) return 4;
  if (/보통|중간|일반/.test(text)) return 3;
  if (/낮음|제한적|일부/.test(text)) return 2;
  if (/매우낮|거의없/.test(text)) return 1;

  return null;
}

function toCompareCertificate(raw: RawCertificate): CompareCertificate | null {
  const slug = raw.basic?.slug;
  const name = raw.basic?.name;

  if (!slug || !name) return null;

  const difficulty = summarizeDifficulty(raw);
  const studyPeriod = findKeyValue(raw, [
    "공부기간",
    "준비기간",
    "학습기간",
  ]);
  const usefulness = findKeyValue(raw, ["활용도", "취업", "전망"]);

  return {
    slug,
    name,
    shortName: raw.basic?.shortName || name,
    type: raw.basic?.type || "national",
    licenseType: raw.basic?.licenseType || "자격정보",
    category: raw.basic?.category || "기타",
    agency: raw.basic?.agency || "시행기관 확인 필요",
    metrics: {
      difficulty,
      studyPeriod,
      usefulness,
      eligibility:
        raw.eligibility?.statusLabel ||
        raw.eligibility?.summary ||
        findKeyValue(raw, ["응시자격"]),
      exam: summarizeExam(raw),
      cost: summarizeCost(raw),
      statistics: summarizeStatistics(raw),
      source:
        raw.statistics?.source?.label ||
        raw.basic?.agency ||
        "출처 확인 필요",
    },
    indicators: {
      difficultyScore: parseDifficulty(difficulty),
      studyMonths: parseStudyMonths(studyPeriod),
      usefulnessScore: parseUsefulness(usefulness),
    },
  };
}

export function getCompareCertificates(): CompareCertificate[] {
  return collectJsonFiles(CERT_ROOT)
    .map((file) => readJson<RawCertificate>(file))
    .filter((item): item is RawCertificate => Boolean(item))
    .map(toCompareCertificate)
    .filter((item): item is CompareCertificate => Boolean(item))
    .sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
}
