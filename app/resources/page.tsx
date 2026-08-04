import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "자격증 자료실 | 라북",
  description:
    "원서접수, 응시자격, CBT, 시험 준비물, 자격증 발급과 시험 용어 등 자격증 준비에 필요한 실용 자료를 확인하세요.",
  alternates: {
    canonical: "/resources",
  },
};

const QUICK_LINKS = [
  {
    title: "원서접수와 응시자격",
    description:
      "접수 전 확인해야 할 응시자격과 시험 준비 순서를 살펴보세요.",
    href: "/guide#prepare",
    label: "시험 준비 가이드",
  },
  {
    title: "CBT와 시험 방식",
    description:
      "필기·실기와 CBT 시험의 기본 개념부터 먼저 확인하세요.",
    href: "/guide#start",
    label: "처음 시작하기",
  },
  {
    title: "시험 당일 준비",
    description:
      "준비물, 입실 절차와 실기시험 유의사항을 확인하세요.",
    href: "/guide#exam-day",
    label: "시험 당일 가이드",
  },
  {
    title: "합격 후 발급과 활용",
    description:
      "자격증 발급과 이력서 활용, 다음 자격증 선택법을 확인하세요.",
    href: "/guide#after-pass",
    label: "합격 후 가이드",
  },
];

const RESOURCE_GROUPS = [
  {
    number: "01",
    title: "원서접수·시험일정",
    description:
      "시험 접수와 일정 확인에 필요한 기본 자료를 모으는 영역입니다.",
    items: [
      "원서접수 절차",
      "시험 일정 확인 방법",
      "접수 사진 규정",
      "응시료와 환불 기준",
    ],
  },
  {
    number: "02",
    title: "응시자격·증빙",
    description:
      "학력, 경력과 제출서류를 확인할 때 필요한 자료를 정리합니다.",
    items: [
      "응시자격 확인 방법",
      "학력·경력 조건",
      "경력증명서 확인사항",
      "서류 제출과 심사",
    ],
  },
  {
    number: "03",
    title: "CBT·시험방식",
    description:
      "컴퓨터 시험과 필기·실기 시험의 차이를 이해하는 자료입니다.",
    items: [
      "CBT 시험 안내",
      "필답형과 작업형 차이",
      "필기·실기 시험 구성",
      "시험시간과 답안 제출",
    ],
  },
  {
    number: "04",
    title: "시험장·준비물",
    description:
      "시험 당일 실수를 줄이기 위한 준비물과 유의사항을 모읍니다.",
    items: [
      "시험 당일 준비물",
      "신분증 인정 범위",
      "입실시간과 퇴실 기준",
      "실기시험 장비와 복장",
    ],
  },
  {
    number: "05",
    title: "발급·확인서",
    description:
      "합격 이후 자격증 발급과 각종 확인서 이용 방법을 정리합니다.",
    items: [
      "자격증 발급 방법",
      "합격확인서 출력",
      "자격증 재발급",
      "자격취득사항 확인",
    ],
  },
  {
    number: "06",
    title: "자격증 용어사전",
    description:
      "시험 안내에서 자주 등장하는 용어를 쉽게 설명하는 영역입니다.",
    items: [
      "CBT와 PBT",
      "NCS와 출제기준",
      "필답형·작업형·복합형",
      "국가공인·등록 민간자격",
    ],
  },
  {
    number: "07",
    title: "시행기관 안내",
    description:
      "자격증별 접수와 발급을 담당하는 주요 기관 정보를 정리합니다.",
    items: [
      "큐넷 이용 안내",
      "대한상공회의소 자격평가",
      "자격증별 시행기관 확인",
      "공식 출처 구별 방법",
    ],
  },
  {
    number: "08",
    title: "제도변경·공지",
    description:
      "시험과 자격제도에서 달라지는 내용을 추적하는 영역입니다.",
    items: [
      "출제기준 변경",
      "응시자격 변경",
      "시험방식 변경",
      "자격제도 주요 공지",
    ],
  },
];

const POPULAR_TERMS = [
  "CBT 뜻",
  "필답형 뜻",
  "작업형 뜻",
  "NCS란",
  "국가공인 민간자격",
  "자격증 재발급",
  "응시자격",
  "원서접수",
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

export default function ResourcesPage() {
  const plannedCount = RESOURCE_GROUPS.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden border-b border-slate-800 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero/resources-hero.webp')",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-blue-950/25"
        />

        <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center px-5 py-14 md:min-h-[500px] md:px-6 md:py-16">
          <div className="w-full">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-blue-100">
            RESOURCE CENTER
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            자격증 준비에 필요한
            <br className="md:hidden" /> 실용 자료를 한곳에
          </h1>

          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            원서접수, 응시자격, CBT, 시험 준비물, 발급과 용어까지
            수험생이 반복해서 찾는 정보를 주제별로 정리합니다.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#resource-categories"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
            >
              자료실 전체 보기
              <ArrowIcon />
            </a>
            <Link
              href="/guide"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
            >
              수험가이드 보기
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-black text-blue-100">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              8개 자료 분야
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              총 {plannedCount}개 콘텐츠 구성
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              제도변경 자료 확장
            </span>
          </div>
                  </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="mb-7">
            <span className="text-sm font-black text-blue-600">
              지금 바로 확인할 수 있는 자료
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
              준비 단계별 빠른 바로가기
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
              독립 자료 콘텐츠가 완성되기 전에도 현재 수험가이드에서 관련
              내용을 먼저 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  {item.label}
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="resource-categories"
        className="scroll-mt-24 bg-slate-50"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="mb-8">
            <span className="text-sm font-black text-blue-600">
              자료실 카테고리
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
              자주 찾는 정보를 주제별로
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
              개별 자료 페이지는 아래 구성을 기준으로 순차 제작됩니다.
              현재는 존재하지 않는 주소를 연결하지 않아 404가 발생하지 않습니다.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {RESOURCE_GROUPS.map((group) => (
              <article
                key={group.number}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"
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
                  {group.items.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <strong className="text-sm font-black text-slate-800 md:text-base">
                          {item}
                        </strong>
                      </div>
                      <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-slate-500">
                        제작 예정
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <span className="text-sm font-black text-blue-600">
                자격증 용어 빠르게 보기
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                어렵게 느껴지는 시험 용어부터
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
                시험 공고와 자격정보에서 반복해서 등장하는 용어를 짧고
                정확하게 설명하는 용어사전으로 확장합니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {POPULAR_TERMS.map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-7 text-white">
              <span className="text-xs font-black text-blue-300">
                자료실 운영 원칙
              </span>
              <h3 className="mt-3 text-2xl font-black">
                공식 확인이 필요한 내용은 출처와 함께
              </h3>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-300">
                일정, 응시료, 자격제도와 시행기관 정보처럼 변경될 수 있는
                자료는 공식 출처와 최종 확인일을 함께 표시하는 구조로
                운영합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="text-xs font-black text-blue-300">
                자격증을 먼저 찾고 싶다면
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">
                목록·랭킹·비교 페이지를 이용하세요
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300 md:text-base">
                자료실은 시험 준비에 필요한 참고정보를 제공하고, 자격증
                선택은 국가·민간 목록과 랭킹, 비교 페이지에서 이어집니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rank"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
              >
                자격증 랭킹
              </Link>
              <Link
                href="/compare"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
              >
                자격증 비교
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
