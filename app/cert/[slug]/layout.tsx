import type { Metadata } from "next";
import JsonLd from "@/components/common/JsonLd";
import {
  buildCertificateJsonLd,
  buildCertificateMetadata,
  getSeoPage,
} from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    return {
      title: "자격증 정보를 찾을 수 없습니다 | 라북",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildCertificateMetadata(page);
}

export default async function CertDetailLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  const jsonLd = page ? buildCertificateJsonLd(page) : [];

  return (
    <>
      {jsonLd.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      {children}
    </>
  );
}
