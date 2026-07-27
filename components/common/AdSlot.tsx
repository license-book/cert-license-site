"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  slot: string | undefined;
  label: string;
  className?: string;
};

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const PREVIEW_ADS = process.env.NEXT_PUBLIC_ADSENSE_PREVIEW === "true";

export default function AdSlot({ slot, label, className = "" }: AdSlotProps) {
  const enabled = Boolean(ADSENSE_CLIENT && slot);

  useEffect(() => {
    if (!enabled) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // 광고 차단기나 스크립트 로딩 지연이 있어도 페이지 렌더링은 유지합니다.
    }
  }, [enabled]);

  if (!enabled) {
    if (!PREVIEW_ADS && process.env.NODE_ENV === "production") return null;

    return (
      <aside
        className={`my-10 flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 text-center md:my-12 md:min-h-32 ${className}`}
        aria-label={`${label} 광고 예정 영역`}
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-400">ADVERTISEMENT</p>
          <p className="mt-2 text-sm text-slate-500">{label} 광고 영역</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`my-10 overflow-hidden text-center md:my-12 ${className}`} aria-label={`${label} 광고`}>
      <ins
        className="adsbygoogle block min-h-28 w-full md:min-h-32"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
