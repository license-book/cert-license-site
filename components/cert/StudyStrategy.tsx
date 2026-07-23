import React from "react";

type BasicSection = { title: string; items: string[]; tip?: string };
type RoadmapStep = { step: string; title: string; description?: string };
type Period = { level: string; period: string; description?: string };
type LimitedTimeItem = {
  period: string;
  focus: string[];
  reduce?: string[];
  mustDo: string[];
};
type SuccessfulSequence = {
  intro?: string;
  steps: string[];
  reason?: string;
};
type RecommendedRoadmapItem = {
  label: string;
  description?: string;
  href?: string;
};

export type StudyStrategyData = {
  title?: string;
  summary: string;
  written: BasicSection;
  practical: BasicSection;
  roadmap: RoadmapStep[];
  periods: Period[];
  limitedTimeStrategy?: LimitedTimeItem[];
  tips: string[];
  failures: string[];
  checklist: string[];
  resources: string[];
  commonSuccessfulSequence?: SuccessfulSequence;
  recommendedRoadmap?: {
    intro?: string;
    items: RecommendedRoadmapItem[];
  };
  labookAdvice: string;
};

function Card({ title, children, featured = false }: { title: string; children: React.ReactNode; featured?: boolean }) {
  return (
    <section className={`rounded-3xl border p-6 md:p-8 ${featured ? "border-amber-200 bg-amber-50/70" : "border-slate-200 bg-white"}`}>
      <h3 className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-slate-700">
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="flex gap-3 leading-7">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function StudyStrategy({ data }: { data: StudyStrategyData }) {
  return (
    <section id="study-strategy" className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-amber-700">LABOOK STUDY STRATEGY</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{data.title || "공부 전략"}</h2>
      </div>

      <Card title="1. 핵심 전략">
        <p className="leading-8 text-slate-700">{data.summary}</p>
      </Card>

      <Card title={`2. ${data.written.title}`}>
        <List items={data.written.items} />
        {data.written.tip && <p className="mt-5 rounded-2xl bg-slate-100 p-4 leading-7 text-slate-700"><strong className="text-slate-950">라북 TIP</strong><br />{data.written.tip}</p>}
      </Card>

      <Card title={`3. ${data.practical.title}`}>
        <List items={data.practical.items} />
        {data.practical.tip && <p className="mt-5 rounded-2xl bg-slate-100 p-4 leading-7 text-slate-700"><strong className="text-slate-950">라북 TIP</strong><br />{data.practical.tip}</p>}
      </Card>

      <Card title="4. 추천 학습 순서">
        <ol className="grid gap-4">
          {data.roadmap.map((item) => (
            <li key={`${item.step}-${item.title}`} className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm font-bold text-amber-700">{item.step}</p>
              <h4 className="mt-1 font-bold text-slate-950">{item.title}</h4>
              {item.description && <p className="mt-2 leading-7 text-slate-700">{item.description}</p>}
            </li>
          ))}
        </ol>
      </Card>

      <Card title="5. 현실적인 공부 기간">
        <div className="grid gap-4 md:grid-cols-3">
          {data.periods.map((item) => (
            <div key={item.level} className="rounded-2xl border border-slate-200 p-5">
              <h4 className="font-bold text-slate-950">{item.level}</h4>
              <p className="mt-2 text-xl font-black text-amber-700">{item.period}</p>
              {item.description && <p className="mt-3 text-sm leading-6 text-slate-700">{item.description}</p>}
            </div>
          ))}
        </div>
      </Card>

      {!!data.limitedTimeStrategy?.length && (
        <Card title="6. 시간이 부족하다면 이렇게 공부하세요" featured>
          <div className="grid gap-4">
            {data.limitedTimeStrategy.map((item) => (
              <div key={item.period} className="rounded-2xl bg-white p-5 shadow-sm">
                <h4 className="text-lg font-black text-slate-950">시험까지 {item.period}</h4>
                <div className="mt-4 grid gap-5 md:grid-cols-3">
                  <div><p className="mb-2 font-bold text-slate-950">집중할 것</p><List items={item.focus} /></div>
                  <div><p className="mb-2 font-bold text-slate-950">줄여도 되는 것</p><List items={item.reduce || []} /></div>
                  <div><p className="mb-2 font-bold text-slate-950">반드시 할 것</p><List items={item.mustDo} /></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card title="7. 합격 팁"><List items={data.tips} /></Card>
      <Card title="8. 많이 실패하는 이유"><List items={data.failures} /></Card>
      <Card title="9. 시험 전 체크리스트">
        <ul className="grid gap-3 md:grid-cols-2">
          {data.checklist.map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 p-4 text-slate-700"><span aria-hidden="true">☐</span><span>{item}</span></li>)}
        </ul>
      </Card>
      <Card title="10. 공부 자료 활용법"><List items={data.resources} /></Card>

      {data.commonSuccessfulSequence && (
        <Card title="11. 실제 합격자들이 많이 선택하는 공부 순서" featured>
          {data.commonSuccessfulSequence.intro && <p className="leading-7 text-slate-700">{data.commonSuccessfulSequence.intro}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {data.commonSuccessfulSequence.steps.map((step, index) => (
              <React.Fragment key={`${index}-${step}`}>
                <span className="rounded-full bg-white px-4 py-2 font-semibold text-slate-900 shadow-sm">{step}</span>
                {index < data.commonSuccessfulSequence!.steps.length - 1 && <span aria-hidden="true">→</span>}
              </React.Fragment>
            ))}
          </div>
          {data.commonSuccessfulSequence.reason && <p className="mt-5 leading-7 text-slate-700">{data.commonSuccessfulSequence.reason}</p>}
        </Card>
      )}

      {data.recommendedRoadmap && (
        <Card title="12. 라북 추천 로드맵" featured>
          {data.recommendedRoadmap.intro && <p className="leading-7 text-slate-700">{data.recommendedRoadmap.intro}</p>}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {data.recommendedRoadmap.items.map((item, index) => {
              const content = <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-bold text-amber-700">STEP {index + 1}</p><h4 className="mt-1 font-bold text-slate-950">{item.label}</h4>{item.description && <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>}</div>;
              return item.href ? <a key={`${index}-${item.label}`} href={item.href} className="block transition hover:-translate-y-0.5">{content}</a> : <div key={`${index}-${item.label}`}>{content}</div>;
            })}
          </div>
        </Card>
      )}

      <Card title="13. 라북 한 줄 조언">
        <blockquote className="text-xl font-black leading-9 text-slate-950 md:text-2xl">“{data.labookAdvice}”</blockquote>
      </Card>
    </section>
  );
}
