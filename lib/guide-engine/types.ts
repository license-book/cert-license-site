export type GuideCategory =
  | "start"
  | "prepare"
  | "study"
  | "exam-day"
  | "after-pass"
  | "faq";

export type GuideLink = {
  label: string;
  href: string;
};

export type GuideSection = {
  id: string;
  title: string;
  description?: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: { title: string; description: string }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  notice?: {
    title: string;
    description: string;
  };
};

export type GuideData = {
  basic: {
    slug: string;
    title: string;
    category: GuideCategory;
    categoryLabel: string;
    description: string;
    readingTime?: string;
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
  sections: GuideSection[];
  faq?: {
    title?: string;
    items: { question: string; answer: string }[];
  };
  related?: {
    title?: string;
    items: GuideLink[];
  };
  finalCta?: {
    title: string;
    description?: string;
    primaryButton?: GuideLink;
    secondaryButton?: GuideLink;
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

export type GuidePageProps = {
  params: Promise<{ slug: string }>;
};
