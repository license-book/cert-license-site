import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "발급·확인서 | 자격증 자료실 | 라북",
  description:
    "자격증 발급 방법, 합격확인서 출력, 자격증 재발급과 자격취득사항 확인 방법을 안내합니다.",
  alternates: {
    canonical: "/resources/certificate-issuance",
  },
};

const CONTENTS = [
  { id: "issuance", number: "01", title: "자격증 발급 방법" },
  { id: "pass-certificate", number: "02", title: "합격확인서 출력" },
  { id: "reissue", number: "03", title: "자격증 재발급" },
  { id: "qualification-check", number: "04", title: "자격취득사항 확인" },
];

const ISSUANCE_STEPS = [
  {
    title: "합격 여부 확인",
    description:
      "최종 합격자 발표일 이후 시행기관 홈페이지에서 합격 여부와 자격 취득 상태를 확인합니다.",
  },
  {
    title: "발급 방식 선택",
    description:
      "상장형, 수첩형, 카드형 또는 전자증명서 등 기관에서 제공하는 발급 방식을 확인합니다.",
  },
  {
    title: "신청정보 입력",
    description:
      "수령 주소, 연락처와 신청 수량을 입력하고 사진이나 추가 서류가 필요한지 확인합니다.",
  },
  {
    title: "수수료 결제·수령",
    description:
      "발급 및 배송 수수료를 결제한 뒤 우편 수령 또는 온라인 출력을 진행합니다.",
  },
];

const PASS_CERTIFICATE_CHECKS = [
  "최종 합격자 발표가 완료되었는지",
  "확인서에 자격명과 합격일자가 정확히 표시되는지",
  "제출처에서 합격확인서를 인정하는지",
  "출력 문서의 진위확인번호 또는 발급번호가 보이는지",
  "제출용 파일 저장이 필요한 경우 PDF 저장이 가능한지",
  "개인정보가 포함된 문서를 안전하게 보관하는지",
];

const REISSUE_REASONS = [
  {
    title: "분실·훼손",
    description:
      "기존 자격증을 잃어버렸거나 내용 확인이 어려울 정도로 훼손된 경우 재발급을 신청합니다.",
  },
  {
    title: "성명·정보 변경",
    description:
      "개명 등으로 표시 정보가 바뀐 경우 증빙서류 제출 여부와 변경 절차를 확인합니다.",
  },
  {
    title: "추가 제출용",
    description:
      "회사나 기관 제출을 위해 추가 원본이 필요한 경우 발급 가능 수량과 제출 방식을 확인합니다.",
  },
  {
    title: "형태 변경",
    description:
      "상장형, 수첩형 또는 전자증명서처럼 다른 형태로 다시 발급할 수 있는지 확인합니다.",
  },
];

const QUALIFICATION_USES = [
  {
    title: "취업·이력서 제출",
    description:
      "자격 취득 사실을 증명할 때는 제출처가 요구하는 확인서 종류와 유효한 출력 방식을 확인합니다.",
  },
  {
    title: "회사·기관 조회",
    description:
      "일부 기관은 발급번호나 진위확인 기능으로 자격 취득 여부를 확인할 수 있습니다.",
  },
  {
    title: "학점·경력 인정",
    description:
      "학점, 승진, 수당 또는 응시자격 증빙에 사용할 때는 인정 기준일과 자격 상태를 함께 확인합니다.",
  },
  {
    title: "본인 이력 관리",
    description:
      "여러 자격을 보유한 경우 취득일, 발급기관과 자격번호를 따로 정리해 두면 제출할 때 편리합니다.",
  },
];

