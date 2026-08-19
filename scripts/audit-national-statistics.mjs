import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CERT_DIR = path.join(ROOT, "data", "certificates");
const OUT = path.join(ROOT, "public", "national-statistics-audit.json");

const files = fs.readdirSync(CERT_DIR).filter((name) => name.endsWith(".json"));
const rows = [];

for (const name of files) {
  const file = path.join(CERT_DIR, name);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    continue;
  }
  if (data?.basic?.type !== "national") continue;
  const s = data.statistics;
  const groups = Array.isArray(s?.groups) ? s.groups : [];
  const points = groups.reduce((sum, group) => sum + (Array.isArray(group?.items) ? group.items.length : 0), 0);
  rows.push({
    slug: data.basic.slug,
    name: data.basic.name,
    agency: data.basic.agency,
    hasStatistics: Boolean(s),
    enabled: s?.enabled === true,
    status: s?.status ?? null,
    groupCount: groups.length,
    pointCount: points,
    sourceLabel: s?.source?.label ?? null,
    sourceUrl: s?.source?.url ?? null,
    lastVerified: s?.source?.lastVerified ?? null,
    needsReview: !s || s.enabled !== true || s.status === "unavailable" || points === 0,
  });
}

rows.sort((a, b) => a.name.localeCompare(b.name, "ko"));
const needsReview = rows.filter((row) => row.needsReview);
const payload = {
  generatedAt: new Date().toISOString(),
  nationalCount: rows.length,
  reviewCount: needsReview.length,
  needsReview,
  all: rows,
};
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`[national-statistics-audit] national=${rows.length}, needsReview=${needsReview.length}`);
