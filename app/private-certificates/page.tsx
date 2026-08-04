import PrivateCertificateList from "@/components/PrivateCertificateList";
import certificates from "@/data/catalog/certificates.json";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "민간자격증 전체 목록 | 라북",
  description:
    "국가공인 민간자격과 등록·국제 민간자격을 가나다·영문순으로 확인하고 자격증별 시험정보와 준비전략을 살펴보세요.",
  alternates: {
    canonical: "/private-certificates",
  },
};

type CatalogItem = {
  name: string;
  shortName?: string;
  type: string;
  licenseType: string;
  category: string;
  agency?: string;
};

export default function PrivateCertificatesPage() {
  const items = Object.entries(certificates as Record<string, CatalogItem>)
    .filter(([, certificate]) => certificate.type === "private")
    .map(([slug, certificate]) => ({
      slug,
      name: certificate.name,
      shortName: certificate.shortName ?? certificate.name,
      licenseType: certificate.licenseType,
      category: certificate.category,
      agency: certificate.agency ?? "운영기관 정보 확인 중",
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section
        className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white"
        style={{
          backgroundImage:
            "url('/images/hero/private-certificates-hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/62" />

        <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center px-5 py-14 md:min-h-[500px] md:px-6 md:py-16">
          <div className="w-full">
          <p className="text-sm font-black tracking-[0.16em] text-violet-200">
            PRIVATE LICENSE
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
            민간자격증 전체 목록
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-200 md:text-lg md:leading-8">
            국가공인 민간자격과 등록·국제 민간자격을 가나다·영문순으로
            한눈에 확인하세요. 자격증을 선택하면 시험정보, 준비기간,
            합격전략과 활용정보를 바로 볼 수 있습니다.
          </p>
          <div className="mt-7 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-violet-100 backdrop-blur-sm">
            현재 등록된 민간자격증 {items.length}개
          </div>

          <div className="mt-6 max-w-3xl rounded-2xl border border-amber-200/40 bg-amber-50/90 px-5 py-4 text-sm font-semibold leading-6 text-amber-950 backdrop-blur-sm">
            민간자격은 국가공인 여부와 등록 상태, 운영기관이 자격증마다
            다를 수 있습니다. 상세페이지의 자격 구분과 시행기관 정보를
            함께 확인하세요.
          </div>
                  </div>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-sm font-bold text-slate-500">
              민간자격증 목록을 불러오는 중입니다.
            </div>
          </section>
        }
      >
        <PrivateCertificateList
          items={items}
          popularNames={[
            "심리상담사",
            "아동심리상담사",
            "노인심리상담사",
            "방과후지도사",
            "병원코디네이터",
            "반려동물관리사",
            "정리수납전문가",
            "바리스타",
          ]}
        />
      </Suspense>
    </main>
  );
}
