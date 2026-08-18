import fs from "node:fs";
import path from "node:path";
import type { CertificateData, CertificateKind, SearchIntentData } from "./types";

const ROOT = path.join(process.cwd(), "data", "certificates");
const KIND_FOLDERS: CertificateKind[] = ["national", "private"];
const PRIVATE_ENRICHMENT_FILES = [
  path.join(process.cwd(), "data", "quality", "private-p1-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-deep-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-deep2-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-top10-retry-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-retry-top10-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-next-group-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-next-group2-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-next-group3-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p2-final-candidates-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-p3-enrichments.json"),
  path.join(process.cwd(), "data", "quality", "private-cp1-enrichments.json"),
];

type PrivateEnrichment = Partial<CertificateData> & { searchIntent?: SearchIntentData };
type PrivateEnrichmentFile = { items?: Record<string, PrivateEnrichment> };

let privateEnrichmentCache: PrivateEnrichmentFile[] | undefined;

function candidates(slug: string): string[] {
  return [
    path.join(ROOT, `${slug}.json`),
    ...KIND_FOLDERS.map((kind) => path.join(ROOT, kind, `${slug}.json`)),
  ];
}

function loadPrivateEnrichments(): PrivateEnrichmentFile[] {
  if (privateEnrichmentCache !== undefined) return privateEnrichmentCache;

  privateEnrichmentCache = PRIVATE_ENRICHMENT_FILES.flatMap((file) => {
    try {
      if (!fs.existsSync(file)) return [];
      return [JSON.parse(fs.readFileSync(file, "utf-8")) as PrivateEnrichmentFile];
    } catch (error) {
      console.error(`민간자격 보강 JSON 읽기 실패: ${file}`, error);
      return [];
    }
  });

  return privateEnrichmentCache;
}

function mergeSearchIntent(
  base?: SearchIntentData,
  extra?: SearchIntentData,
): SearchIntentData | undefined {
  if (!extra) return base;
  if (!base) return extra;

  const relatedKeywords = Array.from(new Set([...(base.relatedKeywords ?? []), ...(extra.relatedKeywords ?? [])]));
  const links = [...(base.links ?? []), ...(extra.links ?? [])].filter(
    (item, index, array) => array.findIndex((candidate) => candidate.href === item.href && candidate.label === item.label) === index,
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

function mergeStudyStrategy(
  base?: CertificateData["studyStrategy"],
  extra?: CertificateData["studyStrategy"],
): CertificateData["studyStrategy"] {
  if (!extra) return base;
  if (!base) return extra;

  return {
    ...base,
    ...extra,
    written: extra.written ? { ...base.written, ...extra.written } : base.written,
    practical: extra.practical ? { ...base.practical, ...extra.practical } : base.practical,
    roadmap: extra.roadmap ?? base.roadmap,
    periods: extra.periods ?? base.periods,
    limitedTimeStrategy: extra.limitedTimeStrategy ?? base.limitedTimeStrategy,
    tips: extra.tips ?? base.tips,
    failures: extra.failures ?? base.failures,
    checklist: extra.checklist ?? base.checklist,
    resources: extra.resources ?? base.resources,
    commonSuccessfulSequence: extra.commonSuccessfulSequence ?? base.commonSuccessfulSequence,
    recommendedRoadmap: extra.recommendedRoadmap ?? base.recommendedRoadmap,
    labookAdvice: extra.labookAdvice ?? base.labookAdvice,
  };
}

function applyPrivateEnrichments(data: CertificateData): CertificateData {
  if (data.basic?.type !== "private") return data;

  return loadPrivateEnrichments().reduce((current, file) => {
    const extra = file.items?.[current.basic.slug];
    if (!extra) return current;

    return {
      ...current,
      ...extra,
      basic: current.basic,
      hero: extra.hero ? { ...current.hero, ...extra.hero } : current.hero,
      keyInfo: extra.keyInfo ?? current.keyInfo,
      certificateIntro: extra.certificateIntro
        ? { ...current.certificateIntro, ...extra.certificateIntro }
        : current.certificateIntro,
      officialInfo: extra.officialInfo
        ? { ...current.officialInfo, ...extra.officialInfo }
        : current.officialInfo,
      studyStrategy: mergeStudyStrategy(current.studyStrategy, extra.studyStrategy),
      career: extra.career ? { ...current.career, ...extra.career } : current.career,
      trustInfo: extra.trustInfo ? { ...current.trustInfo, ...extra.trustInfo } : current.trustInfo,
      searchIntent: mergeSearchIntent(current.searchIntent, extra.searchIntent),
    } as CertificateData;
  }, data);
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
    return applyPrivateEnrichments(data);
  } catch (error) {
    console.error(`자격증 JSON 읽기 실패: ${slug}`, error);
    return null;
  }
}
