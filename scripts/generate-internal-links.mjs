import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CERT_DIR = path.join(ROOT, "data", "certificates");
const CATALOG_FILE = path.join(ROOT, "data", "catalog", "certificates.json");
const COMPARISON_FILE = path.join(ROOT, "data", "catalog", "comparisons.json");
const MANUAL_RELATED_FILE = path.join(
  ROOT,
  "data",
  "related",
  "related-certificates.json"
);
const OUTPUT_FILE = path.join(
  ROOT,
  "data",
  "generated",
  "internal-links.json"
);

const MAX_RELATED = 4;

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readJson(filePath, fallback = {}) {
  if (!exists(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(value, null, 2)}\n`,
    "utf-8"
  );
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeRelation(value) {
  if (typeof value === "string") return { slug: value };
  if (value && typeof value === "object") return { ...value };
  return null;
}

function loadCertificates() {
  if (!exists(CERT_DIR)) {
    throw new Error(`자격증 JSON 폴더가 없습니다: ${CERT_DIR}`);
  }

  const files = fs
    .readdirSync(CERT_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "ko-KR", { numeric: true }));

  const certificates = new Map();

  for (const fileName of files) {
    const filePath = path.join(CERT_DIR, fileName);
    const data = readJson(filePath, null);
    if (!data) continue;

    const basic = data.basic ?? {};
    const slug = clean(basic.slug) || path.basename(fileName, ".json");

    certificates.set(slug, {
      slug,
      name: clean(basic.name) || clean(data.hero?.title) || slug,
      shortName: clean(basic.shortName),
      type: clean(basic.type),
      licenseType: clean(basic.licenseType),
      category: clean(basic.category),
      agency: clean(basic.agency),
      detailReady: true,
    });
  }

  return certificates;
}

function mergeCatalog(certificates, catalog) {
  const all = new Map(certificates);

  for (const [slug, item] of Object.entries(catalog)) {
    const current = all.get(slug) ?? {
      slug,
      detailReady: false,
    };

    all.set(slug, {
      slug,
      name: current.name || clean(item?.name) || slug,
      shortName: current.shortName || clean(item?.shortName),
      type: current.type || clean(item?.type),
      licenseType: current.licenseType || clean(item?.licenseType),
      category: current.category || clean(item?.category),
      agency: current.agency || clean(item?.agency),
      relatedTag: clean(item?.relatedTag),
      detailReady: current.detailReady === true,
    });
  }

  return all;
}

function scoreCandidate(source, target) {
  let score = 0;
  const reasons = [];

  if (source.category && source.category === target.category) {
    score += 50;
    reasons.push("같은 카테고리");
  }

  if (source.type && source.type === target.type) {
    score += 20;
    reasons.push("같은 자격 유형");
  }

  if (source.licenseType && source.licenseType === target.licenseType) {
    score += 15;
    reasons.push("같은 자격 종류");
  }

  if (source.agency && source.agency === target.agency) {
    score += 10;
    reasons.push("같은 시행기관");
  }

  if (target.detailReady) {
    score += 5;
  }

  return { score, reasons };
}

function findComparison(sourceSlug, targetSlug, comparisons) {
  const direct = [
    `${sourceSlug}-vs-${targetSlug}`,
    `${targetSlug}-vs-${sourceSlug}`,
  ];

  for (const compareSlug of direct) {
    if (comparisons[compareSlug]) {
      return {
        compareSlug,
        compareLabel:
          clean(comparisons[compareSlug].label) || "비교하기",
      };
    }
  }

  for (const [compareSlug, item] of Object.entries(comparisons)) {
    const normalized = compareSlug.toLowerCase();

    if (
      normalized.includes(sourceSlug.toLowerCase()) &&
      normalized.includes(targetSlug.toLowerCase())
    ) {
      return {
        compareSlug,
        compareLabel: clean(item?.label) || "비교하기",
      };
    }
  }

  return {};
}

function buildTag(target, scoreInfo) {
  if (target.relatedTag) return target.relatedTag;
  if (scoreInfo.reasons.includes("같은 카테고리")) return "같은 분야";
  if (scoreInfo.reasons.includes("같은 자격 유형")) return "같은 유형";
  return target.category || target.licenseType || "관련 자격증";
}

function buildRelations(source, allCertificates, manualMap, comparisons) {
  const result = [];
  const seen = new Set();

  const manualRelations = Array.isArray(manualMap[source.slug])
    ? manualMap[source.slug]
    : [];

  for (const raw of manualRelations) {
    const relation = normalizeRelation(raw);
    if (!relation?.slug) continue;
    if (relation.slug === source.slug || seen.has(relation.slug)) continue;

    seen.add(relation.slug);
    result.push({
      ...relation,
      source: "manual",
    });

    if (result.length >= MAX_RELATED) return result;
  }

  const candidates = [...allCertificates.values()]
    .filter((target) => target.slug !== source.slug && !seen.has(target.slug))
    .map((target) => ({
      target,
      ...scoreCandidate(source, target),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.target.detailReady !== b.target.detailReady) {
        return a.target.detailReady ? -1 : 1;
      }
      return a.target.name.localeCompare(b.target.name, "ko-KR", {
        numeric: true,
      });
    });

  for (const candidate of candidates) {
    const comparison = findComparison(
      source.slug,
      candidate.target.slug,
      comparisons
    );

    result.push({
      slug: candidate.target.slug,
      tag: buildTag(candidate.target, candidate),
      ...comparison,
      source: "auto",
      score: candidate.score,
    });

    seen.add(candidate.target.slug);

    if (result.length >= MAX_RELATED) break;
  }

  return result;
}

function main() {
  const certificates = loadCertificates();
  const catalog = readJson(CATALOG_FILE, {});
  const comparisons = readJson(COMPARISON_FILE, {});
  const manualMap = readJson(MANUAL_RELATED_FILE, {});
  const allCertificates = mergeCatalog(certificates, catalog);

  const generated = {};
  let manualCount = 0;
  let autoCount = 0;

  for (const source of certificates.values()) {
    const relations = buildRelations(
      source,
      allCertificates,
      manualMap,
      comparisons
    );

    generated[source.slug] = relations.map((relation) => {
      if (relation.source === "manual") manualCount += 1;
      if (relation.source === "auto") autoCount += 1;
      return relation;
    });
  }

  const output = {
    version: 1,
    generatedAt: new Date().toISOString(),
    maxRelatedPerCertificate: MAX_RELATED,
    totals: {
      certificates: certificates.size,
      manualLinks: manualCount,
      autoLinks: autoCount,
      allLinks: manualCount + autoCount,
    },
    items: generated,
  };

  writeJson(OUTPUT_FILE, output);

  console.log("");
  console.log("════════════════════════════════════════════");
  console.log("  라북 V7 내부 링크 생성 결과");
  console.log("════════════════════════════════════════════");
  console.log(`자격증: ${certificates.size}개`);
  console.log(`수동 링크: ${manualCount}개`);
  console.log(`자동 링크: ${autoCount}개`);
  console.log(`전체 링크: ${manualCount + autoCount}개`);
  console.log(
    `생성 파일: ${path.relative(ROOT, OUTPUT_FILE).replaceAll("\\", "/")}`
  );
  console.log("");
  console.log("✅ 내부 링크 자동 생성 완료");
  console.log("════════════════════════════════════════════");
  console.log("");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(`❌ 내부 링크 생성 실패: ${error.message}`);
  process.exit(1);
}
