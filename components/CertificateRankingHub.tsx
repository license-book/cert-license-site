"use client";

import AdSlot from "@/components/common/AdSlot";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RankingCertificate } from "@/lib/rankingHub";

type Props={items:RankingCertificate[]};
type GroupKey="popular"|"exam"|"career"|"audience"|"category"|"labook";
type SortKey="employment"|"applicants"|"passRateHigh"|"passRateLow"|"difficultyHigh"|"difficultyLow"|"shortTerm"|"beginner"|"noEligibility"|"office"|"publicCompany"|"itCareer"|"technical"|"startup"|"freelance"|"worker"|"student"|"nonMajor"|"middleAge"|"investment"|"independence"|"longTerm"|"categoryAuto";
type TypeFilter="all"|"national"|"private";

type Definition={key:SortKey;group:GroupKey;label:string;description:string;basis:string;official:boolean;keywords?:string[];placeholder?:boolean};
const GROUPS:[GroupKey,string,string][]=[
  ["popular","인기","응시 규모와 이용 데이터"],["exam","시험","합격률·난이도·기간"],["career","취업","직무와 진로 활용"],
  ["audience","대상별 추천","상황과 준비 조건"],["category","분야별","등록 분야 자동 생성"],["labook","라북 추천","효율과 장기 가치"],
];
const DEFS:Definition[]=[
 {key:"applicants",group:"popular",label:"응시자 수 TOP",description:"최근 등록 공식 통계의 응시자 수 기준입니다.",basis:"공식 통계",official:true},
 {key:"employment",group:"popular",label:"인기·취업 활용도",description:"활용도와 진로 데이터를 종합한 참고 순위입니다.",basis:"라북 편집 기준",official:false},
 {key:"passRateHigh",group:"exam",label:"합격률 높은 순",description:"최근 등록 통계의 가중 합격률입니다.",basis:"공식 통계",official:true},
 {key:"passRateLow",group:"exam",label:"합격률 낮은 순",description:"최근 등록 통계 중 낮은 합격률부터 표시합니다.",basis:"공식 통계",official:true},
 {key:"difficultyHigh",group:"exam",label:"난이도 높은 순",description:"JSON 난이도 표현을 공통 점수로 환산합니다.",basis:"라북 편집 기준",official:false},
 {key:"difficultyLow",group:"exam",label:"난이도 낮은 순",description:"입문 접근성이 높은 자격증부터 표시합니다.",basis:"라북 편집 기준",official:false},
 {key:"shortTerm",group:"exam",label:"준비기간 짧은 순",description:"JSON의 예상 준비기간이 짧은 순입니다.",basis:"등록 데이터",official:false},
 {key:"office",group:"career",label:"사무직 추천",description:"사무·회계·OA·행정 관련 문구가 있는 자격증입니다.",basis:"자동 키워드 분류",official:false,keywords:["사무","oa","오피스","회계","세무","행정","엑셀","문서"]},
 {key:"publicCompany",group:"career",label:"공기업 추천",description:"공기업·공공기관·가산점 관련 정보가 있는 자격증입니다.",basis:"자동 키워드 분류",official:false,keywords:["공기업","공공기관","가산점","공무원"]},
 {key:"itCareer",group:"career",label:"IT 취업 추천",description:"IT·개발·데이터·정보통신 분야 자격증입니다.",basis:"분야·키워드 자동 분류",official:false,keywords:["it","정보처리","개발","데이터","네트워크","컴퓨터","소프트웨어","정보통신"]},
 {key:"technical",group:"career",label:"기술직 추천",description:"전기·기계·건설·안전 등 기술 현장 분야입니다.",basis:"분야·키워드 자동 분류",official:false,keywords:["전기","기계","건설","토목","건축","안전","산업","설비","용접"]},
 {key:"startup",group:"career",label:"창업 추천",description:"창업·개업·사업 운영과 연결된 자격증입니다.",basis:"자동 키워드 분류",official:false,keywords:["창업","개업","사업","공방","매장","프랜차이즈"]},
 {key:"freelance",group:"career",label:"프리랜서 추천",description:"콘텐츠 제작·디자인·마케팅·강의·운동지도 등 개인 활동과 외주 수익화에 활용하기 좋은 자격증입니다.",basis:"라북 추천 + 자동 분류",official:false,keywords:["프리랜서","강사","상담","코칭","콘텐츠","외주","마케팅","디자인","크리에이터","지도사"]},
 {key:"beginner",group:"audience",label:"초보자 추천",description:"난이도·준비기간·응시 제한을 종합합니다.",basis:"라북 편집 기준",official:false},
 {key:"noEligibility",group:"audience",label:"응시자격 제한 없음",description:"응시자격 상태가 제한 없음으로 등록된 자격증입니다.",basis:"등록 데이터",official:false},
 {key:"worker",group:"audience",label:"직장인 추천",description:"단기·독학 가능성과 직장인 관련 문구를 종합합니다.",basis:"자동 편집 기준",official:false,keywords:["직장인","퇴근","주말","병행"]},
 {key:"student",group:"audience",label:"대학생 추천",description:"대학생·취업준비·학점 관련 문구가 있는 자격증입니다.",basis:"자동 키워드 분류",official:false,keywords:["대학생","취업준비","취준","학점","재학생"]},
 {key:"nonMajor",group:"audience",label:"비전공자 추천",description:"비전공자·입문자·응시 제한 없음 정보를 반영합니다.",basis:"자동 편집 기준",official:false,keywords:["비전공","입문","초보"]},
 {key:"middleAge",group:"audience",label:"중장년·재취업 추천",description:"재취업 접근성, 현장 활용, 자영업·상담·복지·생활서비스 확장성을 고려한 추천입니다.",basis:"라북 추천 + 자동 분류",official:false,keywords:["중장년","재취업","은퇴","제2의직업","경력전환","복지","상담","부동산","조리","실버"]},
 {key:"categoryAuto",group:"category",label:"분야별 TOP",description:"JSON의 category 값으로 분야를 자동 생성합니다.",basis:"분야 자동 분류",official:false},
 {key:"investment",group:"labook",label:"투자 대비 효율",description:"취업 활용도 대비 준비기간과 응시 제한을 종합합니다.",basis:"라북 편집 기준",official:false},
 {key:"independence",group:"labook",label:"독학하기 쉬운 순",description:"난이도와 준비기간을 기준으로 독학 접근성을 추정합니다.",basis:"라북 편집 기준",official:false},
 {key:"longTerm",group:"labook",label:"장기 활용 가치",description:"활용도와 진로 폭, 국가자격 여부를 종합한 참고 순위입니다.",basis:"라북 편집 기준",official:false},
];


