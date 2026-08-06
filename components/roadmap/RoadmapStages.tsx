import Link from "next/link";
import type { RoadmapStage } from "@/lib/roadmap-engine";

export default function RoadmapStages({ stages }: { stages: RoadmapStage[] }) {
  return (
    <section className="grid gap-6">
      {stages.map((stage, stageIndex) => (
        <article key={stage.id} id={stage.id} className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-blue-600 px-3 text-sm font-black text-white">{stage.number}</span>
            <div>
              <span className="text-xs font-black text-blue-600">ROADMAP STEP {stageIndex + 1}</span>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">{stage.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 md:text-base">{stage.description}</p>
            </div>
          </div>
          {stage.goal ? <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4"><strong className="text-sm font-black text-blue-800">이 단계의 목표</strong><p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{stage.goal}</p></div> : null}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {stage.certificates.map((cert) => (
              <Link key={`${stage.id}-${cert.href}-${cert.name}`} href={cert.href} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-blue-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {cert.level ? <span className="text-xs font-black text-blue-600">{cert.level}</span> : null}
                    <h3 className="mt-1 text-lg font-black text-slate-950 group-hover:text-blue-700">{cert.name}</h3>
                  </div>
                  <span className="shrink-0 text-sm font-black text-blue-600">상세보기 →</span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{cert.description}</p>
                {cert.recommendedFor ? <p className="mt-3 text-xs font-black text-slate-500">추천 대상 · {cert.recommendedFor}</p> : null}
              </Link>
            ))}
          </div>
          {stage.checklist?.length ? (
            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
              <h3 className="text-sm font-black text-blue-300">단계 완료 전 확인</h3>
              <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-200 md:grid-cols-2">
                {stage.checklist.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
            </div>
          ) : null}
        </article>
      ))}
    </section>
  );
}
