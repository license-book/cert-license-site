"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import CertificateCard from "./CertificateCard";

const certificates = [
  {
    rank: 1,
    title: "컴퓨터활용능력 1급",
    category: "사무 · IT",
    period: "2~3개월",
    level: "중상",
    issuer: "대한상공회의소",
    qualificationType: "국가기술자격" as const,
  },
  {
    rank: 2,
    title: "전기기사",
    category: "전기",
    period: "4~6개월",
    level: "상",
    issuer: "한국산업인력공단",
    qualificationType: "국가기술자격" as const,
  },
  {
    rank: 3,
    title: "산업안전기사",
    category: "안전",
    period: "3~4개월",
    level: "중상",
    issuer: "한국산업인력공단",
    qualificationType: "국가기술자격" as const,
  },
  {
    rank: 4,
    title: "정보처리기사",
    category: "IT",
    period: "2~4개월",
    level: "중",
    issuer: "한국산업인력공단",
    qualificationType: "국가기술자격" as const,
  },
];

export default function TopCertificates() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-black text-blue-600">POPULAR LICENSE</p>
          <h2 className="mt-2 text-[32px] font-black tracking-[-0.04em] text-gray-900">
            인기 자격증 TOP10
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-500">
            지금 가장 많이 찾는 자격증을 확인하세요.
          </p>
        </div>

        <Link
          href="/rank"
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-black text-blue-600 transition-colors hover:text-blue-700"
        >
          전체보기
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
        }}
      >
        {certificates.map((item) => (
          <SwiperSlide key={item.title}>
            <CertificateCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
