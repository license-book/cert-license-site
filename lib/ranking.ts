import fs from "node:fs";
import path from "node:path";

export type RankingCertificate = {
  slug: string;
  name: string;
  shortName: string;
  type: "national" | "private";
  licenseType: string;
  category: string;
  agency: string;
  difficultyText: string;
  studyPeriodText: string;
  usefulnessText: string;
  eligibilityText: string;
  scores: {
    employment: number | null;
    beginner: number | null;
    difficulty: number | null;
  };
  statistics: {
    latestYear: number | null;
    applicants: number | null;
    passed: number | null;
    passRate: number | null;
    sourceLabel: string | null;
    lastVerified: string | null;
  };
  relatedSlugs: string[];
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
  eligibility?: {
    status?: "none" | "conditional" | "restricted";
    statusLabel?: string;
    summary?: string;
  };
  keyInfo?: {
    items?: {
      label?: string;
      value?: string;
      note?: string;
    }[];
  };
  statistics?: {
    enabled?: boolean;
    groups?: {
      id?: string;
      title?: string;
      items?: {
        year: number;
        applicants: number;
        passed: number;
        passRate: number;
      }[];
    }[];
    source?: {
      label?: string;
      url?: string;
      lastVerified?: string;
    };
  };
  career?: {
    summary?: string;
    sections?: {
      title?: string;
      items?: {
        label?: string;
        description?: string;
      }[];
    }[];
  };
  realityGuide?: {
    recommendedFor?: string[];
    reconsiderIf?: string[];
  };
  relatedCertificates?:
    | string[]
    | {
        slug?: string;
        name?: string;
      }[];
  related?: 
    | string[]
    | {
        slug?: string;
        name?: string;
      }[];
};

const CERT_ROOT = path.join(process.cwd(), "data", "certificates");

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

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch (error) {
    console.error(`랭킹 데이터 읽기 실패: ${file}`, error);
    return null;
  }
}

function findKeyValue(
  certificate: RawCertificate,
  keywords: string[],
  fallback = "정보 확인 필요",
) {
  const match = certificate.keyInfo?.items?.find((item) => {
    const label = item.label?.replace(/\s/g, "") ?? "";
    return keywords.some((keyword) => label.includes(keyword));
  });

  return match?.value || fallback;
}

function normalize(value: string) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function parseFivePointText(value: string, kind: "difficulty" | "usefulness") {
  const text = normalize(value);
  const stars = value.match(/★/g)?.length;

  if (stars && stars >= 1 && stars <= 5) return stars;

  if (kind === "difficulty") {
    if (/매우어려|최상|극상/.test(text)) return 5;
    if (/어려|상급|높음/.test(text)) return 4;
    if (/보통|중급/.test(text)) return 3;
    if (/쉬움|낮음|초급/.test(text)) return 2;
    if (/매우쉬|입문/.test(text)) return 1;
  }

  if (kind === "usefulness") {
    if (/매우높|최상|탁월|필수/.test(text)) return 5;
    if (/높음|높다|우수|활발|유리/.test(text)) return 4;
    if (/보통|중간|일반/.test(text)) return 3;
    if (/낮음|제한적|일부/.test(text)) return 2;
    if (/매우낮|거의없/.test(text)) return 1;
  }

  return null;
}

function parseStudyMonths(value: string): number | null {
  const numbers = [...value.replace(/,/g, "").matchAll(/(\d+(?:\.\d+)?)/g)].map(
    (match) => Number(match[1]),
  );

  if (!numbers.length) return null;

  const average =
    numbers.length >= 2 ? (numbers[0] + numbers[1]) / 2 : numbers[0];

  if (/년/.test(value)) return average * 12;
  if (/주/.test(value)) return average / 4.345;
  if (/일/.test(value)) return average / 30;
  if (/개월|달|월/.test(value)) return average;

  return null;
}

function getLatestStatistics(certificate: RawCertificate) {
  const allItems =
    certificate.statistics?.groups?.flatMap((group) => group.items ?? []) ?? [];

  if (!allItems.length) {
    return {
      latestYear: null,
      applicants: null,
      passed: null,
      passRate: null,
      sourceLabel: certificate.statistics?.source?.label ?? null,
      lastVerified: certificate.statistics?.source?.lastVerified ?? null,
    };
  }

  const latestYear = Math.max(...allItems.map((item) => item.year));
  const latestItems = allItems.filter((item) => item.year === latestYear);
  const applicants = latestItems.reduce(
    (total, item) => total + Math.max(0, item.applicants || 0),
    0,
  );
  const passed = latestItems.reduce(
    (total, item) => total + Math.max(0, item.passed || 0),
    0,
  );
  const weightedPassRate =
    applicants > 0
      ? Number(((passed / applicants) * 100).toFixed(1))
      : latestItems.length
        ? Number(
            (
              latestItems.reduce(
                (total, item) => total + (item.passRate || 0),
                0,
              ) / latestItems.length
            ).toFixed(1),
          )
        : null;

  return {
    latestYear,
    applicants: applicants || null,
    passed: passed || null,
    passRate: weightedPassRate,
    sourceLabel: certificate.statistics?.source?.label ?? null,
    lastVerified: certificate.statistics?.source?.lastVerified ?? null,
  };
}

