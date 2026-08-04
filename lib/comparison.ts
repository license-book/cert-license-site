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
    written?: string;
    practical?: string;
    passingCriteria?: string;
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

function summarizeExam(cert: RawCertificate) {
  const parts = [cert.exam?.written, cert.exam?.practical].filter(
    (value): value is string => Boolean(value),
  );

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

  const difficulty = findKeyValue(raw, ["난이도"]);
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
