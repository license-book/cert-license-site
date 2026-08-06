import fs from "node:fs";
import path from "node:path";
import type { GuideData } from "./types";

const GUIDE_ROOT = path.join(process.cwd(), "data", "guides");

function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function getGuidePath(slug: string): string | null {
  if (!isSafeSlug(slug)) return null;
  const file = path.join(GUIDE_ROOT, `${slug}.json`);
  return fs.existsSync(file) ? file : null;
}

export function loadGuide(slug: string): GuideData | null {
  const file = getGuidePath(slug);
  if (!file) return null;

  try {
    const guide = JSON.parse(fs.readFileSync(file, "utf-8")) as GuideData;
    if (guide.basic?.slug !== slug) {
      console.error(`가이드 slug 불일치: ${file}`);
      return null;
    }
    if (!guide.basic?.title || !guide.hero?.title || !Array.isArray(guide.sections)) {
      console.error(`가이드 필수 필드 누락: ${file}`);
      return null;
    }
    return guide;
  } catch (error) {
    console.error(`가이드 JSON 읽기 실패: ${slug}`, error);
    return null;
  }
}

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDE_ROOT)) return [];
  return fs
    .readdirSync(GUIDE_ROOT)
    .filter((name) => name.endsWith(".json"))
    .map((name) => name.replace(/\.json$/, ""))
    .filter(isSafeSlug);
}
