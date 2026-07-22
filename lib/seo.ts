import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const SITE_NAME = "라북";
export const SITE_DESCRIPTION =
  "후회 없는 자격증 선택을 돕는 현실적인 자격증 정보 플랫폼";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cert-license-site.vercel.app";

export type SeoPage = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  keywords: string[];
  image: string;
  path: string;
  type?: string;
  licenseType?: string;
  category?: string;
  agency?: string;
  lastModified: string;
  faq: {
    question: string;
    answer: string;
  }[];
};

type SeoFile = {
  items: SeoPage[];
};

const SEO_FILE = path.join(
  process.cwd(),
  "data",
  "generated",
  "seo-pages.json"
);

export function getSeoPages(): SeoPage[] {
  if (!fs.existsSync(SEO_FILE)) return [];

  try {
    const data = JSON.parse(
      fs.readFileSync(SEO_FILE, "utf-8")
    ) as SeoFile;

    return Array.isArray(data.items) ? data.items : [];
  } catch (error) {
    console.error("SEO 데이터 읽기 실패", error);
    return [];
  }
}

export function getSeoPage(slug: string): SeoPage | null {
  return getSeoPages().find((item) => item.slug === slug) ?? null;
}

export function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function buildCertificateMetadata(page: SeoPage): Metadata {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(page.image);

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      url: canonical,
      images: [
        {
          url: image,
          alt: `${page.name} 자격증 정보`,
        },
      ],
      modifiedTime: new Date(page.lastModified).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function buildCertificateJsonLd(page: SeoPage) {
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(page.image);

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
        name: "자격증",
        item: absoluteUrl("/cert"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.name,
        item: url,
      },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url,
    image,
    inLanguage: "ko-KR",
    dateModified: page.lastModified,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "EducationalOccupationalCredential",
      name: page.name,
      credentialCategory: page.licenseType || "자격증",
      recognizedBy: page.agency
        ? {
            "@type": "Organization",
            name: page.agency,
          }
        : undefined,
    },
  };

  const faqPage = page.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return [breadcrumb, webPage, faqPage].filter(Boolean);
}
