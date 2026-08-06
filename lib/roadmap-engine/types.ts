export type RoadmapLink = {
  label: string;
  href: string;
};

export type RoadmapCertificate = {
  name: string;
  href: string;
  description: string;
  level?: string;
  recommendedFor?: string;
};

export type RoadmapStage = {
  id: string;
  number: string;
  title: string;
  description: string;
  goal?: string;
  checklist?: string[];
  certificates: RoadmapCertificate[];
};

export type RoadmapData = {
  basic: {
    slug: string;
    title: string;
    categoryLabel: string;
    description: string;
    estimatedPeriod?: string;
    target?: string;
  };
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    image?: string;
  };
  summary: {
    title: string;
    items: string[];
  };
  stages: RoadmapStage[];
  tips?: {
    title: string;
    items: string[];
  };
  faq?: {
    title?: string;
    items: { question: string; answer: string }[];
  };
  related?: {
    title?: string;
    items: RoadmapLink[];
  };
  finalCta?: {
    title: string;
    description?: string;
    primaryButton?: RoadmapLink;
    secondaryButton?: RoadmapLink;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
  };
  update: {
    lastUpdated: string;
    lastVerified?: string;
  };
};

export type RoadmapPageProps = {
  params: Promise<{ slug: string }>;
};
