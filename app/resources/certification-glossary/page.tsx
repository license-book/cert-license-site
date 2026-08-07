import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/common/AdSlot";

export const metadata: Metadata = {
  title: "자격증 용어사전 | 자격증 자료실 | 라북",
  description:
    "CBT와 PBT, NCS와 출제기준, 필답형·작업형·복합형, 국가공인·등록 민간자격 등 시험 공고에서 자주 쓰이는 용어를 쉽게 설명합니다.",
  alternates: {
    canonical: "/resources/certification-glossary",
  },
};

const CONTENTS = [
  { id: "cbt-pbt", number: "01", title: "CBT와 PBT" },
  { id: "ncs-criteria", number: "02", title: "NCS와 출제기준" },
  { id: "exam-types", number: "03", title: "필답형·작업형·복합형" },
  { id: "private-certification", number: "04", title: "국가공인·등록 민간자격" },
];

const CBT_PBT = [
  {
    term: "CBT",
    english: "Computer Based Test",
    description:
      "컴퓨터 화면에서 문제를 확인하고 마우스나 키보드로 답안을 입력하는 시험 방식입니다.",
    check:
      "문제 이동, 답안 수정, 남은 시간 표시와 제출 방법을 시험 전에 익혀두는 것이 좋습니다.",
  },
  {
    term: "PBT",
    english: "Paper Based Test",
    description:
      "종이 시험지와 답안지를 사용하는 시험 방식으로, OMR 카드에 답을 표시하는 경우가 많습니다.",
    check:
      "컴퓨터용 사인펜 사용 여부, 수정 방법과 답안지 작성 기준을 반드시 확인해야 합니다.",
  },
];

const NCS_TERMS = [
  {
    title: "NCS",
    description:
      "국가직무능력표준을 뜻합니다. 산업현장에서 직무를 수행하는 데 필요한 지식·기술·태도를 체계화한 기준입니다.",
  },
  {
    title: "출제기준",
    description:
      "시험에서 평가하는 과목, 세부 항목, 문제 수와 시험시간 등 출제 범위를 정리한 공식 기준입니다.",
  },
  {
    title: "시험과목",
    description:
      "필기나 실기에서 실제로 평가하는 과목명입니다. 과목별 문항 수와 합격기준이 다를 수 있습니다.",
  },
  {
    title: "검정방법",
    description:
      "객관식, 주관식, 필답형, 작업형처럼 시험을 평가하는 방식을 뜻합니다.",
  },
];

const EXAM_TYPES = [
  {
    title: "필답형",
    description:
      "문제의 답을 글이나 계산식으로 작성하는 방식입니다. 단답형, 서술형 또는 계산형 문제가 포함될 수 있습니다.",
  },
  {
    title: "작업형",
    description:
      "장비, 프로그램, 재료 또는 도구를 사용해 실제 과제를 수행하고 결과물을 평가받는 방식입니다.",
  },
  {
    title: "복합형",
    description:
      "필답형과 작업형을 함께 치르는 방식입니다. 두 시험의 점수를 합산하거나 각각 기준을 적용할 수 있습니다.",
  },
  {
    title: "구술형",
    description:
      "질문에 말로 답하거나 작업 과정과 판단 근거를 설명하는 방식입니다. 면접형 평가로 진행되기도 합니다.",
  },
];

const PRIVATE_TERMS = [
  {
    title: "등록 민간자격",
    description:
      "민간기관이 운영하는 자격을 관계 기관에 등록한 상태를 뜻합니다. 등록 자체가 정부의 품질 보증이나 국가공인을 의미하지는 않습니다.",
  },
  {
    title: "국가공인 민간자격",
    description:
      "등록 민간자격 중 우수한 자격을 정부가 심사해 공인한 자격입니다. 공인 범위와 유효기간을 함께 확인해야 합니다.",
  },
  {
    title: "국가자격",
    description:
      "법령에 따라 국가가 신설해 관리하는 자격입니다. 국가기술자격과 국가전문자격 등으로 구분됩니다.",
  },
  {
    title: "자격관리기관",
    description:
      "시험 시행, 접수, 합격자 관리와 자격증 발급 등을 담당하는 기관을 뜻합니다.",
  },
];

