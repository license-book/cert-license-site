import fs from "node:fs";
import path from "node:path";
import type { RoadmapData } from "./types";
import { expandRoadmapWithAutomaticCertificates } from "./auto-classifier";

const ROADMAP_DIRECTORY = path.join(process.cwd(), "data", "roadmaps");

function isSafeSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function loadRoadmap(slug: string): RoadmapData | null {
  if (!isSafeSlug(slug)) return null;
  const filePath = path.join(ROADMAP_DIRECTORY, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const roadmap = JSON.parse(fs.readFileSync(filePath, "utf8")) as RoadmapData;
    if (roadmap.basic.slug !== slug || !roadmap.stages?.length) return null;
    return expandRoadmapWithAutomaticCertificates(roadmap).roadmap;
  } catch {
    return null;
  }
}

export function getAllRoadmapSlugs(): string[] {
  if (!fs.existsSync(ROADMAP_DIRECTORY)) return [];
  return fs.readdirSync(ROADMAP_DIRECTORY)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""))
    .filter(isSafeSlug);
}
