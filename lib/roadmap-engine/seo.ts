import type { Metadata } from "next";
import type { RoadmapData } from "./types";

const SITE_NAME = "라북";

export function createRoadmapMetadata(roadmap: RoadmapData): Metadata {
  const title = roadmap.seo?.title ?? `${roadmap.basic.title} | ${SITE_NAME}`;
  const description = roadmap.seo?.description ?? roadmap.basic.description;
  const canonical = `/roadmap/${roadmap.basic.slug}`;
  const image = roadmap.seo?.image ?? roadmap.hero.image;

  return {
    title,
    description,
    keywords: roadmap.seo?.keywords,
    alternates: { canonical },
    robots: roadmap.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: SITE_NAME,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export function createRoadmapJsonLd(roadmap: RoadmapData) {
  const url = `/roadmap/${roadmap.basic.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: roadmap.basic.title,
    description: roadmap.basic.description,
    dateModified: roadmap.update.lastUpdated,
    mainEntityOfPage: url,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "/" },
      { "@type": "ListItem", position: 2, name: "수험가이드", item: "/guide" },
      { "@type": "ListItem", position: 3, name: roadmap.basic.title, item: url },
    ],
  };
  const faq = roadmap.faq?.items?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: roadmap.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;
  return [article, breadcrumb, faq].filter(Boolean);
}
