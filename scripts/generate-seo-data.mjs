import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CERT_DIR = path.join(ROOT, "data", "certificates");
const OUTPUT_FILE = path.join(ROOT, "data", "generated", "seo-pages.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function strings(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function validDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : undefined;
}

function buildPage(data, fileName) {
  const basic = data.basic ?? {};
  const hero = data.hero ?? {};
  const seo = data.seo ?? {};
  const slug = text(basic.slug) || path.basename(fileName, ".json");
  const name = text(basic.name) || text(hero.title) || slug;
  const shortName = text(basic.shortName) || name;

  const title =
    text(seo.title) ||
    `${name} 시험정보·난이도·합격전략 | 라북`;

  const description =
    text(seo.description) ||
    text(hero.subtitle) ||
    `${name}의 응시자격, 시험과목, 난이도, 준비기간, 합격전략과 취업 활용 정보를 확인하세요.`;

  const keywords = unique([
    ...strings(seo.keywords),
    name,
    shortName,
    `${name} 시험`,
    `${name} 난이도`,
    `${name} 합격률`,
    `${name} 공부기간`,
    text(basic.category),
    text(basic.licenseType),
    text(basic.agency),
  ]);

  const image = text(seo.image) || text(hero.image) || "/images/og/default-og.webp";

  const lastModified =
    validDate(data.update?.lastUpdated) ||
    validDate(data.trustInfo?.lastUpdated) ||
    validDate(data.trustInfo?.lastVerified) ||
    validDate(data.statistics?.source?.lastVerified) ||
    new Date().toISOString().slice(0, 10);

  const faq = Array.isArray(data.faq)
    ? data.faq
        .filter((item) => text(item?.question) && text(item?.answer))
        .map((item) => ({
          question: text(item.question),
          answer: text(item.answer),
        }))
    : [];

  return {
    slug,
    name,
    shortName,
    title,
    description,
    keywords,
    image,
    path: `/cert/${slug}`,
    type: text(basic.type),
    licenseType: text(basic.licenseType),
    category: text(basic.category),
    agency: text(basic.agency),
    lastModified,
    faq,
  };
}

function main() {
  if (!fs.existsSync(CERT_DIR)) {
    console.error(`❌ 자격증 JSON 폴더가 없습니다: ${CERT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CERT_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "ko-KR", { numeric: true }));

  if (!files.length) {
    console.error("❌ SEO 데이터를 만들 자격증 JSON이 없습니다.");
    process.exit(1);
  }

  const items = files.map((file) =>
    buildPage(readJson(path.join(CERT_DIR, file)), file)
  );

  const slugs = new Set();
  for (const item of items) {
    if (slugs.has(item.slug)) {
      console.error(`❌ 중복 slug 발견: ${item.slug}`);
      process.exit(1);
    }
    slugs.add(item.slug);
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
      {
        version: 1,
        generatedAt: new Date().toISOString(),
        total: items.length,
        items,
      },
      null,
      2
    ) + "\n",
    "utf-8"
  );

  console.log("");
  console.log("════════════════════════════════════════════");
  console.log("  라북 V7 SEO 데이터 생성 결과");
  console.log("════════════════════════════════════════════");
  console.log(`SEO 페이지: ${items.length}개`);
  console.log(`생성 파일: ${path.relative(ROOT, OUTPUT_FILE).replaceAll("\\", "/")}`);
  console.log("");
  console.log("✅ SEO 데이터 자동 생성 완료");
  console.log("════════════════════════════════════════════");
  console.log("");
}

main();
