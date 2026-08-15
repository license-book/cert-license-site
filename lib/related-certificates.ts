import fs from "fs";
import path from "path";

export type CertificateKind = "national" | "private";

export type CertificateCatalogItem = {
  name: string;
  shortName?: string;
  type?: CertificateKind;
  licenseType?: string;
  category?: string;
  agency?: string;
  relatedTag?: string;
};

export type RelatedRelation =
  | string
  | {
      slug: string;
      tag?: string;
      reason?: string;
      compareSlug?: string;
      compareLabel?: string;
      source?: "manual" | "auto";
      score?: number;
    };

export type ResolvedRelatedItem = {
  name: string;
  shortName?: string;
  slug: string;
  tag?: string;
  type?: CertificateKind;
  licenseType?: string;
  category?: string;
  compareSlug?: string;
  compareLabel?: string;
  detailReady: boolean;
  compareReady: boolean;
};

type CertificateFile = {
  basic?: {
    slug?: string;
    name?: string;
    shortName?: string;
    type?: CertificateKind;
    licenseType?: string;
    category?: string;
    agency?: string;
  };
  hero?: {
    title?: string;
  };
};

type CertificateCatalog = Record<string, CertificateCatalogItem>;
type RelatedMap = Record<string, RelatedRelation[]>;

type GeneratedRelatedFile = {
  items?: RelatedMap;
};

const CERTIFICATE_DIRECTORY = path.join(process.cwd(), "data", "certificates");
const CERTIFICATE_CATALOG_FILE = path.join(
  process.cwd(),
  "data",
  "catalog",
  "certificates.json"
);
const MANUAL_RELATED_FILE = path.join(
  process.cwd(),
  "data",
  "related",
  "related-certificates.json"
);
const GENERATED_RELATED_FILE = path.join(
  process.cwd(),
  "data",
  "generated",
  "internal-links.json"
);

const MAX_RELATED = 4;

/**
 * 서로 다른 분류명을 쓰더라도 실제 진로가 가까운 분야만 연결한다.
 * 같은 category 후보가 우선이며, 아래 매핑은 국가↔민간 교차 추천을 보완한다.
 */
const CATEGORY_AFFINITY: Record<string, string[]> = {
  "IT·AI": ["IT·개발", "IT·사무", "데이터·IT", "정보통신"],
  "IT·개발": ["IT·AI", "데이터·IT", "정보통신"],
  "IT·사무": ["IT·AI", "데이터·IT"],
  "데이터·IT": ["IT·AI", "IT·개발", "IT·사무"],
  "심리·상담": ["복지·상담", "상담·고용", "상담·청소년"],
  "아동·교육": ["복지·상담", "상담·청소년"],
  "실버·복지": ["복지·상담", "보건·의료"],
  "건강·운동": ["보건·의료", "복지·상담"],
  "마케팅·비즈니스": ["경영·조달", "회계·세무"],
  "생활·취미": ["조리·서비스", "조리·외식"],
};

function readJsonFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch (error) {
    console.error(`JSON 읽기 실패: ${filePath}`, error);
    return null;
  }
}

function normalizeRelation(relation: RelatedRelation) {
  return typeof relation === "string" ? { slug: relation } : relation;
}

function getCertificatePath(slug: string): string | null {
  const candidates = [
    path.join(CERTIFICATE_DIRECTORY, `${slug}.json`),
    path.join(CERTIFICATE_DIRECTORY, "national", `${slug}.json`),
    path.join(CERTIFICATE_DIRECTORY, "private", `${slug}.json`),
  ];

  return candidates.find((file) => fs.existsSync(file)) ?? null;
}

function getCertificateFile(slug: string): CertificateFile | null {
  const file = getCertificatePath(slug);
  return file ? readJsonFile<CertificateFile>(file) : null;
}

function certificateExists(slug: string): boolean {
  return getCertificatePath(slug) !== null;
}

