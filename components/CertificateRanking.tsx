"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RankingCertificate } from "@/lib/ranking";

type Props = {
  items: RankingCertificate[];
};

type RankingKey =
  | "employment"
  | "applicants"
  | "passRate"
  | "beginner"
  | "difficulty";

type TypeFilter = "all" | "national" | "private";

const RANKINGS: {
  key: RankingKey;
  label: string;
  shortLabel: string;
  description: string;
  basis: string;
  official: boolean;
}[] = [
  {
    key: "employment",
    label: "취업 활용도",
    shortLabel: "취업",
    description:
      "자격증 JSON에 등록된 활용도, 추천 대상과 진로 활용 정보를 종합한 편집 순위입니다.",
    basis: "라북 편집 기준",
    official: false,
  },
  {
    key: "applicants",
    label: "응시자 수",
    shortLabel: "응시자",
    description:
      "자격증별로 등록된 가장 최근 연도의 공식 시험통계에서 응시자 수를 합산한 순위입니다.",
    basis: "등록된 공식 통계",
    official: true,
  },
  {
    key: "passRate",
    label: "합격률",
    shortLabel: "합격률",
    description:
      "등록된 가장 최근 연도의 합격자 수를 응시자 수로 나눈 가중 합격률 기준 순위입니다.",
    basis: "등록된 공식 통계",
    official: true,
  },
  {
    key: "beginner",
    label: "초보자 추천",
    shortLabel: "초보자",
    description:
      "난이도, 예상 준비기간과 응시자격 제한 정도를 종합한 입문 적합도 순위입니다.",
    basis: "라북 편집 기준",
    official: false,
  },
  {
    key: "difficulty",
    label: "난이도 높은 순",
    shortLabel: "난이도",
    description:
      "각 자격증 JSON에 등록된 난이도 표현을 동일한 100점 기준으로 환산한 순위입니다.",
    basis: "라북 편집 기준",
    official: false,
  },
];

function getRankingValue(item: RankingCertificate, key: RankingKey) {
  if (key === "employment") return item.scores.employment;
  if (key === "beginner") return item.scores.beginner;
  if (key === "difficulty") return item.scores.difficulty;
  if (key === "applicants") return item.statistics.applicants;
  return item.statistics.passRate;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function formatValue(item: RankingCertificate, key: RankingKey) {
  const value = getRankingValue(item, key);

  if (value === null) return "정보 부족";
  if (key === "applicants") return `${formatNumber(value)}명`;
  if (key === "passRate") return `${value.toFixed(1)}%`;
  return `${Math.round(value)}점`;
}

function getPrimaryNote(item: RankingCertificate, key: RankingKey) {
  if (key === "employment") return item.usefulnessText;
  if (key === "beginner") {
    return `${item.difficultyText} · ${item.studyPeriodText}`;
  }
  if (key === "difficulty") return item.difficultyText;

  if (item.statistics.latestYear) {
    return `${item.statistics.latestYear}년 등록 통계`;
  }

  return "등록 통계 확인 필요";
}

function ScoreBar({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-0 rounded-full bg-blue-600" />
      </div>
    );
  }

  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-slate-100"
      aria-label={`100점 중 ${Math.round(value)}점`}
    >
      <div
        className="h-full rounded-full bg-blue-600"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}


