import type { GuideData } from "@/lib/guide-engine";

export default function GuideFAQ({ faq }: { faq: NonNullable<GuideData["faq"]> }) {
  return (
    <section id="faq" className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">{faq.title ?? "자주 묻는 질문"}</h2>
      <div className="mt-6 divide-y divide-slate-200">
        {faq.items.map((item) => (
          <details key={item.question} className="group py-5 first:pt-0 last:pb-0">
            <summary className="cursor-pointer list-none pr-8 text-base font-black text-slate-900">{item.question}</summary>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
