import NationalCertificateList from "@/components/NationalCertificateList";
import certificates from "@/data/catalog/certificates.json";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "국가자격증 전체 목록 | 라북",
  description:
    "국가기술자격과 국가전문자격을 가나다·영문순으로 확인하고 자격증별 시험정보와 준비전략을 살펴보세요.",
  alternates: {
    canonical: "/national-certificates",
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

export default function NationalCertificatesPage() {
  const items = Object.entries(certificates as Record<string, CatalogItem>)
    .filter(([, certificate]) => certificate.type === "national")
    .map(([slug, certificate]) => ({
      slug,
      name: certificate.name,
      shortName: certificate.shortName ?? certificate.name,
      licenseType: certificate.licenseType,
      category: certificate.category,
      agency: certificate.agency ?? "시행기관 정보 확인 중",
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-[0.16em] text-blue-600">NATIONAL LICENSE</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            국가자격증 전체 목록
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-600 md:text-lg md:leading-8">
            국가기술자격과 국가전문자격을 가나다·영문순으로 한눈에 확인하세요. 자격증을 선택하면 시험정보,
            준비기간, 합격전략과 활용정보를 바로 볼 수 있습니다.
          </p>
          <div className="mt-7 inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm">
            현재 등록된 국가자격증 {items.length}개
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-sm font-bold text-slate-500">
              국가자격증 목록을 불러오는 중입니다.
            </div>
          </section>
        }
      >
        <NationalCertificateList
          items={items}
          popularNames={[
            "컴퓨터활용능력 1급",
            "정보처리기사",
            "전기기사",
            "산업안전기사",
            "공인중개사",
            "사회복지사 1급",
            "주택관리사(보)",
            "한식조리기능사",
          ]}
        />
      </Suspense>
    </main>
  );
}