const CURATED_SLUGS: Partial<Record<SortKey, string[]>> = {
  middleAge: [
    "licensed-real-estate-agent","housing-manager-assistant","vocational-counselor-level-2",
    "social-worker-level-1","forklift-truck-operator-craftsman","korean-cuisine-craftsman",
    "western-cuisine-craftsman","chinese-cuisine-craftsman","japanese-cuisine-craftsman",
    "barista","home-organizing-specialist","horticultural-therapy-specialist",
    "senior-psychology-counselor","senior-psychology-activity-instructor",
    "dementia-prevention-instructor","senior-exercise-instructor","silver-recreation-instructor",
    "silver-leisure-instructor","silver-laughter-instructor","silver-cognitive-play-instructor"
  ],
  freelance: [
    "content-creator","video-editing-specialist","short-form-content-specialist",
    "web-design-specialist","calligraphy-instructor","illustration-specialist",
    "sns-marketing-specialist","online-marketing-specialist","blog-marketing-specialist",
    "youtube-marketing-specialist","personal-branding-specialist","smart-store-specialist",
    "shopping-mall-manager","ecommerce-manager","coding-instructor","presentation-specialist",
    "personal-color-consultant","pilates-instructor","yoga-instructor","fitness-trainer"
  ]
};

function isCurated(item: RankingCertificate, key: SortKey) {
  return CURATED_SLUGS[key]?.includes(item.slug) ?? false;
}


