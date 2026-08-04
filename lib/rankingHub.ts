import fs from "node:fs";
import path from "node:path";

export type RankingCertificate = {
  slug: string;
  name: string;
  shortName: string;
  type: "national" | "private";
  licenseType: string;
  category: string;
  agency: string;
  difficultyText: string;
  studyPeriodText: string;
  usefulnessText: string;
  eligibilityText: string;
  eligibilityStatus: "none" | "conditional" | "restricted" | "unknown";
  textCorpus: string;
  scores: {
    employment: number | null;
    beginner: number | null;
    difficulty: number | null;
    shortTerm: number | null;
    investmentEfficiency: number | null;
    independence: number | null;
    longTermValue: number | null;
  };
  studyMonths: number | null;
  statistics: {
    latestYear: number | null;
    applicants: number | null;
    passed: number | null;
    passRate: number | null;
    sourceLabel: string | null;
    lastVerified: string | null;
  };
  relatedSlugs: string[];
};

type RawCertificate = {
  basic?: { slug?: string; name?: string; shortName?: string; type?: "national" | "private"; licenseType?: string; category?: string; agency?: string };
  eligibility?: { status?: "none" | "conditional" | "restricted"; statusLabel?: string; summary?: string };
  keyInfo?: { items?: { label?: string; value?: string; note?: string }[] };
  statistics?: { enabled?: boolean; groups?: { id?: string; title?: string; items?: { year: number; applicants: number; passed: number; passRate: number }[] }[]; source?: { label?: string; url?: string; lastVerified?: string } };
  career?: { summary?: string; sections?: { title?: string; items?: { label?: string; description?: string }[] }[] };
  realityGuide?: { recommendedFor?: string[]; reconsiderIf?: string[] };
  studyStrategy?: { summary?: string; sections?: { title?: string; items?: string[] }[] };
  relatedCertificates?: (string | { slug?: string; name?: string })[];
  related?: (string | { slug?: string; name?: string })[];
};

const CERT_ROOT = path.join(process.cwd(), "data", "certificates");

