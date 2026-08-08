"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { RoadmapQuickItem } from "./FloatingQuickActions";

function MapLineIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18 3.8 20.2A.6.6 0 0 1 3 19.65V6.4a.8.8 0 0 1 .5-.74L9 3.5m0 14.5 6 2.5m-6-2.5V3.5m6 17 5.2-2.2a.8.8 0 0 0 .5-.74V4.3a.6.6 0 0 0-.8-.56L15 5.75M15 20.5V5.75M9 3.5l6 2.25" />
    </svg>
  );
}

function ShareLineIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5" />
    </svg>
  );
}

function LinkLineIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2A5 5 0 0 0 12 4l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </svg>
  );
}

function ArrowUpLineIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 10 6-6 6 6" />
      <path d="M12 4v16" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 4 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 5l10 10M15 5 5 15" />
    </svg>
  );
}

export default function RoadmapQuickActionsClient({ roadmaps }: { roadmaps: RoadmapQuickItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  const showShare = true;

  useEffect(() => {
    if (!open && !shareOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setShareOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (shareOpen && shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShareOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open, shareOpen]);

  useEffect(() => {
    setShareOpen(false);
    setCopied(false);
  }, [pathname]);

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getShareData = () => {
    const url = window.location.href;
    const rawTitle =
      document.querySelector("h1")?.textContent?.trim() ||
      document.title.replace(/\s*\|\s*라북.*$/i, "").trim() ||
      "라북";
    const title = rawTitle.includes("라북") ? rawTitle : `${rawTitle} | 라북`;

    return {
      url,
      title,
      text: title,
    };
  };

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=720,height=640");
    setShareOpen(false);
  };

  const copyCurrentLink = async (closeAfter = false) => {
    const { url } = getShareData();

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);

    if (closeAfter) {
      window.setTimeout(() => setShareOpen(false), 900);
    }

    window.setTimeout(() => setCopied(false), 1800);
  };

  const shareKakao = async () => {
    const shareData = getShareData();

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareOpen(false);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await copyCurrentLink();
    window.alert("현재 기기에서는 카카오톡 직접 공유창을 열 수 없어 링크를 복사했습니다. 카카오톡에서 붙여넣어 공유해 주세요.");
  };

  const shareNaverBlog = () => {
    const { url, title } = getShareData();
    openShareWindow(
      `https://share.naver.com/web/shareView?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    );
  };

  const shareX = () => {
    const { url, text } = getShareData();
    openShareWindow(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    );
  };

  const shareFacebook = () => {
    const { url } = getShareData();
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    );
  };

  return (
    <>
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 md:bottom-7 md:right-6">
        {showShare ? (
          <div ref={shareRef} className="relative flex flex-col items-end gap-2">
            {shareOpen ? (
              <div
                role="dialog"
                aria-label="현재 페이지 공유하기"
                className="absolute bottom-[74px] right-0 w-[218px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.20)]"
              >
                <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-1">
                  <p className="text-xs font-black tracking-tight text-slate-500">공유하기</p>
                  <button
                    type="button"
                    onClick={() => setShareOpen(false)}
                    aria-label="공유 메뉴 닫기"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={shareKakao}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-yellow-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-300 text-xs font-black text-slate-950">K</span>
                  카카오톡
                </button>

                <button
                  type="button"
                  onClick={shareNaverBlog}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500 text-xs font-black text-white">N</span>
                  네이버 블로그
                </button>

                <button
                  type="button"
                  onClick={shareX}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">X</span>
                  X
                </button>

                <button
                  type="button"
                  onClick={shareFacebook}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-base font-black text-white">f</span>
                  페이스북
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={() => copyCurrentLink(true)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <LinkLineIcon />
                  </span>
                  {copied ? "링크 복사됨" : "링크 복사"}
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setShareOpen((value) => !value)}
              aria-haspopup="dialog"
              aria-expanded={shareOpen}
              aria-label="현재 페이지 공유하기"
              className="group flex h-[66px] w-[66px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-[0_8px_28px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-[0_12px_32px_rgba(15,23,42,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <ShareLineIcon />
              <span className="mt-1 text-[11px] font-black leading-[1.05]">공유하기</span>
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setShareOpen(false);
            setOpen(true);
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="group flex h-[66px] w-[66px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-[0_8px_28px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-[0_12px_32px_rgba(15,23,42,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <MapLineIcon />
          <span className="mt-1 text-[11px] font-black leading-[1.05]">
            <span className="block">자격증</span>
            <span className="block">로드맵</span>
          </span>
        </button>

        <button
          type="button"
          onClick={moveTop}
          aria-label="페이지 상단으로 이동"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-[0_7px_22px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <ArrowUpLineIcon />
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/25 p-3 backdrop-blur-[1px] md:items-center md:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="roadmap-quick-title"
            className="max-h-[78vh] w-full max-w-[520px] overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 md:px-6">
              <div>
                <div className="flex items-center gap-2 text-blue-700">
                  <MapLineIcon />
                  <span className="text-xs font-black tracking-[0.08em]">ROADMAP</span>
                </div>
                <h2 id="roadmap-quick-title" className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  자격증 로드맵 바로가기
                </h2>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-500">
                  원하는 분야를 선택하면 상세 로드맵으로 이동합니다.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="로드맵 바로가기 닫기"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto px-3 py-3 md:px-4">
              {roadmaps.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {roadmaps.map((roadmap) => (
                    <Link
                      key={roadmap.slug}
                      href={`/roadmap/${roadmap.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex min-h-[64px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <div className="min-w-0">
                        <span className="block truncate text-sm font-black text-slate-900 group-hover:text-blue-800">
                          {roadmap.title}
                        </span>
                        <span className="mt-1 block truncate text-xs font-bold text-slate-400">
                          {roadmap.categoryLabel}
                        </span>
                      </div>
                      <span className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700">
                        <ChevronRightIcon />
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm font-bold text-slate-500">
                  등록된 로드맵이 없습니다.
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-3 md:px-5">
              <Link
                href="/guide#roadmaps"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                가이드에서 로드맵 전체 보기
                <ChevronRightIcon />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