const CATEGORY_GROUPS: Record<string, string[]> = {
  "IT·디지털": ["IT·사무","IT·개발","IT·보안","데이터·IT","IT·AI","정보통신"],
  "전기·전자·자동화": ["전기·전자","스마트제조·자동화"],
  "기계·자동차·제조": ["기계","기계·금속","기계·설비","기계·자동차","기계·건설기계","운전·건설기계"],
  "건설·토목·부동산": ["건설·토목","건설·건축","건설·측량","부동산·중개","부동산·주택관리"],
  "안전·소방·환경·에너지": ["화학·안전","안전관리","소방·안전","에너지·설비","환경·에너지"],
  "화학·바이오": ["화학·바이오","바이오·화학"],
  "회계·경영·사무": ["회계·세무","경영·조달"],
  "복지·상담·교육": ["복지·상담","심리·상담","상담·고용","상담·청소년","아동·교육","실버·복지"],
  "조리·생활·서비스": ["조리·서비스","조리·외식","생활·취미"],
  "뷰티·건강·운동": ["뷰티","건강·운동","보건·의료"],
  "디자인·콘텐츠·마케팅": ["디자인·콘텐츠","마케팅·비즈니스"],
  "반려동물": ["반려동물"],
  "농림·산림": ["농림·산림"],
  "섬유·의복": ["섬유·의복"],
};

function rankingCategory(raw: string): string {
  for (const [group, children] of Object.entries(CATEGORY_GROUPS)) {
    if (children.includes(raw)) return group;
  }
  return raw || "기타";
}

