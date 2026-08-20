import fs from "node:fs";
import path from "node:path";
import { listCertificateFiles } from "./certificate-files.mjs";

const ROOT = process.cwd();
const CERT_DIR = path.join(ROOT, "data", "certificates");

function hasFinalConsonant(value) {
  const chars = Array.from(String(value || "").trim());
  for (let i = chars.length - 1; i >= 0; i -= 1) {
    const code = chars[i].charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      return (code - 0xac00) % 28 !== 0;
    }
  }
  return null;
}

function correctParticlesInString(value, names) {
  let result = value;

  for (const name of names) {
    const finalConsonant = hasFinalConsonant(name);
    if (finalConsonant === null) continue;

    const pairs = [
      ["은", "는", finalConsonant ? "은" : "는"],
      ["이", "가", finalConsonant ? "이" : "가"],
      ["을", "를", finalConsonant ? "을" : "를"],
      ["과", "와", finalConsonant ? "과" : "와"],
    ];

    for (const [withBatchim, withoutBatchim, correct] of pairs) {
      const wrong = correct === withBatchim ? withoutBatchim : withBatchim;
      result = result.split(`${name}${wrong}`).join(`${name}${correct}`);
    }
  }

  return result;
}

function walk(value, names) {
  if (typeof value === "string") return correctParticlesInString(value, names);
  if (Array.isArray(value)) return value.map((item) => walk(item, names));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, walk(item, names)])
    );
  }
  return value;
}

const changedCertificateFiles = [];
let correctedOccurrences = 0;

for (const file of listCertificateFiles(CERT_DIR)) {
  const source = fs.readFileSync(file, "utf8");
  const json = JSON.parse(source);
  const names = [...new Set([json?.basic?.name, json?.basic?.shortName].filter(Boolean))];
  if (!names.length) continue;

  const fixed = walk(json, names);
  if (JSON.stringify(fixed) !== JSON.stringify(json)) {
    for (const name of names) {
      const finalConsonant = hasFinalConsonant(name);
      if (finalConsonant === null) continue;
      const wrongParticles = finalConsonant
        ? ["는", "가", "를", "와"]
        : ["은", "이", "을", "과"];
      for (const particle of wrongParticles) {
        correctedOccurrences += source.split(`${name}${particle}`).length - 1;
      }
    }

    fs.writeFileSync(file, `${JSON.stringify(fixed, null, 2)}\n`, "utf8");
    changedCertificateFiles.push(path.relative(ROOT, file));
  }
}

const comparePath = path.join(ROOT, "components", "CertificateCompare.tsx");
let compareSource = fs.readFileSync(comparePath, "utf8");
const compareBefore = compareSource;
compareSource = compareSource
  .replace(
    "leftLabel: `${left.category} 분야와 ${left.licenseType}이 목표인 사람`,",
    "leftLabel: `${left.category} 분야의 ${left.licenseType} 취득이 목표인 사람`,"
  )
  .replace(
    "rightLabel: `${right.category} 분야와 ${right.licenseType}이 목표인 사람`,",
    "rightLabel: `${right.category} 분야의 ${right.licenseType} 취득이 목표인 사람`,"
  );
if (compareSource === compareBefore) {
  throw new Error("CertificateCompare.tsx 대상 공통문장을 찾지 못했습니다.");
}
fs.writeFileSync(comparePath, compareSource, "utf8");

const sitemapPath = path.join(ROOT, "app", "sitemap.ts");
const sitemapSource = [
  'import fs from "node:fs";',
  'import path from "node:path";',
  'import type { MetadataRoute } from "next";',
  'import { getSeoPages, SITE_URL } from "@/lib/seo";',
  'import { isSeoPageIndexable } from "@/lib/certificate-indexing";',
  '',
  'function getRoadmapSlugs(): string[] {',
  '  const directory = path.join(process.cwd(), "data", "roadmaps");',
  '  if (!fs.existsSync(directory)) return [];',
  '',
  '  return fs',
  '    .readdirSync(directory, { withFileTypes: true })',
  '    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))',
  '    .map((entry) => entry.name.replace(/\\.json$/, ""))',
  '    .sort();',
  '}',
  '',
  'export default function sitemap(): MetadataRoute.Sitemap {',
  '  const pages = getSeoPages().filter(isSeoPageIndexable);',
  '  const now = new Date();',
  '',
  '  const staticPages: MetadataRoute.Sitemap = [',
  '    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },',
  '    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },',
  '    { url: `${SITE_URL}/national-certificates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },',
  '    { url: `${SITE_URL}/private-certificates`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },',
  '    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },',
  '    { url: `${SITE_URL}/rank`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },',
  '    { url: `${SITE_URL}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },',
  '    { url: `${SITE_URL}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },',
  '    { url: `${SITE_URL}/site-map`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },',
  '    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },',
  '    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },',
  '    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },',
  '    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },',
  '    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },',
  '  ];',
  '',
  '  const certificatePages: MetadataRoute.Sitemap = pages.map((page) => ({',
  '    url: `${SITE_URL}${page.path}`,',
  '    lastModified: page.lastModified ? new Date(page.lastModified) : now,',
  '    changeFrequency: "monthly",',
  '    priority: 0.9,',
  '  }));',
  '',
  '  const roadmapPages: MetadataRoute.Sitemap = getRoadmapSlugs().map((slug) => ({',
  '    url: `${SITE_URL}/roadmap/${slug}`,',
  '    lastModified: now,',
  '    changeFrequency: "monthly",',
  '    priority: 0.75,',
  '  }));',
  '',
  '  return [...staticPages, ...certificatePages, ...roadmapPages];',
  '}',
  '',
].join("\n");
fs.writeFileSync(sitemapPath, sitemapSource, "utf8");

console.log(`Certificate JSON files changed: ${changedCertificateFiles.length}`);
console.log(`Particle occurrences corrected: ${correctedOccurrences}`);
for (const file of changedCertificateFiles) console.log(`- ${file}`);
console.log("CertificateCompare.tsx common labels updated.");
console.log("app/sitemap.ts expanded with hub, policy, and roadmap pages.");
