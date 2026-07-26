import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

const SITE_NAME = "라북";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cert-license-site.vercel.app";
const SEO_DATA_PATH = path.join(
  process.cwd(),
  "data",
  "generated",
  "seo-pages.json"
);

export type SeoPage = {
  slug: string;
  name: string;
  shortName?: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path: string;
  type?: string;
  licenseType?: string;
  category?: string;
  agency?: string;
  lastModified?: string;
};

type SeoPageCollection = {
  items?: SeoPage[];
};

function absoluteUrl(value?: string): string {
  if (!value) return `${SITE_URL}/images/og/default-og.webp`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function readSeoPages(): SeoPage[] {
  try {
    if (!fs.existsSync(SEO_DATA_PATH)) return [];
    const parsed = JSON.parse(
      fs.readFileSync(SEO_DATA_PATH, "utf-8")
    ) as SeoPageCollection;
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch (error) {
    console.error("SEO 데이터 읽기 실패", error);
    return [];
  }
}

export function getSeoPages(): SeoPage[] {
  return readSeoPages();
}

export function getSeoPage(slug: string): SeoPage | undefined {
  return getSeoPages().find((page) => page.slug === slug);
}

export function buildCertificateMetadata(page: SeoPage): Metadata {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(page.image);

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      url: canonical,
      images: [{ url: image, alt: `${page.name} 자격증 정보` }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

export function buildCertificateJsonLd(page: SeoPage): Record<string, unknown>[] {
  const pageUrl = absoluteUrl(page.path);
  const imageUrl = absoluteUrl(page.image);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "자격증 정보",
        item: `${SITE_URL}/cert`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.name,
        item: pageUrl,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    image: imageUrl,
    mainEntityOfPage: pageUrl,
    dateModified: page.lastModified,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "EducationalOccupationalCredential",
      name: page.name,
      credentialCategory: page.licenseType,
      recognizedBy: page.agency
        ? {
            "@type": "Organization",
            name: page.agency,
          }
        : undefined,
    },
  };

  return [breadcrumb, article];
}