function includesAny(item:RankingCertificate,keys:string[]){const t=(item.textCorpus+" "+item.category).toLowerCase();return keys.some((k)=>t.includes(k.toLowerCase()));}
function value(item:RankingCertificate,key:SortKey){
 const curated = CURATED_SLUGS[key];
 if(curated?.includes(item.slug)) {
   const rank = curated.indexOf(item.slug);
   return Math.max(70, 96 - rank);
 }
 if(key==="employment"||key==="office"||key==="publicCompany"||key==="itCareer"||key==="technical"||key==="startup"||key==="freelance")return item.scores.employment;
 if(key==="applicants")return item.statistics.applicants;if(key==="passRateHigh"||key==="passRateLow")return item.statistics.passRate;
 if(key==="difficultyHigh"||key==="difficultyLow")return item.scores.difficulty;if(key==="shortTerm")return item.scores.shortTerm;
 if(key==="beginner"||key==="worker"||key==="student"||key==="nonMajor"||key==="middleAge"||key==="noEligibility")return item.scores.beginner;
 if(key==="investment")return item.scores.investmentEfficiency;if(key==="independence")return item.scores.independence;if(key==="longTerm")return item.scores.longTermValue;
 return item.scores.employment;
}
function fmt(item:RankingCertificate,key:SortKey){const v=value(item,key);if(v===null)return"정보 부족";if(key==="applicants")return`${new Intl.NumberFormat("ko-KR").format(v)}명`;if(key==="passRateHigh"||key==="passRateLow")return`${v.toFixed(1)}%`;if(key==="shortTerm"&&item.studyMonths!==null)return`${item.studyPeriodText}`;return`${Math.round(v)}점`;}
function note(item:RankingCertificate,key:SortKey){if(isCurated(item,key)){if(key==="freelance")return"개인 활동·외주·수익화 활용 추천";if(key==="middleAge")return"재취업·경력전환·생활직무 활용 추천";}if(key==="applicants"||key.startsWith("passRate"))return item.statistics.latestYear?`${item.statistics.latestYear}년 등록 통계`:"통계 확인 필요";if(key.startsWith("difficulty"))return item.difficultyText;if(key==="shortTerm")return item.studyPeriodText;if(key==="noEligibility")return item.eligibilityText;return item.usefulnessText;}
function ComparePicker({item,allItems,onClose}:{item:RankingCertificate;allItems:RankingCertificate[];onClose:()=>void}){const candidates=useMemo(()=>{const map=new Map(allItems.map((x)=>[x.slug,x]));const rel=item.relatedSlugs.map((s)=>map.get(s)).filter((x):x is RankingCertificate=>Boolean(x&&x.slug!==item.slug));const same=allItems.filter((x)=>x.slug!==item.slug&&x.category===item.category&&!rel.some((r)=>r.slug===x.slug)).slice(0,6);return[...rel,...same].slice(0,8)},[allItems,item]);return <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm md:items-center md:p-5" onClick={onClose}><div className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 md:max-w-2xl md:rounded-3xl md:p-7" onClick={(e)=>e.stopPropagation()}><div className="flex justify-between gap-4"><div><span className="text-xs font-black text-blue-600">비슷한 자격증과 비교</span><h2 className="mt-2 text-2xl font-black text-slate-900">{item.name}</h2></div><button onClick={onClose} className="h-10 w-10 rounded-xl border border-slate-200 border-slate-200 text-xl font-black text-slate-500 hover:border-slate-300 hover:bg-slate-50">×</button></div><div className="mt-6 grid gap-3">{candidates.map((c)=><Link key={c.slug} href={`/compare?left=${encodeURIComponent(item.slug)}&right=${encodeURIComponent(c.slug)}#compare-result`} className="flex items-center justify-between rounded-2xl border border-slate-200 border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"><div><strong className="text-slate-900">{c.name}</strong><p className="mt-1 text-sm text-slate-500">{c.category} · {c.difficultyText}</p></div><span className="font-black text-blue-600">비교 →</span></Link>)}</div></div></div>}
export default function CertificateRankingHub({items}:Props){
 const [group,setGroup]=useState<GroupKey>("popular"),[sort,setSort]=useState<SortKey>("applicants"),[type,setType]=useState<TypeFilter>("all"),[category,setCategory]=useState("all"),[compare,setCompare]=useState<RankingCertificate|null>(null);const ready=useRef(false);
 const categoryCounts=useMemo(()=>{const m=new Map<string,number>();items.forEach((x)=>{const c=rankingCategory(x.category);m.set(c,(m.get(c)??0)+1)});return m},[items]);
 const categories=useMemo(()=>Array.from(categoryCounts.keys()).sort((a,b)=>a.localeCompare(b,"ko-KR")),[categoryCounts]);const featuredCategory=useMemo(()=>[...categoryCounts.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],"ko-KR"))[0]?.[0]??"all",[categoryCounts]);
 const defs=DEFS.filter((d)=>d.group===group);const active=DEFS.find((d)=>d.key===sort)??DEFS[0];
 useEffect(()=>{const p=new URLSearchParams(location.search);const g=p.get("group") as GroupKey|null,s=p.get("ranking") as SortKey|null,t=p.get("type") as TypeFilter|null,c=p.get("category");if(GROUPS.some(([k])=>k===g))setGroup(g!);if(DEFS.some((d)=>d.key===s))setSort(s!);if(t&&["all","national","private"].includes(t))setType(t);if(c&&(c==="all"||categories.includes(c)))setCategory(c);ready.current=true},[categories]);
 useEffect(()=>{if(!ready.current)return;const u=new URL(location.href);u.searchParams.set("group",group);u.searchParams.set("ranking",sort);u.searchParams.set("type",type);u.searchParams.set("category",category);history.replaceState({},"",`${u.pathname}${u.search}`)},[group,sort,type,category]);
 useEffect(()=>{const first=DEFS.find((d)=>d.group===group);if(first&&!DEFS.some((d)=>d.group===group&&d.key===sort))setSort(first.key)},[group,sort]);
 const ranked=useMemo(()=>{const def=DEFS.find((d)=>d.key===sort)!;return items.filter((i)=>type==="all"||i.type===type).filter((i)=>category==="all"||rankingCategory(i.category)===category).filter((i)=>sort!=="categoryAuto"||category!=="all").filter((i)=>sort!=="noEligibility"||i.eligibilityStatus==="none").filter((i)=>!def.keywords||isCurated(i,sort)||includesAny(i,def.keywords)||(sort==="worker"&&((i.studyMonths??99)<=3))||(sort==="nonMajor"&&i.eligibilityStatus==="none")).filter((i)=>{const v=value(i,sort);if(v===null)return false;if((sort==="passRateHigh"||sort==="passRateLow")&&(i.statistics.applicants??0)<10)return false;return true}).sort((a,b)=>{const av=value(a,sort)??-1,bv=value(b,sort)??-1;const asc=sort==="passRateLow"||sort==="difficultyLow";return av===bv?a.name.localeCompare(b.name,"ko-KR"):asc?av-bv:bv-av}).slice(0,20)},[items,sort,type,category]);
 const top=ranked.slice(0,3),rest=ranked.slice(3);
 return <>{compare&&<ComparePicker item={compare} allItems={items} onClose={()=>setCompare(null)}/>}<section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-[1200px] px-5 py-8 md:px-6"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{GROUPS.map(([k,l,d])=><button key={k} onClick={()=>{setGroup(k);if(k==="category"&&category==="all")setCategory(featuredCategory)}} className={`rounded-2xl border border-slate-200 p-4 text-left transition ${group===k?"border-blue-600 bg-blue-600 text-white":"border-slate-200 bg-white text-slate-900 hover:border-slate-300"}`}><strong className="block">{l}</strong><span className={`mt-1 block text-xs ${group===k?"text-blue-100":"text-slate-500"}`}>{d}</span></button>)}</div><div className="mt-6 flex gap-2 overflow-x-auto pb-2">{defs.map((d)=><button key={d.key} onClick={()=>setSort(d.key)} className={`shrink-0 rounded-xl px-4 py-3 text-sm font-black ${sort===d.key?"bg-blue-600 text-white border-blue-600":"border border-slate-200 bg-white text-slate-900 hover:border-slate-300"}`}>{d.label}</button>)}</div><div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 border-slate-200 bg-slate-50 p-5 md:grid-cols-[1fr_210px_210px] md:items-end"><div><span className={`rounded-full px-3 py-1 text-xs font-black ${active.official?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-800"}`}>{active.basis}</span><h2 className="mt-3 text-2xl font-black text-slate-900 md:text-3xl">{active.label}</h2><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{active.description}</p></div><label><span className="mb-2 block text-xs font-black text-slate-900">자격 구분</span><select value={type} onChange={(e)=>setType(e.target.value as TypeFilter)} className="h-12 w-full rounded-xl border border-slate-200 border-slate-200 bg-white px-4 font-bold text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"><option value="all">국가·민간 전체</option><option value="national">국가자격</option><option value="private">민간자격</option></select></label><label><span className="mb-2 block text-xs font-black text-slate-900">분야</span><select value={category} onChange={(e)=>setCategory(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 border-slate-200 bg-white px-4 font-bold text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"><option value="all">전체 분야</option>{categories.map((c)=><option key={c} value={c}>{c} ({categoryCounts.get(c)??0})</option>)}</select></label></div>{sort==="categoryAuto"&&category==="all"?<p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-bold text-blue-800">분야를 선택하면 해당 분야의 TOP 자격증이 자동 생성됩니다.</p>:null}</div></section><section className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">{ranked.length?<><div className="mb-7"><span className="text-sm font-black text-blue-600">TOP {ranked.length}</span><h2 className="mt-2 text-3xl font-black text-slate-900">{category==="all"?active.label:`${category} · ${active.label}`}</h2></div><div className="grid gap-5 md:grid-cols-3">{top.map((i,idx)=><article key={i.slug} className="rounded-3xl border border-slate-200 border-slate-200 bg-white p-6 shadow-sm"><div className="flex justify-between"><span className="flex h-11 min-w-11 items-center justify-center rounded-2xl bg-blue-600 px-3 text-lg font-black text-white">{idx+1}</span><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{rankingCategory(i.category)}</span></div><h3 className="mt-6 text-2xl font-black text-slate-900">{i.name}</h3><p className="mt-2 text-sm text-slate-500">{i.agency}</p><div className="mt-5 rounded-2xl bg-slate-50 p-4"><strong className="text-2xl text-blue-700">{fmt(i,sort)}</strong><p className="mt-2 text-sm font-bold text-slate-600">{note(i,sort)}</p></div><div className="mt-5 flex gap-2"><Link href={`/cert/${i.slug}`} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700">상세보기</Link><button onClick={()=>setCompare(i)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-900 hover:border-slate-300 hover:bg-slate-50">비교</button></div></article>)}</div>
<AdSlot
  label="랭킹 TOP 3 하단"
  slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1}
  className="my-10 md:my-12"
/>
{rest.length?<>
<div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
  {rest.slice(0,7).map((i,idx)=><article key={i.slug} className="grid gap-4 border-t border-slate-200 p-5 md:grid-cols-[60px_1fr_150px_180px] md:items-center"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-900">{idx+4}</span><div><h3 className="text-lg font-black text-slate-900">{i.name}</h3><p className="mt-1 text-sm text-slate-500">{rankingCategory(i.category)} · {note(i,sort)}</p></div><strong className="text-xl text-blue-700">{fmt(i,sort)}</strong><div className="flex gap-2 md:justify-end"><Link href={`/cert/${i.slug}`} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white hover:bg-blue-700">상세</Link><button onClick={()=>setCompare(i)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-900 hover:border-slate-300 hover:bg-slate-50">비교</button></div></article>)}
</div>

{rest.length > 7 ? (
  <>
    <AdSlot
      label="랭킹 10위 하단"
      slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_2}
      className="my-10 md:my-12"
    />
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      {rest.slice(7).map((i,idx)=><article key={i.slug} className="grid gap-4 border-t border-slate-200 p-5 md:grid-cols-[60px_1fr_150px_180px] md:items-center"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-900">{idx+11}</span><div><h3 className="text-lg font-black text-slate-900">{i.name}</h3><p className="mt-1 text-sm text-slate-500">{rankingCategory(i.category)} · {note(i,sort)}</p></div><strong className="text-xl text-blue-700">{fmt(i,sort)}</strong><div className="flex gap-2 md:justify-end"><Link href={`/cert/${i.slug}`} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white hover:bg-blue-700">상세</Link><button onClick={()=>setCompare(i)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-900 hover:border-slate-300 hover:bg-slate-50">비교</button></div></article>)}
    </div>
  </>
) : null}
</>:null}</>:<div className="rounded-3xl border border-slate-200 border-dashed border-slate-300 bg-white p-10 text-center"><h2 className="text-xl font-black">선택한 조건에 해당하는 데이터가 없습니다.</h2><p className="mt-3 text-sm text-slate-500">관련 JSON 정보가 추가되면 해당 랭킹에 자동 포함됩니다.</p></div>}</section><section className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6"><div className="rounded-3xl bg-slate-50 p-6 md:p-8"><h2 className="text-2xl font-black text-slate-900">자동 분류 운영 기준</h2><div className="mt-5 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-white p-5"><strong className="text-emerald-700">공식 통계</strong><p className="mt-2 text-sm leading-6 text-slate-600">응시자 수와 합격률은 JSON의 최신 통계를 사용합니다.</p></div><div className="rounded-2xl bg-white p-5"><strong className="text-amber-700">자동 분류</strong><p className="mt-2 text-sm leading-6 text-slate-600">분야, 추천 대상, 진로 문구와 응시자격을 읽어 자동 포함합니다.</p></div><div className="rounded-2xl bg-white p-5"><strong className="text-blue-700">라북 편집 점수</strong><p className="mt-2 text-sm leading-6 text-slate-600">난이도, 기간, 활용도 등을 동일한 규칙으로 환산한 참고 순위입니다.</p></div></div><p className="mt-5 text-xs font-bold leading-5 text-slate-500">조회수·북마크 랭킹은 실제 사이트 이용 데이터가 축적된 뒤 추가해야 하며, 현재는 임의 수치를 만들지 않습니다.</p></div></div></section></>;
}
