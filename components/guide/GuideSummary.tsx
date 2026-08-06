import type { GuideData } from "@/lib/guide-engine";

export default function GuideSummary({ summary }: { summary: GuideData["summary"] }) {
  return (
    <section id="summary" className="scroll-mt-28 rounded-3xl border border-blue-100 bg-blue-50 p-6 md:p-8">
      <span className="text-xs font-black tracking-[0.14em] text-blue-600">KEY POINT</span>
      <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">{summary.title}</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {summary.items.map((item, index) => (
          <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">{index + 1}</span>
            <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
