"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CompareCertificate } from "@/lib/comparison";

type Props = {
  items: CompareCertificate[];
};

export default function SearchClient({ items }: Props) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<"all" | "national" | "private">("all");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return items
      .filter((item) => type === "all" || item.type === type)
      .filter((item) => {
        if (!normalized) return true;

        return [
          item.name,
          item.shortName,
          item.category,
          item.licenseType,
          item.agency,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      })
      .slice(0, 100);
  }, [items, query, type]);

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-14">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label>
            <span className="mb-2 block text-sm font-black text-slate-700">검색어</span>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="예: 컴퓨터활용능력, 전기, 상담"
              className="h-14 w-full rounded-2xl border border-slate-300 px-4 text-base font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-black text-slate-700">자격 구분</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as typeof type)}
              className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">국가·민간 전체</option>
              <option value="national">국가자격증</option>
              <option value="private">민간자격증</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-sm font-black text-blue-600">검색 결과</span>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            {results.length}개의 자격증
          </h2>
        </div>
      </div>

      {results.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <article
              key={item.slug}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700">
                  {item.type === "national" ? "국가자격" : "민간자격"}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600">
                  {item.category}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-black text-slate-950">{item.name}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">{item.agency}</p>

              <div className="mt-5 flex gap-2">
                <Link
                  href={`/cert/${item.slug}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-black text-white hover:bg-blue-700"
                >
                  상세보기
                </Link>
                <Link
                  href={`/compare?left=${encodeURIComponent(item.slug)}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-700 hover:border-blue-300 hover:text-blue-700"
                >
                  비교하기
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-black text-slate-900">검색 결과가 없습니다.</h2>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            다른 자격증명이나 분야로 다시 검색해보세요.
          </p>
        </div>
      )}
    </section>
  );
}
