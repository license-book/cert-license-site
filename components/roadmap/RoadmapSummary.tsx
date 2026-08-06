import type { RoadmapData } from "@/lib/roadmap-engine";

export default function RoadmapSummary({ summary }: { summary: RoadmapData["summary"] }) {
  return (
    <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8">
      <h2 className="text-xl font-black text-slate-950 md:text-2xl">{summary.title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {summary.items.map((item, index) => (
          <div key={item} className="flex gap-3 rounded-2xl bg-white p-4">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white">{index + 1}</span>
            <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
