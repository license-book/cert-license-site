import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "시행기관 안내 | 자격증 자료실 | 라북",
  description:
    "큐넷, 대한상공회의소 자격평가사업단 등 자격시험 시행기관의 역할과 자격증별 공식 기관을 확인하는 방법을 안내합니다.",
  alternates: {
    canonical: "/resources/exam-agencies",
  },
};

const CONTENTS = [
  { id: "qnet", number: "01", title: "큐넷 이용 안내" },
  { id: "korcham", number: "02", title: "대한상공회의소 자격평가" },
  { id: "find-agency", number: "03", title: "자격증별 시행기관 확인" },
  { id: "official-source", number: "04", title: "공식 출처 구별 방법" },
];

const QNET_ITEMS = [
  {
    title: "시험일정 확인",
    description:
      "종목별 원서접수 기간, 필기·실기 시험일과 합격자 발표일을 확인합니다.",
  },
  {
    title: "원서접수",
    description:
      "응시 종목, 지역과 시험장을 선택하고 사진 등록과 응시료 결제를 진행합니다.",
  },
  {
    title: "응시자격과 서류",
    description:
      "기사·산업기사 등 응시자격이 필요한 종목은 학력·경력 조건과 제출서류를 확인합니다.",
  },
  {
    title: "합격과 자격증 발급",
    description:
      "합격 여부, 자격취득 내역과 자격증 발급·재발급 관련 메뉴를 확인합니다.",
  },
];

const KORCHAM_ITEMS = [
  {
    title: "종목 확인",
    description:
      "컴퓨터활용능력, 워드프로세서 등 대한상공회의소가 시행하는 자격의 시험정보를 확인합니다.",
  },
  {
    title: "상시시험 일정",
    description:
      "지역별 시험장과 회차별 접수 가능 일정을 확인한 뒤 원하는 날짜를 선택합니다.",
  },
  {
    title: "접수와 수험표",
    description:
      "회원정보, 사진과 접수 종목을 확인하고 결제 후 수험표와 시험장을 다시 확인합니다.",
  },
  {
    title: "합격확인과 발급",
    description:
      "합격 결과와 자격취득 내역을 확인하고 필요한 확인서 또는 자격증 발급 절차를 진행합니다.",
  },
];

const AGENCY_CHECKLIST = [
  "자격증 상세페이지에 표시된 시행기관명 확인",
  "시험 공고에 기재된 원서접수 사이트 확인",
  "자격증 발급 주체와 시험 시행 주체가 같은지 확인",
  "민간자격은 운영기관과 등록·공인 상태를 함께 확인",
  "검색광고보다 기관 공식 홈페이지 주소를 우선 확인",
  "시험 전 최신 공지와 변경사항을 다시 확인",
];

const SOURCE_RULES = [
  {
    title: "기관명이 명확한가",
    description:
      "페이지 상단과 하단에 기관의 정식 명칭, 주소, 연락처와 이용약관이 표시되어 있는지 확인합니다.",
  },
  {
    title: "공식 도메인인가",
    description:
      "검색결과의 광고 문구만 보지 말고 주소창의 도메인과 보안 연결 여부를 확인합니다.",
  },
  {
    title: "공고 원문이 있는가",
    description:
      "시험일정, 응시자격과 환불 규정은 요약글보다 시행기관이 게시한 공고문과 안내문을 기준으로 봅니다.",
  },
  {
    title: "최종 수정일이 최근인가",
    description:
      "오래된 블로그나 게시물은 현재 제도와 다를 수 있으므로 공고일과 적용 연도를 확인합니다.",
  },
];

