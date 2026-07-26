import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CertificateRenderer from "@/components/cert/CertificateRenderer";
import {
  buildCertificateViewModel,
  createCertificateMetadata,
  loadCertificate,
  type CertificatePageProps,
} from "@/lib/certificate-engine";

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const cert = loadCertificate(slug);
  return cert ? createCertificateMetadata(cert) : { title: "자격증 정보를 찾을 수 없습니다" };
}

export default async function CertDetailPage({ params }: CertificatePageProps) {
  const { slug } = await params;
  const cert = loadCertificate(slug);
  if (!cert) notFound();
  return <CertificateRenderer model={buildCertificateViewModel(cert)} />;
}
