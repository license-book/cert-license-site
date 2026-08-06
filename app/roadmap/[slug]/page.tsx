import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoadmapRenderer from "@/components/roadmap/RoadmapRenderer";
import {
  createRoadmapMetadata,
  getAllRoadmapSlugs,
  loadRoadmap,
  type RoadmapPageProps,
} from "@/lib/roadmap-engine";

export function generateStaticParams() {
  return getAllRoadmapSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RoadmapPageProps): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = loadRoadmap(slug);
  return roadmap ? createRoadmapMetadata(roadmap) : { title: "로드맵을 찾을 수 없습니다" };
}

export default async function RoadmapDetailPage({ params }: RoadmapPageProps) {
  const { slug } = await params;
  const roadmap = loadRoadmap(slug);
  if (!roadmap) notFound();
  return <RoadmapRenderer roadmap={roadmap} />;
}