const FAQS = [
  {
    question: "모든 국가자격 시험을 큐넷에서 접수하나요?",
    answer:
      "아닙니다. 많은 국가기술자격은 큐넷에서 운영하지만, 국가전문자격이나 일부 자격은 별도 기관에서 접수합니다. 자격증별 시행기관을 먼저 확인하세요.",
  },
  {
    question: "시험 시행기관과 자격증 발급기관이 다를 수 있나요?",
    answer:
      "그럴 수 있습니다. 시험 운영, 합격자 관리와 자격증 발급 업무가 기관별로 나뉘는 경우가 있으므로 공고문에 표시된 담당기관을 확인해야 합니다.",
  },
  {
    question: "검색결과 첫 번째 사이트가 공식 사이트인가요?",
    answer:
      "반드시 그렇지는 않습니다. 광고나 대행 사이트일 수 있으므로 기관명, 도메인, 공고 원문과 연락처를 확인한 뒤 이용하세요.",
  },
  {
    question: "민간자격 시행기관은 어디서 확인하나요?",
    answer:
      "자격증을 운영하는 기관과 등록정보를 함께 확인해야 합니다. 등록번호가 있다고 해서 모두 국가공인 자격인 것은 아닙니다.",
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

export default function ExamAgenciesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-4 md:px-6">
          <nav
            aria-label="현재 위치"
            className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
          >
            <Link href="/" className="transition hover:text-blue-700">
              홈
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources" className="transition hover:text-blue-700">
              자료실
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900">시행기관 안내</span>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">
            RESOURCE 07
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            시행기관 안내
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            자격시험은 종목에 따라 접수처와 발급기관이 다릅니다. 주요 시행기관의 역할과 내 자격증의 공식 기관을 확인하는 방법을 정리했습니다.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENTS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
              >
                <span className="text-xs font-black text-blue-300">{item.number}</span>
                <strong className="mt-1 block text-sm font-black text-white">
                  {item.title}
                </strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-14">
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8">
            <span className="text-sm font-black text-blue-700">먼저 확인하세요</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              접수와 발급은 반드시 공식 시행기관에서 진행하세요
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 md:text-base">
              같은 이름의 안내 사이트나 접수 대행 페이지가 검색될 수 있습니다. 시험 일정, 응시료, 환불, 제출서류와 발급 절차는 시행기관의 최신 공고를 최종 기준으로 확인하세요.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 md:px-6 md:py-16 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <span className="text-xs font-black text-blue-600">페이지 목차</span>
            <div className="mt-4 grid gap-2">
              {CONTENTS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="text-xs text-slate-400">{item.number}</span>
                  {item.title}
                </a>
              ))}
            </div>
            <Link
              href="/resources"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              자료실로 돌아가기 <ArrowIcon />
            </Link>
          </aside>

          <div className="grid gap-8">
            <article id="qnet" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">01. 큐넷 이용 안내</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                국가기술자격 준비에서 가장 자주 이용하는 기능을 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                큐넷을 이용할 때는 종목별 시험일정, 응시자격, 원서접수와 자격증 발급 메뉴를 구분해 확인하는 것이 좋습니다.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {QNET_ITEMS.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
                접수 전에 회원정보, 사진, 응시자격 서류와 결제수단을 미리 확인하면 접수 중 오류를 줄일 수 있습니다.
              </div>
            </article>

            <article id="korcham" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">02. 대한상공회의소 자격평가</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                상시시험은 지역과 시험장별 일정을 함께 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                대한상공회의소 시행 자격은 회차형 시험뿐 아니라 상시시험으로 운영되는 종목이 있어 접수 가능 날짜와 시험장 잔여 좌석 확인이 중요합니다.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {KORCHAM_ITEMS.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="find-agency" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">03. 자격증별 시행기관 확인</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                자격증명만 검색하지 말고 접수·시험·발급 주체를 함께 보세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                국가기술자격, 국가전문자격과 민간자격은 관리 체계가 다르며 같은 분야라도 시행기관이 서로 다를 수 있습니다.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                <h3 className="text-lg font-black text-slate-950">시행기관 확인 순서</h3>
                <ol className="mt-4 grid gap-3">
                  {AGENCY_CHECKLIST.map((item, index) => (
                    <li key={item} className="flex gap-3 rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-slate-700">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            <article id="official-source" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">04. 공식 출처 구별 방법</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                공고 원문과 기관 정보를 기준으로 판단하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                시험정보 요약은 참고용으로 활용하고, 일정과 규정처럼 응시에 직접 영향을 주는 내용은 반드시 공식 출처에서 다시 확인해야 합니다.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {SOURCE_RULES.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">FAQ</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                시행기관 안내 자주 묻는 질문
              </h2>
              <div className="mt-6 grid gap-4">
                {FAQS.map((item) => (
                  <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <summary className="cursor-pointer list-none pr-6 text-base font-black text-slate-950">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-slate-950 p-6 text-white md:p-8">
              <span className="text-xs font-black text-blue-300">관련 자료</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight">
                접수와 발급 절차도 함께 확인하세요
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/resources/application-schedule"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  원서접수·시험일정 <ArrowIcon />
                </Link>
                <Link
                  href="/resources/certificate-issuance"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
                >
                  발급·확인서 <ArrowIcon />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
