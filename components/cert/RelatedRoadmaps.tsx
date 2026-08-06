import Link from "next/link";
import type { RelatedRoadmapSummary } from "@/lib/roadmap-engine";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export default function RelatedRoadmaps({ items }: { items: RelatedRoadmapSummary[] }) {
  if (!items.length) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl">
        <span className="text-sm font-black text-blue-600">CAREER ROADMAP</span>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          이 자격증이 포함된 로드맵
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 md:text-base">
          이 자격증을 어느 단계에서 활용할 수 있는지 확인하고, 다음에 준비할 자격증까지 이어서 살펴보세요.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.slug}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-blue-50/50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                {item.categoryLabel}
              </span>
              {item.estimatedPeriod ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500">
                  예상 기간 {item.estimatedPeriod}
                </span>
              ) : null}
            </div>

            <h3 className="mt-4 text-xl font-black text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>

            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex items-start justify-between gap-4 rounded-xl bg-white px-4 py-3">
                <dt className="shrink-0 font-black text-slate-500">포함 단계</dt>
                <dd className="text-right font-black text-slate-800">{item.matchedStages.join(", ")}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3">
                <dt className="font-black text-slate-500">연결 자격증</dt>
                <dd className="font-black text-slate-800">{item.certificateCount}개</dd>
              </div>
            </dl>

            <Link
              href={item.href}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
            >
              로드맵 상세보기
              <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
