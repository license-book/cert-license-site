import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "정보 이용 안내 | 라북",
  description: "자격증 정보를 이용하기 전에 확인해야 할 중요한 사항입니다.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[920px] px-5 py-14 md:px-6 md:py-20">
          <p className="text-xs font-black tracking-[0.16em] text-blue-600">INFORMATION POLICY</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">정보 이용 안내</h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">자격증 정보를 이용하기 전에 확인해야 할 중요한 사항입니다.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[920px] px-5 py-10 md:px-6 md:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">정보의 정확성</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북은 정확한 정보를 제공하기 위해 노력하지만 자격제도, 시험 일정, 응시자격, 수수료, 민간자격 등록 상태 등은 시행기관 정책에 따라 변경될 수 있습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">공식 정보 우선</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북의 정보와 시행기관의 최신 공식 공고가 다를 경우에는 시행기관의 공식 정보가 우선합니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">합격 및 취업 결과</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">난이도, 공부기간, 활용도, 취업 관련 내용은 개인의 상황에 따라 달라질 수 있으며 합격, 채용 또는 특정 결과를 보장하지 않습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">광고 및 제휴</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">향후 사이트에 광고 또는 제휴 링크가 포함될 수 있습니다. 광고 또는 제휴 여부와 관계없이 자격증 정보는 이용자의 판단을 돕는 방향으로 제공하는 것을 원칙으로 합니다.</div>
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
