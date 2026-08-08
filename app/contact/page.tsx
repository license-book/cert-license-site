import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의 | 라북 LABOOK",
  description: "라북 사이트 이용, 자격증 정보 오류 제보 및 기타 문의 안내입니다.",
};

const CONTACT_EMAIL = "licensebook@gmail.com";

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[960px] px-5 py-14 md:px-6 md:py-20">
          <p className="text-sm font-black text-blue-600">CONTACT</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            라북 문의
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] font-semibold leading-7 text-slate-600 md:text-base">
            사이트 이용, 자격증 정보 오류 제보 및 기타 문의사항은 아래 이메일로 보내주세요.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-5 py-10 md:px-6 md:py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-black text-slate-950">이메일 문의</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-flex text-lg font-black text-blue-600 hover:text-blue-700"
          >
            {CONTACT_EMAIL}
          </a>

          <div className="mt-7 border-t border-slate-100 pt-6">
            <h2 className="text-base font-black text-slate-900">문의 시 함께 알려주세요</h2>
            <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-600">
              <li>• 자격증 정보 오류 제보: 자격증명과 해당 페이지 주소</li>
              <li>• 사이트 이용 문의: 문제가 발생한 페이지와 상황</li>
              <li>• 기타 문의: 확인이 필요한 내용을 구체적으로 작성</li>
            </ul>
          </div>

          <p className="mt-7 rounded-xl bg-slate-50 px-4 py-4 text-sm font-semibold leading-6 text-slate-600">
            보내주신 문의는 내용을 확인한 후 필요한 경우 이메일로 답변드립니다.
            시험 일정·응시자격·자격제도에 관한 최종 확인은 해당 시행기관의 공식 공고를 이용해 주세요.
          </p>

          <div className="mt-7">
            <Link href="/" className="text-sm font-black text-blue-600 hover:text-blue-700">
              ← 라북 홈으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
