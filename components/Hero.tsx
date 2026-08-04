"use client";

import HeroSearch from "@/components/HeroSearch";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const heroSlides = [
  { image: "/images/hero-01.webp" },
  { image: "/images/hero-02.webp" },
  { image: "/images/hero-03.webp" },
];

export default function Hero() {
  return (
    <section className="relative z-20 h-[640px] overflow-visible text-white md:h-[640px]">
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
        className="hero-swiper h-full overflow-hidden"
      >
        {heroSlides.map((slide) => (
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
        <div className="mx-auto flex h-full max-w-[1280px] items-center px-5 pt-14 sm:px-6 sm:pt-16 md:px-8 md:pt-20">
          <div className="w-full max-w-[820px]">
            <h2 className="hero-title text-[34px] font-black leading-[1.2] tracking-[-0.045em] text-white sm:text-[42px] md:text-[52px] md:leading-[1.22]">
              내 미래를 바꾸는 첫걸음,
              <br />
              자격증에서 시작하세요
            </h2>

            <p className="mt-4 max-w-[680px] text-[16px] font-medium leading-7 text-white/90 sm:text-[18px] md:mt-5 md:text-[20px]">
              정확한 정보와 체계적인 비교로 합격의 길을 안내합니다
            </p>

            <HeroSearch />
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="아래 콘텐츠 보기"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight,
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
