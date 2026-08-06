import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "원서접수·시험일정 | 자격증 자료실 | 라북",
  description:
    "자격시험 원서접수 절차, 시험일정 확인 방법, 접수 사진 준비, 응시료와 환불 확인사항을 단계별로 안내합니다.",
  alternates: {
    canonical: "/resources/application-schedule",
  },
};

const CONTENTS = [
  { id: "application", number: "01", title: "원서접수 절차" },
  { id: "schedule", number: "02", title: "시험일정 확인 방법" },
  { id: "photo", number: "03", title: "접수 사진 준비" },
  { id: "refund", number: "04", title: "응시료·환불 확인" },
];

const APPLICATION_STEPS = [
  {
    number: "01",
    title: "시험 시행기관 확인",
    description:
      "같은 분야의 자격증이라도 시행기관이 다를 수 있습니다. 자격증 상세페이지와 공식 시험공고에서 접수기관을 먼저 확인합니다.",
  },
  {
    number: "02",
    title: "회원정보와 사진 준비",
    description:
      "접수 시작 전에 회원가입, 본인인증, 연락처와 사진 등록을 마쳐두면 접수 당일 입력 시간을 줄일 수 있습니다.",
  },
  {
    number: "03",
    title: "종목·등급·지역 선택",
    description:
      "응시할 자격증명과 등급을 다시 확인하고, 이동 가능한 지역과 시험장을 선택합니다. 비슷한 종목명이나 등급을 잘못 고르지 않도록 주의합니다.",
  },
  {
    number: "04",
    title: "시험일과 시험장 확인",
    description:
      "접수 화면에서 시험일, 입실시간, 시험장 위치를 확인합니다. 실기시험은 시험장마다 일정과 준비물이 달라질 수 있습니다.",
  },
  {
    number: "05",
    title: "응시료 결제",
    description:
      "결제 완료 화면과 접수번호가 확인되어야 정상 접수입니다. 결제 도중 창을 닫았다면 접수내역에서 완료 여부를 다시 확인합니다.",
  },
  {
    number: "06",
    title: "접수내역·수험표 재확인",
    description:
      "접수 후에는 마이페이지에서 종목, 시험일, 시험장, 결제상태를 확인하고 시험 전 수험표와 공지사항을 다시 살펴봅니다.",
  },
];

const SCHEDULE_CHECKS = [
  "원서접수 시작일과 마감일",
  "접수 마감시간",
  "응시자격 서류 제출기간",
  "필기시험일과 합격자 발표일",
  "실기시험 접수기간과 시험기간",
  "최종합격 발표일",
];

const BEFORE_APPLICATION = [
  "응시하려는 자격증명과 등급이 맞는지 확인",
  "응시자격 제한과 서류 제출 여부 확인",
  "사용 가능한 증명사진 등록",
  "접수할 지역과 대체 시험장 미리 정하기",
  "결제수단 준비",
  "휴대전화 번호와 이메일 주소 확인",
];

