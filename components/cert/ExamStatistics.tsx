'use client';

import React, { useMemo, useState } from 'react';

export interface StatisticsItem {
  year: number;
  applicants: number;
  passed: number;
  passRate: number;
}

export interface StatisticsGroup {
  id: string;
  title: string;
  description?: string;
  items: StatisticsItem[];
}

export interface StatisticsSource {
  label?: string;
  url?: string;
  lastVerified?: string;
}

export interface ExamStatisticsData {
  enabled?: boolean;
  title?: string;
  summary?: string;
  groups?: StatisticsGroup[];
  source?: StatisticsSource;
  analysis?: string[];
  notice?: string;
}

export interface ExamStatisticsProps {
  statistics?: ExamStatisticsData;
  className?: string;
}

type MetricKey = 'applicants' | 'passed' | 'passRate';

const metricLabels: Record<MetricKey, string> = {
  applicants: '응시자',
  passed: '합격자',
  passRate: '합격률',
};

const numberFormatter = new Intl.NumberFormat('ko-KR');

function formatMetric(value: number, metric: MetricKey) {
  return metric === 'passRate' ? `${value.toFixed(1)}%` : `${numberFormatter.format(value)}명`;
}

function changeRate(current: number, previous: number) {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
}

function trendText(value: number | null) {
  if (value === null || !Number.isFinite(value)) return '비교 데이터 없음';
  if (Math.abs(value) < 0.05) return '변동 없음';
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold leading-none tracking-tight text-slate-900 md:text-4xl">{value}</p>
      {sub ? <p className="mt-2 text-xs text-slate-500">{sub}</p> : null}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <p className="font-semibold text-slate-700">표시할 시험 통계가 없습니다.</p>
      <p className="mt-2 text-sm text-slate-500">
        JSON의 statistics.groups 항목에 연도별 데이터를 입력하세요.
      </p>
    </div>
  );
}