const FAQS = [
  {
    question: "CBT 시험은 시험이 끝나면 바로 점수를 알 수 있나요?",
    answer:
      "시험과 시행기관에 따라 다릅니다. 자동 채점이 가능한 객관식 시험은 즉시 점수가 표시되기도 하지만, 공식 합격 발표는 별도로 진행될 수 있습니다.",
  },
  {
    question: "NCS와 출제기준은 같은 뜻인가요?",
    answer:
      "같지 않습니다. NCS는 직무능력 기준이고, 출제기준은 실제 시험에서 무엇을 평가하는지 정리한 공식 문서입니다.",
  },
  {
    question: "작업형 시험은 반드시 현장에서만 치르나요?",
    answer:
      "대부분 지정 시험장에서 진행하지만, 자격과 과목에 따라 컴퓨터 프로그램을 사용하는 방식이나 제출형 과제로 운영될 수 있습니다.",
  },
  {
    question: "등록 민간자격은 모두 국가에서 인정한 자격인가요?",
    answer:
      "아닙니다. 등록은 민간자격 운영 사실을 행정적으로 관리하는 절차이며, 국가공인 여부와는 별개입니다.",
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

export default function CertificationGlossaryPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-4 md:px-6">
          <nav aria-label="현재 위치" className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="transition hover:text-blue-700">홈</Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources" className="transition hover:text-blue-700">자료실</Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900">자격증 용어사전</span>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">RESOURCE 06</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">자격증 용어사전</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            시험 공고와 자격정보에서 반복해서 등장하는 용어를 쉬운 말로 정리했습니다. 비슷해 보이는 용어의 차이와 실제 확인할 부분까지 함께 살펴보세요.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENTS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="rounded-2xl border border-white/15 bg-white/10 p-4 transition hover:bg-white/15">
                <span className="text-xs font-black text-blue-300">{item.number}</span>
                <strong className="mt-1 block text-sm font-black text-white">{item.title}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-14">
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8">
            <span className="text-sm font-black text-blue-700">먼저 확인하세요</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">용어의 뜻보다 해당 시험의 공식 공고가 우선입니다</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 md:text-base">
              같은 용어라도 시험별 운영 방식과 인정 범위가 다를 수 있습니다. 시험시간, 준비물, 합격기준과 자격 구분은 반드시 시행기관의 최신 공고와 자격 상세정보를 최종 기준으로 확인하세요.
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
                <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
                  <span className="text-xs text-slate-400">{item.number}</span>{item.title}
                </a>
              ))}
            </div>
            <Link href="/resources" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
              자료실로 돌아가기 <ArrowIcon />
            </Link>
          </aside>

          <div className="grid gap-8">
            <article id="cbt-pbt" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">01. CBT와 PBT</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">문제를 푸는 매체와 답안 제출 방식이 다릅니다</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">CBT는 컴퓨터, PBT는 종이 시험지를 사용하는 방식입니다. 시험 내용뿐 아니라 답안 수정과 제출 방법도 달라질 수 있습니다.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {CBT_PBT.map((item) => (
                  <div key={item.term} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <span className="text-xs font-black text-blue-600">{item.english}</span>
                    <h3 className="mt-2 text-xl font-black text-slate-950">{item.term}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                    <p className="mt-4 rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-700">확인할 점: {item.check}</p>
                  </div>
                ))}
              </div>
            </article>
            <AdSlot label="자료실 상단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} />

            <article id="ncs-criteria" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">02. NCS와 출제기준</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">직무 기준과 실제 시험 범위를 구분하세요</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">NCS는 직무 수행 기준이고, 출제기준은 시험에서 평가할 범위를 정리한 문서입니다. 공부를 시작할 때는 최신 출제기준을 먼저 확인하는 것이 중요합니다.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {NCS_TERMS.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="exam-types" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">03. 필답형·작업형·복합형</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">실기시험은 평가 방식에 따라 준비법이 달라집니다</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">같은 실기시험이라도 답안을 쓰는 시험인지, 실제 작업을 하는 시험인지에 따라 준비물과 연습 방법이 크게 달라집니다.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {EXAM_TYPES.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">복합형 시험은 필답형과 작업형의 배점, 시험시간과 과락 기준이 다를 수 있으므로 반드시 종목별 시험정보를 확인하세요.</div>
            </article>
            <AdSlot label="자료실 본문 중단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1} />

            <article id="private-certification" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">04. 국가공인·등록 민간자격</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">등록 여부와 국가공인 여부는 서로 다른 정보입니다</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">민간자격을 확인할 때는 등록번호만 보지 말고 국가공인 여부, 공인 범위, 운영기관과 현재 등록 상태를 함께 확인해야 합니다.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {PRIVATE_TERMS.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <AdSlot label="자료실 하단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">FAQ</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">용어사전 자주 묻는 질문</h2>
              <div className="mt-6 grid gap-4">
                {FAQS.map((item) => (
                  <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <summary className="cursor-pointer list-none pr-6 text-base font-black text-slate-950">{item.question}</summary>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-slate-950 p-6 text-white md:p-8">
              <span className="text-xs font-black text-blue-300">관련 자료</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight">시험 방식과 자격 구분을 더 확인하세요</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/resources/cbt-exam-format" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700">CBT·시험방식 <ArrowIcon /></Link>
                <Link href="/resources/eligibility-documents" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15">응시자격·증빙 <ArrowIcon /></Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
