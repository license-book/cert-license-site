import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/common/AdSlot";

export const metadata: Metadata = {
  title: "응시자격·증빙 | 자격증 자료실 | 라북",
  description:
    "자격시험 응시자격 확인 방법, 학력·경력 조건, 경력증명서 작성 확인사항과 서류 제출·심사 절차를 안내합니다.",
  alternates: {
    canonical: "/resources/eligibility-documents",
  },
};

const CONTENTS = [
  { id: "check", number: "01", title: "응시자격 확인 방법" },
  { id: "conditions", number: "02", title: "학력·경력 조건" },
  { id: "career-proof", number: "03", title: "경력증명서 확인사항" },
  { id: "review", number: "04", title: "서류 제출과 심사" },
];

const CHECK_STEPS = [
  {
    number: "01",
    title: "자격증 종류와 등급 확인",
    description:
      "같은 이름의 자격증이라도 등급이나 시행기관에 따라 응시조건이 달라질 수 있습니다. 먼저 정확한 종목명과 등급을 확인합니다.",
  },
  {
    number: "02",
    title: "공식 응시자격 기준 확인",
    description:
      "시행기관의 시험공고와 응시자격 안내에서 학력, 경력, 보유자격, 훈련과정 등의 인정 기준을 확인합니다.",
  },
  {
    number: "03",
    title: "본인 조건과 기준 대조",
    description:
      "졸업 여부, 전공, 실제 근무기간, 담당업무와 보유 자격증을 기준과 하나씩 대조합니다. 비슷해 보이는 경력이라도 직무분야가 다르면 인정되지 않을 수 있습니다.",
  },
  {
    number: "04",
    title: "제출서류와 마감일 확인",
    description:
      "온라인 접수와 응시자격 서류 제출은 기간이 다를 수 있습니다. 필요한 서류와 제출기한을 시험일정보다 먼저 확인합니다.",
  },
  {
    number: "05",
    title: "심사 결과 확인",
    description:
      "서류를 제출한 뒤에는 마이페이지나 접수내역에서 승인, 보완요청, 미승인 상태를 확인합니다.",
  },
];

const CONDITION_TYPES = [
  {
    title: "학력 기준",
    description:
      "관련 학과 졸업 또는 졸업예정 여부, 학교 종류와 학년·수료 기준을 확인합니다.",
  },
  {
    title: "경력 기준",
    description:
      "관련 직무에서 실제 근무한 기간과 담당업무가 인정 범위에 포함되는지 확인합니다.",
  },
  {
    title: "자격 보유 기준",
    description:
      "하위 등급 자격 취득 후 필요한 실무경력이나 동일·유사 분야 자격 인정 여부를 확인합니다.",
  },
  {
    title: "훈련·과정 기준",
    description:
      "지정 교육훈련과정, 학점인정 또는 과정평가형 등 별도 경로가 있는지 확인합니다.",
  },
];

const CAREER_PROOF_CHECKS = [
  "근무처의 정확한 명칭과 사업자 정보",
  "입사일과 퇴사일 또는 재직 중 표시",
  "부서명과 직위",
  "실제 담당업무가 구체적으로 기재되어 있는지",
  "발급일, 담당자 연락처와 직인 여부",
  "필요한 경우 4대보험 가입내역 등 보조서류 준비",
];

const REVIEW_FLOW = [
  {
    title: "서류 준비",
    description:
      "졸업증명서, 경력증명서, 자격취득 확인서 등 본인에게 해당하는 증빙자료를 준비합니다.",
  },
  {
    title: "제출 방식 확인",
    description:
      "온라인 업로드, 방문, 우편 등 시험별 제출 방식을 확인하고 파일 형식과 원본 요구 여부를 살펴봅니다.",
  },
  {
    title: "접수번호와 제출내역 보관",
    description:
      "제출 완료 화면, 접수번호와 발송내역을 저장해 두면 누락이나 보완 요청이 있을 때 확인하기 쉽습니다.",
  },
  {
    title: "보완 요청 대응",
    description:
      "담당업무가 불명확하거나 기간 계산이 맞지 않으면 추가서류를 요구할 수 있으므로 심사 상태를 계속 확인합니다.",
  },
];

