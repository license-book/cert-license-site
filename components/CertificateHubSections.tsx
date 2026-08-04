import AdSlot from "@/components/common/AdSlot";
import Link from "next/link";

type CertificateItem = {
  slug: string;
  name: string;
  shortName: string;
  licenseType: string;
  category: string;
  agency: string;
};

type Theme = "blue" | "violet";

type Props = {
  items: CertificateItem[];
  basePath: string;
  popularNames: string[];
  popularTitle: string;
  categoryTitle: string;
  theme?: Theme;
  showAdAfterPopular?: boolean;
};

const THEME = {
  blue: {
    eyebrow: "text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    icon: "bg-blue-600 text-white",
    cardHover: "hover:border-blue-300 hover:shadow-blue-100/70",
    link: "text-blue-600",
    categoryIcon: "bg-blue-50 text-blue-700",
  },
  violet: {
    eyebrow: "text-violet-600",
    badge: "bg-violet-50 text-violet-700",
    icon: "bg-violet-600 text-white",
    cardHover: "hover:border-violet-300 hover:shadow-violet-100/70",
    link: "text-violet-600",
    categoryIcon: "bg-violet-50 text-violet-700",
  },
} as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2" aria-hidden="true">
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h4A1.5 1.5 0 0 1 11 5.5v4A1.5 1.5 0 0 1 9.5 11h-4A1.5 1.5 0 0 1 4 9.5z" />
      <path d="M13 5.5A1.5 1.5 0 0 1 14.5 4h4A1.5 1.5 0 0 1 20 5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 13 9.5z" />
      <path d="M4 14.5A1.5 1.5 0 0 1 5.5 13h4a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 9.5 20h-4A1.5 1.5 0 0 1 4 18.5z" />
      <path d="M13 14.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5z" />
    </svg>
  );
}

export default function CertificateHubSections({
  items,
  basePath,
  popularNames,
  popularTitle,
  categoryTitle,
  theme = "blue",
  showAdAfterPopular = false,
}: Props) {
  const styles = THEME[theme];

  const normalizeName = (value: string) => value.replace(/\s+/g, "").toLocaleLowerCase("ko-KR");

  const popularItems = popularNames
    .map((name) => {
      const normalizedName = normalizeName(name);
      return items.find(
        (item) =>
          normalizeName(item.name) === normalizedName ||
          normalizeName(item.shortName) === normalizedName,
      );
    })
    .filter((item): item is CertificateItem => Boolean(item))
    .slice(0, 8);

  const categories = Array.from(
    items.reduce((map, item) => {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko-KR"));

  if (popularItems.length === 0 && categories.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] space-y-14 px-5 py-12 md:px-6 md:py-16">
        {popularItems.length > 0 ? (
          <div>
            <div className="mb-6">
              <p className={`text-sm font-black tracking-[0.14em] ${styles.eyebrow}`}>POPULAR</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                {popularTitle}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500 md:text-base">
                많은 수험생이 먼저 살펴보는 대표 자격증입니다.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {popularItems.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/cert/${item.slug}`}
                  className={`group flex min-h-40 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${styles.cardHover}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black ${styles.icon}`}>
                        {index + 1}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${styles.badge}`}>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">
                      {item.name}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-sm font-semibold text-slate-500">{item.agency}</p>
                  </div>
                  <span className={`mt-5 inline-flex items-center gap-1 text-sm font-black ${styles.link}`}>
                    상세정보 보기
                    <span className="transition-transform group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            {showAdAfterPopular ? (
              <AdSlot
                label="인기 민간자격증 하단"
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1}
                className="mt-10 mb-0"
              />
            ) : null}
          </div>
        ) : null}

        {categories.length > 0 ? (
          <div>
            <div className="mb-6">
              <p className={`text-sm font-black tracking-[0.14em] ${styles.eyebrow}`}>CATEGORY</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                {categoryTitle}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500 md:text-base">
                관심 분야를 선택하면 해당 분야 자격증만 모아볼 수 있습니다.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`${basePath}?category=${encodeURIComponent(category.name)}#certificate-list`}
                  className={`group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${styles.cardHover}`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${styles.categoryIcon}`}>
                      <CategoryIcon />
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-[15px] font-black text-slate-900">
                        {category.name}
                      </strong>
                      <span className="mt-0.5 block text-xs font-bold text-slate-500">{category.count}개 자격증</span>
                    </span>
                  </span>
                  <span className={`shrink-0 transition-transform group-hover:translate-x-1 ${styles.link}`}>
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
