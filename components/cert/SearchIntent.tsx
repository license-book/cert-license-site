import type { SearchIntentData } from "@/lib/certificate-engine";

export default function SearchIntent({ data }: { data: SearchIntentData }) {
  const title = data.title?.trim() || "많이 찾는 질문과 검색어";
  const summary = data.summary?.trim();
  const keywords = (data.relatedKeywords ?? []).filter(Boolean);
  const items = (data.items ?? []).filter((item) => item.query?.trim() && item.answer?.trim());

  if (items.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <div className="max-w-3xl">
        <p className="text-xs font-black tracking-[0.16em] text-blue-600">SEARCH INTENT</p>
        <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950 md:text-2xl">{title}</h2>
        {summary ? <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 md:text-[15px]">{summary}</p> : null}
      </div>

      {keywords.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2" aria-label="관련 검색어">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article key={`${item.query}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            {item.intent ? (
              <p className="text-[11px] font-black tracking-[0.12em] text-blue-600">{item.intent}</p>
            ) : null}
            <h3 className="mt-1 text-base font-black leading-6 text-slate-950">{item.query}</h3>
            <p className="mt-3 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">{item.answer}</p>

            {item.points && item.points.length > 0 ? (
              <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                {item.points.filter(Boolean).map((point) => (
                  <li key={point} className="flex gap-2 text-sm font-semibold leading-6 text-slate-700">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      {data.note ? (
        <p className="mt-5 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-semibold leading-6 text-amber-900">{data.note}</p>
      ) : null}
    </div>
  );
}
