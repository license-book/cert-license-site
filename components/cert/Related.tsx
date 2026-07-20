import Link from "next/link";

export type RelatedItem =
  | string
  | {
      name: string;
      slug?: string;
      tag?: string;
      compareSlug?: string;
      compareLabel?: string;
    };

type RelatedProps = {
  items: RelatedItem[];
};

function normalizeItem(item: RelatedItem) {
  if (typeof item === "string") {
    return {
      name: item,
      slug: undefined,
      tag: undefined,
      compareSlug: undefined,
      compareLabel: undefined,
    };
  }

  return item;
}

export default function Related({ items }: RelatedProps) {
  if (!items?.length) return null;

  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:mt-12">
      <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-6 md:px-8">
        <p className="text-sm font-bold text-blue-600">함께 살펴보기</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
          관련 자격증
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
          비슷한 자격증의 상세정보를 확인하거나, 비교페이지가 준비된 경우 차이를 바로 비교할 수 있습니다.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-8">
        {items.map((rawItem, index) => {
          const item = normalizeItem(rawItem);
          const detailHref = item.slug ? `/cert/${item.slug}` : undefined;
          const compareHref = item.compareSlug
            ? `/compare/${item.compareSlug}`
            : undefined;

          return (
            <article
              key={`${item.name}-${index}`}
              className="flex min-h-[190px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {item.tag ? (
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {item.tag}
                    </span>
                  ) : null}

                  <h3 className="mt-3 text-lg font-black leading-7 text-slate-900">
                    {item.name}
                  </h3>
                </div>

                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-500"
                >
                  {index + 1}
                </span>
              </div>

              <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
                {detailHref ? (
                  <Link
                    href={detailHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    상세보기
                  </Link>
                ) : (
                  <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-400">
                    상세 준비 중
                  </span>
                )}

                {compareHref ? (
                  <Link
                    href={compareHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    {item.compareLabel ?? "비교하기"}
                  </Link>
                ) : (
                  <span className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400">
                    비교 준비 중
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
