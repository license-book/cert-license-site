import type { SearchIntentData } from "@/lib/certificate-engine";

export default function SearchIntent({ data }: { data: SearchIntentData }) {
  const title = data.title?.trim() || "관련 정보 빠르게 찾기";
  const summary = data.summary?.trim();
  const links = (data.links ?? []).filter((item) => item.label?.trim() && item.href?.trim());
  const items = (data.items ?? []).filter((item) => item.query?.trim() && item.answer?.trim());
  const keywords = (data.relatedKeywords ?? []).filter(Boolean);

  if (links.length === 0 && items.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <div className="max-w-3xl">
        <p className="text-xs font-black tracking-[0.16em] text-blue-600">SEARCH GUIDE</p>
        <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950 md:text-2xl">{title}</h2>
        {summary ? <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 md:text-[15px]">{summary}</p> : null}
      </div>

      {links.length > 0 ? (
        <div className="mt-5">
          <p className="text-sm font-black text-slate-900">페이지 안에서 바로 찾기</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((item) => (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                title={item.keyword || item.label}
                className="rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
              >
                {item.label} →
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {items.length > 0 ? (
        <div className="mt-7 border-t border-slate-200 pt-6">
          <div className="mb-4">
            <p className="text-sm font-black text-slate-900">추가로 많이 궁금한 점</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">기존 시험·응시자격·취업 정보와 겹치지 않는 내용만 별도로 정리했습니다.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <article key={`${item.query}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {item.intent ? <p className="text-[11px] font-black tracking-[0.12em] text-blue-600">{item.intent}</p> : null}
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
        </div>
      ) : null}

      {keywords.length > 0 ? (
        <p className="sr-only">관련 검색어: {keywords.join(", ")}</p>
      ) : null}

      {data.note ? <p className="mt-5 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-semibold leading-6 text-amber-900">{data.note}</p> : null}
    </div>
  );
}
