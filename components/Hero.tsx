"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import certificates from "@/data/catalog/certificates.json";
import {
  findExactCertificate,
  rankCertificateMatches,
  type SearchableCertificate,
} from "@/lib/certificate-search";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const heroSlides = [
  {
    image: "/images/hero-01.webp",
    imageClass: "object-cover object-center xl:object-[82%_12%]",
  },
  {
    image: "/images/hero-02.webp",
    imageClass: "object-cover object-center xl:object-[72%_18%]",
  },
  {
    image: "/images/hero-03.webp",
    imageClass: "object-cover object-center xl:object-[86%_14%]",
  },
];

const popularKeywords = [
  "컴활1급",
  "전기기사",
  "공인중개사",
  "산업안전기사",
  "사회복지사1급",
];

type CatalogItem = {
  name: string;
  shortName?: string;
  aliases?: string[];
  type?: string;
  licenseType?: string;
  category?: string;
  agency?: string;
};

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current stroke-2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

export default function Hero() {
  const router = useRouter();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const items = useMemo<SearchableCertificate[]>(
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

  const suggestions = useMemo(
    () => rankCertificateMatches(items, query, 7),
    [items, query],
  );

  const showDropdown = focused && query.trim().length > 0;

  function goToCertificate(item: SearchableCertificate) {
    setQuery(item.shortName || item.name);
    setFocused(false);
    router.push(`/cert/${item.slug}`);
  }

  function submitSearch(rawValue = query) {
    const value = rawValue.trim();

    if (!value) {
      router.push("/search");
      return;
    }

    // 정식명 / shortName / aliases가 정확히 일치하면 상세페이지로 바로 이동
    const exact = findExactCertificate(items, value);

    if (exact) {
      goToCertificate(exact);
      return;
    }

    // 정확히 일치하지 않는 일반 검색어는 검색 결과 페이지로 이동
    setFocused(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  function handlePopularKeyword(keyword: string) {
    setQuery(keyword);

    // 인기검색어도 메인 검색과 완전히 같은 별칭 매칭 규칙 사용
    const exact = findExactCertificate(items, keyword);

    if (exact) {
      goToCertificate(exact);
      return;
    }

    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  }

  return (
    <section className="relative z-20 h-[560px] overflow-visible text-white md:h-[640px]">
      <div className="absolute inset-0 overflow-hidden">
        <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-swiper h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.image}>
            <div className="relative h-full overflow-hidden">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                unoptimized
                sizes="100vw"
                className={slide.imageClass}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>

      <div className="absolute inset-0 z-10">
        <div className="mx-auto flex h-full max-w-[1280px] items-center px-5 pt-14 md:px-8 md:pt-20">
          <div className="w-full max-w-[820px]">
            <h2 className="hero-title font-black leading-[1.15] tracking-[-0.045em] text-white md:text-[52px] md:leading-[1.22]">
              <span className="block whitespace-nowrap text-[27px] md:text-[52px]">
                내 미래를 바꾸는 첫걸음
              </span>
              <span className="block whitespace-nowrap text-[27px] md:text-[52px]">
                자격증에서 시작하세요.
              </span>
            </h2>

            <p className="mt-3 text-[15px] font-medium text-white/90 md:mt-5 md:text-[20px]">
              정확한 정보와 체계적인 비교로 합격의 길을 안내합니다
            </p>

            <form
              className="relative mt-5 w-full max-w-[780px] md:mt-8"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
            >
              <div className="flex h-[60px] items-center rounded-full bg-white px-4 shadow-2xl md:h-[72px] md:px-7">
                <span className="mr-3 text-gray-400 md:mr-4">
                  <SearchIcon />
                </span>

                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={() => {
                    if (blurTimer.current) clearTimeout(blurTimer.current);
                    setFocused(true);
                  }}
                  onBlur={() => {
                    blurTimer.current = setTimeout(() => setFocused(false), 120);
                  }}
                  autoComplete="off"
                  aria-label="자격증 검색"
                  placeholder="찾고 있는 자격증을 검색해보세요. 예: 컴활1급, 전기기사, 공인중개사"
                  className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-gray-700 outline-none placeholder:text-gray-400 md:text-[16px]"
                />

                <button
                  type="submit"
                  aria-label="검색"
                  className="ml-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 md:ml-3 md:h-14 md:w-14"
                >
                  <SearchIcon />
                </button>
              </div>

              {showDropdown ? (
                <div className="absolute left-0 right-0 top-[68px] z-[100] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl md:top-[80px]">
                  {suggestions.length > 0 ? (
                    <div className="py-2">
                      {suggestions.map((item) => (
                        <button
                          key={item.slug}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => goToCertificate(item)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-blue-50"
                        >
                          <div className="min-w-0">
                            <strong className="block truncate text-[15px] font-black text-slate-950">
                              {item.name}
                            </strong>
                            <span className="mt-1 block truncate text-xs font-semibold text-slate-500">
                              {[item.shortName, item.category, item.agency]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </div>

                          <span className="shrink-0 text-sm font-black text-blue-600">
                            상세보기 →
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => submitSearch()}
                      className="w-full px-5 py-5 text-left"
                    >
                      <strong className="block text-sm font-black text-slate-800">
                        일치하는 자격증 제안이 없습니다.
                      </strong>
                      <span className="mt-1 block text-xs font-semibold text-slate-500">
                        “{query.trim()}” 전체 검색 결과 보기 →
                      </span>
                    </button>
                  )}
                </div>
              ) : null}
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-6 md:gap-3">
              <span className="mr-1 text-sm font-bold text-orange-300 md:text-base">🔥 인기 검색어</span>

              {popularKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => handlePopularKeyword(keyword)}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow transition hover:bg-blue-50 hover:text-blue-700 md:px-4 md:py-2 md:text-sm"
                >
                  # {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="아래로 이동"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight * 0.8,
            behavior: "smooth",
          })
        }
        className="absolute bottom-[-22px] left-1/2 z-30 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-2xl text-gray-500 shadow-xl"
      >
        ˅
      </button>
    </section>
  );
}
