import Link from "next/link";
import CompareSection from "./CompareSection";

const categories = [
  { label: "IT · 사무", query: "IT", mark: "IT" },
  { label: "전기 · 전자", query: "전기", mark: "E" },
  { label: "안전 · 산업", query: "안전", mark: "S" },
  { label: "건설 · 토목", query: "건설", mark: "C" },
  { label: "회계 · 세무", query: "회계", mark: "A" },
  { label: "조리 · 미용", query: "조리", mark: "L" },
];

const rankingCards = [
  { eyebrow: "종합", title: "인기 자격증 랭킹", description: "많이 찾는 자격증을 한눈에 확인하세요." },
  { eyebrow: "난이도", title: "난이도별 랭킹", description: "준비 부담과 체감 난이도를 비교해보세요." },
  { eyebrow: "활용도", title: "취업 활용 랭킹", description: "실무와 취업에서 활용도가 높은 자격증을 살펴보세요." },
];

const guideCards = [
  { title: "시험 준비 가이드", description: "처음 준비할 때 알아야 할 핵심 흐름을 정리했습니다." },
  { title: "응시자격 확인", description: "기사·산업기사 등 응시 전 확인할 내용을 살펴보세요." },
  { title: "합격 전략", description: "공부기간과 과목별 준비 전략을 빠르게 확인하세요." },
];

const resourceCards = [
  { title: "시험 일정", description: "자격증 준비에 필요한 일정과 확인 포인트를 살펴보세요." },
  { title: "수험 자료실", description: "시험 준비에 도움이 되는 자료와 정보를 모았습니다." },
];

function SectionTitle({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-black tracking-[0.16em] text-blue-600">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">{title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{description}</p>
      </div>
      {href && linkLabel ? (
        <Link href={href} className="hidden shrink-0 text-sm font-black text-blue-600 transition hover:text-blue-700 sm:block">
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}

export default function HomeSections() {
  return (
    <>
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-18">
          <SectionTitle
            eyebrow="CATEGORY"
            title="분야별 자격증"
            description="관심 분야를 선택해 관련 자격증을 빠르게 찾아보세요."
            href="/search"
            linkLabel="전체 검색"
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((item) => (
              <Link
                key={item.label}
                href={`/search?q=${encodeURIComponent(item.query)}`}
                className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white shadow-sm">{item.mark}</div>
                <div className="mt-4 text-sm font-black text-slate-900 group-hover:text-blue-700">{item.label}</div>
                <div className="mt-1 text-xs font-bold text-slate-400">자격증 보기 →</div>
              </Link>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Link href="/national-certificates" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
              <span className="text-xs font-black text-blue-600">NATIONAL</span>
              <h3 className="mt-2 text-base font-black text-slate-950">국가자격증 전체보기</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">국가기술·국가전문 자격을 찾아보세요.</p>
            </Link>
            <Link href="/private-certificates" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
              <span className="text-xs font-black text-blue-600">PRIVATE</span>
              <h3 className="mt-2 text-base font-black text-slate-950">민간자격증 전체보기</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">등록·공인 여부와 운영기관을 확인하세요.</p>
            </Link>
            <Link href="/roadmap" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
              <span className="text-xs font-black text-blue-600">ROADMAP</span>
              <h3 className="mt-2 text-base font-black text-slate-950">자격증 로드맵</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">분야별 취득 순서와 연결 자격증을 확인하세요.</p>
            </Link>
          </div>
        </div>
      </section>

      <CompareSection />

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-18">
          <SectionTitle
            eyebrow="RANKING"
            title="자격증 랭킹"
            description="목적에 맞는 자격증을 더 빠르게 비교하고 선택하세요."
            href="/rank"
            linkLabel="랭킹 전체보기"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {rankingCards.map((item, index) => (
              <Link key={item.title} href="/rank" className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{item.eyebrow}</span>
                  <span className="text-sm font-black text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-950 group-hover:text-blue-700">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-18">
        <SectionTitle
          eyebrow="EXAM GUIDE"
          title="수험가이드"
          description="자격증을 처음 준비하는 분도 필요한 정보를 빠르게 확인할 수 있습니다."
          href="/guide"
          linkLabel="가이드 전체보기"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {guideCards.map((item, index) => (
            <Link key={item.title} href="/guide" className="group flex min-h-[168px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
              <div>
                <span className="text-xs font-black tracking-[0.14em] text-blue-600">GUIDE 0{index + 1}</span>
                <h3 className="mt-3 text-lg font-black text-slate-950 group-hover:text-blue-700">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.description}</p>
              </div>
              <span className="mt-4 text-sm font-black text-blue-600">확인하기 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/70">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-18">
          <SectionTitle
            eyebrow="RESOURCES"
            title="시험 준비 자료"
            description="복잡한 정보보다 실제 준비에 필요한 내용만 모아두었습니다."
            href="/resources"
            linkLabel="자료실 전체보기"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {resourceCards.map((item, index) => (
              <Link key={item.title} href="/resources" className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
                <div>
                  <span className="text-xs font-black text-blue-600">RESOURCE 0{index + 1}</span>
                  <h3 className="mt-2 text-base font-black text-slate-950 group-hover:text-blue-700">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{item.description}</p>
                </div>
                <span className="ml-4 text-xl font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
