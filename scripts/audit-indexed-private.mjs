import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const INDEX_FILE = path.join(ROOT, "lib", "certificate-indexing.ts");
const LOADER_FILE = path.join(ROOT, "lib", "certificate-engine", "loader.ts");
const CERT_DIR = path.join(ROOT, "data", "certificates");

const errors = [];
const warnings = [];
const rows = [];

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isText = (v) => typeof v === "string" && v.trim().length > 0;
const uniq = (arr) => [...new Set(arr)];

function readText(file) {
  return fs.readFileSync(file, "utf-8");
}

function readJson(file) {
  return JSON.parse(readText(file));
}

function getApprovedSlugs() {
  const src = readText(INDEX_FILE);
  const block = src.match(/APPROVED_PRIVATE_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
  return [...block.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
}

function getEnrichmentFiles() {
  const src = readText(LOADER_FILE);
  return [...src.matchAll(/"data",\s*"quality",\s*"([^"]+\.json)"/g)]
    .map((m) => path.join(ROOT, "data", "quality", m[1]))
    .filter((file) => fs.existsSync(file));
}

function mergeSearchIntent(base, extra) {
  if (!extra) return base;
  if (!base) return extra;
  const relatedKeywords = uniq([...(base.relatedKeywords ?? []), ...(extra.relatedKeywords ?? [])]);
  const links = [...(base.links ?? []), ...(extra.links ?? [])].filter(
    (item, index, array) => array.findIndex((candidate) => candidate?.href === item?.href && candidate?.label === item?.label) === index,
  );
  const items = [...(base.items ?? []), ...(extra.items ?? [])].filter(
    (item, index, array) => array.findIndex((candidate) => candidate?.query === item?.query) === index,
  );
  return { ...base, ...extra, relatedKeywords, links, items, note: [base.note, extra.note].filter(Boolean).join(" ") || undefined };
}

function mergeStudyStrategy(base, extra) {
  if (!extra) return base;
  if (!base) return extra;
  return {
    ...base,
    ...extra,
    written: extra.written ? { ...base.written, ...extra.written } : base.written,
    practical: extra.practical ? { ...base.practical, ...extra.practical } : base.practical,
    roadmap: extra.roadmap ?? base.roadmap,
    periods: extra.periods ?? base.periods,
    limitedTimeStrategy: extra.limitedTimeStrategy ?? base.limitedTimeStrategy,
    tips: extra.tips ?? base.tips,
    failures: extra.failures ?? base.failures,
    checklist: extra.checklist ?? base.checklist,
    resources: extra.resources ?? base.resources,
    commonSuccessfulSequence: extra.commonSuccessfulSequence ?? base.commonSuccessfulSequence,
    recommendedRoadmap: extra.recommendedRoadmap ?? base.recommendedRoadmap,
    labookAdvice: extra.labookAdvice ?? base.labookAdvice,
  };
}

function applyExtra(current, extra) {
  if (!extra) return current;
  return {
    ...current,
    ...extra,
    basic: current.basic,
    hero: extra.hero ? { ...current.hero, ...extra.hero } : current.hero,
    keyInfo: extra.keyInfo ?? current.keyInfo,
    certificateIntro: extra.certificateIntro ? { ...current.certificateIntro, ...extra.certificateIntro } : current.certificateIntro,
    officialInfo: extra.officialInfo ? { ...current.officialInfo, ...extra.officialInfo } : current.officialInfo,
    studyStrategy: mergeStudyStrategy(current.studyStrategy, extra.studyStrategy),
    career: extra.career ? { ...current.career, ...extra.career } : current.career,
    trustInfo: extra.trustInfo ? { ...current.trustInfo, ...extra.trustInfo } : current.trustInfo,
    searchIntent: mergeSearchIntent(current.searchIntent, extra.searchIntent),
  };
}

const enrichmentMaps = getEnrichmentFiles().map((file) => ({ file, items: readJson(file).items ?? {} }));
const approved = getApprovedSlugs();

if (approved.length !== 50) errors.push(`승인 민간자격 수가 50개가 아닙니다: ${approved.length}개`);
if (uniq(approved).length !== approved.length) errors.push("APPROVED_PRIVATE_SLUGS에 중복 slug가 있습니다.");

for (const slug of approved) {
  const file = path.join(CERT_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) {
    errors.push(`${slug}: 원본 JSON이 없습니다.`);
    continue;
  }

  let data;
  try {
    data = readJson(file);
  } catch (error) {
    errors.push(`${slug}: JSON 파싱 실패 - ${error.message}`);
    continue;
  }

  for (const enrichment of enrichmentMaps) data = applyExtra(data, enrichment.items[slug]);

  const localErrors = [];
  const localWarnings = [];
  if (data.basic?.slug !== slug) localErrors.push(`basic.slug 불일치 (${data.basic?.slug ?? "없음"})`);
  if (data.basic?.type !== "private") localErrors.push(`basic.type이 private이 아님 (${data.basic?.type ?? "없음"})`);

  const requiredObjects = ["hero", "certificateIntro", "officialInfo", "keyInfo", "studyStrategy", "career", "seo"];
  for (const key of requiredObjects) if (!isObject(data[key])) localErrors.push(`${key} 객체 누락/형식 오류`);

  if (!isText(data.hero?.title) || !isText(data.hero?.subtitle)) localErrors.push("hero title/subtitle 누락");
  if (!isText(data.certificateIntro?.description)) localErrors.push("certificateIntro.description 누락");
  if (!Array.isArray(data.keyInfo?.items) || data.keyInfo.items.length < 4) localErrors.push("keyInfo.items 부족");

  const s = data.studyStrategy;
  if (!isText(s?.summary)) localErrors.push("studyStrategy.summary 누락");
  if (!isText(s?.labookAdvice)) localErrors.push("studyStrategy.labookAdvice 누락");
  for (const key of ["written", "practical"]) {
    if (!isObject(s?.[key]) || !isText(s[key]?.title) || !Array.isArray(s[key]?.items) || s[key].items.length === 0) {
      localErrors.push(`studyStrategy.${key} 필수 구조 누락`);
    }
  }
  for (const key of ["roadmap", "periods", "tips", "failures", "checklist", "resources"]) {
    if (!Array.isArray(s?.[key])) localErrors.push(`studyStrategy.${key} 배열 누락`);
  }

  const si = data.searchIntent;
  if (!isObject(si) || !Array.isArray(si.items) || si.items.length < 2) localWarnings.push("SearchIntent 질문이 2개 미만이거나 없음");
  if (!Array.isArray(si?.relatedKeywords) || si.relatedKeywords.length < 3) localWarnings.push("관련검색어가 3개 미만이거나 없음");

  if (!isText(data.officialInfo?.organization)) localWarnings.push("officialInfo.organization 누락");
  if (!isText(data.trustInfo?.sourceLabel)) localWarnings.push("trustInfo.sourceLabel 누락");
  if (!isText(data.seo?.title) || !isText(data.seo?.description)) localErrors.push("SEO title/description 누락");

  const text = JSON.stringify(data);
  const genericSignals = ["기관별 상이", "등록번호", "민간자격정보서비스"];
  const genericHits = genericSignals.reduce((sum, signal) => sum + (text.split(signal).length - 1), 0);
  if (genericHits > 28) localWarnings.push(`공통 민간자격 문구 반복 신호가 많음 (${genericHits})`);

  errors.push(...localErrors.map((m) => `${slug}: ${m}`));
  warnings.push(...localWarnings.map((m) => `${slug}: ${m}`));
  rows.push({ slug, errors: localErrors.length, warnings: localWarnings.length, searchIntent: si?.items?.length ?? 0, relatedKeywords: si?.relatedKeywords?.length ?? 0 });
}

console.log(`\n[LABOOK 민간자격 index 전수감사] 승인 ${approved.length}개 / 보강파일 ${enrichmentMaps.length}개`);
for (const row of rows) console.log(`${row.errors ? "ERR" : row.warnings ? "WARN" : "OK  "} ${row.slug} | errors=${row.errors} warnings=${row.warnings} intent=${row.searchIntent} keywords=${row.relatedKeywords}`);

if (warnings.length) {
  console.log(`\n경고 ${warnings.length}건`);
  warnings.forEach((m) => console.log(`- ${m}`));
}
if (errors.length) {
  console.error(`\n오류 ${errors.length}건`);
  errors.forEach((m) => console.error(`- ${m}`));
  process.exit(1);
}
console.log(`\n전수감사 통과: 구조 오류 0건, 경고 ${warnings.length}건`);
