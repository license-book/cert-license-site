import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 라북",
  description: "라북의 개인정보 및 비식별 이용정보 처리 원칙을 안내합니다.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[920px] px-5 py-14 md:px-6 md:py-20">
          <p className="text-xs font-black tracking-[0.16em] text-blue-600">PRIVACY POLICY</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">개인정보처리방침</h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">라북의 개인정보 및 비식별 이용정보 처리 원칙을 안내합니다.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[920px] px-5 py-10 md:px-6 md:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">1. 기본 원칙</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북은 현재 회원가입 기능을 운영하지 않으며, 사이트 이용을 위해 이름·전화번호·주소 등 직접적인 개인정보 입력을 요구하지 않습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">2. 자동으로 수집될 수 있는 정보</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">서비스 이용 과정에서 브라우저 종류, 접속 기기, 접속 시간, 방문 페이지, 쿠키와 같은 비식별 이용 정보가 분석 또는 광고 서비스 제공 과정에서 자동 처리될 수 있습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">3. 쿠키 및 외부 서비스</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">향후 Google Analytics, Google AdSense 등 외부 서비스를 사용할 경우 해당 서비스가 쿠키 또는 유사 기술을 사용할 수 있습니다. 이용자는 브라우저 설정에서 쿠키 저장을 제한하거나 삭제할 수 있습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">4. 개인정보의 제3자 제공</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">라북은 이용자의 개인정보를 직접 수집하여 판매하거나 임의로 제3자에게 제공하지 않습니다. 다만 법령에 따른 요청이 있는 경우에는 관련 법률이 정한 범위에서 처리될 수 있습니다.</div>
          </section>
          <section className="border-t border-slate-200 py-7 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-black text-slate-950">5. 정책 변경</h2>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">서비스 기능 또는 관련 법령 변경에 따라 본 방침은 수정될 수 있으며, 변경 시 이 페이지에 최신 내용을 게시합니다.</div>
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
