"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import certificates from "@/data/catalog/certificates.json";
import {
  findExactCertificate,
  rankCertificateMatches,
  type SearchableCertificate,
} from "@/lib/certificate-search";

type MegaItem = {
  label: string;
  href: string;
  description?: string;
};

type MenuItem = {
  label: string;
  href: string;
  mega?: {
    title: string;
    description: string;
    items: MegaItem[];
    featured?: {
      label: string;
      href: string;
      description: string;
    };
  };
};

type CatalogItem = {
  name: string;
  shortName?: string;
  aliases?: string[];
  type?: string;
  licenseType?: string;
  category?: string;
  agency?: string;
};

const popularCertificates = [
  "컴퓨터활용능력 1급",
  "전기기사",
  "산업안전기사",
  "정보처리기사",
  "공인중개사",
];

const searchQuickLinks = [
  { label: "자격증 랭킹", href: "/rank" },
  { label: "자격증 비교", href: "/compare" },
  { label: "수험가이드", href: "/guide" },
  { label: "전체 검색", href: "/search" },
];

const menuItems: MenuItem[] = [
  { label: "홈", href: "/" },
  {
    label: "국가자격증",
    href: "/national-certificates",
    mega: {
      title: "국가자격증",
      description: "국가기술·국가전문자격을 분야별로 찾아보세요.",
      items: [
        { label: "전체 국가자격증", href: "/national-certificates" },
        { label: "IT·사무", href: "/national-certificates?category=IT%C2%B7%EC%82%AC%EB%AC%B4" },
        { label: "전기·전자", href: "/national-certificates?category=%EC%A0%84%EA%B8%B0%C2%B7%EC%A0%84%EC%9E%90" },
        { label: "기계·설비", href: "/national-certificates?category=%EA%B8%B0%EA%B3%84%C2%B7%EC%84%A4%EB%B9%84" },
        { label: "건설·안전", href: "/national-certificates?category=%EA%B1%B4%EC%84%A4%C2%B7%ED%86%A0%EB%AA%A9" },
        { label: "조리·미용", href: "/national-certificates?category=%EC%A1%B0%EB%A6%AC%C2%B7%EC%99%B8%EC%8B%9D" },
      ],
      featured: {
        label: "인기 국가자격증 보기",
        href: "/rank?group=popular&ranking=employment&type=national&category=all",
        description: "많이 찾는 국가자격증부터 빠르게 확인하세요.",
      },
    },
  },
  {
    label: "민간자격증",
    href: "/private-certificates",
    mega: {
      title: "민간자격증",
      description: "취업·실무·자기계발 목적에 맞는 민간자격을 살펴보세요.",
      items: [
        { label: "전체 민간자격증", href: "/private-certificates" },
        { label: "IT·AI", href: "/private-certificates?category=IT%C2%B7AI" },
        { label: "교육·강사", href: "/private-certificates?category=%EC%95%84%EB%8F%99%C2%B7%EA%B5%90%EC%9C%A1" },
        { label: "상담·복지", href: "/private-certificates?category=%EC%8B%AC%EB%A6%AC%C2%B7%EC%83%81%EB%8B%B4" },
        { label: "디자인·콘텐츠", href: "/private-certificates?category=%EB%94%94%EC%9E%90%EC%9D%B8%C2%B7%EC%BD%98%ED%85%90%EC%B8%A0" },
        { label: "경영·서비스", href: "/private-certificates?category=%EB%A7%88%EC%BC%80%ED%8C%85%C2%B7%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4" },
      ],
      featured: {
        label: "인기 민간자격증 보기",
        href: "/rank?group=popular&ranking=employment&type=private&category=all",
        description: "관심이 높은 민간자격증을 먼저 확인하세요.",
      },
    },
  },
  {
    label: "랭킹",
    href: "/rank",
    mega: {
      title: "자격증 랭킹",
      description: "공식 통계와 편집 기준으로 목적에 맞는 자격증을 찾으세요.",
      items: [
        { label: "응시자 수 TOP", href: "/rank?group=popular&ranking=applicants&type=all&category=all" },
        { label: "합격률 높은 순", href: "/rank?group=exam&ranking=passRateHigh&type=all&category=all" },
        { label: "난이도 낮은 순", href: "/rank?group=exam&ranking=difficultyLow&type=all&category=all" },
        { label: "취업 활용도", href: "/rank?group=popular&ranking=employment&type=all&category=all" },
        { label: "초보자 추천", href: "/rank?group=audience&ranking=beginner&type=all&category=all" },
        { label: "분야별 TOP", href: "/rank?group=category&ranking=categoryAuto&type=all" },
      ],
      featured: {
        label: "랭킹 허브 전체 보기",
        href: "/rank",
        description: "인기·시험·취업·대상별 랭킹을 한곳에서 확인하세요.",
      },
    },
  },
  { label: "비교", href: "/compare" },
  {
    label: "수험가이드",
    href: "/guide",
    mega: {
      title: "수험가이드",
      description: "자격증 선택부터 합격 이후까지 단계별로 준비하세요.",
      items: [
        { label: "처음 시작하기", href: "/guide#start" },
        { label: "시험 준비", href: "/guide#prepare" },
        { label: "공부법", href: "/guide#study" },
        { label: "시험 당일", href: "/guide#exam-day" },
        { label: "합격 후", href: "/guide#after-pass" },
        { label: "자주 묻는 질문", href: "/guide#faq" },
      ],
      featured: {
        label: "수험가이드 전체 보기",
        href: "/guide",
        description: "24개 실전 가이드의 전체 구성을 확인하세요.",
      },
    },
  },
  {
    label: "자료실",
    href: "/resources",
    mega: {
      title: "수험 자료실",
      description: "원서접수·응시자격·CBT·시험 준비물 등 실용 자료를 확인하세요.",
      items: [
        { label: "원서접수 안내", href: "/resources#application-schedule" },
        { label: "응시자격 확인", href: "/resources#eligibility-documents" },
        { label: "CBT 안내", href: "/resources#cbt-exam" },
        { label: "시험 준비물", href: "/resources#test-center-preparation" },
        { label: "자격증 발급", href: "/resources#issuance-certificates" },
        { label: "시험 공통 FAQ", href: "/resources#certificate-glossary" },
      ],
      featured: {
        label: "자료실 전체 보기",
        href: "/resources",
        description: "자격증 준비에 필요한 실용 자료를 한곳에서 확인하세요.",
      },
    },
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-none stroke-current stroke-2" aria-hidden="true">
      <path d="m5 7 5 5 5-5" />
    </svg>
  );
}

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (searchBlurTimer.current) clearTimeout(searchBlurTimer.current);
    };
  }, []);

  const searchItems = useMemo<SearchableCertificate[]>(
    () =>
      Object.entries(certificates as Record<string, CatalogItem>).map(
        ([slug, item]) => ({
          slug,
          name: item.name,
          shortName: item.shortName,
          aliases: item.aliases,
          category: item.category,
          licenseType: item.licenseType,
          agency: item.agency,
        }),
      ),
    [],
  );

  const searchSuggestions = useMemo(
    () => rankCertificateMatches(searchItems, query, 6),
    [searchItems, query],
  );

  function goToCertificate(item: SearchableCertificate) {
    setQuery(item.shortName || item.name);
    setSearchFocused(false);
    router.push(`/cert/${item.slug}`);
  }

  function handlePopularCertificate(name: string) {
    const exact = findExactCertificate(searchItems, name);

    if (exact) {
      goToCertificate(exact);
      return;
    }

    setSearchFocused(false);
    router.push(`/search?q=${encodeURIComponent(name)}`);
  }

  function openMega(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  }

  function scheduleCloseMega() {
    closeTimer.current = setTimeout(() => setActiveMega(null), 140);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();

    if (!value) {
      setSearchFocused(false);
      router.push("/search");
      return;
    }

    const exact = findExactCertificate(searchItems, value);

    if (exact) {
      goToCertificate(exact);
      setActiveMega(null);
      setMobileOpen(false);
      return;
    }

    setSearchFocused(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
    setActiveMega(null);
    setMobileOpen(false);
  }

  const solidHeader = scrolled || headerHovered || activeMega !== null || searchFocused || mobileOpen;

  return (
    <header
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => setHeaderHovered(false)}
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${
        solidHeader
          ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1200px] items-center gap-5 px-5 md:h-24 md:px-6">
        <Link
          href="/"
          aria-label="라북 홈으로 이동"
          className="flex shrink-0 items-center gap-3"
          onClick={() => {
            setMobileOpen(false);
            setActiveMega(null);
          }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white shadow-sm md:h-14 md:w-14">
            L
          </span>
          <span className="leading-none">
            <strong className={`block text-2xl font-black tracking-tight transition-colors duration-300 ${solidHeader ? "text-slate-950" : "text-white"}`}>라북</strong>
            <span className={`mt-1 block text-[11px] font-extrabold tracking-[0.26em] transition-colors duration-300 ${solidHeader ? "text-blue-600" : "text-white"}`}>
              LABOOK
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-6" aria-label="주요 메뉴">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.mega && openMega(item.label)}
              onMouseLeave={() => item.mega && scheduleCloseMega()}
            >
              <Link
                href={item.href}
                onFocus={() => item.mega && openMega(item.label)}
                className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-[14px] font-bold transition-colors duration-300 hover:text-blue-600 xl:text-[15px] ${solidHeader ? "text-slate-800" : "text-white"}`}
              >
                {item.label}
                {item.mega ? <ChevronIcon /> : null}
              </Link>
            </div>
          ))}
        </nav>

        <form
          onSubmit={submitSearch}
          className="relative ml-auto hidden w-[220px] shrink-0 xl:block"
        >
          <label className="relative block">
            <span className={`pointer-events-none absolute inset-y-0 left-3 flex items-center transition-colors duration-300 ${solidHeader ? "text-slate-400" : "text-white"}`}>
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => {
                if (searchBlurTimer.current) clearTimeout(searchBlurTimer.current);
                setSearchFocused(true);
              }}
              onBlur={() => {
                searchBlurTimer.current = setTimeout(() => setSearchFocused(false), 150);
              }}
              placeholder="자격증 검색"
              aria-label="자격증 검색"
              aria-expanded={searchFocused}
              className={`h-11 w-full rounded-xl pl-10 pr-4 text-sm font-bold outline-none transition-all duration-300 focus:border-blue-400 focus:bg-white focus:text-slate-900 focus:ring-4 focus:ring-blue-100 ${solidHeader ? "border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400" : "border border-white/70 bg-white/10 text-white placeholder:text-white/80"}`}
            />
          </label>

          {searchFocused ? (
            <div className="absolute right-0 top-[52px] z-[90] w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {query.trim() ? (
                <div>
                  <div className="border-b border-slate-100 px-4 py-3">
                    <span className="text-xs font-black text-blue-600">검색 추천</span>
                  </div>

                  {searchSuggestions.length > 0 ? (
                    <div className="py-1.5">
                      {searchSuggestions.map((item) => (
                        <button
                          key={item.slug}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => goToCertificate(item)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-blue-50"
                        >
                          <div className="min-w-0">
                            <strong className="block truncate text-sm font-black text-slate-900">
                              {item.name}
                            </strong>
                            <span className="mt-1 block truncate text-xs font-semibold text-slate-500">
                              {[item.shortName, item.category, item.agency]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </div>
                          <span className="shrink-0 text-xs font-black text-blue-600">보기 →</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      type="submit"
                      onMouseDown={(event) => event.preventDefault()}
                      className="w-full px-4 py-4 text-left transition hover:bg-blue-50"
                    >
                      <strong className="block text-sm font-black text-slate-800">
                        “{query.trim()}” 검색 결과 보기
                      </strong>
                      <span className="mt-1 block text-xs font-semibold text-blue-600">전체검색 →</span>
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="border-b border-slate-100 px-4 py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-600">🔥 인기 자격증</span>
                      <Link
                        href="/rank"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => setSearchFocused(false)}
                        className="text-xs font-black text-blue-600 hover:text-blue-700"
                      >
                        랭킹 보기 →
                      </Link>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {popularCertificates.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => handlePopularCertificate(name)}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 py-4">
                    <span className="text-xs font-black text-slate-500">빠른 이동</span>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {searchQuickLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => setSearchFocused(false)}
                          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </form>

        <Link
          href="/search"
          aria-label="자격증 검색"
          className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition lg:inline-flex xl:hidden ${solidHeader ? "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600" : "border-white/70 text-white hover:bg-white/15"}`}
        >
          <SearchIcon />
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className={`ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition lg:hidden ${solidHeader ? "border-slate-300 text-slate-800 hover:border-blue-500 hover:text-blue-600" : "border-white/70 text-white hover:bg-white/15"}`}
        >
          <span className="text-xl leading-none">{mobileOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {activeMega ? (
        <div
          className="absolute left-0 right-0 hidden border-t border-slate-200 bg-white shadow-xl lg:block"
          onMouseEnter={() => openMega(activeMega)}
          onMouseLeave={scheduleCloseMega}
        >
          {menuItems
            .filter((item) => item.label === activeMega && item.mega)
            .map((item) => (
              <div key={item.label} className="mx-auto grid max-w-[1200px] grid-cols-[260px_1fr_280px] gap-8 px-6 py-7">
                <div>
                  <span className="text-xs font-black text-blue-600">EXPLORE</span>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">{item.mega!.title}</h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {item.mega!.description}
                  </p>
                  <Link
                    href={item.href}
                    onClick={() => setActiveMega(null)}
                    className="mt-5 inline-flex text-sm font-black text-blue-600 hover:text-blue-700"
                  >
                    전체 페이지 보기 →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {item.mega!.items.map((subItem) => (
                    <Link
                      key={`${item.label}-${subItem.label}`}
                      href={subItem.href}
                      onClick={() => setActiveMega(null)}
                      className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>

                {item.mega!.featured ? (
                  <Link
                    href={item.mega!.featured.href}
                    onClick={() => setActiveMega(null)}
                    className="rounded-3xl bg-slate-950 p-6 text-white transition hover:bg-slate-900"
                  >
                    <span className="text-xs font-black text-blue-300">추천 바로가기</span>
                    <strong className="mt-3 block text-xl font-black">{item.mega!.featured.label}</strong>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
                      {item.mega!.featured.description}
                    </p>
                    <span className="mt-5 block text-sm font-black text-blue-300">바로가기 →</span>
                  </Link>
                ) : null}
              </div>
            ))}
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <div className="mx-auto max-w-[1200px]">
            <form onSubmit={submitSearch}>
              <label className="relative block">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                  <SearchIcon />
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="자격증명을 입력하세요"
                  aria-label="모바일 자격증 검색"
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-base font-bold text-slate-950 caret-blue-600 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:text-slate-950 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </form>

            <nav className="mt-5 grid gap-2" aria-label="모바일 메뉴">
              {menuItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 px-4 py-3.5 text-base font-black text-slate-800"
                    >
                      {item.label}
                    </Link>
                    {item.mega ? (
                      <button
                        type="button"
                        aria-label={`${item.label} 하위 메뉴`}
                        aria-expanded={mobileSection === item.label}
                        onClick={() =>
                          setMobileSection((current) => (current === item.label ? null : item.label))
                        }
                        className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50"
                      >
                        <span className={mobileSection === item.label ? "rotate-180 transition" : "transition"}>
                          <ChevronIcon />
                        </span>
                      </button>
                    ) : null}
                  </div>

                  {item.mega && mobileSection === item.label ? (
                    <div className="grid gap-1 border-t border-slate-200 bg-slate-50 p-2">
                      {item.mega.items.map((subItem) => (
                        <Link
                          key={`${item.label}-mobile-${subItem.label}`}
                          href={subItem.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-white hover:text-blue-600"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
