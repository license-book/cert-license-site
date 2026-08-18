import { getRelatedCertificates } from "@/lib/related-certificates";
import { findRelatedRoadmaps } from "@/lib/roadmap-engine";
import { CERTIFICATE_SECTIONS } from "./section-registry";
import { buildVisibility, getKeyMetric } from "./rules";
import { mergeSpecialSearchIntent } from "./special-search-intents";
import type { CertificateData, CertificateViewModel } from "./types";

export function buildCertificateViewModel(cert: CertificateData): CertificateViewModel {
  const resolvedCert: CertificateData = {
    ...cert,
    searchIntent: mergeSpecialSearchIntent(cert),
  };
  const relatedItems = getRelatedCertificates(resolvedCert.basic.slug);
  const relatedRoadmaps = findRelatedRoadmaps(resolvedCert.basic.slug);
  const visibility = buildVisibility(resolvedCert, relatedItems, relatedRoadmaps);
  return {
    cert: resolvedCert,
    relatedItems,
    relatedRoadmaps,
    visibility,
    tocItems: CERTIFICATE_SECTIONS.filter((section) => visibility[section.id]).map(({ id, label }) => ({ id, label })),
    heroMetrics: {
      difficulty: getKeyMetric(resolvedCert, "현실 난이도", "정보 확인 중"),
      studyPeriod: getKeyMetric(resolvedCert, "평균 준비기간", "개인별 차이"),
      usefulness: getKeyMetric(resolvedCert, "취업 활용도", "정보 확인 중"),
    },
  };
}
