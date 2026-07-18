type Props = {
  items: string[];
};

export default function StudentNeeds({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-2xl font-black tracking-[-0.03em]">
        수험생이 진짜 궁금해하는 정보
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((text) => (
          <div
            key={text}
            className="rounded-2xl bg-blue-50 p-5 text-sm font-semibold leading-7 text-slate-700"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}