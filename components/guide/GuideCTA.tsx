import Link from "next/link";
import type { GuideData } from "@/lib/guide-engine";

export default function GuideCTA({ cta }: { cta: NonNullable<GuideData["finalCta"]> }) {
  return (
    <section className="rounded-3xl bg-slate-950 p-7 text-white md:p-10">
      <h2 className="text-2xl font-black md:text-3xl">{cta.title}</h2>
      {cta.description ? <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-300">{cta.description}</p> : null}
      <div className="mt-6 flex flex-wrap gap-3">
        {cta.primaryButton ? <Link href={cta.primaryButton.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-black text-white hover:bg-blue-700">{cta.primaryButton.label}</Link> : null}
        {cta.secondaryButton ? <Link href={cta.secondaryButton.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white hover:bg-white/15">{cta.secondaryButton.label}</Link> : null}
      </div>
    </section>
  );
}
