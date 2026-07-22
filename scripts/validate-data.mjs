import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CERT_DIR = path.join(ROOT, "data", "certificates");
const CATALOG_FILE = path.join(ROOT, "data", "catalog", "certificates.json");
const COMPARISON_FILE = path.join(ROOT, "data", "catalog", "comparisons.json");
const RELATED_FILE = path.join(ROOT, "data", "related", "related-certificates.json");

const errors = [];
const warnings = [];

const rel = (file) => path.relative(ROOT, file).replaceAll("\\", "/");
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isText = (v) => typeof v === "string" && v.trim().length > 0;
const addError = (file, message) => errors.push({ file: rel(file), message });
const addWarning = (file, message) => warnings.push({ file: rel(file), message });

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function isUrl(value) {
  if (!isText(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function readJson(file, required = false) {
  if (!fs.existsSync(file)) {
    if (required) addError(file, "필수 JSON 파일이 없습니다.");
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (error) {
    addError(file, `JSON 문법 오류: ${error.message}`);
    return null;
  }
}

function requireObject(parent, key, file, label = key) {
  const value = parent?.[key];
  if (!isObject(value)) {
    addError(file, `${label} 객체가 없거나 형식이 잘못되었습니다.`);
    return null;
  }
  return value;
}

function requireString(parent, key, file, label = key) {
  const value = parent?.[key];
  if (!isText(value)) {
    addError(file, `${label} 값이 없거나 빈 문자열입니다.`);
    return null;
  }
  return value.trim();
}

function validateStringArray(value, file, label, required = false) {
  if (value === undefined && !required) return;
  if (!Array.isArray(value)) {
    addError(file, `${label}은 배열이어야 합니다.`);
    return;
  }
  if (required && value.length === 0) addError(file, `${label} 배열이 비어 있습니다.`);
  value.forEach((item, i) => {
    if (!isText(item)) addError(file, `${label}[${i}]은 비어 있지 않은 문자열이어야 합니다.`);
  });
}

function validateKeyInfo(data, file) {
  const keyInfo = requireObject(data, "keyInfo", file);
  if (!keyInfo) return;
  requireString(keyInfo, "title", file, "keyInfo.title");
  if (!Array.isArray(keyInfo.items) || keyInfo.items.length === 0) {
    addError(file, "keyInfo.items는 하나 이상의 항목을 가진 배열이어야 합니다.");
    return;
  }
  const labels = new Set();
  keyInfo.items.forEach((item, i) => {
    if (!isObject(item)) {
      addError(file, `keyInfo.items[${i}]는 객체여야 합니다.`);
      return;
    }
    const label = requireString(item, "label", file, `keyInfo.items[${i}].label`);
    requireString(item, "value", file, `keyInfo.items[${i}].value`);
    if (label) {
      if (labels.has(label)) addWarning(file, `keyInfo.items에 "${label}" 항목이 중복되어 있습니다.`);
      labels.add(label);
    }
  });
  for (const label of ["현실 난이도", "평균 준비기간", "취업 활용도"]) {
    if (!labels.has(label)) addWarning(file, `keyInfo.items에 권장 항목 "${label}"이 없습니다.`);
  }
}

function validateStatistics(data, file) {
  if (data.statistics === undefined) return;
  if (!isObject(data.statistics)) {
    addError(file, "statistics는 객체여야 합니다.");
    return;
  }
  if (data.statistics.enabled !== undefined && typeof data.statistics.enabled !== "boolean") {
    addError(file, "statistics.enabled는 true 또는 false여야 합니다.");
  }
  if (data.statistics.enabled !== true) return;
  if (!Array.isArray(data.statistics.groups) || data.statistics.groups.length === 0) {
    addError(file, "statistics.enabled가 true이면 groups가 필요합니다.");
    return;
  }
  const ids = new Set();
  data.statistics.groups.forEach((group, gi) => {
    if (!isObject(group)) {
      addError(file, `statistics.groups[${gi}]는 객체여야 합니다.`);
      return;
    }
    const id = requireString(group, "id", file, `statistics.groups[${gi}].id`);
    requireString(group, "title", file, `statistics.groups[${gi}].title`);
    if (id) {
      if (ids.has(id)) addError(file, `statistics.groups id "${id}"가 중복되었습니다.`);
      ids.add(id);
    }
    if (!Array.isArray(group.items) || group.items.length === 0) {
      addError(file, `statistics.groups[${gi}].items가 비어 있습니다.`);
      return;
    }
    const years = new Set();
    group.items.forEach((item, ii) => {
      const label = `statistics.groups[${gi}].items[${ii}]`;
      if (!isObject(item)) {
        addError(file, `${label}는 객체여야 합니다.`);
        return;
      }
      for (const key of ["year", "applicants", "passed", "passRate"]) {
        if (typeof item[key] !== "number" || Number.isNaN(item[key])) addError(file, `${label}.${key}는 숫자여야 합니다.`);
      }
      if (Number.isInteger(item.year)) {
        if (years.has(item.year)) addError(file, `${label}.year ${item.year}가 중복되었습니다.`);
        years.add(item.year);
      }
      if (item.applicants < 0 || item.passed < 0) addError(file, `${label}의 응시자·합격자는 0 이상이어야 합니다.`);
      if (item.passed > item.applicants) addError(file, `${label}.passed가 applicants보다 큽니다.`);
      if (item.passRate < 0 || item.passRate > 100) addError(file, `${label}.passRate는 0~100 사이여야 합니다.`);
      if (item.applicants > 0 && typeof item.passed === "number" && typeof item.passRate === "number") {
        const calculated = Number(((item.passed / item.applicants) * 100).toFixed(1));
        if (Math.abs(calculated - item.passRate) > 0.2) addWarning(file, `${label}.passRate ${item.passRate}%가 계산값 ${calculated}%와 다릅니다.`);
      }
    });
  });
  const source = data.statistics.source;
  if (source !== undefined) {
    if (!isObject(source)) addError(file, "statistics.source는 객체여야 합니다.");
    else {
      if (source.url !== undefined && !isUrl(source.url)) addError(file, "statistics.source.url이 올바른 주소가 아닙니다.");
      if (source.lastVerified !== undefined && !isDate(source.lastVerified)) addError(file, "statistics.source.lastVerified는 YYYY-MM-DD 형식이어야 합니다.");
    }
  }
}

function validateTrustAndUpdate(data, file) {
  if (data.trustInfo === undefined) addWarning(file, "신뢰성 표시를 위한 trustInfo가 없습니다.");
  else if (!isObject(data.trustInfo)) addError(file, "trustInfo는 객체여야 합니다.");
  else {
    requireString(data.trustInfo, "title", file, "trustInfo.title");
    requireString(data.trustInfo, "sourceLabel", file, "trustInfo.sourceLabel");
    if (data.trustInfo.sourceUrl !== undefined && !isUrl(data.trustInfo.sourceUrl)) addError(file, "trustInfo.sourceUrl이 올바른 주소가 아닙니다.");
    for (const key of ["lastVerified", "lastUpdated"]) {
      if (data.trustInfo[key] !== undefined && !isDate(data.trustInfo[key])) addError(file, `trustInfo.${key}는 YYYY-MM-DD 형식이어야 합니다.`);
    }
  }
  if (data.update !== undefined) {
    if (!isObject(data.update)) addError(file, "update는 객체여야 합니다.");
    else {
      requireString(data.update, "version", file, "update.version");
      for (const key of ["lastUpdated", "lastVerified"]) {
        if (!isDate(data.update[key])) addError(file, `update.${key}는 YYYY-MM-DD 형식이어야 합니다.`);
      }
      if (typeof data.update.verified !== "boolean") addError(file, "update.verified는 true 또는 false여야 합니다.");
    }
  }
}

function validateCertificate(file) {
  const data = readJson(file);
  if (!data) return null;
  if (!isObject(data)) {
    addError(file, "최상위 JSON은 객체여야 합니다.");
    return null;
  }
  const fileSlug = path.basename(file, ".json");
  const basic = requireObject(data, "basic", file);
  const hero = requireObject(data, "hero", file);
  if (basic) {
    const slug = requireString(basic, "slug", file, "basic.slug");
    requireString(basic, "name", file, "basic.name");
    requireString(basic, "shortName", file, "basic.shortName");
    requireString(basic, "licenseType", file, "basic.licenseType");
    requireString(basic, "category", file, "basic.category");
    requireString(basic, "agency", file, "basic.agency");
    if (slug && slug !== fileSlug) addError(file, `파일명 "${fileSlug}.json"과 basic.slug "${slug}"가 다릅니다.`);
    if (!["national", "private"].includes(basic.type)) addError(file, 'basic.type은 "national" 또는 "private"이어야 합니다.');
  }
  if (hero) {
    requireString(hero, "title", file, "hero.title");
    requireString(hero, "subtitle", file, "hero.subtitle");
    if (hero.image !== undefined && (!isText(hero.image) || !hero.image.startsWith("/"))) addWarning(file, "hero.image는 /로 시작하는 내부 경로 사용을 권장합니다.");
  }
  validateKeyInfo(data, file);
  validateStatistics(data, file);
  validateTrustAndUpdate(data, file);
  if (data.certificateIntro !== undefined) {
    if (!isObject(data.certificateIntro)) addError(file, "certificateIntro는 객체여야 합니다.");
    else {
      requireString(data.certificateIntro, "title", file, "certificateIntro.title");
      requireString(data.certificateIntro, "description", file, "certificateIntro.description");
      validateStringArray(data.certificateIntro.highlights, file, "certificateIntro.highlights");
    }
  }
  if (data.studyStrategy !== undefined) {
    if (Array.isArray(data.studyStrategy)) {
      validateStringArray(
        data.studyStrategy,
        file,
        "studyStrategy",
        true
      );
    } else if (!isObject(data.studyStrategy)) {
      addError(
        file,
        "studyStrategy는 배열 또는 객체여야 합니다."
      );
    } else {
      requireString(
        data.studyStrategy,
        "summary",
        file,
        "studyStrategy.summary"
      );

      requireString(
        data.studyStrategy,
        "labookAdvice",
        file,
        "studyStrategy.labookAdvice"
      );

      for (const key of ["written", "practical"]) {
        const section = requireObject(
          data.studyStrategy,
          key,
          file,
          `studyStrategy.${key}`
        );

        if (section) {
          requireString(
            section,
            "title",
            file,
            `studyStrategy.${key}.title`
          );

          validateStringArray(
            section.items,
            file,
            `studyStrategy.${key}.items`,
            true
          );
        }
      }

      for (const key of [
        "roadmap",
        "periods",
        "tips",
        "failures",
        "checklist",
        "resources",
      ]) {
        if (!Array.isArray(data.studyStrategy[key])) {
          addError(
            file,
            `studyStrategy.${key}는 배열이어야 합니다.`
          );
        }
      }
    }
  }
  if (data.faq !== undefined) {
    if (!Array.isArray(data.faq)) addError(file, "faq는 배열이어야 합니다.");
    else data.faq.forEach((item, i) => {
      if (!isObject(item)) addError(file, `faq[${i}]는 객체여야 합니다.`);
      else {
        requireString(item, "question", file, `faq[${i}].question`);
        requireString(item, "answer", file, `faq[${i}].answer`);
      }
    });
  }
  if (data.seo === undefined) addWarning(file, "SEO용 seo 객체가 없습니다.");
  else if (!isObject(data.seo)) addError(file, "seo는 객체여야 합니다.");
  else {
    requireString(data.seo, "title", file, "seo.title");
    requireString(data.seo, "description", file, "seo.description");
    validateStringArray(data.seo.keywords, file, "seo.keywords");
  }
  return { slug: basic?.slug ?? fileSlug, name: basic?.name ?? fileSlug };
}

function validateCatalog(certificateMap) {
  const catalog = readJson(CATALOG_FILE);
  if (catalog === null) {
    addWarning(CATALOG_FILE, "V6 catalog 파일이 없어 catalog 검증을 건너뜁니다.");
    return {};
  }
  if (!isObject(catalog)) {
    addError(CATALOG_FILE, "최상위 값은 객체여야 합니다.");
    return {};
  }
  for (const [slug, item] of Object.entries(catalog)) {
    if (!isObject(item)) {
      addError(CATALOG_FILE, `${slug} 항목은 객체여야 합니다.`);
      continue;
    }
    requireString(item, "name", CATALOG_FILE, `${slug}.name`);
    if (item.type !== undefined && !["national", "private"].includes(item.type)) addError(CATALOG_FILE, `${slug}.type 형식이 잘못되었습니다.`);
    const cert = certificateMap.get(slug);
    if (cert && item.name !== cert.name) addWarning(CATALOG_FILE, `${slug}.name이 상세 JSON 이름과 다릅니다. 상세 JSON이 우선됩니다.`);
  }
  return catalog;
}

function validateComparisons() {
  const comparisons = readJson(COMPARISON_FILE);
  if (comparisons === null) {
    addWarning(COMPARISON_FILE, "V6 comparisons 파일이 없어 비교 검증을 건너뜁니다.");
    return {};
  }
  if (!isObject(comparisons)) {
    addError(COMPARISON_FILE, "최상위 값은 객체여야 합니다.");
    return {};
  }
  for (const [slug, item] of Object.entries(comparisons)) {
    if (!isObject(item)) addError(COMPARISON_FILE, `${slug} 항목은 객체여야 합니다.`);
    else {
      if (typeof item.enabled !== "boolean") addError(COMPARISON_FILE, `${slug}.enabled는 true 또는 false여야 합니다.`);
      if (item.label !== undefined && !isText(item.label)) addError(COMPARISON_FILE, `${slug}.label은 빈 문자열일 수 없습니다.`);
    }
  }
  return comparisons;
}

function validateRelated(certificateMap, catalog, comparisons) {
  const related = readJson(RELATED_FILE);
  if (related === null) {
    addWarning(RELATED_FILE, "V6 related 파일이 없어 관련 자격증 검증을 건너뜁니다.");
    return;
  }
  if (!isObject(related)) {
    addError(RELATED_FILE, "최상위 값은 객체여야 합니다.");
    return;
  }
  const known = new Set([...certificateMap.keys(), ...Object.keys(catalog)]);
  for (const [sourceSlug, relations] of Object.entries(related)) {
    if (!known.has(sourceSlug)) addError(RELATED_FILE, `기준 자격증 "${sourceSlug}"가 상세 JSON과 catalog 어디에도 없습니다.`);
    if (!Array.isArray(relations)) {
      addError(RELATED_FILE, `${sourceSlug} 값은 배열이어야 합니다.`);
      continue;
    }
    const seen = new Set();
    relations.forEach((raw, i) => {
      const label = `${sourceSlug}[${i}]`;
      const relation = typeof raw === "string" ? { slug: raw } : raw;
      if (!isObject(relation)) {
        addError(RELATED_FILE, `${label}는 slug 문자열 또는 객체여야 합니다.`);
        return;
      }
      const target = requireString(relation, "slug", RELATED_FILE, `${label}.slug`);
      if (!target) return;
      if (target === sourceSlug) addError(RELATED_FILE, `${label}에서 자기 자신을 연결했습니다.`);
      if (seen.has(target)) addError(RELATED_FILE, `${sourceSlug}에 "${target}"가 중복 등록되었습니다.`);
      seen.add(target);
      if (!known.has(target)) addError(RELATED_FILE, `${label}의 대상 "${target}"가 상세 JSON과 catalog 어디에도 없습니다.`);
      if (relation.compareSlug !== undefined && !isText(relation.compareSlug)) addError(RELATED_FILE, `${label}.compareSlug가 빈 문자열입니다.`);
      if (isText(relation.compareSlug) && !Object.hasOwn(comparisons, relation.compareSlug)) addError(RELATED_FILE, `${label}.compareSlug "${relation.compareSlug}"가 comparisons.json에 없습니다.`);
    });
  }
}

function printResult(count) {
  console.log("\n════════════════════════════════════════════");
  console.log("  라북 V7 JSON 검증 결과");
  console.log("════════════════════════════════════════════");
  console.log(`검사한 자격증 JSON: ${count}개`);
  console.log(`오류: ${errors.length}개`);
  console.log(`경고: ${warnings.length}개\n`);
  if (errors.length) {
    console.log("❌ 오류");
    errors.forEach((x, i) => console.log(`${i + 1}. [${x.file}] ${x.message}`));
    console.log("");
  }
  if (warnings.length) {
    console.log("⚠️ 경고");
    warnings.forEach((x, i) => console.log(`${i + 1}. [${x.file}] ${x.message}`));
    console.log("");
  }
  console.log(errors.length ? "🛑 검증 실패: 오류를 수정한 뒤 다시 실행하세요." : "✅ 필수 검증 통과: 빌드와 배포를 진행할 수 있습니다.");
  console.log("════════════════════════════════════════════\n");
}

function main() {
  if (!fs.existsSync(CERT_DIR)) {
    addError(CERT_DIR, "자격증 JSON 폴더가 없습니다.");
    printResult(0);
    process.exit(1);
  }
  const files = fs.readdirSync(CERT_DIR).filter((x) => x.endsWith(".json")).sort().map((x) => path.join(CERT_DIR, x));
  if (!files.length) addError(CERT_DIR, "검사할 자격증 JSON이 없습니다.");
  const certificateMap = new Map();
  for (const file of files) {
    const summary = validateCertificate(file);
    if (!summary) continue;
    if (certificateMap.has(summary.slug)) addError(file, `basic.slug "${summary.slug}"가 다른 파일과 중복됩니다.`);
    certificateMap.set(summary.slug, summary);
  }
  const catalog = validateCatalog(certificateMap);
  const comparisons = validateComparisons();
  validateRelated(certificateMap, catalog, comparisons);
  printResult(files.length);
  process.exit(errors.length ? 1 : 0);
}

main();
