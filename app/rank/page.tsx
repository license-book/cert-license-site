import type { Metadata } from "next";
import CertificateRankingHub from "@/components/CertificateRankingHub";
import { getRankingCertificates } from "@/lib/rankingHub";

export const metadata: Metadata = {
  title: "자격증 랭킹 허브 | 라북",
  description:
    "인기, 시험, 취업, 대상별 추천, 분야별, 라북 추천 기준으로 국가자격증과 민간자격증 랭킹을 확인하세요.",
  alternates: { canonical: "/rank" },
};

export default function RankingPage() {
  const certificates = getRankingCertificates();

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section
        className="relative overflow-hidden border-b border-slate-800 text-white"
        style={{
          backgroundImage: "url('/images/hero/ranking-hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/38" />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center px-5 py-14 md:min-h-[500px] md:px-6 md:py-16">
          <div className="w-full">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-blue-100">
            CERTIFICATE RANKING HUB
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            목적에 맞게 찾는<br className="md:hidden" /> 자격증 랭킹 허브
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">
            공식 시험통계와 자격증 JSON의 난이도, 준비기간, 응시자격,
            활용 분야를 기준으로 다양한 랭킹을 자동 구성합니다.
          </p>
          <div className="mt-7 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-blue-100">
            현재 자동 분류 대상 {certificates.length}개
          </div>
                  </div>
        </div>
      </section>
      <CertificateRankingHub items={certificates} />
    </main>
  );
}
