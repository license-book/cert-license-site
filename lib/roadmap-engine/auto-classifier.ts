import fs from "node:fs";
import path from "node:path";
import type { RoadmapCertificate, RoadmapData } from "./types";

const CERTIFICATE_DIRECTORY = path.join(process.cwd(), "data", "certificates");
const RULE_FILE = path.join(process.cwd(), "data", "roadmap-rules.json");

type CertificateBasic = {
  slug: string;
  name: string;
  shortName?: string;
  type?: string;
  licenseType?: string;
  category?: string;
  agency?: string;
};

type CertificateSource = {
  basic: CertificateBasic;
  seo?: { keywords?: string[] };
  career?: { summary?: string; description?: string };
};

type MatchRule = {
  stageId: string;
  priority?: number;
  categories?: string[];
  types?: string[];
  licenseTypes?: string[];
  nameKeywords?: string[];
  keywordTerms?: string[];
  agencyKeywords?: string[];
  excludeNameKeywords?: string[];
};

type RoadmapAutoRule = {
  slug: string;
  enabled?: boolean;
  includeSlugs?: string[];
  excludeSlugs?: string[];
  matchers: MatchRule[];
};

type RoadmapRuleFile = {
  version: number;
  roadmaps: RoadmapAutoRule[];
};

export type AutoClassificationReport = {
  roadmapSlug: string;
  scannedCertificates: number;
  manuallyIncluded: number;
  automaticallyIncluded: number;
  autoAddedSlugs: string[];
};

function readJson<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

function getRules(): RoadmapRuleFile | null {
  if (!fs.existsSync(RULE_FILE)) return null;
  return readJson<RoadmapRuleFile>(RULE_FILE);
}

function getCertificates(): CertificateSource[] {
  if (!fs.existsSync(CERTIFICATE_DIRECTORY)) return [];

  return fs
    .readdirSync(CERTIFICATE_DIRECTORY)
    .filter((file) => file.endsWith(".json"))
    .map((file) => readJson<CertificateSource>(path.join(CERTIFICATE_DIRECTORY, file)))
    .filter((certificate): certificate is CertificateSource =>
      Boolean(certificate?.basic?.slug && certificate?.basic?.name),
    );
}

function includesAny(value: string | undefined, terms: string[] | undefined): boolean {
  if (!value || !terms?.length) return false;
  const normalized = value.toLocaleLowerCase("ko");
  return terms.some((term) => normalized.includes(term.toLocaleLowerCase("ko")));
}

function exactMatch(value: string | undefined, candidates: string[] | undefined): boolean {
  return Boolean(value && candidates?.includes(value));
}

