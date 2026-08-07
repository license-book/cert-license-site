import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/common/AdSlot";

export const metadata: Metadata = {
  title: "CBT·시험방식 | 자격증 자료실 | 라북",
  description:
    "CBT 시험 진행 방식, 필답형과 작업형의 차이, 필기·실기 시험 구성과 시험시간·답안 제출 방법을 안내합니다.",
  alternates: {
    canonical: "/resources/cbt-exam-format",
  },
};

const CONTENTS = [
  { id: "cbt", number: "01", title: "CBT 시험 안내" },
  { id: "types", number: "02", title: "필답형과 작업형 차이" },
  { id: "structure", number: "03", title: "필기·실기 시험 구성" },
  { id: "time-submit", number: "04", title: "시험시간과 답안 제출" },
];

const CBT_STEPS = [
  {
    number: "01",
    title: "좌석과 수험정보 확인",
    description:
      "감독관 안내에 따라 지정 좌석에 앉고 화면에 표시되는 이름, 수험번호와 응시 종목이 맞는지 확인합니다.",
  },
  {
    number: "02",
    title: "사용법과 주의사항 확인",
    description:
      "시험 시작 전 화면 이동, 답안 선택, 문제 표시, 계산기 사용 여부와 제출 방법을 확인합니다.",
  },
  {
    number: "03",
    title: "문제 풀이와 검토",
    description:
      "문항을 순서대로 풀되 어려운 문제는 표시해 두고, 남은 시간에 다시 검토하는 방식이 안전합니다.",
  },
  {
    number: "04",
    title: "최종 제출 확인",
    description:
      "답안 제출 버튼을 누르기 전 미응답 문항과 선택 답안을 다시 확인합니다. 제출 후 수정이 불가능한 시험이 많습니다.",
  },
];

const EXAM_TYPES = [
  {
    title: "CBT",
    badge: "컴퓨터 기반",
    description:
      "컴퓨터 화면에서 문제를 읽고 답안을 선택하거나 입력하는 방식입니다. 객관식 필기시험에서 많이 사용됩니다.",
  },
  {
    title: "PBT·지필시험",
    badge: "종이 기반",
    description:
      "시험지와 답안지를 사용하는 방식입니다. OMR 카드 작성이나 별도 답안지 기재가 필요할 수 있습니다.",
  },
  {
    title: "필답형",
    badge: "서술·계산",
    description:
      "주어진 문제에 단답, 계산 과정 또는 서술형 답안을 작성하는 실기시험 방식입니다.",
  },
  {
    title: "작업형",
    badge: "실무 수행",
    description:
      "장비, 프로그램, 도구 또는 재료를 사용해 실제 과제를 수행하고 결과물이나 작업 과정을 평가받는 방식입니다.",
  },
];

const STRUCTURE_CHECKS = [
  "필기와 실기 중 어느 단계부터 응시하는지",
  "객관식, 주관식, 필답형, 작업형 중 어떤 방식인지",
  "과목별 문항 수와 시험시간",
  "과목별 과락과 전체 합격기준",
  "필기 합격 후 실기 응시 가능 기간",
  "프로그램 버전, 장비와 재료 사용 기준",
];

const TIME_RULES = [
  {
    title: "시험 시작 전",
    description:
      "입실 마감시간 전에 좌석 확인과 본인 확인을 마쳐야 합니다. 늦게 도착하면 응시가 제한될 수 있습니다.",
  },
  {
    title: "시험 진행 중",
    description:
      "남은 시간을 수시로 확인하고, 특정 문제에 시간을 과도하게 쓰지 않도록 풀이 순서를 조절합니다.",
  },
  {
    title: "중도 퇴실",
    description:
      "시험별로 중도 퇴실 가능 시간이 다를 수 있으므로 감독관 안내를 따라야 합니다.",
  },
  {
    title: "답안 제출",
    description:
      "CBT는 화면 제출, 필답형은 답안지 제출, 작업형은 파일 저장이나 결과물 제출 등 방식이 다릅니다.",
  },
];

