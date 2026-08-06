import Link from "next/link";
import type { GuideData } from "@/lib/guide-engine";

export default function RelatedGuides({ related }: { related: NonNullable<GuideData["related"]> }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-black text-slate-950">{related.title ?? "함께 보면 좋은 가이드"}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {related.items.map((item) => <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 p-4 text-sm font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">{item.label} →</Link>)}
      </div>
    </section>
  );
}
