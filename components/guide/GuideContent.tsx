import type { GuideSection } from "@/lib/guide-engine";

export default function GuideContent({ section }: { section: GuideSection }) {
  return (
    <section id={section.id} className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">{section.title}</h2>
      {section.description ? <p className="mt-3 text-base font-semibold leading-7 text-slate-600">{section.description}</p> : null}

      {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-5 text-[15px] font-medium leading-8 text-slate-700">{paragraph}</p>)}

      {section.bullets?.length ? (
        <ul className="mt-6 grid gap-3">
          {section.bullets.map((item) => <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />{item}</li>)}
        </ul>
      ) : null}

      {section.steps?.length ? (
        <div className="mt-6 grid gap-4">
          {section.steps.map((step, index) => (
            <article key={step.title} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">{index + 1}</span>
              <div><h3 className="text-lg font-black text-slate-900">{step.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{step.description}</p></div>
            </article>
          ))}
        </div>
      ) : null}

      {section.table ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-900"><tr>{section.table.headers.map((header) => <th key={header} className="border-b border-slate-200 px-4 py-3 font-black">{header}</th>)}</tr></thead>
            <tbody>{section.table.rows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-slate-100 last:border-0">{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-4 font-semibold leading-6 text-slate-600">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : null}

      {section.notice ? <aside className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5"><h3 className="font-black text-amber-900">{section.notice.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-amber-800">{section.notice.description}</p></aside> : null}
    </section>
  );
}
