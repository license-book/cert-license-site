import { getAllRoadmapSlugs, loadRoadmap } from "@/lib/roadmap-engine";
import RoadmapQuickActionsClient from "./RoadmapQuickActionsClient";

export type RoadmapQuickItem = {
  slug: string;
  title: string;
  categoryLabel: string;
};

export default function FloatingQuickActions() {
  const roadmaps: RoadmapQuickItem[] = getAllRoadmapSlugs()
    .map((slug) => loadRoadmap(slug))
    .filter((roadmap): roadmap is NonNullable<typeof roadmap> => Boolean(roadmap))
    .map((roadmap) => ({
      slug: roadmap.basic.slug,
      title: roadmap.basic.title,
      categoryLabel: roadmap.basic.categoryLabel,
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "ko"));

  return <RoadmapQuickActionsClient roadmaps={roadmaps} />;
}
