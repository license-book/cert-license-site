import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/common/AdSlot";

export const metadata: Metadata = {
  title: "시험장·준비물 | 자격증 자료실 | 라북",
  description:
    "자격시험 당일 준비물, 인정 신분증, 입실·퇴실 기준과 실기시험 장비·복장 확인사항을 안내합니다.",
  alternates: {
    canonical: "/resources/exam-day-checklist",
  },
};

const CONTENTS = [
  { id: "checklist", number: "01", title: "시험 당일 준비물" },
  { id: "identification", number: "02", title: "신분증 인정 범위" },
  { id: "entry-exit", number: "03", title: "입실시간과 퇴실 기준" },
  { id: "practical", number: "04", title: "실기시험 장비와 복장" },
];

const BASIC_ITEMS = [
  {
    title: "신분증",
    description:
      "시험기관이 인정하는 실물 신분증을 준비합니다. 모바일 신분증 인정 여부는 시험별 공고를 확인해야 합니다.",
  },
  {
    title: "수험표·접수정보",
    description:
      "수험번호, 시험장, 입실시간과 좌석 안내를 미리 확인합니다. 수험표 출력 필요 여부도 함께 확인하세요.",
  },
  {
    title: "필기구와 계산도구",
    description:
      "검은색 필기구, 수정도구, 계산기 등 허용 품목은 시험방식과 종목마다 다르므로 수험자 안내를 기준으로 준비합니다.",
  },
  {
    title: "개인 준비물",
    description:
      "안경, 상비약, 겉옷처럼 시험에 방해되지 않는 개인 물품을 챙기되 전자기기 반입·보관 규정을 확인합니다.",
  },
];

const ID_CHECKS = [
  "사진과 성명, 생년월일 등으로 본인 확인이 가능한지",
  "유효기간이 지나지 않았는지",
  "훼손되거나 사진을 식별하기 어려운 상태가 아닌지",
  "모바일 신분증·학생증·자격증의 인정 여부",
  "미성년자나 군인 등 대상별 대체 신분증 기준",
  "시험기관 공고에 적힌 인정 신분증 목록과 일치하는지",
];

const TIME_RULES = [
  {
    title: "시험장 도착",
    description:
      "낯선 시험장이라면 교통편과 주차 여부를 미리 확인하고, 입실 마감보다 충분히 일찍 도착하는 것이 안전합니다.",
  },
  {
    title: "입실 마감",
    description:
      "입실 마감 이후에는 시험장에 도착해도 응시가 제한될 수 있습니다. 시험 시작시간과 입실 마감시간을 구분해 확인하세요.",
  },
  {
    title: "시험 진행",
    description:
      "휴대전화와 전자기기는 감독관 지시에 따라 전원을 끄고 보관합니다. 허가 없이 사용하면 부정행위로 처리될 수 있습니다.",
  },
  {
    title: "중도 퇴실",
    description:
      "시험마다 퇴실 가능 시점과 답안 제출 절차가 다릅니다. 임의로 자리에서 일어나지 말고 감독관 안내를 따르세요.",
  },
];

const PRACTICAL_CHECKS = [
  {
    title: "지참 공구·재료",
    description:
      "공구명, 규격, 수량과 사용 가능 범위를 확인합니다. 목록에 없는 장비는 사용이 제한될 수 있습니다.",
  },
  {
    title: "작업복과 보호구",
    description:
      "안전화, 보안경, 장갑, 위생복 등 종목별 안전·위생 복장을 준비하고 착용 기준을 확인합니다.",
  },
  {
    title: "프로그램과 저장매체",
    description:
      "컴퓨터 작업형은 시험장 프로그램 버전과 저장·제출 방식을 확인합니다. 개인 USB 사용은 허용되지 않는 경우가 많습니다.",
  },
  {
    title: "작동 상태 점검",
    description:
      "시험 시작 전 지급 장비와 프로그램 이상 여부를 확인하고 문제가 있으면 즉시 감독관에게 알립니다.",
  },
];

