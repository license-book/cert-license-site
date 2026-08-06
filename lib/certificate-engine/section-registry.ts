import type { CertificateSectionId } from "./types";

export type SectionDefinition = { id: CertificateSectionId; label: string; delay: number; className?: string };

export const CERTIFICATE_SECTIONS: readonly SectionDefinition[] = [
  { id: "intro", label: "자격증 소개", delay: 0 },
  { id: "official-info", label: "시험 정보", delay: 60, className: "mt-10 md:mt-12" },
  { id: "statistics", label: "시험 통계", delay: 100, className: "mt-10 md:mt-12" },
  { id: "eligibility", label: "응시자격", delay: 140 },
  { id: "summary", label: "한눈에 보기", delay: 160, className: "mt-10" },
  { id: "reality-guide", label: "현실 가이드", delay: 180 },
  { id: "cost", label: "응시 비용", delay: 200 },
  { id: "study-strategy", label: "공부 전략", delay: 220 },
  { id: "career", label: "취업·활용", delay: 240 },
  { id: "affiliate", label: "추천 자료", delay: 260 },
  { id: "trust-info", label: "정보 출처", delay: 290 },
  { id: "related-roadmaps", label: "관련 로드맵", delay: 295, className: "mt-10 md:mt-12" },
  { id: "related", label: "관련 자격증", delay: 300 },
  { id: "final-cta", label: "다음 단계", delay: 305 },
] as const;
