"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "홈", href: "/" },
  { label: "국가자격증", href: "/cert?type=national" },
  { label: "민간자격증", href: "/cert?type=private" },
  { label: "비교", href: "/compare" },
  { label: "랭킹", href: "/rank" },
  { label: "수험가이드", href: "/guide" },
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current stroke-2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 md:h-24 md:px-6">
        <Link
          href="/"
          aria-label="라북 홈으로 이동"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white shadow-sm md:h-14 md:w-14">
            L
          </span>

          <span className="leading-none">
            <strong className="block text-2xl font-black tracking-tight text-slate-950">
              라북
            </strong>
            <span className="mt-1 block text-[11px] font-extrabold tracking-[0.26em] text-blue-600">
              LABOOK
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="주요 메뉴">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[15px] font-bold text-slate-800 transition hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/search"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white shadow-sm transition hover:bg-blue-700"
          >
            <SearchIcon />
            자격증 검색
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-800 transition hover:border-blue-500 hover:text-blue-600 lg:hidden"
        >
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-[1200px] gap-2" aria-label="모바일 메뉴">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-bold text-slate-800 transition hover:bg-slate-50 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
            >
              <SearchIcon />
              자격증 검색
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
