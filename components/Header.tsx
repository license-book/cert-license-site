"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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

type CertificateMenuType = "national" | "private" | null;

type HeaderSearchItem = {
  slug: string;
  name: string;
  shortName: string;
  type: "national" | "private";
  category: string;
  agency: string;
};

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
        { label: "IT·사무", href: "/national-certificates#category-it" },
        { label: "전기·전자", href: "/national-certificates#category-electrical" },
        { label: "기계·설비", href: "/national-certificates#category-mechanical" },
        { label: "건설·안전", href: "/national-certificates#category-construction" },
        { label: "조리·미용", href: "/national-certificates#category-service" },
      ],
      featured: {
        label: "인기 국가자격증 보기",
        href: "/national-certificates#popular-certificates",
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
        { label: "IT·AI", href: "/private-certificates#category-it" },
        { label: "교육·강사", href: "/private-certificates#category-education" },
        { label: "상담·복지", href: "/private-certificates#category-counseling" },
        { label: "디자인·콘텐츠", href: "/private-certificates#category-design" },
        { label: "경영·서비스", href: "/private-certificates#category-business" },
      ],
      featured: {
        label: "인기 민간자격증 보기",
        href: "/private-certificates#popular-certificates",
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
        { label: "분야별 TOP", href: "/rank?group=category&ranking=categoryAuto&type=all&category=all" },
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
    href: "/guide#faq",
    mega: {
      title: "수험 자료실",
      description: "현재는 수험가이드 안의 실용 정보로 연결됩니다.",
      items: [
        { label: "원서접수 안내", href: "/guide#prepare" },
        { label: "응시자격 확인", href: "/guide#prepare" },
        { label: "CBT 안내", href: "/guide#start" },
        { label: "시험 준비물", href: "/guide#exam-day" },
        { label: "자격증 발급", href: "/guide#after-pass" },
        { label: "시험 공통 FAQ", href: "/guide#faq" },
      ],
      featured: {
        label: "자료실 콘텐츠 구성 보기",
        href: "/guide#faq",
        description: "독립 자료실 페이지가 완성되기 전까지 가이드 허브를 이용합니다.",
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
  const pathname = usePathname();
  const [certificateMenuType, setCertificateMenuType] =
    useState<CertificateMenuType>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<HeaderSearchItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const searchAreaRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!searchOpen || searchLoaded) return;

    const controller = new AbortController();
    setSearchLoading(true);

    fetch("/api/header-search", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("검색 데이터를 불러오지 못했습니다.");
        }

        return response.json() as Promise<{ items?: HeaderSearchItem[] }>;
      })
      .then((data) => {
        setSearchItems(data.items ?? []);
        setSearchLoaded(true);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("헤더 검색 데이터 로딩 실패", error);
        setSearchItems([]);
        setSearchLoaded(true);
      })
      .finally(() => {
        setSearchLoading(false);
      });

    return () => controller.abort();
  }, [searchOpen, searchLoaded]);

  useEffect(() => {
    const match = pathname.match(/^\/cert\/([^/]+)/);

    if (!match) {
      setCertificateMenuType(null);
      return;
    }

    const slug = decodeURIComponent(match[1]);
    const controller = new AbortController();

    fetch(`/api/certificate-type?slug=${encodeURIComponent(slug)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) return null;
        return response.json() as Promise<{ type?: "national" | "private" }>;
      })
      .then((data) => {
        setCertificateMenuType(data?.type ?? null);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setCertificateMenuType(null);
      });

    return () => controller.abort();
  }, [pathname]);

  function isActiveMenu(item: MenuItem) {
    const hrefPath = item.href.split(/[?#]/)[0];

    if (item.label === "홈") {
      return pathname === "/";
    }

    if (item.label === "국가자격증") {
      return (
        pathname.startsWith("/national-certificates") ||
        (pathname.startsWith("/cert/") &&
          certificateMenuType === "national")
      );
    }

    if (item.label === "민간자격증") {
      return (
        pathname.startsWith("/private-certificates") ||
        (pathname.startsWith("/cert/") &&
          certificateMenuType === "private")
      );
    }

    if (item.label === "랭킹") {
      return pathname.startsWith("/rank");
    }

    if (item.label === "비교") {
      return pathname.startsWith("/compare");
    }

    if (item.label === "수험가이드") {
      return pathname.startsWith("/guide");
    }

    if (item.label === "자료실") {
      return pathname.startsWith("/resources");
    }

    return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
  }

  function openMega(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  }

  function scheduleCloseMega() {
    closeTimer.current = setTimeout(() => setActiveMega(null), 140);
  }

  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = searchItems
    .filter((item) => {
      if (!normalizedQuery) return true;

      return [
        item.name,
        item.shortName,
        item.category,
        item.agency,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    })
    .slice(0, 6);

  const quickCategories = [
    { label: "IT·사무", href: "/national-certificates#category-it" },
    { label: "전기·전자", href: "/national-certificates#category-electrical" },
    { label: "건설·안전", href: "/national-certificates#category-construction" },
    { label: "교육·상담", href: "/private-certificates#category-education" },
  ];

  function openSearch() {
    setSearchOpen(true);
    setActiveMega(null);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();

    if (!value) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
    setSearchOpen(false);
    setActiveMega(null);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
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
          <span className="hidden leading-none sm:block">
            <strong className="block text-2xl font-black tracking-tight text-slate-950">라북</strong>
            <span className="mt-1 block text-[11px] font-extrabold tracking-[0.26em] text-blue-600">
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
                aria-current={isActiveMenu(item) ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center gap-1 whitespace-nowrap border-b-[3px] pt-[3px] text-[14px] transition xl:text-[15px] ${
                  isActiveMenu(item)
                    ? "border-blue-600 font-black text-blue-600"
                    : "border-transparent font-bold text-slate-800 hover:text-blue-600"
                }`}
              >
                {item.label}
                {item.mega ? <ChevronIcon /> : null}
              </Link>
            </div>
          ))}
        </nav>

        <div
          ref={searchAreaRef}
          className="relative ml-auto hidden w-[240px] shrink-0 xl:block"
        >
          <form onSubmit={submitSearch}>
            <label className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <SearchIcon />
              </span>
              <input
                value={query}
                onFocus={openSearch}
                onClick={openSearch}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSearchOpen(true);
                }}
                placeholder="자격증 검색"
                aria-label="자격증 검색"
                aria-expanded={searchOpen}
                aria-controls="header-search-dropdown"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </form>

          {searchOpen ? (
            <div
              id="header-search-dropdown"
              className="absolute right-0 top-[52px] z-[70] w-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
              <div className="border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600">
                    {normalizedQuery ? "검색 결과" : "인기 자격증"}
                  </span>
                  <Link
                    href={normalizedQuery ? `/search?q=${encodeURIComponent(query.trim())}` : "/search"}
                    onClick={() => setSearchOpen(false)}
                    className="text-xs font-black text-slate-500 hover:text-blue-600"
                  >
                    전체 검색 →
                  </Link>
                </div>

                <div className="mt-3 grid gap-2">
                  {searchLoading ? (
                    <div className="rounded-2xl bg-slate-50 px-4 py-5 text-center text-sm font-bold text-slate-500">
                      자격증을 불러오는 중입니다.
                    </div>
                  ) : searchResults.length ? (
                    searchResults.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/cert/${item.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-transparent px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <div className="min-w-0">
                          <strong className="block truncate text-sm font-black text-slate-900">
                            {item.name}
                          </strong>
                          <span className="mt-1 block truncate text-xs font-semibold text-slate-500">
                            {item.category} · {item.agency}
                          </span>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${
                          item.type === "national"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-violet-50 text-violet-700"
                        }`}>
                          {item.type === "national" ? "국가" : "민간"}
                        </span>
                      </Link>
                    ))
                  ) : searchLoaded ? (
                    <div className="rounded-2xl bg-slate-50 px-4 py-5 text-center text-sm font-bold text-slate-500">
                      일치하는 자격증이 없습니다.
                    </div>
                  ) : null}
                </div>
              </div>

              {!normalizedQuery ? (
                <div className="p-4">
                  <span className="text-xs font-black text-slate-500">
                    분야별 바로가기
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {quickCategories.map((category) => (
                      <Link
                        key={category.label}
                        href={category.href}
                        onClick={() => setSearchOpen(false)}
                        className="rounded-xl border border-slate-200 px-3 py-3 text-center text-xs font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <Link
          href="/search"
          aria-label="자격증 검색"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 lg:inline-flex xl:hidden"
        >
          <SearchIcon />
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-800 transition hover:border-blue-500 hover:text-blue-600 lg:hidden"
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
                  onFocus={openSearch}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSearchOpen(true);
                  }}
                  placeholder="자격증명을 입력하세요"
                  aria-label="모바일 자격증 검색"
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </form>

            {searchOpen && query.trim() ? (
              <div className="mt-3 grid gap-2 rounded-2xl border border-slate-200 bg-white p-2">
                {searchLoading ? (
                  <div className="px-3 py-4 text-center text-sm font-bold text-slate-500">
                    자격증을 불러오는 중입니다.
                  </div>
                ) : searchResults.length ? (
                  searchResults.map((item) => (
                    <Link
                      key={`mobile-search-${item.slug}`}
                      href={`/cert/${item.slug}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setMobileOpen(false);
                        setQuery("");
                      }}
                      className="rounded-xl px-3 py-3 hover:bg-blue-50"
                    >
                      <strong className="block text-sm font-black text-slate-900">
                        {item.name}
                      </strong>
                      <span className="mt-1 block text-xs font-semibold text-slate-500">
                        {item.category} · {item.type === "national" ? "국가자격" : "민간자격"}
                      </span>
                    </Link>
                  ))
                ) : searchLoaded ? (
                  <div className="px-3 py-4 text-center text-sm font-bold text-slate-500">
                    일치하는 자격증이 없습니다.
                  </div>
                ) : null}
              </div>
            ) : null}

            <nav className="mt-5 grid gap-2" aria-label="모바일 메뉴">
              {menuItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActiveMenu(item) ? "page" : undefined}
                      className={`flex-1 rounded-l-2xl border-l-4 px-4 py-3.5 text-base font-black transition ${
                        isActiveMenu(item)
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-transparent text-slate-800 hover:bg-slate-50 hover:text-blue-600"
                      }`}
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