const FAQS = [
  {
    question: "접수 시작일에 꼭 신청해야 하나요?",
    answer:
      "반드시 첫날에 해야 하는 것은 아니지만 원하는 지역이나 시험장 좌석이 조기에 마감될 수 있습니다. 시험장 선택이 중요하다면 접수 시작 전에 로그인과 사진 등록을 끝내두는 것이 좋습니다.",
  },
  {
    question: "접수 후 시험장이나 시험일을 바꿀 수 있나요?",
    answer:
      "변경 가능 여부와 기간은 시행기관 및 시험별로 다릅니다. 접수기간 중에는 취소 후 다시 접수해야 하는 경우도 있으므로 공식 접수안내를 확인해야 합니다.",
  },
  {
    question: "결제했는데 접수완료 문자가 오지 않았습니다.",
    answer:
      "문자 수신 여부만으로 판단하지 말고 시행기관 홈페이지의 접수내역에서 결제상태, 접수번호, 시험장 배정 여부를 확인하세요.",
  },
  {
    question: "시험일정이 바뀔 수도 있나요?",
    answer:
      "기관 사정, 시험장 운영, 재난·재해 등의 사유로 일정이나 장소가 변경될 수 있습니다. 시험 직전에는 공식 공지와 접수내역을 다시 확인하는 것이 안전합니다.",
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

export default function ApplicationSchedulePage() {
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
            <Link
              href="/resources"
              className="transition hover:text-blue-700"
            >
              자료실
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900">원서접수·시험일정</span>
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">
            RESOURCE 01
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            원서접수·시험일정
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            자격시험 접수 전 준비부터 시험일정 확인, 사진 등록, 응시료와
            환불 확인까지 접수 과정에서 놓치기 쉬운 내용을 순서대로
            정리했습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-black text-blue-100">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              접수 절차 6단계
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              일정 확인 체크리스트
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              접수 실수 예방
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENTS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-xs font-black text-blue-600">
                  {item.number}
                </span>
                <strong className="text-sm font-black text-slate-800 group-hover:text-blue-800">
                  {item.title}
                </strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 md:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <article
              id="application"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                01. 원서접수 절차
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                접수는 이 순서로 진행하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                시험마다 화면 구성은 달라도 기본 흐름은 비슷합니다. 접수
                시작 전에 필요한 정보를 준비해 두고, 결제 후 접수내역까지
                확인해야 정상적으로 완료됩니다.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {APPLICATION_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">
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

              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <strong className="text-sm font-black text-amber-900">
                  접수 완료 판단 기준
                </strong>
                <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
                  결제 화면을 통과한 것만으로 끝내지 말고, 마이페이지에
                  접수번호와 결제완료 상태가 표시되는지 반드시 확인하세요.
                </p>
              </div>
            </article>

            <article
              id="schedule"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                02. 시험일정 확인 방법
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                시험일 하나만 보면 부족합니다
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                시험 준비 일정은 원서접수, 서류 제출, 필기, 실기, 합격자
                발표까지 하나의 흐름으로 확인해야 합니다. 특히 접수기간과
                서류 제출기간은 서로 다를 수 있습니다.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {SCHEDULE_CHECKS.map((item) => (
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
                <h3 className="text-lg font-black">일정 관리 요령</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
                  공식 공고를 확인한 날 바로 접수 시작일, 마감일, 시험일,
                  발표일을 휴대전화 달력에 저장하세요. 마감 알림은 당일이
                  아니라 최소 하루 전에 설정하는 것이 안전합니다.
                </p>
              </div>
            </article>

            <article
              id="photo"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                03. 접수 사진 준비
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                본인 확인이 가능한 사진을 사용하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                사진 규격은 시행기관마다 다를 수 있으므로 접수 화면에 표시된
                파일 형식과 크기를 우선 적용해야 합니다. 오래된 사진이나
                얼굴 식별이 어려운 사진은 시험 당일 본인 확인에 문제가 될 수
                있습니다.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <h3 className="text-lg font-black text-emerald-900">
                    권장하는 사진
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-emerald-800">
                    <li>• 최근 촬영하여 현재 얼굴과 차이가 적은 사진</li>
                    <li>• 얼굴 정면이 선명하게 보이는 사진</li>
                    <li>• 배경과 얼굴이 구분되는 사진</li>
                    <li>• 시행기관이 요구하는 파일 형식과 용량을 맞춘 사진</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                  <h3 className="text-lg font-black text-rose-900">
                    피해야 할 사진
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-rose-800">
                    <li>• 여러 사람이 함께 나온 사진</li>
                    <li>• 얼굴 일부가 가려지거나 지나치게 보정된 사진</li>
                    <li>• 해상도가 낮아 얼굴 확인이 어려운 사진</li>
                    <li>• 신분증 사진과 현재 모습의 차이가 큰 오래된 사진</li>
                  </ul>
                </div>
              </div>
            </article>

            <article
              id="refund"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                04. 응시료·환불 확인
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                결제 전에 취소 기준까지 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                응시료와 환불 비율, 취소 가능 기간은 시험과 시행기관에 따라
                달라질 수 있습니다. 일정이 확정되지 않았다면 접수 전에 환불
                기준을 먼저 읽어두는 것이 좋습니다.
              </p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-[120px_1fr] border-b border-slate-200 bg-slate-100 text-sm font-black text-slate-800 md:grid-cols-[180px_1fr]">
                  <div className="px-4 py-3">확인 항목</div>
                  <div className="border-l border-slate-200 px-4 py-3">
                    확인할 내용
                  </div>
                </div>
                {[
                  ["응시료", "필기와 실기의 응시료가 각각 얼마인지 확인"],
                  ["취소기한", "언제까지 온라인 취소가 가능한지 확인"],
                  ["환불비율", "취소 시점에 따라 전액 또는 일부 환불인지 확인"],
                  ["환불방법", "결제수단 취소 또는 계좌 환불 방식인지 확인"],
                  ["예외사유", "시험 연기·취소나 특별사유의 별도 기준 확인"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="grid grid-cols-[120px_1fr] border-b border-slate-200 text-sm last:border-b-0 md:grid-cols-[180px_1fr]"
                  >
                    <strong className="bg-slate-50 px-4 py-4 text-slate-900">
                      {title}
                    </strong>
                    <span className="border-l border-slate-200 px-4 py-4 font-semibold leading-6 text-slate-600">
                      {description}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm font-semibold leading-6 text-slate-500">
                ※ 실제 응시료와 환불 기준은 변경될 수 있으므로 결제 직전
                시행기관의 접수안내와 공고문을 최종 기준으로 확인하세요.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">
                접수 전 최종 점검
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                1분 체크리스트
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {BEFORE_APPLICATION.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm font-bold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">FAQ</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                자주 묻는 질문
              </h2>
              <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-900">
                      {faq.question}
                      <span className="text-xl text-blue-600 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 pr-8 text-sm font-semibold leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-black text-blue-600">
                이 페이지 핵심
              </span>
              <h2 className="mt-2 text-xl font-black text-slate-950">
                접수 완료 후에도 다시 확인
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                시험일, 시험장, 입실시간과 준비물은 접수 직후 한 번, 시험
                직전 한 번 더 확인하세요.
              </p>
            </div>

            <div className="rounded-3xl bg-blue-600 p-6 text-white">
              <span className="text-xs font-black text-blue-100">
                다음 자료
              </span>
              <h2 className="mt-2 text-xl font-black">응시자격·증빙</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-blue-100">
                학력·경력 조건과 제출서류 확인 방법을 이어서 정리할
                예정입니다.
              </p>
              <Link
                href="/resources#resource-categories"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-blue-700"
              >
                자료실로 돌아가기
                <ArrowIcon />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">
                공식 정보 우선
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                시험일정, 응시료, 환불, 사진 규격은 변경될 수 있습니다.
                실제 접수 시에는 시행기관의 최신 공고와 접수화면을 최종
                기준으로 확인하세요.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-6 md:py-14">
          <div>
            <span className="text-xs font-black text-blue-300">
              자격증별 시험정보가 필요하다면
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">
              자격증 상세페이지에서 확인하세요
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300 md:text-base">
              시험과목, 응시자격, 공부기간과 공식 출처는 각 자격증
              상세페이지에 맞춰 제공됩니다.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
          >
            자격증 검색하기
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
