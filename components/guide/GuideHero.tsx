import Link from "next/link";
import type { GuideData } from "@/lib/guide-engine";

export default function GuideHero({ guide }: { guide: GuideData }) {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-800 text-white"
      style={guide.hero.image ? {
        backgroundImage: `url('${guide.hero.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : undefined}
    >
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="relative mx-auto flex min-h-[400px] max-w-[1200px] items-center px-5 py-14 md:min-h-[470px] md:px-6">
        <div className="max-w-4xl">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300" aria-label="현재 위치">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/guide" className="hover:text-white">수험가이드</Link>
            <span>/</span>
            <span className="text-blue-200">{guide.basic.categoryLabel}</span>
          </nav>
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-blue-100">
            {guide.hero.eyebrow ?? "EXAM GUIDE"}
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{guide.hero.title}</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-200 md:text-lg md:leading-8">
            {guide.hero.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-2 text-sm font-black text-blue-100">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{guide.basic.categoryLabel}</span>
            {guide.basic.readingTime ? <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">읽는 시간 {guide.basic.readingTime}</span> : null}
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">업데이트 {guide.update.lastUpdated}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
