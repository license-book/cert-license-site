import Link from "next/link";
import type { RoadmapData } from "@/lib/roadmap-engine";

export default function RoadmapHero({ roadmap }: { roadmap: RoadmapData }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
      {roadmap.hero.image ? (
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('${roadmap.hero.image}')` }} />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/55" />
      <div className="relative mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20">
        <Link href="/guide#roadmaps" className="text-sm font-black text-blue-300 hover:text-blue-200">← 자격증 로드맵</Link>
        <span className="mt-6 block text-xs font-black tracking-[0.18em] text-blue-300">{roadmap.hero.eyebrow ?? "CAREER ROADMAP"}</span>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">{roadmap.hero.title}</h1>
        <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 md:text-lg md:leading-8">{roadmap.hero.subtitle}</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-black">
          {roadmap.basic.target ? <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">대상 · {roadmap.basic.target}</span> : null}
          {roadmap.basic.estimatedPeriod ? <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">예상 과정 · {roadmap.basic.estimatedPeriod}</span> : null}
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">총 {roadmap.stages.length}단계</span>
        </div>
      </div>
    </section>
  );
}
