"use client";

import AdSlot from "@/components/common/AdSlot";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CompareCertificate } from "@/lib/comparison";

type Props = {
  items: CompareCertificate[];
};

type PairInsight = {
  summary: string;
  leftLabel: string;
  rightLabel: string;
  leftReasons: string[];
  rightReasons: string[];
  differences: {
    label: string;
    left: string;
    right: string;
  }[];
  decision: {
    left: string;
    right: string;
  };
};

const RECOMMENDED_PAIRS = [
  ["computer-specialist-1", "computer-specialist-2"],
  ["information-processing-engineer", "information-processing-industrial-engineer"],
  ["electrical-engineer", "electrical-industrial-engineer"],
  ["industrial-safety-engineer", "industrial-safety-industrial-engineer"],
  ["construction-material-testing-engineer", "construction-material-testing-industrial-engineer"],
  ["korean-cuisine-craftsman", "western-cuisine-craftsman"],
  ["computerized-accounting-grade-1", "computerized-accounting-grade-2"],
  ["licensed-real-estate-agent", "housing-manager-assistant"],
  ["psychological-counselor", "art-psychology-counselor"],
  ["video-editing-specialist", "content-creator"],
  ["pilates-instructor", "yoga-instructor"],
  ["smart-store-specialist", "shopping-mall-manager"],
] as const;

