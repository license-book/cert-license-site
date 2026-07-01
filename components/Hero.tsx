"use client";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const heroSlides = [
  {
    image: "/images/hero-01.webp",
  },
  {
    image: "/images/hero-02.webp",
  },
  {
    image: "/images/hero-03.webp",
  },
];

const keywords = [
  "컴활1급",
  "전기기사",
  "공인중개사",
  "산업안전기사",
  "사회복지사1급",
  "정보처리기사",
  "간호조무사",
];

export default function Hero() {
  return (
    <section className="relative h-[640px] overflow-hidden text-white">
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
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="h-full bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10">
        <div className="mx-auto flex h-full max-w-[1280px] items-center px-8 pt-20">
          <div className="w-full max-w-[820px]">
            <h2 className="hero-title text-[52px] font-black leading-[1.22] tracking-[-0.05em] text-white">
              내 미래를 바꾸는 첫걸음,
              <br />
              자격증에서 시작하세요
            </h2>

            <p className="mt-5 text-[20px] font-medium text-white/90">
              정확한 정보와 체계적인 비교로 합격의 길을 안내합니다
            </p>

            <div className="mt-8 flex h-[72px] w-full max-w-[780px] items-center rounded-full bg-white px-7 shadow-2xl">
              <span className="mr-4 text-3xl text-gray-400">⌕</span>

              <input
                type="text"
                placeholder="찾고 있는 자격증을 검색해보세요. 예: 컴활1급, 전기기사, 공인중개사"
                className="flex-1 bg-transparent text-[16px] text-gray-700 outline-none placeholder:text-gray-400"
              />

              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-3xl text-white shadow-lg">
                ⌕
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-bold text-orange-300">🔥 인기 검색어</span>

              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-800 shadow"
                >
                  # {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="absolute bottom-[-22px] left-1/2 z-30 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-2xl text-gray-500 shadow-xl">
        ˅
      </button>
    </section>
  );
}