function tokenize(value?: string): string[] {
  if (!value) return [];
  return value
    .toLowerCase()
    .split(/[·\s,/()\-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function sharedTokenScore(a?: string, b?: string): number {
  const left = new Set(tokenize(a));
  const right = new Set(tokenize(b));
  let count = 0;
  for (const token of left) {
    if (right.has(token)) count += 1;
  }
  return Math.min(count * 12, 24);
}

function categoriesAreRelated(a?: string, b?: string): boolean {
  if (!a || !b) return false;
  return (
    CATEGORY_AFFINITY[a]?.includes(b) === true ||
    CATEGORY_AFFINITY[b]?.includes(a) === true
  );
}

function scoreCandidate(
  current: CertificateCatalogItem,
  candidate: CertificateCatalogItem
): number {
  let score = 0;

  if (current.category && current.category === candidate.category) {
    score += 100;
  } else if (categoriesAreRelated(current.category, candidate.category)) {
    score += 62;
  } else {
    score += sharedTokenScore(current.category, candidate.category);
  }

  score += sharedTokenScore(current.relatedTag, candidate.relatedTag);

  if (
    current.agency &&
    candidate.agency &&
    current.agency === candidate.agency
  ) {
    score += 8;
  }

  return score;
}

function buildAutoRelations(
  currentSlug: string,
  catalog: CertificateCatalog
): RelatedRelation[] {
  const current = catalog[currentSlug];
  if (!current) return [];

  const ranked = Object.entries(catalog)
    .filter(([slug]) => slug !== currentSlug && certificateExists(slug))
    .map(([slug, candidate]) => ({
      slug,
      candidate,
      score: scoreCandidate(current, candidate),
    }))
    .filter((item) => item.score >= 50)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.candidate.name.localeCompare(b.candidate.name, "ko");
    });

  const selected = ranked.slice(0, MAX_RELATED);

  // 같은 종류만 4개 뽑힌 경우, 충분히 관련 있는 국가↔민간 후보가 있으면
  // 마지막 한 자리를 교차 추천으로 사용한다.
  if (
    current.type &&
    selected.length === MAX_RELATED &&
    selected.every((item) => item.candidate.type === current.type)
  ) {
    const crossType = ranked.find(
      (item) =>
        item.candidate.type &&
        item.candidate.type !== current.type &&
        item.score >= 60 &&
        !selected.some((selectedItem) => selectedItem.slug === item.slug)
    );

    if (crossType) {
      selected[selected.length - 1] = crossType;
    }
  }

  return selected.map((item) => ({
    slug: item.slug,
    tag: item.candidate.relatedTag ?? item.candidate.category,
    source: "auto" as const,
    score: item.score,
  }));
}

function getRelationsForSlug(
  currentSlug: string,
  catalog: CertificateCatalog
): RelatedRelation[] {
  const generated =
    readJsonFile<GeneratedRelatedFile>(GENERATED_RELATED_FILE)?.items ?? {};
  const manual = readJsonFile<RelatedMap>(MANUAL_RELATED_FILE) ?? {};

  // 기존에 검수된 generated/manual 관계가 있으면 그것을 최우선으로 유지한다.
  const curated = generated[currentSlug] ?? manual[currentSlug];
  if (curated?.length) return curated;

  // 관계 데이터가 없는 국가/민간 자격증은 카탈로그를 기준으로 자동 추천한다.
  return buildAutoRelations(currentSlug, catalog);
}

export function getRelatedCertificates(
  currentSlug: string
): ResolvedRelatedItem[] {
  const certificateCatalog =
    readJsonFile<CertificateCatalog>(CERTIFICATE_CATALOG_FILE) ?? {};

  const relations = getRelationsForSlug(currentSlug, certificateCatalog);
  const resolvedItems: ResolvedRelatedItem[] = [];
  const seen = new Set<string>();

  for (const rawRelation of relations) {
    const relation = normalizeRelation(rawRelation);

    if (
      !relation.slug ||
      relation.slug === currentSlug ||
      seen.has(relation.slug)
    ) {
      continue;
    }
    seen.add(relation.slug);

    const certificateFile = getCertificateFile(relation.slug);
    const catalogItem = certificateCatalog[relation.slug];

    const name =
      certificateFile?.basic?.name ??
      certificateFile?.hero?.title ??
      catalogItem?.name;

    if (!name) continue;

    const detailReady = certificateExists(relation.slug);

    resolvedItems.push({
      name,
      shortName:
        certificateFile?.basic?.shortName ??
        catalogItem?.shortName,
      slug: relation.slug,
      tag:
        relation.tag ??
        catalogItem?.relatedTag ??
        certificateFile?.basic?.category ??
        catalogItem?.category,
      type:
        certificateFile?.basic?.type ??
        catalogItem?.type,
      licenseType:
        certificateFile?.basic?.licenseType ??
        catalogItem?.licenseType,
      category:
        certificateFile?.basic?.category ??
        catalogItem?.category,
      compareSlug: relation.compareSlug,
      compareLabel: relation.compareLabel,
      detailReady,
      // 공통 비교 페이지는 두 상세 데이터만 있으면 즉시 비교 가능하다.
      compareReady: certificateExists(currentSlug) && detailReady,
    });
  }

  return resolvedItems.slice(0, MAX_RELATED);
}
