type CostItem = {
  label: string;
  value: string;
  note?: string;
};

type CostData = {
  title: string;
  summary?: string;
  items: CostItem[];
  realisticNote?: string;
};

type Props = {
  data?: CostData;
};

export default function CostInfo({ data }: Props) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="mt-10 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-2xl font-black tracking-[-0.03em]">
        {data.title}
      </h2>

      {data.summary && (
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {data.summary}
        </p>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {data.items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"
          >
            <p className="text-sm font-bold text-slate-400">{item.label}</p>
            <p className="mt-3 text-xl font-black text-slate-900">
              {item.value}
            </p>
            {item.note && (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {data.realisticNote && (
        <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-sm font-semibold leading-7 text-slate-700">
          {data.realisticNote}
        </div>
      )}
    </section>
  );
}