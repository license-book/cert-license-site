import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideRenderer from "@/components/guide/GuideRenderer";
import {
  createGuideMetadata,
  getAllGuideSlugs,
  loadGuide,
  type GuidePageProps,
} from "@/lib/guide-engine";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = loadGuide(slug);
  return guide ? createGuideMetadata(guide) : { title: "가이드를 찾을 수 없습니다" };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = loadGuide(slug);
  if (!guide) notFound();
  return <GuideRenderer guide={guide} />;
}
