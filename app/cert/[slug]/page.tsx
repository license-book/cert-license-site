import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import CertificateRenderer from "@/components/cert/CertificateRenderer";
import {
  buildCertificateViewModel,
  createCertificateMetadata,
  loadCertificate,
  type CertificatePageProps,
} from "@/lib/certificate-engine";

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "private") {
    return {
      title: "민간자격증 | 라북",
      alternates: { canonical: "/private-certificates" },
    };
  }

  const cert = loadCertificate(slug);
  return cert ? createCertificateMetadata(cert) : { title: "자격증 정보를 찾을 수 없습니다" };
}

export default async function CertDetailPage({ params }: CertificatePageProps) {
  const { slug } = await params;

  // 과거 또는 잘못된 민간자격증 목록 URL은 공식 목록 페이지로 영구 이동한다.
  if (slug === "private") {
    permanentRedirect("/private-certificates");
  }

  const cert = loadCertificate(slug);
  if (!cert) notFound();
  return <CertificateRenderer model={buildCertificateViewModel(cert)} />;
}