const FAQS = [
  {
    question: "수험표를 꼭 출력해야 하나요?",
    answer:
      "시험별로 출력 여부가 다릅니다. 수험표를 지참하지 않아도 되는 시험이 있지만 시험장, 시간과 수험번호 확인을 위해 미리 저장하거나 출력해 두는 것이 좋습니다.",
  },
  {
    question: "휴대전화는 시험장에 가져가도 되나요?",
    answer:
      "반입은 가능해도 시험 중 소지하거나 사용하는 것은 제한될 수 있습니다. 반드시 전원을 끄고 감독관이 안내한 장소에 보관하세요.",
  },
  {
    question: "계산기는 아무 제품이나 사용할 수 있나요?",
    answer:
      "아닙니다. 허용 기종이나 기능 제한이 있는 시험이 있으므로 해당 시험의 수험자 지참 준비물과 계산기 기준을 확인해야 합니다.",
  },
  {
    question: "실기시험 준비물을 빠뜨리면 빌릴 수 있나요?",
    answer:
      "시험장에서 대여하지 않는 경우가 많습니다. 지참 준비물 누락으로 작업을 완료하지 못할 수 있으므로 전날 목록을 기준으로 다시 점검하세요.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

export default function ExamDayChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-4 md:px-6">
          <nav aria-label="현재 위치" className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="transition hover:text-blue-700">홈</Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources" className="transition hover:text-blue-700">자료실</Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900">시험장·준비물</span>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">RESOURCE 04</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">시험장·준비물</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            시험 당일 빠뜨리기 쉬운 준비물부터 신분증, 입실시간과 실기시험 장비·복장까지 한 번에 점검하세요.
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
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">준비물과 입실 기준은 시험마다 다릅니다</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 md:text-base">
              이 페이지는 공통 체크 기준을 설명합니다. 인정 신분증, 계산기, 공구, 복장과 입실시간은 반드시 해당 시행기관의 시험공고와 수험자 안내를 최종 기준으로 확인하세요.
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
            <article id="checklist" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">01. 시험 당일 준비물</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">전날 한 번, 출발 전 한 번 확인하세요</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">준비물 누락은 시험장에 도착한 뒤 해결하기 어렵습니다. 공식 안내에 적힌 품목을 기준으로 개인 체크리스트를 만들어 확인하는 것이 안전합니다.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {BASIC_ITEMS.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
                시험 전날에는 신분증과 필수 장비를 가방에 넣고, 출발 전에는 시험장 주소·입실시간·교통편을 다시 확인하세요.
              </div>
            </article>
            <AdSlot label="자료실 상단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} />

            <article id="identification" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">02. 신분증 인정 범위</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">본인 확인이 되지 않으면 응시가 제한될 수 있습니다</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">주민등록증, 운전면허증, 여권처럼 일반적으로 사용하는 신분증도 유효기간이나 시험기관 기준에 따라 인정 여부가 달라질 수 있습니다.</p>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {ID_CHECKS.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700"><CheckIcon />{item}</li>
                ))}
              </ul>
            </article>

            <article id="entry-exit" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">03. 입실시간과 퇴실 기준</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">시험 시작시간보다 입실 마감시간을 먼저 확인하세요</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {TIME_RULES.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
            <AdSlot label="자료실 본문 중단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1} />

            <article id="practical" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">04. 실기시험 장비와 복장</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">종목별 지참 준비물과 안전기준을 확인하세요</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">작업형 시험은 준비물뿐 아니라 규격, 사용 가능 여부와 복장 기준까지 평가에 영향을 줄 수 있습니다.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {PRACTICAL_CHECKS.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <AdSlot label="자료실 하단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">자주 묻는 질문</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">시험 당일 FAQ</h2>
              <div className="mt-6 grid gap-4">
                {FAQS.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-black text-slate-950">{item.question}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </article>

            <section className="rounded-3xl bg-slate-950 p-6 text-white md:p-8">
              <span className="text-sm font-black text-blue-300">함께 확인하면 좋은 자료</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">시험방식과 접수정보도 함께 확인하세요</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/resources/cbt-exam-format" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700">CBT·시험방식 <ArrowIcon /></Link>
                <Link href="/resources/application-schedule" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15">원서접수·시험일정 <ArrowIcon /></Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