const CURATED_INSIGHTS: Record<string, PairInsight> = {
  "computer-specialist-1::computer-specialist-2": {
    summary:
      "1급은 높은 활용 범위와 심화 실무를, 2급은 빠른 취득과 사무 입문을 우선하는 선택입니다.",
    leftLabel: "취업 활용 범위를 넓히고 싶은 사람",
    rightLabel: "짧은 기간 안에 기본 역량을 증명하려는 사람",
    leftReasons: [
      "심화 스프레드시트와 데이터베이스 실무까지 준비하려는 경우",
      "공기업·사무직 준비에서 상위 등급을 목표로 하는 경우",
      "준비 부담이 커도 장기 활용성을 우선하는 경우",
    ],
    rightReasons: [
      "스프레드시트 중심의 기본 사무 능력을 먼저 갖추려는 경우",
      "자격증 공부가 처음이거나 단기 취득이 중요한 경우",
      "1급 준비 전 입문 단계가 필요한 경우",
    ],
    differences: [
      {
        label: "선택 목적",
        left: "상위 등급과 폭넓은 사무 실무 역량 증명",
        right: "기본 사무 능력과 빠른 자격 취득",
      },
      {
        label: "학습 범위",
        left: "스프레드시트 심화와 데이터베이스 영역까지 포함",
        right: "스프레드시트 중심의 기초·실무 영역",
      },
      {
        label: "준비 부담",
        left: "학습 범위와 실기 숙련 부담이 상대적으로 큼",
        right: "입문자가 접근하기 비교적 수월함",
      },
      {
        label: "추천 상황",
        left: "취업 경쟁력과 장기 활용도를 우선할 때",
        right: "단기 성과와 기본 역량 증명이 필요할 때",
      },
    ],
    decision: {
      left: "시간을 더 투자하더라도 상위 등급의 활용성을 원하면 1급",
      right: "빠르게 취득해 기본 사무 역량부터 증명하려면 2급",
    },
  },
  "information-processing-engineer::information-processing-industrial-engineer":
    {
      summary:
        "기사는 더 넓고 깊은 기술 역량을, 산업기사는 실무 진입에 필요한 중간 단계 역량을 확인하는 선택입니다.",
      leftLabel: "IT 경력의 확장성과 상위 자격을 원하는 사람",
      rightLabel: "응시 가능 시점과 실무 진입 속도를 우선하는 사람",
      leftReasons: [
        "개발·시스템 분야에서 장기적인 활용도를 높이려는 경우",
        "기사급 응시자격을 갖췄고 상위 수준을 목표로 하는 경우",
        "학습 범위가 넓어도 기술 전반을 깊게 준비하려는 경우",
      ],
      rightReasons: [
        "기사 응시 전 단계에서 실무형 자격을 확보하려는 경우",
        "전문대·관련 경력 등 산업기사 응시요건에 맞는 경우",
        "상대적으로 빠른 현장 진입을 우선하는 경우",
      ],
      differences: [
        {
          label: "자격 수준",
          left: "기사급",
          right: "산업기사급",
        },
        {
          label: "학습 깊이",
          left: "소프트웨어·데이터베이스·시스템 전반을 더 깊게 다룸",
          right: "실무 중심의 핵심 기술을 중간 수준으로 다룸",
        },
        {
          label: "활용 방향",
          left: "장기 경력 확장과 상위 기술직 활용",
          right: "초기 취업과 현장 실무 진입",
        },
        {
          label: "선택 기준",
          left: "응시자격이 되고 상위 수준을 목표로 할 때",
          right: "현재 응시요건과 빠른 취득 가능성을 우선할 때",
        },
      ],
      decision: {
        left: "상위 수준의 IT 자격과 장기 활용을 원하면 기사",
        right: "현재 조건에서 빠른 실무 진입을 원하면 산업기사",
      },
    },
  "electrical-engineer::electrical-industrial-engineer": {
    summary:
      "전기기사는 설계·관리 범위를 넓히는 상위 선택이고, 전기산업기사는 현장 실무 진입에 가까운 선택입니다.",
    leftLabel: "전기 분야에서 상위 역할과 장기 경력을 원하는 사람",
    rightLabel: "현장 실무 자격을 먼저 확보하려는 사람",
    leftReasons: [
      "전기 설비의 설계·감리·관리까지 폭넓게 준비하려는 경우",
      "기사 응시자격을 갖췄고 장기 경력 확장을 목표로 하는 경우",
      "학습량이 많아도 상위 자격의 활용 범위를 우선하는 경우",
    ],
    rightReasons: [
      "현장 실무와 설비 업무 진입을 우선하는 경우",
      "산업기사 응시요건에 맞고 빠른 자격 확보가 필요한 경우",
      "기사 준비 전 단계로 실무 기반을 만들려는 경우",
    ],
    differences: [
      {
        label: "자격 수준",
        left: "기사급",
        right: "산업기사급",
      },
      {
        label: "업무 범위",
        left: "설계·관리·감리 등 상위 역할까지 확장",
        right: "설비 운용과 현장 실무 중심",
      },
      {
        label: "준비 강도",
        left: "이론 범위와 계산 부담이 더 큼",
        right: "기사보다 범위가 상대적으로 압축됨",
      },
      {
        label: "추천 상황",
        left: "전기 분야에서 장기 경력과 상위 역할을 목표로 할 때",
        right: "현장 취업과 빠른 실무 자격 확보가 우선일 때",
      },
    ],
    decision: {
      left: "상위 직무와 장기 활용성을 원하면 전기기사",
      right: "현장 진입과 단계적 준비가 우선이면 전기산업기사",
    },
  },
  "industrial-safety-engineer::industrial-safety-industrial-engineer": {
    summary:
      "산업안전기사는 관리·기획 범위를 넓히는 선택이고, 산업안전산업기사는 현장 안전 실무 진입을 우선하는 선택입니다.",
    leftLabel: "안전관리 분야에서 상위 역할을 목표로 하는 사람",
    rightLabel: "현장 중심 안전 업무에 빠르게 진입하려는 사람",
    leftReasons: [
      "안전관리자 선임과 장기 경력 확장을 폭넓게 고려하는 경우",
      "기사급 응시자격을 갖췄고 관리 역할을 목표로 하는 경우",
      "안전 이론과 법규를 더 깊게 준비할 수 있는 경우",
    ],
    rightReasons: [
      "현장 안전 실무에 필요한 자격을 먼저 확보하려는 경우",
      "현재 산업기사 응시요건에 맞는 경우",
      "기사보다 단계적인 학습 경로가 필요한 경우",
    ],
    differences: [
      {
        label: "역할 방향",
        left: "안전관리·기획·총괄 역할로 확장",
        right: "현장 점검과 실무 중심",
      },
      {
        label: "학습 깊이",
        left: "법규·관리·기술 영역을 더 폭넓게 다룸",
        right: "현장 적용 중심의 핵심 범위를 다룸",
      },
      {
        label: "준비 부담",
        left: "학습량과 시험 난도가 상대적으로 높음",
        right: "상대적으로 단계적 접근이 가능함",
      },
      {
        label: "선택 기준",
        left: "상위 안전관리 직무를 목표로 할 때",
        right: "빠른 현장 진입과 실무 자격 확보가 우선일 때",
      },
    ],
    decision: {
      left: "상위 안전관리 역할과 장기 활용을 원하면 기사",
      right: "현장 실무 진입과 단계적 취득이 우선이면 산업기사",
    },
  },
  "korean-cuisine-craftsman::western-cuisine-craftsman": {
    summary:
      "두 자격증은 등급 차이가 아니라 조리 분야의 차이이므로, 취업하려는 업종과 익숙한 조리 방식으로 선택해야 합니다.",
    leftLabel: "한식 조리 현장과 전통 메뉴에 관심 있는 사람",
    rightLabel: "양식 레스토랑과 서양 조리에 관심 있는 사람",
    leftReasons: [
      "한식당·급식·단체조리 분야 취업을 고려하는 경우",
      "밥·국·찌개·전·구이 등 한식 조리 과정에 익숙한 경우",
      "국내 조리 현장에서 폭넓게 활용하려는 경우",
    ],
    rightReasons: [
      "호텔·레스토랑·브런치 등 양식 분야를 고려하는 경우",
      "소스·육류·파스타 등 서양 조리 방식에 관심 있는 경우",
      "한식과 다른 조리 분야로 전문성을 넓히려는 경우",
    ],
    differences: [
      {
        label: "핵심 차이",
        left: "한식 메뉴와 조리법 중심",
        right: "서양식 메뉴와 조리법 중심",
      },
      {
        label: "취업 방향",
        left: "한식당·급식·단체조리",
        right: "호텔·레스토랑·브런치·양식업장",
      },
      {
        label: "실기 적응",
        left: "한식 재료 손질과 조리 순서 숙련이 중요",
        right: "소스와 서양식 조리법 숙련이 중요",
      },
      {
        label: "선택 기준",
        left: "등급이 아니라 한식 분야 적합성",
        right: "등급이 아니라 양식 분야 적합성",
      },
    ],
    decision: {
      left: "한식 업종 취업이나 한식 실무가 목표라면 한식",
      right: "양식 업종 취업이나 서양 조리가 목표라면 양식",
    },
  },
};

