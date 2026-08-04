"use client";

import CertificateHubSections from "@/components/CertificateHubSections";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type CertificateItem = {
  slug: string;
  name: string;
  shortName: string;
  licenseType: string;
  category: string;
  agency: string;
};

const INITIALS = [
  "A-Z",
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

const INITIAL_CONSONANTS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

function getInitial(name: string) {
  const first = name.trim().charAt(0);
  const code = first.charCodeAt(0);

  if (code >= 0xac00 && code <= 0xd7a3) {
    const consonant = INITIAL_CONSONANTS[Math.floor((code - 0xac00) / 588)];
    if (consonant === "ㄲ") return "ㄱ";
    if (consonant === "ㄸ") return "ㄷ";
    if (consonant === "ㅃ") return "ㅂ";
    if (consonant === "ㅆ") return "ㅅ";
    if (consonant === "ㅉ") return "ㅈ";
    return consonant;
  }

  if (/^[A-Za-z]$/.test(first)) return "A-Z";

  return "기타";
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

type Props = {
  items: CertificateItem[];
  popularNames: string[];
};

export default function NationalCertificateList({ items, popularNames }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "";

  const clearCategory = () => {
    router.replace(`${pathname}#certificate-list`, { scroll: false });
  };

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("ko-KR");
    return items.filter((item) => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!keyword) return true;

      return [item.name, item.shortName, item.licenseType, item.category, item.agency]
        .join(" ")
        .toLocaleLowerCase("ko-KR")
        .includes(keyword);
    });
  }, [items, query, selectedCategory]);

  const groupedItems = useMemo(() => {
    const groups = new Map<string, CertificateItem[]>();

    filteredItems.forEach((item) => {
      const initial = getInitial(item.name);
      const current = groups.get(initial) ?? [];
      current.push(item);
      groups.set(initial, current);
    });

    groups.forEach((group) => {
      group.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
    });

    return groups;
  }, [filteredItems]);

  const availableInitials = INITIALS.filter((initial) => groupedItems.has(initial));

  return (
    <>
      <section id="certificate-search" className="scroll-mt-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-14">
          <div className="mb-6">
            <p className="text-sm font-black tracking-[0.14em] text-blue-600">ALL CERTIFICATES</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              전체 국가자격증 찾아보기
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500 md:text-base">
              자격증명, 분야 또는 시행기관으로 검색하세요.
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-7">
            <label htmlFor="national-cert-search" className="sr-only">
              국가자격증 검색
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>
              <input
                id="national-cert-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="자격증명, 분야, 시행기관으로 검색해 보세요"
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-14 pr-5 text-[15px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:h-16 md:text-base"
              />
            </div>

            {selectedCategory ? (
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
                <span className="text-sm font-black text-blue-800">
                  선택 분야: {selectedCategory}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    clearCategory();
                  }}
                  className="text-sm font-black text-blue-600 underline underline-offset-4 hover:text-blue-800"
                >
                  전체 분야 보기
                </button>
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2" aria-label="초성 바로가기">
              {INITIALS.map((initial) => {
                const enabled = groupedItems.has(initial);
                return enabled ? (
                  <a
                    key={initial}
                    href={`#initial-${initial}`}
                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-blue-200 bg-white px-3 text-sm font-black text-blue-700 transition hover:border-blue-500 hover:bg-blue-50"
                  >
                    {initial}
                  </a>
                ) : (
                  <span
                    key={initial}
                    className="inline-flex h-10 min-w-10 cursor-default items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm font-black text-slate-300"
                    aria-disabled="true"
                  >
                    {initial}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CertificateHubSections
        items={items}
        basePath="/national-certificates"
        popularTitle="인기 국가자격증"
        categoryTitle="분야별 국가자격증"
        theme="blue"
        popularNames={popularNames}
      />

      <section id="certificate-list" className="scroll-mt-24 mx-auto w-full max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              가나다·영문순 자격증 목록
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500 md:text-base">
              검색 결과 <strong className="text-blue-600">{filteredItems.length}개</strong>
            </p>
          </div>
          {query || selectedCategory ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                clearCategory();
              }}
              className="shrink-0 text-sm font-bold text-slate-500 underline underline-offset-4 hover:text-blue-600"
            >
              검색·필터 초기화
            </button>
          ) : null}
        </div>

        {availableInitials.length > 0 ? (
          <div className="space-y-14">
            {availableInitials.map((initial) => {
              const group = groupedItems.get(initial) ?? [];

              return (
                <section
                  key={initial}
                  id={`initial-${initial}`}
                  className="scroll-mt-32"
                  aria-labelledby={`heading-${initial}`}
                >
                  <div className="mb-5 flex items-center gap-4 border-b border-slate-200 pb-4">
                    <h3
                      id={`heading-${initial}`}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white shadow-sm"
                    >
                      {initial}
                    </h3>
                    <p className="text-sm font-bold text-slate-500">{group.length}개 자격증</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {group.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/cert/${item.slug}`}
                        className="group flex min-h-36 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                      >
                        <div>
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700">
                              {item.licenseType}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600">
                              {item.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-black tracking-tight text-slate-950 transition group-hover:text-blue-600">
                            {item.name}
                          </h4>
                          <p className="mt-2 line-clamp-1 text-sm font-semibold text-slate-500">
                            {item.agency}
                          </p>
                        </div>

                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-black text-blue-600">
                          상세정보 보기
                          <span className="transition-transform group-hover:translate-x-1">
                            <ArrowIcon />
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <p className="text-lg font-black text-slate-800">검색 결과가 없습니다.</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              자격증명이나 분야를 다른 단어로 검색해 보세요.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
