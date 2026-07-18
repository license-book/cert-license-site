type EligibilityCondition = {
  label: string;
  description: string;
};

type EligibilityData = {
  title: string;
  status: "none" | "conditional" | "restricted";
  statusLabel: string;
  summary: string;
  conditions?: EligibilityCondition[];
  commonQuestion?: {
    question: string;
    answer: string;
  };
  officialNotice?: string;
};

type Props = {
  data?: EligibilityData;
};

const statusStyles = {
  none: {
    badge: "bg-emerald-100 text-emerald-700",
    panel: "bg-emerald-50 ring-emerald-100",
  },
  conditional: {
    badge: "bg-amber-100 text-amber-700",
    panel: "bg-amber-50 ring-amber-100",
  },
  restricted: {
    badge: "bg-rose-100 text-rose-700",
    panel: "bg-rose-50 ring-rose-100",
  },
};

export default function EligibilityInfo({ data }: Props) {
  if (!data) return null;

  const style = statusStyles[data.status];

  return (
    <section className="mt-10 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-blue-600">응시자격 확인</p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
            {data.title}
          </h2>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-black ${style.badge}`}
        >
          {data.statusLabel}
        </span>
      </div>

      <div className={`mt-6 rounded-2xl p-5 ring-1 ${style.panel}`}>
        <p className="text-sm font-semibold leading-7 text-slate-700">
          {data.summary}
        </p>
      </div>

      {data.conditions && data.conditions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-black">응시 가능한 조건</h3>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {data.conditions.map((condition) => (
              <div
                key={condition.label}
                className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"
              >
                <p className="font-black text-slate-900">{condition.label}</p>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {condition.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.commonQuestion && (
        <div className="mt-6 rounded-2xl bg-blue-50 p-5">
          <p className="text-sm font-black text-blue-700">
            많이 헷갈리는 질문
          </p>

          <p className="mt-3 font-black text-slate-900">
            {data.commonQuestion.question}
          </p>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            {data.commonQuestion.answer}
          </p>
        </div>
      )}

      {data.officialNotice && (
        <p className="mt-5 text-xs leading-6 text-slate-500">
          ※ {data.officialNotice}
        </p>
      )}
    </section>
  );
}