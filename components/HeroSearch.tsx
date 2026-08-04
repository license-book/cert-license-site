"use client";

import { useRouter } from "next/navigation";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import certificates from "@/data/catalog/certificates.json";

type CatalogItem = {
  name: string;
  shortName?: string;
  type: "national" | "private";
  licenseType: string;
  category: string;
  agency?: string;
};

type SearchItem = CatalogItem & {
  slug: string;
};

const POPULAR_KEYWORDS = [
  "컴활 1급",
  "전기기사",
  "공인중개사",
  "산업안전기사",
  "사회복지사 1급",
  "정보처리기사",
  "간호조무사",
];

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "").trim();
}

export default function HeroSearch() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const items = useMemo<SearchItem[]>(
    () =>
      Object.entries(certificates as Record<string, CatalogItem>).map(
        ([slug, item]) => ({
          slug,
          ...item,
        }),
      ),
    [],
  );

  const suggestions = useMemo(() => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return [];
    }

    return items
      .map((item) => {
        const name = normalize(item.name);
        const shortName = normalize(item.shortName ?? "");
        const category = normalize(item.category);
        const agency = normalize(item.agency ?? "");

        let score = 99;

        if (name === normalizedQuery || shortName === normalizedQuery) {
          score = 0;
        } else if (
          name.startsWith(normalizedQuery) ||
          shortName.startsWith(normalizedQuery)
        ) {
          score = 1;
        } else if (
          name.includes(normalizedQuery) ||
          shortName.includes(normalizedQuery)
        ) {
          score = 2;
        } else if (
          category.includes(normalizedQuery) ||
          agency.includes(normalizedQuery)
        ) {
          score = 3;
        }

        return { item, score };
      })
      .filter(({ score }) => score < 99)
      .sort(
        (a, b) =>
          a.score - b.score ||
          a.item.name.localeCompare(b.item.name, "ko-KR"),
      )
      .slice(0, 7)
      .map(({ item }) => item);
  }, [items, query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function goToSearch(value: string) {
    const trimmed = value.trim();

    if (!trimmed) return;

    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function goToCertificate(item: SearchItem) {
    setQuery(item.shortName || item.name);
    setIsOpen(false);
    router.push(`/cert/${item.slug}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      goToCertificate(suggestions[activeIndex]);
      return;
    }

    goToSearch(query);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        Math.min(current + 1, suggestions.length - 1),
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, -1));
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div ref={rootRef} className="relative mt-6 w-full max-w-[780px] md:mt-8">
      <form
        onSubmit={handleSubmit}
        className="flex h-[64px] w-full items-center rounded-full bg-white px-3 pl-5 shadow-2xl sm:h-[68px] sm:px-4 sm:pl-6 md:h-[72px] md:px-5 md:pl-7"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mr-3 h-6 w-6 shrink-0 text-slate-400 sm:mr-4 sm:h-7 sm:w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>

        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          type="search"
          autoComplete="off"
          aria-label="자격증 검색"
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls="hero-search-suggestions"
          placeholder="찾고 있는 자격증을 검색해보세요. 예: 컴활 1급, 전기기사"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-semibold text-slate-800 outline-none placeholder:text-slate-400 sm:text-[14px] md:text-[16px]"
        />

        <button
          type="submit"
          aria-label="검색"
          className="ml-2 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 sm:ml-3 sm:h-13 sm:w-13 md:h-14 md:w-14"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>
      </form>

      {isOpen && query.trim() && (
        <div
          id="hero-search-suggestions"
          className="absolute left-0 right-0 top-[74px] z-[100] max-h-[310px] overflow-y-auto rounded-3xl sm:top-[78px] md:top-[82px] border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl"
        >
          {suggestions.length ? (
            <ul>
              {suggestions.map((item, index) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => goToCertificate(item)}
                    className={`flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition ${
                      activeIndex === index
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="min-w-0">
                      <strong className="block truncate text-sm font-black text-slate-950 md:text-base">
                        {item.name}
                      </strong>
                      <span className="mt-1 block truncate text-xs font-semibold text-slate-500">
                        {item.category} · {item.agency ?? item.licenseType}
                      </span>
                    </span>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${
                        item.type === "national"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-violet-50 text-violet-700"
                      }`}
                    >
                      {item.type === "national" ? "국가자격" : "민간자격"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-6 text-center">
              <p className="text-sm font-black text-slate-800">
                일치하는 자격증이 없습니다.
              </p>
              <button
                type="button"
                onClick={() => goToSearch(query)}
                className="mt-3 text-sm font-black text-blue-600 hover:text-blue-700"
              >
                전체 검색 결과 보기
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-2.5 md:mt-6 md:gap-3">
        <span className="mr-1 text-sm font-black text-orange-300 sm:text-base">
          🔥 인기 검색어
        </span>

        {POPULAR_KEYWORDS.map((keyword, index) => (
          <button
            key={keyword}
            type="button"
            onClick={() => {
              setQuery(keyword);
              goToSearch(keyword);
            }}
            className={`rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-800 shadow transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 sm:px-4 sm:py-2 sm:text-sm ${index >= 4 ? "hidden sm:inline-flex" : "inline-flex"}`}
          >
            # {keyword}
          </button>
        ))}
      </div>
    </div>
  );
}