function searchableText(certificate: CertificateSource): string {
  return [
    certificate.basic.name,
    certificate.basic.shortName,
    certificate.basic.category,
    certificate.basic.licenseType,
    certificate.basic.agency,
    ...(certificate.seo?.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("ko");
}

function matchScore(certificate: CertificateSource, matcher: MatchRule): number {
  const { basic } = certificate;
  const searchText = searchableText(certificate);

  if (includesAny(basic.name, matcher.excludeNameKeywords)) return -1;

  let score = 0;
  let hasConstraint = false;

  if (matcher.categories?.length) {
    hasConstraint = true;
    if (!exactMatch(basic.category, matcher.categories)) return -1;
    score += 40;
  }
  if (matcher.types?.length) {
    hasConstraint = true;
    if (!exactMatch(basic.type, matcher.types)) return -1;
    score += 10;
  }
  if (matcher.licenseTypes?.length) {
    hasConstraint = true;
    if (!matcher.licenseTypes.some((term) => basic.licenseType?.includes(term))) return -1;
    score += 10;
  }
  if (matcher.nameKeywords?.length) {
    hasConstraint = true;
    if (!includesAny(basic.name, matcher.nameKeywords)) return -1;
    score += 35;
  }
  if (matcher.keywordTerms?.length) {
    hasConstraint = true;
    if (!matcher.keywordTerms.some((term) => searchText.includes(term.toLocaleLowerCase("ko")))) return -1;
    score += 20;
  }
  if (matcher.agencyKeywords?.length) {
    hasConstraint = true;
    if (!includesAny(basic.agency, matcher.agencyKeywords)) return -1;
    score += 10;
  }

  return hasConstraint ? score + (matcher.priority ?? 0) : -1;
}

function createAutoCertificate(certificate: CertificateSource): RoadmapCertificate {
  const { basic } = certificate;
  const typeLabel = basic.licenseType || (basic.type === "private" ? "민간자격" : "자격증");

  return {
    name: basic.name,
    href: `/cert/${basic.slug}`,
    description: `${basic.category ?? "관련 분야"}에서 활용할 수 있는 ${typeLabel}입니다. 상세페이지에서 시험·취득 조건과 활용 정보를 확인하세요.`,
    level: basic.licenseType?.includes("기사")
      ? "기사급"
      : basic.licenseType?.includes("산업기사")
        ? "산업기사급"
        : basic.licenseType?.includes("기능사")
          ? "입문·기능사"
          : basic.type === "private"
            ? "민간·실무"
            : "관련 자격",
    recommendedFor: `${basic.category ?? "관련 분야"} 진입·확장 희망자`,
  };
}

function slugFromHref(href: string): string | null {
  return href.match(/^\/cert\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/)?.[1] ?? null;
}

export function expandRoadmapWithAutomaticCertificates(
  roadmap: RoadmapData,
): { roadmap: RoadmapData; report: AutoClassificationReport } {
  const rules = getRules();
  const roadmapRule = rules?.roadmaps.find((rule) => rule.slug === roadmap.basic.slug);
  const certificates = getCertificates();
  const manualSlugs = new Set(
    roadmap.stages.flatMap((stage) =>
      stage.certificates.map((certificate) => slugFromHref(certificate.href)).filter(Boolean),
    ) as string[],
  );

  const report: AutoClassificationReport = {
    roadmapSlug: roadmap.basic.slug,
    scannedCertificates: certificates.length,
    manuallyIncluded: manualSlugs.size,
    automaticallyIncluded: 0,
    autoAddedSlugs: [],
  };

  if (!roadmapRule || roadmapRule.enabled === false) return { roadmap, report };

  const excluded = new Set(roadmapRule.excludeSlugs ?? []);
  const forced = new Set(roadmapRule.includeSlugs ?? []);
  const additions = new Map<string, RoadmapCertificate[]>();

  for (const certificate of certificates) {
    const slug = certificate.basic.slug;
    if (manualSlugs.has(slug) || excluded.has(slug)) continue;

    let selectedStageId: string | null = null;
    let selectedScore = -1;

    for (const matcher of roadmapRule.matchers) {
      const score = matchScore(certificate, matcher);
      if (score > selectedScore) {
        selectedScore = score;
        selectedStageId = matcher.stageId;
      }
    }

    if (forced.has(slug) && !selectedStageId) {
      selectedStageId = roadmapRule.matchers[0]?.stageId ?? null;
      selectedScore = 1;
    }

    if (!selectedStageId || selectedScore < 0 || !roadmap.stages.some((stage) => stage.id === selectedStageId)) {
      continue;
    }

    const list = additions.get(selectedStageId) ?? [];
    list.push(createAutoCertificate(certificate));
    additions.set(selectedStageId, list);
    report.autoAddedSlugs.push(slug);
  }

  const expanded: RoadmapData = {
    ...roadmap,
    stages: roadmap.stages.map((stage) => ({
      ...stage,
      certificates: [
        ...stage.certificates,
        ...(additions.get(stage.id) ?? []).sort((a, b) => a.name.localeCompare(b.name, "ko")),
      ],
    })),
  };

  report.automaticallyIncluded = report.autoAddedSlugs.length;
  report.autoAddedSlugs.sort();

  return { roadmap: expanded, report };
}
