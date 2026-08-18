import type { CertificateData, CertificateSectionId } from "./types";
import type { ResolvedRelatedItem } from "@/lib/related-certificates";
import type { RelatedRoadmapSummary } from "@/lib/roadmap-engine";

export function getKeyMetric(cert: CertificateData, label: string, fallback: string): string {
  return cert.keyInfo.items.find((item) => item.label === label)?.value ?? fallback;
}

export function buildVisibility(
  cert: CertificateData,
  related: ResolvedRelatedItem[],
  relatedRoadmaps: RelatedRoadmapSummary[],
): Record<CertificateSectionId, boolean> {
  const hasAffiliate = Boolean(cert.affiliate?.lecture || cert.affiliate?.book || cert.affiliate?.application);
  const hasCustomSearchIntent = Boolean(
    cert.searchIntent?.links?.some((item) => item.label?.trim() && item.href?.trim()) ||
    cert.searchIntent?.items?.some((item) => item.query?.trim() && item.answer?.trim()),
  );
  const hasAutomaticSearchIntent = cert.basic.type === "national" && Boolean(
    cert.certificateIntro || cert.eligibility || cert.officialInfo || cert.exam ||
    cert.keyInfo?.items?.length || cert.cost || cert.studyStrategy || cert.career,
  );

  return {
    "intro": Boolean(cert.certificateIntro),
    "search-intent": hasCustomSearchIntent || hasAutomaticSearchIntent,
    "official-info": Boolean(cert.officialInfo || cert.exam),
    "statistics": cert.statistics?.enabled === true,
    "eligibility": Boolean(cert.eligibility),
    "summary": true,
    "reality-guide": Boolean(cert.realityGuide),
    "cost": cert.display?.cost !== false && Boolean(cert.cost),
    "study-strategy": Boolean(cert.studyStrategy),
    "career": cert.display?.career !== false && Boolean(cert.career),
    "affiliate": cert.display?.affiliate !== false && hasAffiliate,
    "trust-info": Boolean(cert.trustInfo),
    "related-roadmaps": relatedRoadmaps.length > 0,
    "related": related.length > 0,
    "final-cta": Boolean(cert.finalCta),
  };
}
