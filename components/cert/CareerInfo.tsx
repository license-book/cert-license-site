type CareerItem = {
  label: string;
  description: string;
};

type CareerSection = {
  title: string;
  items: CareerItem[];
};

type CareerData = {
  title: string;
  summary?: string;
  sections: CareerSection[];
  realisticNote?: string;
};

type Props = {
  data?: CareerData;
};

export default function CareerInfo({ data }: Props) {
  if (!data || !data.sections || data.sections.length === 0) return null;

  return (
    <section className="mt-10 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7">
      <header className="max-w-[840px]">
        <p className="text-sm font-black text-blue-600">
          취득 후 활용
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">
          {data.title}
        </h2>

        {data.summary && (
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {data.summary}
          </p>
        )}
      </header>

      <div className="mt-7 space-y-6">
        {data.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[22px] border border-slate-200 p-5 md:p-6"
          >
            <h3 className="text-lg font-black tracking-[-0.02em] text-slate-900">
              {section.title}
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"
                >
                  <p className="font-black text-slate-900">
                    {item.label}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {data.realisticNote && (
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-black text-blue-700">
            현실적으로 확인할 점
          </p>

          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            {data.realisticNote}
          </p>
        </div>
      )}
    </section>
  );
}