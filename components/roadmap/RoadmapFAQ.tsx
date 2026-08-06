import type { RoadmapData } from "@/lib/roadmap-engine";
export default function RoadmapFAQ({ faq }: { faq: NonNullable<RoadmapData["faq"]> }) {
  return <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8"><h2 className="text-2xl font-black text-slate-950">{faq.title ?? "자주 묻는 질문"}</h2><div className="mt-5 divide-y divide-slate-200">{faq.items.map((item) => <details key={item.question} className="group py-4"><summary className="cursor-pointer list-none font-black text-slate-900">{item.question}</summary><p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.answer}</p></details>)}</div></section>;
}