function pairKey(leftSlug: string, rightSlug: string) {
  return `${leftSlug}::${rightSlug}`;
}

function reverseInsight(insight: PairInsight): PairInsight {
  return {
    summary: insight.summary,
    leftLabel: insight.rightLabel,
    rightLabel: insight.leftLabel,
    leftReasons: insight.rightReasons,
    rightReasons: insight.leftReasons,
    differences: insight.differences.map((item) => ({
      label: item.label,
      left: item.right,
      right: item.left,
    })),
    decision: {
      left: insight.decision.right,
      right: insight.decision.left,
    },
  };
}

function getCuratedInsight(
  left: CompareCertificate,
  right: CompareCertificate,
): PairInsight | null {
  const direct = CURATED_INSIGHTS[pairKey(left.slug, right.slug)];
  if (direct) return direct;

  const reversed = CURATED_INSIGHTS[pairKey(right.slug, left.slug)];
  return reversed ? reverseInsight(reversed) : null;
}

function buildGenericInsight(
  left: CompareCertificate,
  right: CompareCertificate,
): PairInsight {
  const categoryDifference =
    left.category !== right.category
      ? {
          label: "분야",
          left: left.category,
          right: right.category,
        }
      : null;

  const levelDifference =
    left.licenseType !== right.licenseType
      ? {
          label: "자격 구분",
          left: left.licenseType,
          right: right.licenseType,
        }
      : null;

  const differences = [
    categoryDifference,
    levelDifference,
    {
      label: "난이도",
      left: left.metrics.difficulty,
      right: right.metrics.difficulty,
    },
    {
      label: "준비기간",
      left: left.metrics.studyPeriod,
      right: right.metrics.studyPeriod,
    },
    {
      label: "응시자격",
      left: left.metrics.eligibility,
      right: right.metrics.eligibility,
    },
    {
      label: "시험 구성",
      left: left.metrics.exam,
      right: right.metrics.exam,
    },
    {
      label: "활용도",
      left: left.metrics.usefulness,
      right: right.metrics.usefulness,
    },
    {
      label: "최근 시험 통계",
      left: left.metrics.statistics,
      right: right.metrics.statistics,
    },
    {
      label: "비용",
      left: left.metrics.cost,
      right: right.metrics.cost,
    },
  ].filter(
    (
      item,
    ): item is {
      label: string;
      left: string;
      right: string;
    } => Boolean(item && item.left !== item.right),
  );

  const usableDifferences =
    differences.length > 0
      ? differences
      : [
          {
            label: "현재 데이터",
            left: "등록 정보상 뚜렷한 차이가 확인되지 않습니다.",
            right:
              "상세페이지에서 시험과 활용 분야를 추가 확인해야 합니다.",
          },
        ];

  return {
    summary:
      left.category !== right.category
        ? `${left.shortName}은 ${left.category} 분야, ${right.shortName}은 ${right.category} 분야를 목표로 할 때 선택하는 자격증입니다.`
        : "두 자격증은 같은 분야에 속하므로 응시자격, 시험 범위와 실제 활용 목적을 중심으로 선택해야 합니다.",
    leftLabel: `${left.category} 분야의 ${left.licenseType} 취득이 목표인 사람`,
    rightLabel: `${right.category} 분야의 ${right.licenseType} 취득이 목표인 사람`,
    leftReasons: [
      `${left.category} 분야 진입이 목표인 경우`,
      `${left.metrics.eligibility} 조건에 맞는 경우`,
      `${left.metrics.exam} 시험 구성이 본인에게 더 적합한 경우`,
    ],
    rightReasons: [
      `${right.category} 분야 진입이 목표인 경우`,
      `${right.metrics.eligibility} 조건에 맞는 경우`,
      `${right.metrics.exam} 시험 구성이 본인에게 더 적합한 경우`,
    ],
    differences: usableDifferences.slice(0, 8),
    decision: {
      left: `${left.category} 분야와 ${left.licenseType} 활용이 목표라면 ${left.shortName}`,
      right: `${right.category} 분야와 ${right.licenseType} 활용이 목표라면 ${right.shortName}`,
    },
  };
}

