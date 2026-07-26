import { getRelatedCertificates } from "@/lib/related-certificates";
import { CERTIFICATE_SECTIONS } from "./section-registry";
import { buildVisibility, getKeyMetric } from "./rules";
import type { CertificateData, CertificateViewModel } from "./types";

export function buildCertificateViewModel(cert: CertificateData): CertificateViewModel {
  const relatedItems = getRelatedCertificates(cert.basic.slug);
  const visibility = buildVisibility(cert, relatedItems);
  return {
    cert,
    relatedItems,
    visibility,
    tocItems: CERTIFICATE_SECTIONS.filter((section) => visibility[section.id]).map(({ id, label }) => ({ id, label })),
    heroMetrics: {
      difficulty: getKeyMetric(cert, "현실 난이도", "정보 확인 중"),
      studyPeriod: getKeyMetric(cert, "평균 준비기간", "개인별 차이"),
      usefulness: getKeyMetric(cert, "취업 활용도", "정보 확인 중"),
    },
  };
}
