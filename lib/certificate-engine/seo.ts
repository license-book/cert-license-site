import type { Metadata } from "next";
import { buildCertificateJsonLd, buildCertificateMetadata, SITE_URL, type SeoPage } from "@/lib/seo";
import { isCertificateIndexable } from "@/lib/certificate-indexing";
import type { CertificateData } from "./types";

function toSeoPage(cert: CertificateData): SeoPage {
  return {
    slug: cert.basic.slug,
    name: cert.basic.name,
    shortName: cert.basic.shortName,
    title: cert.seo?.title ?? cert.basic.name,
    description: cert.seo?.description ?? cert.hero.subtitle,
    keywords: cert.seo?.keywords,
    image: cert.seo?.image ?? cert.hero.image,
    path: `/cert/${cert.basic.slug}`,
    type: cert.basic.type,
    licenseType: cert.basic.licenseType,
    category: cert.basic.category,
    agency: cert.basic.agency,
    lastModified: cert.update?.lastUpdated,
  };
}

export function createCertificateMetadata(cert: CertificateData): Metadata {
  const metadata = buildCertificateMetadata(toSeoPage(cert));
  const indexable = isCertificateIndexable({
    slug: cert.basic.slug,
    type: cert.basic.type,
    explicitNoIndex: cert.seo?.noIndex,
  });

  return indexable
    ? metadata
    : { ...metadata, robots: { index: false, follow: true } };
}

export function createCertificateJsonLd(cert: CertificateData): Record<string, unknown>[] {
  return buildCertificateJsonLd(toSeoPage(cert));
}

export { SITE_URL };
