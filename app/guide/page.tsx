import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "수험가이드 | 라북",
  description:
    "자격증 선택부터 원서접수, 공부법, 시험 당일, 합격 후 활용까지 수험생에게 필요한 정보를 단계별로 확인하세요.",
  alternates: {
    canonical: "/guide",
  },
};

const QUICK_PATHS = [
  {
    number: "01",
    title: "자격증을 아직 못 정했다면",
    description:
      "국가자격과 민간자격의 전체 목록을 살펴보고 관심 분야부터 좁혀보세요.",
    links: [
      { label: "국가자격증 보기", href: "/national-certificates" },
      { label: "민간자격증 보기", href: "/private-certificates" },
    ],
  },
  {
    number: "02",
    title: "인기와 통계가 궁금하다면",
    description:
      "응시자 수, 합격률, 난이도와 대상별 추천을 기준으로 후보를 찾아보세요.",
    links: [{ label: "자격증 랭킹 보기", href: "/rank" }],
  },
  {
    number: "03",
    title: "두 자격증 사이에서 고민한다면",
    description:
      "준비기간, 응시자격, 시험 구성과 활용 방향의 차이를 비교해보세요.",
    links: [{ label: "자격증 비교하기", href: "/compare" }],
  },
];

const GUIDE_GROUPS = [
  {
    id: "start",
    number: "01",
    title: "처음 시작하기",
    description:
      "무엇을 준비해야 할지 막막한 단계에서 가장 먼저 알아야 할 내용입니다.",
    items: [
      { title: "자격증은 어떻게 선택할까", slug: "how-to-choose-certificate" },
      { title: "국가자격과 민간자격의 차이", slug: "national-vs-private-certificate" },
      { title: "필기시험과 실기시험의 차이", slug: "written-vs-practical-exam" },
      { title: "CBT 시험이란 무엇인가", slug: "what-is-cbt" },
    ],
  },
  {
    id: "prepare",
    number: "02",
    title: "시험 준비",
    description:
      "응시 가능 여부를 확인하고 현실적인 학습 계획을 세우는 단계입니다.",
    items: [
      { title: "원서접수 방법과 순서", slug: "exam-registration" },
      { title: "응시자격 확인 방법", slug: "check-eligibility" },
      { title: "나에게 맞는 공부기간 정하기", slug: "set-study-period" },
      { title: "교재 선택 기준", slug: "choose-study-book" },
      { title: "인강 선택 기준", slug: "choose-online-course" },
    ],
  },
  {
    id: "study",
    number: "03",
    title: "공부법",
    description:
      "기출문제와 반복 학습을 효율적으로 활용하는 실전 학습 가이드입니다.",
    items: [
      { title: "독학 가능한 자격증 판단법", slug: "self-study-certificate" },
      { title: "기출문제 공부법", slug: "past-exam-study-method" },
      { title: "암기과목 공부법", slug: "memorization-study-method" },
      { title: "오답노트 활용법", slug: "wrong-answer-note" },
      { title: "직장인을 위한 공부 계획", slug: "study-plan-for-workers" },
    ],
  },
  {
    id: "exam-day",
    number: "04",
    title: "시험 당일",
    description:
      "준비물과 입실 절차, 실기시험에서 놓치기 쉬운 부분을 확인합니다.",
    items: [
      { title: "시험 당일 준비물", slug: "exam-day-checklist" },
      { title: "시험장 입실과 유의사항", slug: "exam-room-rules" },
      { title: "실기시험에서 주의할 점", slug: "practical-exam-tips" },
    ],
  },
  {
    id: "after-pass",
    number: "05",
    title: "합격 후",
    description:
      "합격 이후 자격증을 발급받고 취업과 다음 단계에 활용하는 방법입니다.",
    items: [
      { title: "자격증 발급 방법", slug: "certificate-issuance" },
      { title: "취업과 이력서 활용법", slug: "certificate-on-resume" },
      { title: "다음 상위 자격증 선택법", slug: "choose-next-certificate" },
    ],
  },
  {
    id: "faq",
    number: "06",
    title: "자주 묻는 질문",
    description:
      "시험 일정, 비용, 재응시처럼 수험생이 반복해서 찾는 내용을 모읍니다.",
    items: [
      { title: "자격시험 응시료", slug: "exam-fees" },
      { title: "시험 일정 확인 방법", slug: "check-exam-schedule" },
      { title: "불합격 후 재응시", slug: "reapply-after-failure" },
      { title: "자격증 준비 공통 질문", slug: "certificate-faq" },
    ],
  },
];

