type Props = {
  items: string[];
};

export default function Related({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-2xl font-black tracking-[-0.03em]">
        관련 자격증
      </h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}