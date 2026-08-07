import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | 라북",
  description: "라북 서비스를 이용할 때 적용되는 기본 원칙을 안내합니다.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[920px] px-5 py-14 md:px-6 md:py-20">
          <p className="text-xs font-black tracking-[0.16em] text-blue-600">TERMS OF USE</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">이용약관</h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">라북 서비스를 이용할 때 적용되는 기본 원칙을 안내합니다.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[920px] px-5 py-10 md:px-6 md:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">1. 목적</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">본 약관은 라북이 제공하는 자격증 정보 서비스의 이용 조건과 기본 사항을 안내하기 위한 것입니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">2. 정보의 성격</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북의 콘텐츠는 자격증 선택과 시험 준비를 돕기 위한 참고 정보입니다. 공식적인 자격 판정, 합격 보장, 법률·행정적 증명 또는 시행기관의 공식 답변을 대신하지 않습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">3. 이용자의 확인 책임</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">시험 일정, 응시자격, 제출서류, 수수료, 시험과목 등 중요한 사항은 신청 또는 의사결정 전에 해당 시행기관의 최신 공고를 반드시 확인해야 합니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">4. 콘텐츠 이용</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북이 직접 작성·편집한 콘텐츠와 사이트 구성은 관련 법령의 보호를 받을 수 있습니다. 개인적인 정보 확인을 넘어선 무단 복제·재배포·자동 수집은 제한될 수 있습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">5. 외부 링크</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북은 공식기관 또는 외부 사이트 링크를 제공할 수 있으며, 외부 사이트의 내용·정책·서비스에 대해서는 해당 운영 주체가 책임을 집니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">6. 서비스 변경</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">사이트의 기능과 콘텐츠는 운영상 필요에 따라 추가·변경·중단될 수 있습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">시행일</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">2026년 8월 8일</div>
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
