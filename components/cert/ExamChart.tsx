type ChartItem = {
  label: string;
  value: number;
};

type Props = {
  enabled?: boolean;
  items?: ChartItem[];
  title?: string;
};

export default function ExamChart({
  enabled,
  items,
  title = "시험 준비 비중",
}: Props) {
  if (!enabled || !items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-7 rounded-2xl bg-slate-50 p-6">
      <h3 className="text-lg font-black">{title}</h3>

      <div className="mt-5 space-y-5">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}