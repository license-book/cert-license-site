import type { Metadata } from "next";
import CertificateCompare from "@/components/CertificateCompare";
import { getCompareCertificates } from "@/lib/comparison";

export const metadata: Metadata = {
  title: "자격증 비교 | 라북",
  description:
    "국가자격증과 민간자격증의 핵심 차이, 준비기간, 응시자격, 활용 분야와 추천 대상을 비교하세요.",
};

export default function ComparePage() {
  const certificates = getCompareCertificates();

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section
        className="relative overflow-hidden bg-slate-950 text-white"
        style={{
          backgroundImage: "url('/images/hero/compare-hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/38" />

        <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center px-5 py-14 md:min-h-[500px] md:px-6 md:py-16">
          <div className="w-full">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-blue-100">
            자격증 선택 가이드
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
            비슷해 보여도
            <br className="md:hidden" /> 선택 기준은 다릅니다
          </h1>

          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-200 md:text-lg">
            두 자격증의 공통 정보보다 실제 선택을 가르는 핵심 차이와 추천
            대상을 먼저 확인하세요.
          </p>
                  </div>
        </div>
      </section>

      <CertificateCompare items={certificates} />
    </main>
  );
}
