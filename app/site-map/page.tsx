import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "사이트맵 | 라북",
  description: "라북의 주요 자격증 정보 페이지와 서비스 메뉴를 한눈에 확인하세요.",
};

const groups = [
  {
    title: "자격증 찾기",
    links: [
      ["국가자격증", "/national-certificates"],
      ["민간자격증", "/private-certificates"],
      ["자격증 검색", "/search"],
      ["자격증 로드맵", "/roadmap"],
    ],
  },
  {
    title: "비교 · 랭킹",
    links: [
      ["자격증 비교", "/compare"],
      ["자격증 랭킹", "/rank"],
    ],
  },
  {
    title: "시험 준비",
    links: [
      ["수험가이드", "/guide"],
      ["자료실", "/resources"],
    ],
  },
  {
    title: "사이트 안내",
    links: [
      ["라북 소개", "/about"],
      ["개인정보처리방침", "/privacy"],
      ["이용약관", "/terms"],
      ["정보 이용 안내", "/disclaimer"],
    ],
  },
];

export default function SiteMapPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-5 py-14 md:px-6 md:py-20">
          <p className="text-xs font-black tracking-[0.16em] text-blue-600">SITE MAP</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">사이트맵</h1>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
            라북의 주요 메뉴와 정보 페이지를 한곳에서 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-5 py-10 md:px-6 md:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">{group.title}</h2>
              <nav className="mt-5 grid gap-3">
                {group.links.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span>{label}</span>
                    <span>→</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
