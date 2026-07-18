type RealityGuideData = {
  title: string;
  summary: string;
  recommendedFor: string[];
  reconsiderIf: string[];
  beforeStart: string[];
  realityPoints: string[];
  firstStep?: {
    title: string;
    description: string;
  };
  nextStep?: {
    title: string;
    description: string;
  };
};

type Props = {
  data?: RealityGuideData;
};

type GuideListProps = {
  title: string;
  description: string;
  items: string[];
  variant: "positive" | "caution";
};

function GuideList({
  title,
  description,
  items,
  variant,
}: GuideListProps) {
  if (!items || items.length === 0) return null;

  const isPositive = variant === "positive";

  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 md:p-6">
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
            isPositive
              ? "bg-blue-50 text-blue-700"
              : "bg-amber-50 text-amber-700"
          }`}
          aria-hidden="true"
        >
          {isPositive ? "✓" : "!"}
        </span>

        <div>
          <h3 className="text-lg font-black tracking-[-0.02em] text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm font-semibold leading-7 text-slate-700"
          >
            <span
              className={`mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full ${
                isPositive ? "bg-blue-600" : "bg-amber-500"
              }`}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

type DetailListProps = {
  title: string;
  items: string[];
};

function DetailList({ title, items }: DetailListProps) {
  if (!items || items.length === 0) return null;

  return (
    <article className="rounded-[22px] bg-slate-50 p-5 ring-1 ring-slate-100 md:p-6">
      <h3 className="text-base font-black text-slate-900">{title}</h3>

      <ul className="mt-4 divide-y divide-slate-200">
        {items.map((item) => (
          <li
            key={item}
            className="py-3 text-sm leading-7 text-slate-600 first:pt-0 last:pb-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function RealityGuide({ data }: Props) {
  if (!data) return null;

  return (
    <section className="mt-10 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7">
      <header className="max-w-[820px]">
        <p className="text-sm font-black text-blue-600">
          취득 전 꼭 확인하세요
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">
          {data.title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {data.summary}
        </p>
      </header>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <GuideList
          title="이런 분께 잘 맞습니다"
          description="목표와 준비 여건이 아래 내용에 가깝다면 취득을 고려할 수 있습니다."
          items={data.recommendedFor}
          variant="positive"
        />

        <GuideList
          title="이런 경우는 한 번 더 점검하세요"
          description="응시가 불가능하다는 뜻이 아니라 시간과 준비 방법을 먼저 확인하라는 의미입니다."
          items={data.reconsiderIf}
          variant="caution"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <DetailList
          title="시작하기 전에 확인할 점"
          items={data.beforeStart}
        />

        <DetailList
          title="준비 과정에서 체감하는 현실"
          items={data.realityPoints}
        />
      </div>

      {(data.firstStep || data.nextStep) && (
        <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200">
          <div className="grid md:grid-cols-2">
            {data.firstStep && (
              <article className="p-5 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                  Starting point
                </p>

                <h3 className="mt-2 text-lg font-black text-slate-900">
                  {data.firstStep.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {data.firstStep.description}
                </p>
              </article>
            )}

            {data.nextStep && (
              <article className="border-t border-slate-200 p-5 md:border-l md:border-t-0 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                  Next step
                </p>

                <h3 className="mt-2 text-lg font-black text-slate-900">
                  {data.nextStep.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {data.nextStep.description}
                </p>
              </article>
            )}
          </div>
        </div>
      )}
    </section>
  );
}