function LineChart({
  items,
  metric,
}: {
  items: StatisticsItem[];
  metric: MetricKey;
}) {
  const width = 1000;
  const height = 300;
  const padding = { top: 28, right: 28, bottom: 48, left: 74 };

  const sorted = [...items].sort((a, b) => a.year - b.year);
  const values = sorted.map((item) => item[metric]);
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = Math.max(maxValue - minValue, 1);

  const x = (index: number) => {
    if (sorted.length <= 1) return width / 2;
    return (
      padding.left +
      (index * (width - padding.left - padding.right)) / (sorted.length - 1)
    );
  };

  const y = (value: number) =>
    padding.top +
    ((maxValue - value) * (height - padding.top - padding.bottom)) / range;

  const points = sorted.map((item, index) => `${x(index)},${y(item[metric])}`).join(' ');

  const gridValues = Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4;
    return maxValue - range * ratio;
  });

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${metricLabels[metric]} 연도별 추이 그래프`}
      >
        {gridValues.map((gridValue, index) => {
          const gridY = y(gridValue);
          return (
            <g key={index}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={gridY}
                y2={gridY}
                stroke="currentColor"
                className="text-slate-200"
                strokeDasharray="4 6"
              />
              <text
                x={padding.left - 12}
                y={gridY + 4}
                textAnchor="end"
                className="fill-slate-400 text-[11px]"
              >
                {metric === 'passRate'
                  ? `${gridValue.toFixed(0)}%`
                  : numberFormatter.format(Math.round(gridValue))}
              </text>
            </g>
          );
        })}

        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="text-blue-600"
        />

        {sorted.map((item, index) => (
          <g key={item.year}>
            <circle
              cx={x(index)}
              cy={y(item[metric])}
              r="6"
              fill="white"
              stroke="currentColor"
              strokeWidth="4"
              className="text-blue-600"
            />
            <text
              x={x(index)}
              y={height - 18}
              textAnchor="middle"
              className="fill-slate-500 text-[12px] font-medium"
            >
              {item.year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function ExamStatistics({
  statistics,
  className = '',
}: ExamStatisticsProps) {
  const groups = statistics?.groups ?? [];
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? '');
  const [metric, setMetric] = useState<MetricKey>('passRate');

  const activeGroup = useMemo(
    () => groups.find((group) => group.id === activeGroupId) ?? groups[0],
    [groups, activeGroupId],
  );

  const sortedItems = useMemo(
    () => [...(activeGroup?.items ?? [])].sort((a, b) => b.year - a.year),
    [activeGroup],
  );

  if (!statistics?.enabled) return null;

  const latest = sortedItems[0];
  const previous = sortedItems[1];

  const applicantChange =
    latest && previous ? changeRate(latest.applicants, previous.applicants) : null;
  const passedChange =
    latest && previous ? changeRate(latest.passed, previous.passed) : null;
  const passRateChange =
    latest && previous ? latest.passRate - previous.passRate : null;

  return (
    <section
      className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-8 text-white md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-blue-300">
              EXAM DATA
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              {statistics.title ?? '최근 시험 통계'}
            </h2>
            {statistics.summary ? (
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                {statistics.summary}
              </p>
            ) : null}
          </div>

          {statistics.source?.label ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <p className="text-xs text-slate-400">통계 출처</p>
              {statistics.source.url ? (
                <a
                  href={statistics.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {statistics.source.label}
                </a>
              ) : (
                <p className="mt-1 font-semibold text-white">
                  {statistics.source.label}
                </p>
              )}
              {statistics.source.lastVerified ? (
                <p className="mt-1 text-xs text-slate-400">
                  최종 확인: {statistics.source.lastVerified}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {!groups.length ? (
          <EmptyState />
        ) : (
          <>
            {groups.length > 1 ? (
              <div className="mb-7 flex flex-wrap gap-2">
                {groups.map((group) => {
                  const selected = group.id === activeGroup?.id;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveGroupId(group.id)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        selected
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {group.title}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {activeGroup?.title}
              </h3>
              {activeGroup?.description ? (
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {activeGroup.description}
                </p>
              ) : null}
            </div>

            {latest ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label={`${latest.year}년 응시자`}
                  value={`${numberFormatter.format(latest.applicants)}명`}
                  sub={`전년 대비 ${trendText(applicantChange)}`}
                />
                <MetricCard
                  label={`${latest.year}년 합격자`}
                  value={`${numberFormatter.format(latest.passed)}명`}
                  sub={`전년 대비 ${trendText(passedChange)}`}
                />
                <MetricCard
                  label={`${latest.year}년 합격률`}
                  value={`${latest.passRate.toFixed(1)}%`}
                  sub={
                    passRateChange === null
                      ? '비교 데이터 없음'
                      : `전년 대비 ${passRateChange > 0 ? '+' : ''}${passRateChange.toFixed(
                          1,
                        )}%p`
                  }
                />
                <MetricCard
                  label="통계 기준연도"
                  value={`${latest.year}년`}
                  sub={`${sortedItems.length}개 연도 데이터`}
                />
              </div>
            ) : null}

            <div className="mt-8 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
              <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">연도별 추이</h4>
                    <p className="mt-1 text-sm text-slate-500">
                      지표를 선택해 변화 흐름을 확인할 수 있습니다.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(metricLabels) as MetricKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMetric(key)}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                          metric === key
                            ? 'bg-blue-600 text-white'
                            : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {metricLabels[key]}
                      </button>
                    ))}
                  </div>
                </div>

                {sortedItems.length ? (
                  <LineChart items={sortedItems} metric={metric} />
                ) : (
                  <EmptyState />
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-5 py-4">
                  <h4 className="font-bold text-slate-900">연도별 상세</h4>
                </div>

                <div className="max-h-[390px] overflow-y-auto overflow-x-hidden">
                  <table className="w-full table-fixed text-sm">
                    <thead className="sticky top-0 bg-slate-50 text-slate-500">
                      <tr>
                        <th className="w-[22%] px-4 py-3 text-left font-semibold">연도</th>
                        <th className="w-[26%] px-4 py-3 text-right font-semibold">응시자</th>
                        <th className="w-[26%] px-4 py-3 text-right font-semibold">합격자</th>
                        <th className="w-[26%] px-4 py-3 text-right font-semibold">합격률</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sortedItems.map((item) => (
                        <tr key={item.year} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {item.year}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600">
                            {numberFormatter.format(item.applicants)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600">
                            {numberFormatter.format(item.passed)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-blue-700">
                            {item.passRate.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {statistics.analysis?.length ? (
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 md:p-6">
            <h3 className="text-lg font-bold text-slate-900">통계 해석 포인트</h3>
            <ul className="mt-4 space-y-3">
              {statistics.analysis.map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {statistics.notice ? (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm leading-6 text-amber-900">
              <strong className="font-bold">확인 안내:</strong> {statistics.notice}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