const ROADMAPS = [
  {
    slug: "it-office",
    title: "IT·사무 취업 로드맵",
    steps: ["입문 자격 확인", "사무·IT 기초", "직무형 국가자격", "관련 자격 확장"],
    description:
      "사무직과 IT 직무를 목표로 할 때 현재 수준에 맞는 자격증 순서를 정합니다.",
  },
  {
    slug: "electrical-technical",
    title: "전기·기술직 로드맵",
    steps: ["응시자격 확인", "기능사·산업기사", "기사", "현장 경력 확장"],
    description:
      "응시자격과 경력 조건을 고려해 기능사부터 기사까지 단계적으로 준비합니다.",
  },
  {
    slug: "cooking-service",
    title: "조리·서비스 로드맵",
    steps: ["희망 업종 선택", "기능사 취득", "현장 경험", "인접 분야 확장"],
    description:
      "한식·양식·제과·제빵처럼 취업하려는 업종을 기준으로 조리 분야를 선택합니다.",
  },
  {
    slug: "accounting-tax",
    title: "회계·세무 취업 로드맵",
    steps: ["회계 기초 확인", "회계 실무 기초", "세무 실무 확장", "전문 분야 확장"],
    description:
      "전산회계 기초부터 세무 실무와 회계 데이터 활용까지 단계적으로 준비합니다.",
  },
  {
    slug: "safety",
    title: "안전관리 취업 로드맵",
    steps: ["현장과 진로 확인", "산업안전 기초", "기사급 안전관리", "전문 영역 확장"],
    description:
      "제조업과 건설현장 중 목표 분야를 정하고 산업안전·건설안전 자격으로 확장합니다.",
  },
  {
    slug: "mechanical",
    title: "기계·설비 취업 로드맵",
    steps: ["기계 실무 입문", "산업기사 실무", "기사급 전문화", "설비·에너지 확장"],
    description:
      "설계·생산·정비·공조 중 목표 직무에 맞춰 기계 분야 자격을 선택합니다.",
  },
  {
    slug: "construction",
    title: "건설·토목 취업 로드맵",
    steps: ["분야와 적성 확인", "현장 기초", "기사급 전문화", "품질·안전 확장"],
    description:
      "건축과 토목의 주력 분야를 정하고 시공·품질·안전 직무로 단계적으로 확장합니다.",
  },
  {
    slug: "healthcare",
    title: "보건·의료 취업 로드맵",
    steps: ["직무와 자격 구분", "현장 지원 역량", "복지·재활 전문화", "대상별 서비스 확장"],
    description:
      "국가시험·국가전문자격과 민간자격을 구분해 보건·돌봄 분야의 현실적인 진로를 정합니다.",
  },
  {
    slug: "logistics",
    title: "물류·유통 취업 로드맵",
    steps: ["현장·운영 진로 선택", "입출고·판매 기초", "현장·데이터 강화", "온라인 판매 확장"],
    description:
      "지게차와 재고관리부터 온라인 쇼핑몰·전자상거래 운영까지 단계적으로 준비합니다.",
  },
  {
    slug: "design",
    title: "디자인 취업 로드맵",
    steps: ["시각 표현 기초", "콘텐츠 디자인", "웹·디지털 전문화", "브랜드 분야 확장"],
    description:
      "그래픽·웹·영상 중 주력 분야를 정하고 자격 학습을 실제 포트폴리오로 연결합니다.",
  },
  {
    slug: "automotive",
    title: "자동차 정비 취업 로드맵",
    steps: ["정비 작업 입문", "산업기사급 진단", "기사급 전문화", "전장·설비 확장"],
    description:
      "자동차정비기능사부터 산업기사·기사와 전장·건설기계 정비 분야로 확장합니다.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export default function GuidePage() {
  const totalArticles = GUIDE_GROUPS.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section
        className="relative overflow-hidden border-b border-slate-800 text-white"
        style={{
          backgroundImage:
            "url('/images/hero/study-guide-hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/38" />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center px-5 py-14 md:min-h-[500px] md:px-6 md:py-16">
          <div className="w-full">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-blue-100">
            EXAM GUIDE
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            자격증 선택부터
            <br className="md:hidden" /> 합격 이후까지
          </h1>

          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            처음 자격증을 고르는 순간부터 원서접수, 공부법, 시험 당일과
            합격 후 활용까지 필요한 정보를 단계별로 확인하세요.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#guide-categories"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
            >
              가이드 전체 보기
              <ArrowIcon />
            </a>
            <Link
              href="/rank"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
            >
              자격증 랭킹 먼저 보기
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-black text-blue-100">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              6개 가이드 분야
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              총 {totalArticles}개 콘텐츠 구성
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              자격증 로드맵 확장
            </span>
          </div>
                  </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="mb-7">
            <span className="text-sm font-black text-blue-600">
              지금 상황에 맞게 시작하세요
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
              가장 빠른 수험 동선
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
              아직 자격증을 정하지 못했는지, 후보를 비교하고 싶은지에 따라
              현재 이용할 수 있는 페이지로 바로 이동할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {QUICK_PATHS.map((path) => (
              <article
                key={path.number}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl bg-blue-600 px-3 text-sm font-black text-white">
                  {path.number}
                </span>
                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {path.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  {path.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {path.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      {link.label}
                      <ArrowIcon />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="guide-categories"
        className="scroll-mt-24 bg-slate-50"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="mb-8">
            <span className="text-sm font-black text-blue-600">
              단계별 수험가이드
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
              준비 과정 전체를 한곳에서
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
              가이드 상세 콘텐츠는 아래 여섯 분야를 기준으로 순차 제작됩니다.
              존재하지 않는 주소로 연결되지 않도록 현재는 전체 구성을 먼저
              확인할 수 있게 했습니다.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {GUIDE_GROUPS.map((group) => (
              <article
                key={group.id}
                id={group.id}
                className="scroll-mt-24 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-blue-50 px-3 text-sm font-black text-blue-700">
                    {group.number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-slate-950">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {group.items.map((item, index) => {
                    const content = (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <strong className="text-sm font-black text-slate-800 md:text-base">
                            {item.title}
                          </strong>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${item.slug ? "bg-blue-600 text-white" : "bg-white text-slate-500"}`}>
                          {item.slug ? "가이드 보기" : "제작 예정"}
                        </span>
                      </>
                    );

                    return item.slug ? (
                      <Link
                        key={item.title}
                        href={`/guide/${item.slug}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-blue-300 hover:bg-blue-50"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div
                        key={item.title}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmaps" className="scroll-mt-24 border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="mb-8">
            <span className="text-sm font-black text-blue-600">
              자격증 로드맵
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
              하나를 딴 다음 무엇을 준비할까
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
              개별 자격증을 소개하는 데서 끝나지 않고 직무와 경력 단계에 맞는
              다음 자격증까지 이어주는 콘텐츠로 확장합니다.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {ROADMAPS.map((roadmap) => (
              <article
                key={roadmap.slug}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="text-xs font-black text-blue-600">
                  ROADMAP
                </span>
                <h3 className="mt-2 text-xl font-black text-slate-950">
                  {roadmap.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  {roadmap.description}
                </p>
                <div className="mt-6 space-y-3">
                  {roadmap.steps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl bg-white p-3.5"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <strong className="text-sm font-black text-slate-800">
                        {step}
                      </strong>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/roadmap/${roadmap.slug}`}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  로드맵 상세보기
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="text-xs font-black text-blue-300">
                다음 단계
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">
                먼저 관심 자격증부터 찾아보세요
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300 md:text-base">
                수험가이드 상세 콘텐츠가 추가되기 전에도 국가·민간자격증,
                랭킹과 비교 페이지를 이용해 준비할 자격증을 결정할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rank"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
              >
                랭킹에서 찾기
              </Link>
              <Link
                href="/compare"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
              >
                자격증 비교하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
