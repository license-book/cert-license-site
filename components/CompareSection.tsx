import Link from "next/link";

const comparisons = [
  { title: "컴활 1급 vs 2급", description: "난이도, 취업 활용도, 공부기간을 비교해보세요." },
  { title: "전기기사 vs 전기산업기사", description: "응시자격과 시험 난이도의 차이를 확인하세요." },
];

export default function CompareSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">인기 비교 콘텐츠</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">비슷한 자격증의 차이를 한눈에 확인하세요.</p>
        </div>
        <Link href="/compare" className="shrink-0 text-sm font-black text-blue-600 hover:text-blue-700">전체 비교 →</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {comparisons.map((item) => (
          <Link key={item.title} href="/compare" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
            <div className="text-sm font-black text-blue-600">비교 콘텐츠</div>
            <h3 className="mt-2 text-lg font-black text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