const FAQS = [
  {
    question: "졸업예정자도 응시할 수 있나요?",
    answer:
      "자격증과 등급에 따라 인정 여부와 기준일이 다릅니다. 졸업예정증명서 발급 가능 여부와 공식 시험공고의 인정 시점을 함께 확인해야 합니다.",
  },
  {
    question: "아르바이트나 계약직 경력도 인정되나요?",
    answer:
      "고용형태만으로 일괄 판단되지는 않으며 실제 근무기간과 담당업무, 증빙 가능 여부가 중요합니다. 시행기관의 인정 직무범위와 제출서류 기준을 확인하세요.",
  },
  {
    question: "경력증명서에 담당업무를 꼭 써야 하나요?",
    answer:
      "관련 직무경력인지 판단하려면 담당업무가 핵심입니다. 단순히 재직기간과 직급만 기재되어 있으면 보완 요청이나 불인정 가능성이 있습니다.",
  },
  {
    question: "서류를 늦게 제출하면 시험을 볼 수 있나요?",
    answer:
      "접수는 되었더라도 정해진 기간 안에 응시자격 심사를 완료하지 못하면 응시가 제한될 수 있습니다. 접수기간과 서류 제출기간을 별도로 관리하세요.",
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

export default function EligibilityDocumentsPage() {
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
            <span className="text-slate-900">응시자격·증빙</span>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">
            RESOURCE 02
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            응시자격·증빙
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            학력과 경력 조건부터 경력증명서, 서류 제출과 심사까지 접수 전에
            확인해야 할 핵심 사항을 단계별로 정리했습니다.
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
              응시자격은 자격증마다 다릅니다
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 md:text-base">
              이 페이지는 공통 확인 방법을 설명합니다. 실제 인정 기준, 기준일,
              제출서류와 심사기간은 반드시 해당 자격증의 시행기관 공고를 최종
              기준으로 확인해야 합니다.
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
              id="check"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                01. 응시자격 확인 방법
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                접수 전에 인정 가능 여부부터 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                시험공부를 시작했더라도 응시자격이 충족되지 않으면 접수나 최종
                응시가 제한될 수 있습니다. 종목명, 등급, 기준일과 제출기한을
                한 번에 확인하는 것이 중요합니다.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {CHECK_STEPS.map((step) => (
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
              id="conditions"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                02. 학력·경력 조건
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                조건의 종류를 먼저 구분하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                응시자격은 하나의 방법만 있는 것이 아니라 학력, 경력, 보유자격,
                교육훈련 등 여러 경로 중 하나를 충족하도록 구성되는 경우가 많습니다.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {CONDITION_TYPES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 p-5"
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

              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <strong className="text-sm font-black text-amber-900">
                  기간 계산 주의
                </strong>
                <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
                  경력 인정 시작일, 중복기간 처리와 기준일은 시험별로 다를 수
                  있습니다. 단순히 근무 개월 수만 계산하지 말고 공식 기준으로
                  인정기간을 확인하세요.
                </p>
              </div>
            </article>

            <article
              id="career-proof"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                03. 경력증명서 확인사항
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                재직기간보다 담당업무가 중요합니다
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                경력증명서는 단순 재직 사실뿐 아니라 해당 자격의 관련 직무를
                수행했는지 판단하는 자료입니다. 발급 전에 아래 항목이 빠지지
                않았는지 확인하세요.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {CAREER_PROOF_CHECKS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <CheckIcon />
                    <span className="text-sm font-black leading-6 text-slate-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-6 text-white">
                <h3 className="text-lg font-black">담당업무 작성 요령</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
                  “사무업무”, “현장업무”처럼 넓은 표현보다 실제 수행한 설계,
                  유지보수, 검사, 시공관리 등 구체적인 업무를 사실대로 기재하는
                  것이 심사에 도움이 됩니다.
                </p>
              </div>
            </article>
            <AdSlot label="자료실 본문 중단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1} />

            <article
              id="review"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                04. 서류 제출과 심사
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                제출 완료 후 심사상태까지 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                파일을 올리거나 우편을 보냈다고 바로 승인되는 것은 아닙니다.
                제출내역과 심사결과, 보완 요청 여부를 끝까지 확인해야 합니다.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {REVIEW_FLOW.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="text-xs font-black text-blue-600">
                      STEP {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-lg font-black text-slate-950">
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
              <span className="text-sm font-black text-blue-600">FAQ</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                자주 묻는 질문
              </h2>
              <div className="mt-7 grid gap-4">
                {FAQS.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <summary className="cursor-pointer list-none pr-6 text-base font-black text-slate-950">
                      {item.question}
                    </summary>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-slate-950 p-7 text-white md:p-9">
              <span className="text-xs font-black text-blue-300">다음 자료</span>
              <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
                원서접수와 시험일정도 함께 확인하세요
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
                응시자격을 확인했다면 접수기간, 서류 제출기간과 시험일을 한 번에
                정리해 접수 누락을 예방하세요.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/resources/application-schedule"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  원서접수·시험일정 보기
                  <ArrowIcon />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
                >
                  자료실 전체 보기
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
