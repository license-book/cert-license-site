import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/common/AdSlot";

export const metadata: Metadata = {
  title: "제도변경·공지 | 자격증 자료실 | 라북",
  description:
    "자격시험의 출제기준, 응시자격, 시험방식과 자격제도 공지가 변경될 때 확인해야 할 항목과 대응 방법을 안내합니다.",
  alternates: {
    canonical: "/resources/regulation-updates",
  },
};

const CONTENTS = [
  { id: "exam-standard", number: "01", title: "출제기준 변경" },
  { id: "eligibility", number: "02", title: "응시자격 변경" },
  { id: "exam-method", number: "03", title: "시험방식 변경" },
  { id: "major-notices", number: "04", title: "자격제도 주요 공지" },
];

const CHANGE_CHECKLIST = [
  "공지 제목만 보지 말고 적용 시점과 대상 종목 확인",
  "현재 준비 중인 시험 회차에 적용되는지 확인",
  "필기와 실기 중 어느 시험에 해당하는지 구분",
  "변경 전·후 내용을 표나 첨부파일에서 비교",
  "교재와 강의가 최신 출제기준을 반영했는지 확인",
  "시험 직전 시행기관의 최신 공지를 다시 확인",
];

const NOTICE_TYPES = [
  {
    title: "시행계획 공고",
    description:
      "연간 시험 일정, 접수 기간, 시험일과 합격자 발표일처럼 한 해의 기본 운영계획을 안내합니다.",
  },
  {
    title: "출제기준 개정",
    description:
      "시험과목, 주요 항목, 세부 출제범위와 적용기간이 달라질 때 게시됩니다.",
  },
  {
    title: "응시자격 안내",
    description:
      "학력·경력 인정 범위, 제출서류, 서류심사 절차와 인정 기준의 변경사항을 안내합니다.",
  },
  {
    title: "시험 운영 변경",
    description:
      "CBT 전환, 시험시간, 문제 수, 답안 제출, 실기 장비와 시험장 운영 방식이 달라질 때 확인합니다.",
  },
];

