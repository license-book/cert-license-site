import type { Metadata } from "next";
import type { GuideData } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://labook.kr";

export function createGuideMetadata(guide: GuideData): Metadata {
  const title = guide.seo?.title ?? `${guide.basic.title} | 라북 수험가이드`;
  const description = guide.seo?.description ?? guide.basic.description;
  const image = guide.seo?.image ?? guide.hero.image;
  const canonical = `/guide/${guide.basic.slug}`;

  return {
    title,
    description,
    keywords: guide.seo?.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `${SITE_URL}${canonical}`,
      siteName: "라북",
      title,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(guide.seo?.noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export function createGuideJsonLd(guide: GuideData): Record<string, unknown>[] {
  const url = `${SITE_URL}/guide/${guide.basic.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.basic.title,
    description: guide.basic.description,
    dateModified: guide.update.lastUpdated,
    datePublished: guide.update.lastUpdated,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "라북" },
    publisher: { "@type": "Organization", name: "라북" },
    ...(guide.hero.image ? { image: guide.hero.image } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "수험가이드", item: `${SITE_URL}/guide` },
      { "@type": "ListItem", position: 3, name: guide.basic.title, item: url },
    ],
  };

  const schemas: Record<string, unknown>[] = [article, breadcrumb];
  if (guide.faq?.items?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return schemas;
}
