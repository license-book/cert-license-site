import fs from "node:fs";
import path from "node:path";
import type { CertificateData, CertificateKind, SearchIntentData } from "./types";

const ROOT = path.join(process.cwd(), "data", "certificates");
const KIND_FOLDERS: CertificateKind[] = ["national", "private"];
const PRIVATE_P1_ENRICHMENT_FILE = path.join(
  process.cwd(),
  "data",
  "quality",
  "private-p1-enrichments.json",
);

type PrivateP1EnrichmentFile = {
  items?: Record<string, { searchIntent?: SearchIntentData }>;
};

let privateP1EnrichmentCache: PrivateP1EnrichmentFile | null | undefined;

function candidates(slug: string): string[] {
  return [
    path.join(ROOT, `${slug}.json`),
    ...KIND_FOLDERS.map((kind) => path.join(ROOT, kind, `${slug}.json`)),
  ];
}

function loadPrivateP1Enrichments(): PrivateP1EnrichmentFile | null {
  if (privateP1EnrichmentCache !== undefined) return privateP1EnrichmentCache;

  try {
    if (!fs.existsSync(PRIVATE_P1_ENRICHMENT_FILE)) {
      privateP1EnrichmentCache = null;
      return null;
    }
    privateP1EnrichmentCache = JSON.parse(
      fs.readFileSync(PRIVATE_P1_ENRICHMENT_FILE, "utf-8"),
    ) as PrivateP1EnrichmentFile;
    return privateP1EnrichmentCache;
  } catch (error) {
    console.error("민간자격 P1 보강 JSON 읽기 실패", error);
    privateP1EnrichmentCache = null;
    return null;
  }
}

function mergeSearchIntent(
  base?: SearchIntentData,
  extra?: SearchIntentData,
): SearchIntentData | undefined {
  if (!extra) return base;
  if (!base) return extra;

  const relatedKeywords = Array.from(
    new Set([...(base.relatedKeywords ?? []), ...(extra.relatedKeywords ?? [])]),
  );
  const links = [...(base.links ?? []), ...(extra.links ?? [])].filter(
    (item, index, array) =>
      array.findIndex((candidate) => candidate.href === item.href && candidate.label === item.label) === index,
  );
  const items = [...(base.items ?? []), ...(extra.items ?? [])].filter(
    (item, index, array) => array.findIndex((candidate) => candidate.query === item.query) === index,
  );

  return {
    ...base,
    ...extra,
    relatedKeywords,
    links,
    items,
    note: [base.note, extra.note].filter(Boolean).join(" ") || undefined,
  };
}

function applyPrivateP1Enrichment(data: CertificateData): CertificateData {
  if (data.basic?.type !== "private") return data;

  const extra = loadPrivateP1Enrichments()?.items?.[data.basic.slug];
  if (!extra) return data;

  return {
    ...data,
    searchIntent: mergeSearchIntent(data.searchIntent, extra.searchIntent),
  };
}

export function getCertificatePath(slug: string): string | null {
  return candidates(slug).find((file) => fs.existsSync(file)) ?? null;
}

export function loadCertificate(slug: string): CertificateData | null {
  const file = getCertificatePath(slug);
  if (!file) return null;
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf-8")) as CertificateData;
    if (data.basic?.slug !== slug) {
      console.error(`자격증 slug 불일치: ${file}`);
      return null;
    }
    return applyPrivateP1Enrichment(data);
  } catch (error) {
    console.error(`자격증 JSON 읽기 실패: ${slug}`, error);
    return null;
  }
}