const FAQS = [
  {
    question: "출제기준이 바뀌면 기존 교재를 사용할 수 없나요?",
    answer:
      "전체 내용을 새로 공부해야 하는 것은 아닙니다. 먼저 변경된 과목과 세부 항목을 비교한 뒤, 추가·삭제된 범위만 보완하세요. 다만 적용 회차가 가까우면 최신 교재나 시행기관 자료를 함께 확인하는 것이 안전합니다.",
  },
  {
    question: "제도 변경은 발표 즉시 적용되나요?",
    answer:
      "공지마다 적용 시점이 다릅니다. 발표일과 시행일이 다를 수 있으므로 반드시 적용 연도, 회차와 대상 종목을 확인해야 합니다.",
  },
  {
    question: "블로그나 카페의 변경 안내를 믿어도 되나요?",
    answer:
      "참고용으로는 볼 수 있지만 최종 판단은 시행기관의 공고 원문과 첨부파일을 기준으로 해야 합니다. 게시글 작성일과 공고 번호도 함께 확인하세요.",
  },
  {
    question: "시험 직전에 변경 공지가 나올 수도 있나요?",
    answer:
      "시험장, 준비물, 운영시간처럼 현장 안내는 시험 전에도 바뀔 수 있습니다. 수험표를 출력한 뒤에도 시험 전날까지 시행기관 공지와 문자 안내를 확인하세요.",
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

export default function RegulationUpdatesPage() {
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
            <span className="text-slate-900">제도변경·공지</span>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">
            RESOURCE 08
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            제도변경·공지
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            자격시험 제도는 출제기준, 응시자격과 시험 운영 방식이 바뀔 수 있습니다. 공지를 확인할 때 놓치기 쉬운 핵심 항목과 대응 방법을 정리했습니다.
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
            <span className="text-sm font-black text-blue-700">가장 중요한 기준</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              공지의 발표일보다 적용 시점을 먼저 확인하세요
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 md:text-base">
              같은 공지라도 현재 접수한 회차에는 적용되지 않고 다음 연도나 특정 회차부터 적용될 수 있습니다. 공고문에서 적용 대상, 시행일과 유예기간을 반드시 확인하세요.
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
            <article id="exam-standard" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">01. 출제기준 변경</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                과목명보다 세부 출제범위의 변화를 비교하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                출제기준은 시험에서 평가하는 과목, 주요 항목과 세부 항목을 정리한 기준입니다. 과목명이 같아도 세부 내용이 추가되거나 삭제될 수 있습니다.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-950">확인할 내용</h3>
                  <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-slate-600">
                    <li>• 적용기간과 적용 회차</li>
                    <li>• 과목 신설·통합·폐지 여부</li>
                    <li>• 주요 항목과 세부 항목 변경</li>
                    <li>• 문제 수와 배점 변화</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-950">공부자료 점검</h3>
                  <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-slate-600">
                    <li>• 교재 출간연도 확인</li>
                    <li>• 강의 업데이트 여부 확인</li>
                    <li>• 기출문제 적용 회차 구분</li>
                    <li>• 추가된 범위 별도 보완</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
                출제기준 개정 공지가 나와도 기존 기출문제가 모두 무효가 되는 것은 아닙니다. 유지되는 범위와 바뀐 범위를 나누어 준비하세요.
              </div>
            </article>
            <AdSlot label="자료실 상단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} />

            <article id="eligibility" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">02. 응시자격 변경</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                학력·경력 인정 기준과 제출서류를 다시 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                응시자격 변경은 인정 학과, 유사 직무분야, 경력기간과 증빙서류에 영향을 줄 수 있습니다. 예전에 응시 가능했던 사례만으로 판단하지 마세요.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-black text-slate-950">변경 여부 확인</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    자격등급, 전공, 졸업 상태, 실무경력과 보유 자격을 현재 기준으로 다시 대조합니다.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-black text-slate-950">서류 준비</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    경력증명서의 담당업무, 근무기간, 발급일과 직인 등 인정요건이 달라졌는지 확인합니다.
                  </p>
                </div>
              </div>
              <Link
                href="/resources/eligibility-documents"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
              >
                응시자격·증빙 자료 보기 <ArrowIcon />
              </Link>
            </article>

            <article id="exam-method" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">03. 시험방식 변경</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                시험 형태가 바뀌면 연습 방법도 함께 바꿔야 합니다
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                지필시험의 CBT 전환, 필답형과 작업형 비중 조정, 시험시간과 문제 수 변경은 실제 풀이 전략에 직접 영향을 줍니다.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["CBT 전환", "화면 이동, 답안 선택, 검토 기능과 제출 절차를 미리 익힙니다."],
                  ["시험시간 변경", "문항당 사용할 시간을 다시 계산하고 모의시험 시간을 맞춥니다."],
                  ["실기방식 변경", "프로그램 버전, 장비, 작업순서와 제출 형식을 확인합니다."],
                  ["배점 변경", "과목별 비중과 과락 기준을 확인해 공부 우선순위를 조정합니다."],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/resources/cbt-exam-format"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-100"
              >
                CBT·시험방식 자료 보기 <ArrowIcon />
              </Link>
            </article>
            <AdSlot label="자료실 본문 중단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1} />

            <article id="major-notices" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">04. 자격제도 주요 공지</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                공지 종류를 구분하면 필요한 내용을 더 빨리 찾을 수 있습니다
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {NOTICE_TYPES.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-black text-slate-950">공지 확인 체크리스트</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {CHANGE_CHECKLIST.map((item) => (
                    <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-600">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <AdSlot label="자료실 하단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">자주 묻는 질문</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                제도변경·공지 FAQ
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
              <span className="text-sm font-black text-blue-300">관련 자료</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                변경된 제도에 맞춰 준비과정을 다시 점검하세요
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/resources/exam-agencies" className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:bg-white/15">
                  <strong className="block font-black">시행기관 안내</strong>
                  <span className="mt-2 block text-sm font-semibold leading-6 text-slate-300">공식 공고를 확인할 시행기관을 찾습니다.</span>
                </Link>
                <Link href="/resources/application-schedule" className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:bg-white/15">
                  <strong className="block font-black">원서접수·시험일정</strong>
                  <span className="mt-2 block text-sm font-semibold leading-6 text-slate-300">변경된 일정과 접수사항을 다시 확인합니다.</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
