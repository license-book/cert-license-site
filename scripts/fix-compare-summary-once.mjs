import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "components", "CertificateCompare.tsx");
const source = fs.readFileSync(file, "utf8");
const before = '? `${left.shortName}은 ${left.category} 분야, ${right.shortName}은 ${right.category} 분야를 목표로 할 때 선택하는 자격증입니다.`';
const after = '? `${left.shortName}: ${left.category} 분야, ${right.shortName}: ${right.category} 분야를 목표로 할 때 비교해볼 수 있습니다.`';

if (!source.includes(before)) {
  throw new Error("비교 요약문 대상 문자열을 찾지 못했습니다.");
}

fs.writeFileSync(file, source.replace(before, after), "utf8");
console.log("Compare fallback summary patched.");