const FAQS = [
  {
    question: "CBT 시험에서는 문제를 다시 볼 수 있나요?",
    answer:
      "대부분 이전 문항으로 이동하거나 표시한 문제를 다시 확인할 수 있지만, 시험 시스템마다 기능이 다를 수 있습니다. 시작 전 안내 화면을 확인하세요.",
  },
  {
    question: "컴퓨터 사용이 익숙하지 않아도 응시할 수 있나요?",
    answer:
      "마우스 클릭과 간단한 화면 이동이 가능한 수준이면 객관식 CBT는 응시할 수 있습니다. 다만 작업형 시험은 프로그램 사용 능력이 직접 평가될 수 있습니다.",
  },
  {
    question: "필답형과 작업형이 함께 나오기도 하나요?",
    answer:
      "그럴 수 있습니다. 복합형 실기시험은 필답형과 작업형을 함께 평가하거나 서로 다른 날짜에 진행하기도 합니다.",
  },
  {
    question: "답안을 제출한 뒤 수정할 수 있나요?",
    answer:
      "최종 제출 후에는 수정이 불가능한 경우가 많습니다. 제출 전 미응답 문항과 저장 상태를 반드시 확인하세요.",
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

export default function CbtExamFormatPage() {
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
            <span className="text-slate-900">CBT·시험방식</span>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">
            RESOURCE 03
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            CBT·시험방식
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            컴퓨터 기반 시험부터 필답형과 작업형까지 시험방식의 차이와
            진행 순서, 답안 제출 시 주의사항을 한눈에 확인하세요.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENTS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
              >
                <span className="text-xs font-black text-blue-300">
                  {item.number}
                </span>
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
              같은 자격증도 시험 단계마다 방식이 다를 수 있습니다
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 md:text-base">
              이 페이지는 공통적인 시험방식을 설명합니다. 실제 문제 유형,
              시험시간, 사용 프로그램, 준비물과 답안 제출 방식은 반드시 해당
              자격증의 공식 시험공고와 수험자 안내를 최종 기준으로 확인하세요.
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
              자료실로 돌아가기
              <ArrowIcon />
            </Link>
          </aside>

          <div className="grid gap-8">
            <article
              id="cbt"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                01. CBT 시험 안내
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                컴퓨터 화면에서 문제를 풀고 제출합니다
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                CBT는 Computer Based Test의 약자로, 종이 시험지 대신 컴퓨터
                화면에서 문제를 확인하고 답안을 입력하는 시험방식입니다.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {CBT_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-blue-600 px-2 text-xs font-black text-white">
                        {step.number}
                      </span>
                      <h3 className="text-lg font-black text-slate-950">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
            <AdSlot label="자료실 상단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} />

            <article
              id="types"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                02. 필답형과 작업형 차이
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                답안을 쓰는 시험과 직접 수행하는 시험은 다릅니다
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                시험방식에 따라 공부법과 준비물이 달라집니다. 시험공고에서
                필답형, 작업형, 복합형 표기를 먼저 확인하세요.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {EXAM_TYPES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                      {item.badge}
                    </span>
                    <h3 className="mt-3 text-lg font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article
              id="structure"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                03. 필기·실기 시험 구성
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                시험 단계와 합격기준을 함께 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                필기 합격 후 실기에 응시하는 자격증이 많지만, 단일 시험이나
                면접·과제 제출이 포함되는 자격증도 있습니다.
              </p>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                <ul className="grid gap-4 md:grid-cols-2">
                  {STRUCTURE_CHECKS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <AdSlot label="자료실 본문 중단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1} />

            <article
              id="time-submit"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                04. 시험시간과 답안 제출
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                입실부터 최종 제출까지 시간을 관리하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                시험시간만 확인하지 말고 입실 마감, 중도 퇴실, 저장과 제출
                기준까지 함께 확인해야 당일 실수를 줄일 수 있습니다.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {TIME_RULES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <h3 className="text-lg font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <AdSlot label="자료실 하단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">자주 묻는 질문</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                시험방식 FAQ
              </h2>
              <div className="mt-6 grid gap-4">
                {FAQS.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <summary className="cursor-pointer list-none pr-8 text-base font-black text-slate-950">
                      {item.question}
                    </summary>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-slate-950 p-6 text-white md:p-8">
              <span className="text-sm font-black text-blue-300">다음 단계</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                시험 당일 준비물도 미리 확인하세요
              </h2>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-300 md:text-base">
                시험방식을 확인했다면 신분증, 준비물, 입실시간과 실기시험
                장비·복장 기준을 함께 점검하는 것이 좋습니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/resources"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  자료실 전체 보기
                  <ArrowIcon />
                </Link>
                <Link
                  href="/resources/eligibility-documents"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
                >
                  응시자격·증빙 보기
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
