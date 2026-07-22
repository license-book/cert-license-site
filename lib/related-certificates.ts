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
    name?: string;
    shortName?: string;
    type?: CertificateKind;
    licenseType?: string;
    category?: string;
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

type ComparisonCatalog = Record<
  string,
  {
    enabled?: boolean;
    label?: string;
  }
>;

const CERTIFICATE_DIRECTORY = path.join(
  process.cwd(),
  "data",
  "certificates"
);

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

const COMPARISON_CATALOG_FILE = path.join(
  process.cwd(),
  "data",
  "catalog",
  "comparisons.json"
);

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
  return typeof relation === "string"
    ? { slug: relation }
    : relation;
}

function getCertificateFile(slug: string): CertificateFile | null {
  return readJsonFile<CertificateFile>(
    path.join(CERTIFICATE_DIRECTORY, `${slug}.json`)
  );
}

function certificateExists(slug: string): boolean {
  return fs.existsSync(
    path.join(CERTIFICATE_DIRECTORY, `${slug}.json`)
  );
}

function comparisonIsEnabled(
  compareSlug: string | undefined,
  catalog: ComparisonCatalog
): boolean {
  if (!compareSlug) return false;
  return catalog[compareSlug]?.enabled === true;
}

function getRelatedMap(): RelatedMap {
  const generated =
    readJsonFile<GeneratedRelatedFile>(GENERATED_RELATED_FILE);

  if (generated?.items) {
    return generated.items;
  }

  return readJsonFile<RelatedMap>(MANUAL_RELATED_FILE) ?? {};
}

export function getRelatedCertificates(
  currentSlug: string
): ResolvedRelatedItem[] {
  const relatedMap = getRelatedMap();
  const certificateCatalog =
    readJsonFile<CertificateCatalog>(CERTIFICATE_CATALOG_FILE) ?? {};
  const comparisonCatalog =
    readJsonFile<ComparisonCatalog>(COMPARISON_CATALOG_FILE) ?? {};

  const resolvedItems: ResolvedRelatedItem[] = [];

  for (const rawRelation of relatedMap[currentSlug] ?? []) {
    const relation = normalizeRelation(rawRelation);
    const certificateFile = getCertificateFile(relation.slug);
    const catalogItem = certificateCatalog[relation.slug];

    const name =
      certificateFile?.basic?.name ??
      certificateFile?.hero?.title ??
      catalogItem?.name;

    if (!name) {
      console.warn(
        `관련 자격증 표시정보 없음: ${relation.slug}. ` +
          "data/catalog/certificates.json에 등록하세요."
      );
      continue;
    }

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
      detailReady: certificateExists(relation.slug),
      compareReady: comparisonIsEnabled(
        relation.compareSlug,
        comparisonCatalog
      ),
    });
  }

  return resolvedItems;
}
