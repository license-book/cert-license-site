import type { RoadmapData } from "./types";
import { getAllRoadmapSlugs, loadRoadmap } from "./loader";

export type RelatedRoadmapSummary = {
  slug: string;
  title: string;
  categoryLabel: string;
  description: string;
  estimatedPeriod?: string;
  matchedStages: string[];
  certificateCount: number;
  href: string;
};

function isSafeSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function certificateSlugFromHref(href: string): string | null {
  const match = href.match(/^\/cert\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/);
  return match?.[1] ?? null;
}

export function findRelatedRoadmaps(certificateSlug: string): RelatedRoadmapSummary[] {
  if (!isSafeSlug(certificateSlug)) return [];

  return getAllRoadmapSlugs()
    .map((slug) => loadRoadmap(slug))
    .filter((roadmap): roadmap is RoadmapData => Boolean(roadmap?.basic?.slug && roadmap?.stages?.length))
    .flatMap((roadmap) => {
      const matchedStages = roadmap.stages
        .filter((stage) => stage.certificates.some((certificate) => certificateSlugFromHref(certificate.href) === certificateSlug))
        .map((stage) => stage.title);

      if (matchedStages.length === 0) return [];


      const certificateCount = new Set(
        roadmap.stages.flatMap((stage) =>
          stage.certificates
            .map((certificate) => certificateSlugFromHref(certificate.href))
            .filter((slug): slug is string => Boolean(slug)),
        ),
      ).size;

      return [{
        slug: roadmap.basic.slug,
        title: roadmap.basic.title,
        categoryLabel: roadmap.basic.categoryLabel,
        description: roadmap.basic.description,
        estimatedPeriod: roadmap.basic.estimatedPeriod,
        matchedStages,
        certificateCount,
        href: `/roadmap/${roadmap.basic.slug}`,
      } satisfies RelatedRoadmapSummary];
    })
    .sort((a, b) => a.title.localeCompare(b.title, "ko"));
}