function DifferenceRow({
  label,
  left,
  right,
}: {
  label: string;
  left: string;
  right: string;
}) {
  return (
    <div className="grid grid-cols-2 border-t border-slate-200 md:grid-cols-[150px_1fr_1fr]">
      <div className="col-span-2 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 md:col-span-1 md:px-5 md:py-4">
        {label}
      </div>
      <div className="min-w-0 bg-white px-4 py-4 text-sm font-semibold leading-6 text-slate-700 md:border-l md:border-slate-200 md:px-5">
        {left}
      </div>
      <div className="min-w-0 border-l border-slate-200 bg-slate-50/60 px-4 py-4 text-sm font-semibold leading-6 text-slate-700 md:bg-white md:px-5">
        {right}
      </div>
    </div>
  );
}

function RecommendationCard({
  item,
  title,
  reasons,
  decision,
  accent,
}: {
  item: CompareCertificate;
  title: string;
  reasons: string[];
  decision: string;
  accent: "blue" | "violet";
}) {
  const accentClasses =
    accent === "blue"
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : "border-violet-200 bg-violet-50 text-violet-700";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <div
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${accentClasses}`}
      >
        이런 사람에게 추천
      </div>

      <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
        {item.name}
      </h3>
      <p className="mt-2 text-sm font-black text-slate-600">{title}</p>

      <ul className="mt-6 space-y-3">
        {reasons.map((reason) => (
          <li
            key={reason}
            className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
            {reason}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
        <p className="text-xs font-black text-blue-300">결정 문장</p>
        <p className="mt-2 text-sm font-bold leading-6">{decision}</p>
      </div>

      <Link
        href={`/cert/${item.slug}`}
        className="mt-5 inline-flex text-sm font-black text-blue-600 hover:text-blue-700"
      >
        상세정보 확인 →
      </Link>
    </article>
  );
}

export default function CertificateCompare({ items }: Props) {
  const [leftSlug, setLeftSlug] = useState(items[0]?.slug ?? "");
  const [rightSlug, setRightSlug] = useState(
    items[1]?.slug ?? items[0]?.slug ?? "",
  );
  const [urlStateReady, setUrlStateReady] = useState(false);

  const itemMap = useMemo(
    () => new Map(items.map((item) => [item.slug, item])),
    [items],
  );

  useEffect(() => {
    function applyUrlSelection() {
      const params = new URLSearchParams(window.location.search);
      const nextLeft = params.get("left");
      const nextRight = params.get("right");

      if (nextLeft && itemMap.has(nextLeft)) {
        setLeftSlug(nextLeft);
      }

      if (nextRight && itemMap.has(nextRight)) {
        setRightSlug(nextRight);
      }

      setUrlStateReady(true);
    }

    applyUrlSelection();
    window.addEventListener("popstate", applyUrlSelection);

    return () => {
      window.removeEventListener("popstate", applyUrlSelection);
    };
  }, [itemMap]);

  useEffect(() => {
    if (!urlStateReady || !leftSlug || !rightSlug) return;

    const url = new URL(window.location.href);
    url.searchParams.set("left", leftSlug);
    url.searchParams.set("right", rightSlug);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [urlStateReady, leftSlug, rightSlug]);

  useEffect(() => {
    if (
      !urlStateReady ||
      window.location.hash !== "#compare-result" ||
      !leftSlug ||
      !rightSlug
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      document.getElementById("compare-result")?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [urlStateReady, leftSlug, rightSlug]);

  const left = itemMap.get(leftSlug);
  const right = itemMap.get(rightSlug);

  const recommended = useMemo(
    () =>
      RECOMMENDED_PAIRS.map(
        ([a, b]) => [itemMap.get(a), itemMap.get(b)] as const,
      ).filter(
        (
          pair,
        ): pair is readonly [
          CompareCertificate,
          CompareCertificate,
        ] => Boolean(pair[0] && pair[1]),
      ),
    [itemMap],
  );

  const insight = useMemo(() => {
    if (!left || !right) return null;

    return (
      getCuratedInsight(left, right) ||
      buildGenericInsight(left, right)
    );
  }, [left, right]);

  function selectPair(a: string, b: string) {
    setLeftSlug(a);
    setRightSlug(b);

    window.setTimeout(() => {
      document
        .getElementById("compare-result")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 0);
  }

  function swapCertificates() {
    setLeftSlug(rightSlug);
    setRightSlug(leftSlug);
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-6">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-black text-slate-900">
            비교할 자격증 데이터가 없습니다.
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            자격증 JSON이 등록되면 비교 목록에 자동 반영됩니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-14">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-8">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
              <label className="block">
                <span className="mb-2 block text-sm font-black text-slate-700">
                  첫 번째 자격증
                </span>
                <select
                  value={leftSlug}
                  onChange={(event) => setLeftSlug(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 font-bold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {items.map((item) => (
                    <option
                      key={item.slug}
                      value={item.slug}
                      disabled={item.slug === rightSlug}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={swapCertificates}
                disabled={!leftSlug || !rightSlug}
                className="hidden h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 md:flex"
                aria-label="두 자격증 위치 바꾸기"
              >
                ⇄ 바꾸기
              </button>

              <label className="block">
                <span className="mb-2 block text-sm font-black text-slate-700">
                  두 번째 자격증
                </span>
                <select
                  value={rightSlug}
                  onChange={(event) => setRightSlug(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 font-bold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {items.map((item) => (
                    <option
                      key={item.slug}
                      value={item.slug}
                      disabled={item.slug === leftSlug}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {leftSlug === rightSlug ? (
              <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                같은 자격증이 두 칸에 선택되었습니다. 한쪽 자격증을 변경해 주세요.
              </p>
            ) : (
              <p className="mt-4 text-xs font-semibold text-slate-500">
                국가·민간 자격증을 서로 교차해 비교할 수도 있습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {recommended.length ? (
        <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              많이 비교하는 자격증
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              각 조합은 동일 정보가 아니라 선택을 가르는 전용 차이점으로
              분석합니다.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {recommended.map(([a, b]) => {
              const pairInsight =
                getCuratedInsight(a, b) || buildGenericInsight(a, b);

              return (
                <button
                  key={`${a.slug}-${b.slug}`}
                  type="button"
                  onClick={() => selectPair(a.slug, b.slug)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <span className="text-xs font-black text-blue-600">
                    추천 비교
                  </span>
                  <strong className="mt-2 block text-lg font-black leading-snug text-slate-950 md:text-xl">
                    {a.shortName}{" "}
                    <span className="text-slate-400">vs</span>{" "}
                    {b.shortName}
                  </strong>
                  <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">
                    {pairInsight.summary}
                  </p>
                  <span className="mt-4 block text-sm font-black text-blue-600">
                    핵심 차이 보기 →
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {recommended.length ? (
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <AdSlot
            label="많이 비교하는 자격증 하단"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1}
            className="my-0"
          />
        </div>
      ) : null}

      {left && right && insight && leftSlug !== rightSlug ? (
        <section
          id="compare-result"
          className="scroll-mt-28 bg-slate-50"
        >
          <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-6 md:py-16">
            <div>
              <span className="text-sm font-black text-blue-600">
                차이점 중심 비교
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                {left.shortName} vs {right.shortName}
              </h2>
              <p className="mt-3 max-w-4xl text-base font-bold leading-7 text-slate-600">
                {insight.summary}
              </p>
            </div>

            <section className="mt-7">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-black text-blue-600">
                    먼저 보는 결론
                  </span>
                  <h3 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">
                    핵심 차이 3개
                  </h3>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {insight.differences.slice(0, 3).map((item) => (
                  <article
                    key={`summary-${item.label}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <span className="text-xs font-black text-blue-600">
                      {item.label}
                    </span>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs font-black text-slate-400">
                          {left.shortName}
                        </p>
                        <p className="mt-1 text-sm font-bold leading-6 text-slate-800">
                          {item.left}
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-3">
                        <p className="text-xs font-black text-slate-400">
                          {right.shortName}
                        </p>
                        <p className="mt-1 text-sm font-bold leading-6 text-slate-800">
                          {item.right}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-2 bg-slate-950 text-white md:grid-cols-[150px_1fr_1fr]">
                <div className="hidden px-5 py-5 text-sm font-black text-slate-300 md:block">
                  비교 기준
                </div>
                <div className="min-w-0 px-4 py-5 text-center text-base font-black md:px-5 md:text-left md:text-lg">
                  {left.shortName}
                </div>
                <div className="min-w-0 border-l border-white/15 px-4 py-5 text-center text-base font-black md:px-5 md:text-left md:text-lg">
                  {right.shortName}
                </div>
              </div>

              {insight.differences.map((item) => (
                <DifferenceRow
                  key={item.label}
                  label={item.label}
                  left={item.left}
                  right={item.right}
                />
              ))}
            </section>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <RecommendationCard
                item={left}
                title={insight.leftLabel}
                reasons={insight.leftReasons}
                decision={insight.decision.left}
                accent="blue"
              />
              <RecommendationCard
                item={right}
                title={insight.rightLabel}
                reasons={insight.rightReasons}
                decision={insight.decision.right}
                accent="violet"
              />
            </div>

            <AdSlot
              label="자격증 비교 결과 중간"
              slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_2}
              className="my-10 md:my-12"
            />

            <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
              <h3 className="text-xl font-black text-slate-950">
                마지막 결정 기준
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5">
                  <strong className="text-base font-black text-blue-700">
                    {left.shortName}
                  </strong>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                    {insight.decision.left}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5">
                  <strong className="text-base font-black text-violet-700">
                    {right.shortName}
                  </strong>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                    {insight.decision.right}
                  </p>
                </div>
              </div>
            </section>

            <details open className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <summary className="cursor-pointer list-none p-6 text-base font-black text-slate-950 md:p-7">
                공통 기본정보와 원문 데이터
              </summary>
              <div className="border-t border-slate-200">
                <DifferenceRow
                  label="난이도 원문"
                  left={left.metrics.difficulty}
                  right={right.metrics.difficulty}
                />
                <DifferenceRow
                  label="준비기간 원문"
                  left={left.metrics.studyPeriod}
                  right={right.metrics.studyPeriod}
                />
                <DifferenceRow
                  label="활용도 원문"
                  left={left.metrics.usefulness}
                  right={right.metrics.usefulness}
                />
                <DifferenceRow
                  label="비용"
                  left={left.metrics.cost}
                  right={right.metrics.cost}
                />
                <DifferenceRow
                  label="시행기관"
                  left={left.agency}
                  right={right.agency}
                />
                <DifferenceRow
                  label="통계·정보 출처"
                  left={left.metrics.source}
                  right={right.metrics.source}
                />
              </div>
            </details>
          </div>
        </section>
      ) : null}
    </>
  );
}
