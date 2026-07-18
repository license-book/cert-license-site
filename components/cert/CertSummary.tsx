type KeyInfoItem = {
  label: string;
  value: string;
  note?: string;
};

type Props = {
  title?: string;
  items: KeyInfoItem[];
};

export default function CertSummary({
  title = "한눈에 보는 핵심 정보",
  items,
}: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7">
      <div className="max-w-[760px]">
        <p className="text-sm font-black text-blue-600">핵심 요약</p>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          준비 전에 가장 먼저 확인해야 할 핵심 정보를 짧게 정리했습니다.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.label}
            className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 opacity-0 transition group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">{item.label}</p>

                <p className="mt-3 text-[26px] font-black tracking-[-0.04em] text-slate-900">
                  {item.value}
                </p>
              </div>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {item.note && (
              <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">
                {item.note}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}