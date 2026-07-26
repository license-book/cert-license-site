import type { CertificateData, CertificateSectionId } from "./types";
import type { ResolvedRelatedItem } from "@/lib/related-certificates";

export function getKeyMetric(cert: CertificateData, label: string, fallback: string): string {
  return cert.keyInfo.items.find((item) => item.label === label)?.value ?? fallback;
}

export function buildVisibility(cert: CertificateData, related: ResolvedRelatedItem[]): Record<CertificateSectionId, boolean> {
  const hasAffiliate = Boolean(cert.affiliate?.lecture || cert.affiliate?.book || cert.affiliate?.application);
  return {
    "intro": Boolean(cert.certificateIntro),
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
    "related": related.length > 0,
    "final-cta": Boolean(cert.finalCta),
  };
}