const FAQS = [
  {
    question: "합격하면 자격증이 자동으로 배송되나요?",
    answer:
      "시험과 시행기관에 따라 다릅니다. 합격 후 별도로 발급을 신청해야 하는 경우가 많으므로 합격자 안내에서 신청 여부를 확인하세요.",
  },
  {
    question: "합격확인서와 자격증은 같은 문서인가요?",
    answer:
      "다릅니다. 합격확인서는 시험 합격 사실을 확인하는 문서이고, 자격증 또는 자격취득확인서는 정식 자격 취득 사실을 증명하는 용도로 사용됩니다.",
  },
  {
    question: "온라인으로 출력한 확인서도 제출할 수 있나요?",
    answer:
      "제출처 기준에 따라 달라집니다. 온라인 발급 문서에 진위확인번호가 있더라도 원본, 전자문서 또는 최근 발급본을 요구할 수 있습니다.",
  },
  {
    question: "자격증을 분실하면 자격 효력도 없어지나요?",
    answer:
      "일반적으로 자격증 실물을 분실해도 취득 자격 자체가 사라지는 것은 아닙니다. 시행기관에서 취득 사실을 확인하고 재발급을 신청할 수 있습니다.",
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

export default function CertificateIssuancePage() {
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
            <span className="text-slate-900">발급·확인서</span>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-blue-200">
            RESOURCE 05
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            발급·확인서
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            합격 이후 자격증을 발급받는 방법부터 합격확인서, 재발급과
            자격취득사항 확인까지 필요한 절차를 한 번에 살펴보세요.
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
            <span className="text-sm font-black text-blue-700">
              먼저 확인하세요
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              발급 방식과 문서 명칭은 시행기관마다 다릅니다
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 md:text-base">
              이 페이지는 공통 절차를 설명합니다. 발급 가능 시점, 문서 형태,
              수수료와 제출 효력은 반드시 해당 자격 시행기관의 합격자 안내와
              발급 메뉴를 최종 기준으로 확인하세요.
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
            <article
              id="issuance"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                01. 자격증 발급 방법
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                합격 확인 후 발급 방식과 신청 절차를 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                자격증은 자동으로 발급되지 않고 별도 신청이 필요한 경우가
                많습니다. 합격자 안내에서 발급 가능일과 신청 메뉴를 먼저
                확인하는 것이 좋습니다.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {ISSUANCE_STEPS.map((item, index) => (
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
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
                자격증 수령 주소와 영문 성명 등 발급정보를 잘못 입력하면
                재발급 비용이 발생할 수 있으므로 결제 전에 다시 확인하세요.
              </div>
            </article>

            <article
              id="pass-certificate"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                02. 합격확인서 출력
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                제출 목적과 문서 종류를 먼저 구분하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                합격확인서는 최종 합격 사실을 빠르게 증명할 때 유용하지만,
                제출처에서 자격취득확인서나 자격증 사본을 요구할 수도 있습니다.
              </p>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {PASS_CERTIFICATE_CHECKS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700"
                  >
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article
              id="reissue"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                03. 자격증 재발급
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                분실·훼손·정보 변경 사유에 맞춰 신청하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                재발급 신청 전에는 본인인증 수단, 증명사진, 변경 증빙서류와
                발급·배송 수수료가 필요한지 확인하세요.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {REISSUE_REASONS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <h3 className="text-lg font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article
              id="qualification-check"
              className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-sm font-black text-blue-600">
                04. 자격취득사항 확인
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                취득일과 자격 상태를 정확히 확인하세요
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 md:text-base">
                취업, 학점, 승진 또는 다른 시험의 응시자격 증빙에 사용할
                때는 자격명뿐 아니라 취득일과 발급기관도 함께 확인해야 합니다.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {QUALIFICATION_USES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <h3 className="text-lg font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <span className="text-sm font-black text-blue-600">
                자주 묻는 질문
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                발급·확인서 FAQ
              </h2>
              <div className="mt-6 grid gap-4">
                {FAQS.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <h3 className="font-black text-slate-950">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <section className="rounded-3xl bg-slate-950 p-6 text-white md:p-8">
              <span className="text-sm font-black text-blue-300">
                함께 확인하면 좋은 자료
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                시험 당일과 응시자격 자료도 함께 확인하세요
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/resources/exam-day-checklist"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  시험장·준비물 <ArrowIcon />
                </Link>
                <Link
                  href="/resources/eligibility-documents"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
                >
                  응시자격·증빙 <ArrowIcon />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
