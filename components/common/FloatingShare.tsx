"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  showTopButton?: boolean;
};

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </svg>
  );
}

function UpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

export default function FloatingShare({
  className = "",
  showTopButton = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  const getShareData = () => {
    const url = window.location.href;
    const title =
      document.querySelector("h1")?.textContent?.trim() ||
      document.title.replace(/\s*\|\s*라북.*$/i, "").trim() ||
      "라북";
    const text = `${title} | 라북`;

    return { url, title, text };
  };

  const openPopup = (url: string) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer,width=720,height=640"
    );
    setOpen(false);
  };

  const nativeShare = async () => {
    const data = getShareData();

    if (navigator.share) {
      try {
        await navigator.share(data);
        setOpen(false);
        return;
      } catch {
        return;
      }
    }

    await copyLink();
  };

  const copyLink = async () => {
    const { url } = getShareData();

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const shareNaverBlog = () => {
    const { url, title } = getShareData();
    openPopup(
      `https://share.naver.com/web/shareView?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`
    );
  };

  const shareX = () => {
    const { url, text } = getShareData();
    openPopup(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`
    );
  };

  const shareFacebook = () => {
    const { url } = getShareData();
    openPopup(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    );
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={rootRef}
      className={`fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 md:bottom-8 md:right-6 ${className}`}
    >
      {open && (
        <div
          role="dialog"
          aria-label="공유하기"
          className="mb-1 w-[210px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15"
        >
          <p className="px-3 pb-2 pt-1 text-xs font-black text-slate-500">
            공유하기
          </p>

          <button
            type="button"
            onClick={nativeShare}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-yellow-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-300 text-[12px] font-black text-slate-900">
              K
            </span>
            카카오톡
          </button>

          <button
            type="button"
            onClick={shareNaverBlog}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-green-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-[13px] font-black text-white">
              N
            </span>
            네이버 블로그
          </button>

          <button
            type="button"
            onClick={shareX}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-[14px] font-black text-white">
              X
            </span>
            X
          </button>

          <button
            type="button"
            onClick={shareFacebook}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-blue-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-[14px] font-black text-white">
              f
            </span>
            페이스북
          </button>

          <div className="my-1 border-t border-slate-100" />

          <button
            type="button"
            onClick={copyLink}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <LinkIcon />
            </span>
            {copied ? "링크 복사됨" : "링크 복사"}
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="이 페이지 공유하기"
        className="group flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-xl"
      >
        <ShareIcon />
        <span className="hidden sm:inline">공유</span>
      </button>

      {showTopButton && (
        <button
          type="button"
          onClick={scrollTop}
          aria-label="페이지 맨 위로 이동"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
        >
          <UpIcon />
        </button>
      )}
    </div>
  );
}