function files(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) return files(target);
    return entry.isFile() && entry.name.endsWith(".json") ? [target] : [];
  });
}
function read<T>(file: string): T | null {
  try { return JSON.parse(fs.readFileSync(file, "utf-8")) as T; }
  catch (error) { console.error(`랭킹 데이터 읽기 실패: ${file}`, error); return null; }
}
function keyValue(c: RawCertificate, keys: string[], fallback = "정보 확인 필요") {
  return c.keyInfo?.items?.find((item) => keys.some((key) => (item.label || "").replace(/\s/g, "").includes(key)))?.value || fallback;
}
function clamp(n: number) { return Math.min(100, Math.max(0, Math.round(n))); }
function norm(s: string) { return s.replace(/\s+/g, "").toLowerCase(); }
function five(value: string, kind: "difficulty" | "usefulness") {
  const t = norm(value); const stars = value.match(/★/g)?.length;
  if (stars && stars >= 1 && stars <= 5) return stars;
  if (kind === "difficulty") {
    if (/매우어려|최상|극상/.test(t)) return 5; if (/어려|상급|높음/.test(t)) return 4;
    if (/보통|중급/.test(t)) return 3; if (/쉬움|낮음|초급/.test(t)) return 2; if (/매우쉬|입문/.test(t)) return 1;
  } else {
    if (/매우높|최상|탁월|필수/.test(t)) return 5; if (/높음|높다|우수|활발|유리/.test(t)) return 4;
    if (/보통|중간|일반/.test(t)) return 3; if (/낮음|제한적|일부/.test(t)) return 2; if (/매우낮|거의없/.test(t)) return 1;
  }
  return null;
}
function months(value: string) {
  const nums = [...value.replace(/,/g, "").matchAll(/(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  if (!nums.length) return null; const avg = nums.length > 1 ? (nums[0]+nums[1])/2 : nums[0];
  if (/년/.test(value)) return avg*12; if (/주/.test(value)) return avg/4.345; if (/일/.test(value)) return avg/30; if (/개월|달|월/.test(value)) return avg; return null;
}
function latest(c: RawCertificate) {
  const all = c.statistics?.groups?.flatMap((g) => g.items ?? []) ?? [];
  if (!all.length) return { latestYear:null, applicants:null, passed:null, passRate:null, sourceLabel:c.statistics?.source?.label??null, lastVerified:c.statistics?.source?.lastVerified??null };
  const year=Math.max(...all.map((i)=>i.year)); const rows=all.filter((i)=>i.year===year);
  const applicants=rows.reduce((s,i)=>s+Math.max(0,i.applicants||0),0); const passed=rows.reduce((s,i)=>s+Math.max(0,i.passed||0),0);
  const rate=applicants>0?Number(((passed/applicants)*100).toFixed(1)):Number((rows.reduce((s,i)=>s+(i.passRate||0),0)/rows.length).toFixed(1));
  return { latestYear:year, applicants:applicants||null, passed:passed||null, passRate:rate, sourceLabel:c.statistics?.source?.label??null, lastVerified:c.statistics?.source?.lastVerified??null };
}
function corpus(c: RawCertificate) {
  return [c.basic?.name,c.basic?.category,c.basic?.licenseType,c.basic?.agency,c.eligibility?.summary,c.eligibility?.statusLabel,
    ...(c.keyInfo?.items??[]).flatMap((i)=>[i.label,i.value,i.note]), c.career?.summary,
    ...(c.career?.sections??[]).flatMap((s)=>[s.title,...(s.items??[]).flatMap((i)=>[i.label,i.description])]),
    ...(c.realityGuide?.recommendedFor??[]), ...(c.realityGuide?.reconsiderIf??[]), c.studyStrategy?.summary,
    ...(c.studyStrategy?.sections??[]).flatMap((s)=>[s.title,...(s.items??[])])].filter(Boolean).join(" ");
}
function related(c: RawCertificate) {
  return Array.from(new Set([...(c.relatedCertificates??[]),...(c.related??[])].map((x)=>typeof x==="string"?x:x.slug||"").filter(Boolean)));
}
function toItem(c: RawCertificate): RankingCertificate | null {
  const slug=c.basic?.slug,name=c.basic?.name; if(!slug||!name) return null;
  const difficultyText=keyValue(c,["난이도"]), studyPeriodText=keyValue(c,["공부기간","준비기간","학습기간"]), usefulnessText=keyValue(c,["활용도","취업","전망"]);
  const d=five(difficultyText,"difficulty"), u=five(usefulnessText,"usefulness"), m=months(studyPeriodText);
  const careerCount=c.career?.sections?.reduce((s,x)=>s+(x.items?.length??0),0)??0, recCount=c.realityGuide?.recommendedFor?.length??0;
  const employment=u===null?null:clamp(u*16+Math.min(careerCount,6)*2+Math.min(recCount,5));
  const beginner=(d===null&&m===null)?null:clamp((d===null?45:((6-d)/5)*55)+(m===null?25:m<=1?30:m<=2?26:m<=3?22:m<=6?15:8)+(c.eligibility?.status==="none"?15:c.eligibility?.status==="conditional"?8:c.eligibility?.status==="restricted"?2:6));
  const shortTerm=m===null?null:clamp(100-Math.min(90,m*12));
  const independence=d===null?null:clamp(100-d*12+(m!==null&&m<=3?15:0));
  const investment=(employment===null||m===null)?null:clamp(employment-(Math.min(m,12)*3)+(c.eligibility?.status==="none"?8:0));
  const longTerm=employment===null?null:clamp(employment+(c.basic?.type==="national"?8:0)+Math.min(careerCount,5));
  return {slug,name,shortName:c.basic?.shortName||name,type:c.basic?.type||"national",licenseType:c.basic?.licenseType||"자격정보",category:c.basic?.category||"기타",agency:c.basic?.agency||"시행기관 확인 필요",difficultyText,studyPeriodText,usefulnessText,eligibilityText:c.eligibility?.statusLabel||c.eligibility?.summary||keyValue(c,["응시자격"]),eligibilityStatus:c.eligibility?.status||"unknown",textCorpus:corpus(c),scores:{employment,beginner,difficulty:d===null?null:d*20,shortTerm,investmentEfficiency:investment,independence,longTermValue:longTerm},studyMonths:m,statistics:latest(c),relatedSlugs:related(c)};
}
export function getRankingCertificates(): RankingCertificate[] {
  return files(CERT_ROOT).map((f)=>read<RawCertificate>(f)).filter((x):x is RawCertificate=>Boolean(x)).map(toItem).filter((x):x is RankingCertificate=>Boolean(x)).sort((a,b)=>a.name.localeCompare(b.name,"ko-KR"));
}
