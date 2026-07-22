import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CERT_DIR = path.join(ROOT, "data", "certificates");
const OUTPUT_DIR = path.join(ROOT, "public", "data");
const INDEX_FILE = path.join(OUTPUT_DIR, "search-index.json");
const SUGGESTION_FILE = path.join(OUTPUT_DIR, "search-suggestions.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[·ㆍ・]/g, "")
    .replace(/[()\[\]{}"'`~!@#$%^&*_=+|\\/:;,.?<>-]/g, "");
}

function collectNestedStrings(value, result = []) {
  if (typeof value === "string") {
    if (value.trim()) result.push(value.trim());
    return result;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectNestedStrings(item, result);
    return result;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectNestedStrings(item, result);
  }

  return result;
}

function buildAliases(data) {
  const basic = data.basic ?? {};
  const seo = data.seo ?? {};

  const direct = [
    text(basic.name),
    text(basic.shortName),
    text(basic.slug),
    text(basic.licenseType),
    text(basic.category),
    text(basic.agency),
    ...stringArray(basic.aliases),
    ...stringArray(seo.keywords),
    ...stringArray(data.searchKeywords),
  ];

  const compactName = text(basic.name).replace(/\s+/g, "");
  const compactShortName = text(basic.shortName).replace(/\s+/g, "");

  return unique([
    ...direct,
    compactName,
    compactShortName,
  ]);
}

function makeItem(data, fileName) {
  const basic = data.basic ?? {};
  const hero = data.hero ?? {};
  const intro = data.certificateIntro ?? {};
  const seo = data.seo ?? {};
  const keyInfoItems = Array.isArray(data.keyInfo?.items) ? data.keyInfo.items : [];

  const slug = text(basic.slug) || path.basename(fileName, ".json");
  const name = text(basic.name) || text(hero.title) || slug;
  const shortName = text(basic.shortName) || name;
  const aliases = buildAliases(data);

  const keyInfo = keyInfoItems
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      label: text(item.label),
      value: text(item.value),
    }))
    .filter((item) => item.label && item.value);

  const searchableSource = unique([
    name,
    shortName,
    text(basic.licenseType),
    text(basic.category),
    text(basic.agency),
    text(hero.subtitle),
    text(intro.title),
    text(intro.description),
    text(seo.title),
    text(seo.description),
    ...aliases,
    ...keyInfo.flatMap((item) => [item.label, item.value]),
    ...collectNestedStrings(data.realityGuide),
    ...collectNestedStrings(data.exam),
    ...collectNestedStrings(data.career),
    ...collectNestedStrings(data.benefits),
  ]);

  return {
    id: slug,
    slug,
    name,
    shortName,
    type: text(basic.type),
    licenseType: text(basic.licenseType),
    category: text(basic.category),
    agency: text(basic.agency),
    description:
      text(seo.description) ||
      text(hero.subtitle) ||
      text(intro.description),
    image: text(hero.image),
    href: `/certificates/${slug}`,
    aliases,
    keyInfo,
    searchText: searchableSource.join(" "),
    normalizedSearchText: normalize(searchableSource.join(" ")),
  };
}

function makeSuggestions(items) {
  const suggestions = [];

  for (const item of items) {
    suggestions.push({
      label: item.name,
      value: item.name,
      slug: item.slug,
      href: item.href,
      type: "certificate",
      category: item.category,
    });

    if (item.shortName && item.shortName !== item.name) {
      suggestions.push({
        label: item.shortName,
        value: item.shortName,
        slug: item.slug,
        href: item.href,
        type: "alias",
        category: item.category,
      });
    }

    for (const alias of item.aliases) {
      if (alias !== item.name && alias !== item.shortName && alias.length >= 2) {
        suggestions.push({
          label: alias,
          value: alias,
          slug: item.slug,
          href: item.href,
          type: "alias",
          category: item.category,
        });
      }
    }
  }

  const seen = new Set();

  return suggestions
    .filter((item) => {
      const key = `${normalize(item.value)}::${item.slug}`;
      if (!normalize(item.value) || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) =>
      a.value.localeCompare(b.value, "ko-KR", { numeric: true })
    );
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(value, null, 2)}\n`,
    "utf-8"
  );
}

function main() {
  if (!fs.existsSync(CERT_DIR)) {
    console.error(`❌ 자격증 JSON 폴더가 없습니다: ${CERT_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(CERT_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "ko-KR", { numeric: true }));

  if (files.length === 0) {
    console.error("❌ 검색 인덱스를 만들 자격증 JSON이 없습니다.");
    process.exit(1);
  }

  const items = files.map((fileName) =>
    makeItem(readJson(path.join(CERT_DIR, fileName)), fileName)
  );

  const slugSet = new Set();

  for (const item of items) {
    if (slugSet.has(item.slug)) {
      console.error(`❌ 중복 slug 발견: ${item.slug}`);
      process.exit(1);
    }
    slugSet.add(item.slug);
  }

  items.sort((a, b) =>
    a.name.localeCompare(b.name, "ko-KR", { numeric: true })
  );

  const suggestions = makeSuggestions(items);
  const generatedAt = new Date().toISOString();

  writeJson(INDEX_FILE, {
    version: 1,
    generatedAt,
    total: items.length,
    items,
  });

  writeJson(SUGGESTION_FILE, {
    version: 1,
    generatedAt,
    total: suggestions.length,
    items: suggestions,
  });

  console.log("");
  console.log("════════════════════════════════════════════");
  console.log("  라북 V7 검색 인덱스 생성 결과");
  console.log("════════════════════════════════════════════");
  console.log(`자격증 인덱스: ${items.length}개`);
  console.log(`검색 제안어: ${suggestions.length}개`);
  console.log(`생성 파일: ${path.relative(ROOT, INDEX_FILE).replaceAll("\\", "/")}`);
  console.log(`생성 파일: ${path.relative(ROOT, SUGGESTION_FILE).replaceAll("\\", "/")}`);
  console.log("");
  console.log("✅ 검색 인덱스 자동 생성 완료");
  console.log("════════════════════════════════════════════");
  console.log("");
}

main();
