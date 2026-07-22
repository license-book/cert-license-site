type StrategySection = {
  title: string;
  items: string[];
  tip?: string;
};

type RoadmapItem = {
  step: string;
  title: string;
  description?: string;
};

type PeriodItem = {
  level: string;
  period: string;
  description?: string;
};

export type StudyStrategyData = {
  title?: string;
  summary: string;
  written: StrategySection;
  practical: StrategySection;
  roadmap: RoadmapItem[];
  periods: PeriodItem[];
  tips: string[];
  failures: string[];
  checklist: string[];
  resources: string[];
  labookAdvice: string;
};

type Props = {
  data: StudyStrategyData;
};

function BulletList({ items, marker = "✓" }: { items: string[]; marker?: string }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
          <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700">
            {marker}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function StudyStrategy({ data }: Props) {
  if (!data) return null;

  return (
    <div className="mt-10 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100 md:p-9">
      <div>
        <p className="text-sm font-black text-blue-600">라북 표준 공부전략</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] md:text-3xl">{data.title ?? "공부 전략"}</h2>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 md:p-6">
        <p className="text-xs font-black tracking-[0.08em] text-blue-700">핵심 전략</p>
        <p className="mt-2 text-base font-bold leading-8 text-slate-800">{data.summary}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {[data.written, data.practical].map((section) => (
          <article key={section.title} className="rounded-2xl border border-slate-100 p-5 md:p-6">
            <h3 className="text-lg font-black tracking-[-0.02em]">{section.title}</h3>
            <BulletList items={section.items} />
            {section.tip ? (
              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-black text-slate-500">라북 TIP</p>
                <p className="mt-1 text-sm font-semibold leading-7 text-slate-700">{section.tip}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <section className="mt-8 border-t border-slate-100 pt-8">
        <h3 className="text-xl font-black tracking-[-0.02em]">추천 학습 순서</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {data.roadmap.map((item, index) => (
            <div key={`${item.step}-${item.title}`} className="relative">
              <div className="h-full rounded-2xl border border-slate-100 p-4">
                <p className="text-xs font-black text-blue-600">{item.step}</p>
                <p className="mt-2 text-sm font-black leading-6 text-slate-900">{item.title}</p>
                {item.description ? <p className="mt-2 text-xs font-medium leading-5 text-slate-500">{item.description}</p> : null}
              </div>
              {index < data.roadmap.length - 1 ? <span aria-hidden="true" className="hidden md:absolute md:-right-2 md:top-1/2 md:block md:-translate-y-1/2 md:text-slate-300">→</span> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t border-slate-100 pt-8">
        <h3 className="text-xl font-black tracking-[-0.02em]">현실적인 공부 기간</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {data.periods.map((item) => (
            <article key={item.level} className="rounded-2xl border border-slate-100 p-5">
              <p className="text-sm font-black text-slate-600">{item.level}</p>
              <p className="mt-2 text-2xl font-black tracking-[-0.03em]">{item.period}</p>
              {item.description ? <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{item.description}</p> : null}
            </article>
          ))}
        </div>
        <p className="mt-3 text-xs font-medium leading-6 text-slate-500">실제 준비 기간은 하루 학습시간, 엑셀 경험, 실기 반복량에 따라 달라질 수 있습니다.</p>
      </section>

      <div className="mt-8 grid gap-4 border-t border-slate-100 pt-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-100 p-5 md:p-6">
          <h3 className="text-xl font-black tracking-[-0.02em]">합격 팁</h3>
          <BulletList items={data.tips} />
        </section>
        <section className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 md:p-6">
          <h3 className="text-xl font-black tracking-[-0.02em]">많이 실패하는 이유</h3>
          <BulletList items={data.failures} marker="!" />
        </section>
      </div>

      <section className="mt-8 border-t border-slate-100 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-black text-blue-600">D-7</p>
            <h3 className="mt-1 text-xl font-black tracking-[-0.02em]">시험 전 7일 체크리스트</h3>
          </div>
          <p className="text-xs font-semibold text-slate-500">시험 직전에는 새 내용을 늘리기보다 실수 방지에 집중합니다.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {data.checklist.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-slate-100 p-4">
              <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-slate-300" />
              <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t border-slate-100 pt-8">
        <h3 className="text-xl font-black tracking-[-0.02em]">공부 자료 활용법</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {data.resources.map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs font-black text-slate-400">자료 {String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white md:p-6">
        <p className="text-xs font-black tracking-[0.08em] text-blue-300">라북 한 줄 조언</p>
        <p className="mt-2 text-base font-black leading-8 md:text-lg">{data.labookAdvice}</p>
      </div>
    </div>
  );
}
