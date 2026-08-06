import Link from "next/link";
import AdSlot from "@/components/common/AdSlot";
import JsonLd from "@/components/common/JsonLd";
import { createRoadmapJsonLd, type RoadmapData } from "@/lib/roadmap-engine";
import RoadmapFAQ from "./RoadmapFAQ";
import RoadmapHero from "./RoadmapHero";
import RoadmapStages from "./RoadmapStages";
import RoadmapSummary from "./RoadmapSummary";

export default function RoadmapRenderer({ roadmap }: { roadmap: RoadmapData }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {createRoadmapJsonLd(roadmap).map((data, index) => <JsonLd key={index} data={data} />)}
      <RoadmapHero roadmap={roadmap} />
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1200px] gap-2 overflow-x-auto px-5 py-4 md:px-6">
          {roadmap.stages.map((stage) => <a key={stage.id} href={`#${stage.id}`} className="whitespace-nowrap rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 hover:bg-blue-50 hover:text-blue-700">{stage.number} {stage.title}</a>)}
        </div>
      </nav>
      <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-10 md:px-6 md:py-14">
        <AdSlot label="로드맵 상단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} className="mt-0" />
        <RoadmapSummary summary={roadmap.summary} />
        <RoadmapStages stages={roadmap.stages} />
        {roadmap.tips?.items?.length ? <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8"><h2 className="text-xl font-black text-slate-950">{roadmap.tips.title}</h2><ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-700">{roadmap.tips.items.map((item) => <li key={item} className="rounded-2xl bg-white p-4">• {item}</li>)}</ul></section> : null}
        <AdSlot label="로드맵 하단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />
        {roadmap.faq?.items?.length ? <RoadmapFAQ faq={roadmap.faq} /> : null}
        {roadmap.related?.items?.length ? <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8"><h2 className="text-xl font-black text-slate-950">{roadmap.related.title ?? "관련 콘텐츠"}</h2><div className="mt-4 flex flex-wrap gap-3">{roadmap.related.items.map((item) => <Link key={item.href} href={item.href} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-blue-700 hover:border-blue-300 hover:bg-blue-50">{item.label} →</Link>)}</div></section> : null}
        {roadmap.finalCta ? <section className="rounded-3xl bg-slate-950 p-7 text-white md:p-10"><h2 className="text-2xl font-black md:text-3xl">{roadmap.finalCta.title}</h2>{roadmap.finalCta.description ? <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-300 md:text-base">{roadmap.finalCta.description}</p> : null}<div className="mt-6 flex flex-wrap gap-3">{roadmap.finalCta.primaryButton ? <Link href={roadmap.finalCta.primaryButton.href} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">{roadmap.finalCta.primaryButton.label}</Link> : null}{roadmap.finalCta.secondaryButton ? <Link href={roadmap.finalCta.secondaryButton.href} className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white hover:bg-white/15">{roadmap.finalCta.secondaryButton.label}</Link> : null}</div></section> : null}
      </div>
    </main>
  );
}