function buildEmploymentScore(
  usefulness: number | null,
  certificate: RawCertificate,
) {
  if (usefulness === null) return null;

  const careerItemCount =
    certificate.career?.sections?.reduce(
      (total, section) => total + (section.items?.length ?? 0),
      0,
    ) ?? 0;
  const recommendationCount =
    certificate.realityGuide?.recommendedFor?.length ?? 0;

  return clamp(
    usefulness * 16 +
      Math.min(careerItemCount, 6) * 2 +
      Math.min(recommendationCount, 5),
  );
}

function buildBeginnerScore(
  difficulty: number | null,
  studyMonths: number | null,
  eligibilityStatus: RawCertificate["eligibility"] extends infer T
    ? T extends { status?: infer S }
      ? S
      : never
    : never,
) {
  if (difficulty === null && studyMonths === null) return null;

  const difficultyPart =
    difficulty === null ? 45 : ((6 - difficulty) / 5) * 55;
  const studyPart =
    studyMonths === null
      ? 25
      : studyMonths <= 1
        ? 30
        : studyMonths <= 2
          ? 26
          : studyMonths <= 3
            ? 22
            : studyMonths <= 6
              ? 15
              : 8;
  const eligibilityPart =
    eligibilityStatus === "none"
      ? 15
      : eligibilityStatus === "conditional"
        ? 8
        : eligibilityStatus === "restricted"
          ? 2
          : 6;

  return clamp(difficultyPart + studyPart + eligibilityPart);
}

function extractRelatedSlugs(certificate: RawCertificate) {
  const candidates = [
    ...(certificate.relatedCertificates ?? []),
    ...(certificate.related ?? []),
  ];

  return Array.from(
    new Set(
      candidates
        .map((item) => {
          if (typeof item === "string") return item;
          return item.slug || "";
        })
        .filter(Boolean),
    ),
  );
}

function toRankingCertificate(
  certificate: RawCertificate,
): RankingCertificate | null {
  const slug = certificate.basic?.slug;
  const name = certificate.basic?.name;

  if (!slug || !name) return null;

  const difficultyText = findKeyValue(certificate, ["난이도"]);
  const studyPeriodText = findKeyValue(certificate, [
    "공부기간",
    "준비기간",
    "학습기간",
  ]);
  const usefulnessText = findKeyValue(certificate, [
    "활용도",
    "취업",
    "전망",
  ]);
  const difficulty = parseFivePointText(difficultyText, "difficulty");
  const usefulness = parseFivePointText(usefulnessText, "usefulness");
  const studyMonths = parseStudyMonths(studyPeriodText);

  return {
    slug,
    name,
    shortName: certificate.basic?.shortName || name,
    type: certificate.basic?.type || "national",
    licenseType: certificate.basic?.licenseType || "자격정보",
    category: certificate.basic?.category || "기타",
    agency: certificate.basic?.agency || "시행기관 확인 필요",
    difficultyText,
    studyPeriodText,
    usefulnessText,
    eligibilityText:
      certificate.eligibility?.statusLabel ||
      certificate.eligibility?.summary ||
      findKeyValue(certificate, ["응시자격"]),
    scores: {
      employment: buildEmploymentScore(usefulness, certificate),
      beginner: buildBeginnerScore(
        difficulty,
        studyMonths,
        certificate.eligibility?.status ?? "none",
      ),
      difficulty: difficulty === null ? null : difficulty * 20,
    },
    statistics: getLatestStatistics(certificate),
    relatedSlugs: extractRelatedSlugs(certificate),
  };
}

export function getRankingCertificates(): RankingCertificate[] {
  return collectJsonFiles(CERT_ROOT)
    .map((file) => readJson<RawCertificate>(file))
    .filter((item): item is RawCertificate => Boolean(item))
    .map(toRankingCertificate)
    .filter((item): item is RankingCertificate => Boolean(item))
    .sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
}
