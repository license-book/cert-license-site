import Image from "next/image";

type Props = {
  name: string;
  summary: string;
  licenseType: string;
  category: string;
  agency: string;
  difficulty: string;
  studyPeriod: string;
  image?: string;
  eligibility?: string;
  usefulness?: string;
};

type MetricProps = {
  icon: "user" | "star" | "clock" | "chart";
  label: string;
  value: string;
  note: string;
};

function MetricIcon({ type }: { type: MetricProps["icon"] }) {
  const common =
    "h-7 w-7 fill-none stroke-current stroke-[1.7] text-blue-300";

  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    );
  }

  if (type === "star") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
      <path d="M5 20V10M12 20V4M19 20v-7" />
    </svg>
  );
}

function Metric({ icon, label, value, note }: MetricProps) {
  return (
    <div className="flex items-start gap-4 border-b border-white/10 py-5 last:border-b-0 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
      <MetricIcon type={icon} />

      <div>
        <p className="text-sm font-semibold text-blue-100/75">{label}</p>

        <p className="mt-1 text-xl font-black tracking-[-0.03em] text-white">
          {value}
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-100/65">{note}</p>
      </div>
    </div>
  );
}

export default function CertHero({
  name,
  summary,
  licenseType,
  category,
  agency,
  difficulty,
  studyPeriod,
  image = "/images/hero/computer-specialist-1.webp",
  eligibility = "제한 없음",
  usefulness = "높음",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#061b48] text-white">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={`${name} 자격증을 준비하는 수험생`}
          fill
          priority
          sizes="100vw"
          className="cert-hero-bg object-cover object-[68%_center] md:object-center"
        />

        {/* PC용 왼쪽 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061b48] via-[#061b48]/95 to-[#061b48]/20" />

        {/* 모바일용 상하 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061b48]/95 via-[#061b48]/55 to-[#061b48] md:hidden" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 pb-8 pt-10 md:px-6 md:pb-12 md:pt-14">
        {/* 상단 분류 */}
        <div className="cert-hero-reveal cert-hero-delay-1 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-blue-300/40 bg-blue-500/10 px-3 py-1.5 font-bold text-blue-100">
            {licenseType}
          </span>

          <span className="text-blue-100/70">{category}</span>
          <span className="text-blue-100/30">·</span>
          <span className="text-blue-100/70">{agency}</span>
        </div>

        {/* 제목 영역 */}
        <div className="max-w-[660px] pb-[290px] pt-7 md:pb-16 md:pt-10">
          <p className="cert-hero-reveal cert-hero-delay-2 text-sm font-black tracking-[0.08em] text-blue-300 md:text-base">
            너의 자격증, 지금 시작해.
          </p>

          <h1 className="cert-hero-reveal cert-hero-title cert-hero-delay-3 mt-4 text-[38px] font-black leading-[1.12] tracking-[-0.055em] sm:text-5xl md:text-[64px]">
            {name}
          </h1>

          <p className="cert-hero-reveal cert-hero-delay-4 mt-5 max-w-[580px] text-base font-medium leading-8 text-blue-50/85 md:text-lg md:leading-9">
            {summary}
          </p>
        </div>

        {/* 모바일 핵심정보 카드 */}
        <div className="cert-hero-reveal cert-hero-panel cert-hero-delay-5 rounded-[26px] border border-white/10 bg-[#071d4e]/95 px-5 shadow-2xl shadow-black/20 backdrop-blur md:hidden">
          <Metric
            icon="user"
            label="응시 제한"
            value={eligibility}
            note="누구나 응시 가능"
          />

          <Metric
            icon="star"
            label="현실 난이도"
            value={difficulty}
            note="실기 준비 비중이 높음"
          />

          <Metric
            icon="clock"
            label="평균 준비기간"
            value={studyPeriod}
            note="학습 경험에 따라 차이"
          />

          <Metric
            icon="chart"
            label="취업 활용도"
            value={usefulness}
            note="사무직·공기업 준비에 활용"
          />
        </div>

        {/* PC 핵심정보 */}
        <div className="cert-hero-reveal cert-hero-panel cert-hero-delay-5 hidden rounded-[24px] border border-white/10 bg-white/[0.07] px-6 backdrop-blur-md md:grid md:grid-cols-2 lg:grid-cols-4">
          <Metric
            icon="user"
            label="응시 제한"
            value={eligibility}
            note="누구나 응시 가능"
          />

          <Metric
            icon="star"
            label="현실 난이도"
            value={difficulty}
            note="실기 준비 비중이 높음"
          />

          <Metric
            icon="clock"
            label="평균 준비기간"
            value={studyPeriod}
            note="학습 경험에 따라 차이"
          />

          <Metric
            icon="chart"
            label="취업 활용도"
            value={usefulness}
            note="사무직·공기업 준비에 활용"
          />
        </div>

        {/* 이동 버튼 */}
        <div className="cert-hero-reveal cert-hero-buttons cert-hero-delay-6 mt-6 grid gap-3 sm:flex">
          <a
            href="#exam-info"
            className="inline-flex min-h-14 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-black text-white transition hover:bg-blue-500"
          >
            시험 정보 확인하기
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </a>

          <a
            href="#reality-guide"
            className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/40 bg-white/5 px-7 text-sm font-black text-white transition hover:bg-white/10"
          >
            현실 가이드 보기
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .cert-hero-reveal {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          animation: certHeroReveal 680ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: opacity, transform;
        }

        .cert-hero-title {
          transform: translate3d(0, 26px, 0) scale(0.985);
          animation-duration: 760ms;
        }

        .cert-hero-panel {
          transform: translate3d(0, 24px, 0) scale(0.985);
          animation-duration: 720ms;
        }

        .cert-hero-buttons {
          transform: translate3d(0, 18px, 0) scale(0.98);
        }

        .cert-hero-delay-1 { animation-delay: 80ms; }
        .cert-hero-delay-2 { animation-delay: 200ms; }
        .cert-hero-delay-3 { animation-delay: 340ms; }
        .cert-hero-delay-4 { animation-delay: 500ms; }
        .cert-hero-delay-5 { animation-delay: 680ms; }
        .cert-hero-delay-6 { animation-delay: 860ms; }

        .cert-hero-bg {
          animation: certHeroBackground 2200ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform;
        }

        @keyframes certHeroReveal {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes certHeroBackground {
          from { transform: scale(1.035); }
          to { transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cert-hero-reveal,
          .cert-hero-bg {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}