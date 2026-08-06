export type CertificateKind = "national" | "private";

export type KeyInfoItem = { label: string; value: string; note?: string };
export type StudyStrategyData = {
  title?: string;
  summary: string;
  written: { title: string; items: string[]; tip?: string };
  practical: { title: string; items: string[]; tip?: string };
  roadmap: { step: string; title: string; description?: string }[];
  periods: { level: string; period: string; description?: string }[];
  limitedTimeStrategy?: { period: string; focus: string[]; reduce?: string[]; mustDo: string[] }[];
  tips: string[];
  failures: string[];
  checklist: string[];
  resources: string[];
  commonSuccessfulSequence?: { intro?: string; steps: string[]; reason?: string };
  recommendedRoadmap?: { intro?: string; items: { label: string; description?: string; href?: string }[] };
  labookAdvice: string;
};

export type CertificateData = {
  basic: { slug: string; name: string; shortName: string; type: CertificateKind; licenseType: string; category: string; agency: string };
  hero: { title: string; subtitle: string; image?: string };
  certificateIntro?: { title: string; description: string; highlights?: string[] };
  eligibility?: { title: string; status: "none" | "conditional" | "restricted"; statusLabel: string; summary: string; conditions?: { label: string; description: string }[]; commonQuestion?: { question: string; answer: string }; officialNotice?: string };
  display?: { charts?: boolean; career?: boolean; benefits?: boolean; cost?: boolean; schedule?: boolean; affiliate?: boolean; faq?: boolean };
  keyInfo: { title: string; items: KeyInfoItem[] };
  statistics?: { enabled?: boolean; title?: string; summary?: string; groups?: { id: string; title: string; description?: string; items: { year: number; applicants: number; passed: number; passRate: number }[] }[]; source?: { label?: string; url?: string; lastVerified?: string }; analysis?: string[]; notice?: string; display?: unknown };
  realityGuide?: { title: string; summary: string; recommendedFor: string[]; reconsiderIf: string[]; beforeStart: string[]; realityPoints: string[]; firstStep?: { title: string; description: string }; nextStep?: { title: string; description: string } };
  exam?: { written?: string; practical?: string; passingCriteria?: string; subjects?: string[] };
  charts?: { examWeight?: { enabled: boolean; items: { label: string; value: number }[] } };
  cost?: { title: string; summary?: string; items: { label: string; value: string; note?: string }[]; realisticNote?: string };
  studyStrategy?: StudyStrategyData;
  career?: { title: string; summary?: string; sections: { title: string; items: { label: string; description: string }[] }[]; realisticNote?: string };
  officialInfo?: { title: string; summary?: string; organization: string; website: string; items: { label: string; description: string }[]; importantNotice?: string[]; buttons?: { title: string; url: string }[] };
  affiliate?: { lecture?: string; book?: string; application?: string };
  faq?: { title?: string; items: { question: string; answer: string }[] };
  seo?: { title: string; description: string; keywords?: string[]; image?: string; noIndex?: boolean };
  trustInfo?: { title: string; description?: string; sourceLabel: string; sourceUrl?: string; lastVerified?: string; lastUpdated?: string; notice?: string };
  finalCta?: { title: string; description?: string; primaryButton?: { label: string; url: string }; secondaryButton?: { label: string; url: string } };
  update?: { version: string; lastUpdated: string; lastVerified: string; verified: boolean; note?: string };
};

export type CertificatePageProps = { params: Promise<{ slug: string }> };
export type TocItem = { id: string; label: string };
export type CertificateViewModel = {
  cert: CertificateData;
  relatedItems: import("@/lib/related-certificates").ResolvedRelatedItem[];
  relatedRoadmaps: import("@/lib/roadmap-engine").RelatedRoadmapSummary[];
  tocItems: TocItem[];
  heroMetrics: { difficulty: string; studyPeriod: string; usefulness: string };
  visibility: Record<CertificateSectionId, boolean>;
};

export type CertificateSectionId =
  | "intro" | "official-info" | "statistics" | "eligibility" | "summary"
  | "reality-guide" | "cost" | "study-strategy" | "career" | "affiliate"
  | "trust-info" | "related-roadmaps" | "related" | "final-cta";