function ComparePicker({
  item,
  allItems,
  onClose,
}: {
  item: RankingCertificate;
  allItems: RankingCertificate[];
  onClose: () => void;
}) {
  const candidates = useMemo(() => {
    const bySlug = new Map(allItems.map((candidate) => [candidate.slug, candidate]));

    const related = item.relatedSlugs
      .map((slug) => bySlug.get(slug))
      .filter((candidate): candidate is RankingCertificate =>
        Boolean(candidate && candidate.slug !== item.slug),
      );

    const sameCategory = allItems
      .filter(
        (candidate) =>
          candidate.slug !== item.slug &&
          candidate.category === item.category &&
          !related.some((relatedItem) => relatedItem.slug === candidate.slug),
      )
      .slice(0, 6);

    return [...related, ...sameCategory].slice(0, 8);
  }, [allItems, item]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm md:items-center md:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} 비교 자격증 선택`}
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl md:max-w-2xl md:rounded-3xl md:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-black text-blue-600">
              비슷한 자격증과 비교
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              {item.name}
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              비교할 자격증을 선택하면 두 자격증이 설정된 비교 결과로 바로 이동합니다.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-xl font-black text-slate-500 hover:bg-slate-50"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {candidates.length ? (
          <div className="mt-6 grid gap-3">
            {candidates.map((candidate, index) => (
              <Link
                key={candidate.slug}
                href={`/compare?left=${encodeURIComponent(
                  item.slug,
                )}&right=${encodeURIComponent(candidate.slug)}#compare-result`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-base font-black text-slate-950 group-hover:text-blue-700">
                      {candidate.name}
                    </strong>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-black text-slate-600">
                      {candidate.category}
                    </span>
                    {index < item.relatedSlugs.length ? (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-black text-blue-700">
                        관련 자격증
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {candidate.difficultyText} · {candidate.studyPeriodText}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-black text-blue-600">
                  비교 →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-bold leading-6 text-slate-600">
              현재 연결할 관련 자격증이 없습니다. 상세페이지의 관련 자격증 데이터가
              추가되면 여기에 자동 반영됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TopCard({
  item,
  rank,
  rankingKey,
  onCompare,
}: {
  item: RankingCertificate;
  rank: number;
  rankingKey: RankingKey;
  onCompare: (item: RankingCertificate) => void;
}) {
  const value = getRankingValue(item, rankingKey);
  const rankStyle =
    rank === 1
      ? "border-amber-300 bg-gradient-to-b from-amber-50 to-white"
      : rank === 2
        ? "border-slate-300 bg-gradient-to-b from-slate-100 to-white"
        : "border-orange-200 bg-gradient-to-b from-orange-50 to-white";

  return (
    <article
      className={`relative rounded-3xl border p-6 shadow-sm md:p-7 ${rankStyle}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl bg-slate-950 px-3 text-lg font-black text-white">
          {rank}
        </span>
        <div className="flex flex-wrap justify-end gap-2">
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-slate-600 shadow-sm">
            {item.type === "national" ? "국가자격" : "민간자격"}
          </span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-blue-700 shadow-sm">
            {item.category}
          </span>
        </div>
      </div>

      <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
        {item.name}
      </h3>
      <p className="mt-2 text-sm font-semibold text-slate-500">
        {item.agency}
      </p>

      <div className="mt-6 rounded-2xl bg-white/90 p-4 shadow-sm">
        <div className="flex items-end justify-between gap-3">
          <span className="text-xs font-black text-slate-400">랭킹 기준값</span>
          <strong className="text-2xl font-black text-blue-700">
            {formatValue(item, rankingKey)}
          </strong>
        </div>
        {!["applicants", "passRate"].includes(rankingKey) ? (
          <div className="mt-3">
            <ScoreBar value={value} />
          </div>
        ) : null}
        <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
          {getPrimaryNote(item, rankingKey)}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-white/80 p-3">
          <span className="block text-xs font-black text-slate-400">
            난이도
          </span>
          <strong className="mt-1 block font-black text-slate-800">
            {item.difficultyText}
          </strong>
        </div>
        <div className="rounded-2xl bg-white/80 p-3">
          <span className="block text-xs font-black text-slate-400">
            준비기간
          </span>
          <strong className="mt-1 block font-black text-slate-800">
            {item.studyPeriodText}
          </strong>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/cert/${item.slug}`}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
        >
          상세정보
        </Link>
        <button
          type="button"
          onClick={() => onCompare(item)}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          비슷한 자격증과 비교
        </button>
      </div>
    </article>
  );
}

function RankingRow({
  item,
  rank,
  rankingKey,
  onCompare,
}: {
  item: RankingCertificate;
  rank: number;
  rankingKey: RankingKey;
  onCompare: (item: RankingCertificate) => void;
}) {
  return (
    <article className="grid gap-4 border-t border-slate-200 p-5 md:grid-cols-[70px_1fr_170px_190px] md:items-center md:p-6">
      <div className="flex items-center gap-3 md:block">
        <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-100 px-2 font-black text-slate-700">
          {rank}
        </span>
        <span className="text-xs font-black text-slate-400 md:mt-2 md:block">
          {item.type === "national" ? "국가" : "민간"}
        </span>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-black text-slate-950">{item.name}</h3>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700">
            {item.category}
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          {getPrimaryNote(item, rankingKey)}
        </p>
      </div>

      <div>
        <span className="text-xs font-black text-slate-400">기준값</span>
        <strong className="mt-1 block text-xl font-black text-blue-700">
          {formatValue(item, rankingKey)}
        </strong>
      </div>

      <div className="flex flex-wrap gap-2 md:justify-end">
        <Link
          href={`/cert/${item.slug}`}
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-slate-800"
        >
          상세보기
        </Link>
        <button
          type="button"
          onClick={() => onCompare(item)}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          비교 선택
        </button>
      </div>
    </article>
  );
}

export default function CertificateRanking({ items }: Props) {
  const [rankingKey, setRankingKey] = useState<RankingKey>("employment");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [category, setCategory] = useState("all");
  const [compareItem, setCompareItem] = useState<RankingCertificate | null>(null);
  const urlReady = useRef(false);

  const categories = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.category)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, "ko-KR")),
    [items],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextRanking = params.get("ranking") as RankingKey | null;
    const nextType = params.get("type") as TypeFilter | null;
    const nextCategory = params.get("category");

    if (RANKINGS.some((ranking) => ranking.key === nextRanking)) {
      setRankingKey(nextRanking as RankingKey);
    }
    if (nextType && ["all", "national", "private"].includes(nextType)) {
      setTypeFilter(nextType);
    }
    if (
      nextCategory &&
      (nextCategory === "all" || categories.includes(nextCategory))
    ) {
      setCategory(nextCategory);
    }

    urlReady.current = true;
  }, [categories]);

  useEffect(() => {
    if (!urlReady.current) return;

    const url = new URL(window.location.href);
    url.searchParams.set("ranking", rankingKey);
    url.searchParams.set("type", typeFilter);
    url.searchParams.set("category", category);
    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [rankingKey, typeFilter, category]);

  const activeRanking =
    RANKINGS.find((ranking) => ranking.key === rankingKey) ?? RANKINGS[0];

  const rankedItems = useMemo(() => {
    return items
      .filter((item) => typeFilter === "all" || item.type === typeFilter)
      .filter((item) => category === "all" || item.category === category)
      .filter((item) => {
        const value = getRankingValue(item, rankingKey);

        if (value === null) return false;
        if (rankingKey === "passRate") {
          return (item.statistics.applicants ?? 0) >= 10;
        }
        return true;
      })
      .sort((a, b) => {
        const aValue = getRankingValue(a, rankingKey) ?? -1;
        const bValue = getRankingValue(b, rankingKey) ?? -1;

        if (bValue !== aValue) return bValue - aValue;
        return a.name.localeCompare(b.name, "ko-KR");
      })
      .slice(0, 20);
  }, [items, rankingKey, typeFilter, category]);

  const topThree = rankedItems.slice(0, 3);
  const remaining = rankedItems.slice(3);

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-6 md:py-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {RANKINGS.map((ranking) => (
              <button
                key={ranking.key}
                type="button"
                onClick={() => setRankingKey(ranking.key)}
                className={`min-h-12 shrink-0 rounded-2xl px-5 text-sm font-black transition ${
                  rankingKey === ranking.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {ranking.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-[1fr_220px_220px] md:items-end md:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    activeRanking.official
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {activeRanking.basis}
                </span>
                <span className="text-xs font-black text-slate-400">
                  TOP 20
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                {activeRanking.label} 랭킹
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
                {activeRanking.description}
              </p>
            </div>

            <label>
              <span className="mb-2 block text-xs font-black text-slate-500">
                자격 구분
              </span>
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value as TypeFilter)
                }
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="all">국가·민간 전체</option>
                <option value="national">국가자격증</option>
                <option value="private">민간자격증</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-black text-slate-500">
                분야
              </span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="all">전체 분야</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
        {rankedItems.length ? (
          <>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-sm font-black text-blue-600">
                  {typeFilter === "all"
                    ? "전체 자격"
                    : typeFilter === "national"
                      ? "국가자격"
                      : "민간자격"}
                  {category !== "all" ? ` · ${category}` : ""}
                </span>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                  상위 {rankedItems.length}개 자격증
                </h2>
              </div>
              <p className="text-sm font-bold text-slate-500">
                동일한 값은 자격증명 가나다순으로 표시됩니다.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {topThree.map((item, index) => (
                <TopCard
                  key={item.slug}
                  item={item}
                  rank={index + 1}
                  rankingKey={rankingKey}
                  onCompare={setCompareItem}
                />
              ))}
            </div>

            {remaining.length ? (
              <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-black text-slate-950">
                    4위 이후 랭킹
                  </h3>
                </div>
                {remaining.map((item, index) => (
                  <RankingRow
                    key={item.slug}
                    item={item}
                    rank={index + 4}
                    rankingKey={rankingKey}
                    onCompare={setCompareItem}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-black text-slate-900">
              선택한 조건으로 표시할 랭킹 데이터가 없습니다.
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
              공식 통계가 없는 자격증은 응시자 수·합격률 랭킹에서 제외되며,
              편집 점수를 계산할 정보가 없는 경우에도 표시되지 않습니다.
            </p>
          </div>
        )}
      </section>

      {compareItem ? (
        <ComparePicker
          item={compareItem}
          allItems={items}
          onClose={() => setCompareItem(null)}
        />
      ) : null}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <span className="text-xs font-black text-blue-600">
              랭킹 운영 기준
            </span>
            <h2 className="mt-2 text-xl font-black text-slate-950 md:text-2xl">
              순위는 어떤 기준으로 계산되나요?
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5">
                <strong className="text-base font-black text-emerald-700">
                  공식 통계 기반
                </strong>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  응시자 수와 합격률은 각 자격증 JSON에 등록된 가장 최근
                  연도의 시험통계를 사용합니다. 통계가 없거나 응시자가 매우
                  적은 경우 순위에서 제외될 수 있습니다.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <strong className="text-base font-black text-amber-700">
                  라북 편집 기준
                </strong>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  취업 활용도·초보자 추천·난이도는 JSON에 등록된 활용도,
                  준비기간, 응시자격과 진로 정보를 공통 규칙으로 환산한
                  참고용 순위입니다.
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs font-bold leading-5 text-slate-500">
              랭킹은 자격증의 절대적 우열이나 개인의 합격 가능성을 보장하지
              않습니다. 실제 선택 전 상세페이지의 응시자격과 시험정보를
              확인하세요.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
