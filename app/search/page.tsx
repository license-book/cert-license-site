import type { Metadata } from "next";
import SearchClient from "@/components/SearchClient";
import { getCompareCertificates } from "@/lib/comparison";

export const metadata: Metadata = {
  title: "자격증 검색 | 라북",
  description:
    "국가자격증과 민간자격증을 이름, 분야, 시행기관과 자격 구분으로 검색하세요.",
  alternates: {
    canonical: "/search",
  },
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const certificates = getCompareCertificates();
  const params = await searchParams;
  const initialQuery = Array.isArray(params.q)
    ? params.q[0] ?? ""
    : params.q ?? "";

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
          <span className="text-xs font-black text-blue-300">CERTIFICATE SEARCH</span>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
            원하는 자격증을
            <br className="md:hidden" /> 바로 찾아보세요
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-300">
            자격증명뿐 아니라 분야, 자격 구분과 시행기관으로도 검색할 수 있습니다.
          </p>
        </div>
      </section>

      <SearchClient items={certificates} initialQuery={initialQuery} />
    </main>
  );
}
