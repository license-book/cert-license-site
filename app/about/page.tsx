import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "라북 소개 | 라북",
  description: "라북이 어떤 기준으로 자격증 정보를 제공하는지 안내합니다.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[920px] px-5 py-14 md:px-6 md:py-20">
          <p className="text-xs font-black tracking-[0.16em] text-blue-600">ABOUT LABOOK</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">라북 소개</h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">라북이 어떤 기준으로 자격증 정보를 제공하는지 안내합니다.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[920px] px-5 py-10 md:px-6 md:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">라북이 하는 일</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북(LABOOK)은 국가자격증과 민간자격증 정보를 한곳에서 찾고 비교할 수 있도록 정리하는 정보 서비스입니다.
자격증별 시험 정보, 응시자격, 공부 전략, 비교, 랭킹, 수험가이드와 자료실을 제공합니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">정보 제공 원칙</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">가능한 경우 시행기관과 공공기관의 공식 자료를 기준으로 정보를 정리합니다.
제도 변경 가능성이 있는 정보는 최신 공식 공고 확인을 함께 권장합니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">서비스 방향</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">회원가입 없이 누구나 필요한 정보를 빠르게 찾을 수 있는 가벼운 정보 서비스를 지향합니다.
과도한 기능보다 검색, 비교, 이해에 필요한 핵심 정보에 집중합니다.</div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-black text-blue-600 hover:text-blue-700">
            ← 메인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
