import type { CertificateData, SearchIntentData } from "./types";

// 자격증별로 기존 상세 섹션과 겹치지 않는 검색의도만 관리합니다.
// 제도·지원금처럼 변동 가능한 내용은 단정하지 않고 공식 사이트 재확인을 안내합니다.
const SPECIAL_SEARCH_INTENTS: Record<string, NonNullable<SearchIntentData["items"]>> = {
  "air-conditioning-refrigeration-craftsman": [
    {
      query: "공조냉동기계기능사는 국비지원으로 준비할 수 있나요?",
      intent: "국비지원",
      answer: "고용24에는 공조냉동기계기능사와 냉동공조 실무를 포함한 국민내일배움카드 훈련과정이 운영되는 경우가 있습니다. 과정마다 모집시기·지원유형·자비부담액이 다르므로 신청 시점의 고용24 과정정보를 확인하는 것이 안전합니다.",
      points: ["고용24에서 종목명과 냉동공조 직종을 함께 검색", "실기 장비·재료비 포함 여부 확인", "본인에게 적용되는 자비부담액 별도 확인"]
    },
    {
      query: "기능사 취득 후 산업기사까지 이어서 준비할 가치가 있나요?",
      intent: "상위자격",
      answer: "기능사는 냉동·공조 분야 입문과 현장 기초를 만드는 데 적합하고, 산업기사는 설비관리·유지보수 분야에서 한 단계 높은 역량을 보여주는 자격으로 활용할 수 있습니다. 장기적으로 시설관리나 기계설비 분야를 목표로 한다면 실무경력과 함께 상위 등급을 검토할 가치가 있습니다."
    },
    {
      query: "공조냉동기계기능사와 에너지관리기능사를 같이 준비해도 되나요?",
      intent: "자격조합",
      answer: "두 자격은 시설관리 현장에서 함께 거론되는 경우가 많고 실제 직업훈련 과정에서도 냉동공조와 에너지관리 자격을 묶어 운영하는 사례가 있습니다. 다만 시험범위와 실기 준비가 각각 있으므로 동시에 준비할 때는 시험일정과 실습시간을 먼저 확인하는 편이 좋습니다."
    }
  ],
  "air-conditioning-refrigeration-industrial-engineer": [
    {
      query: "공조냉동기계산업기사는 과정평가형으로도 취득할 수 있나요?",
      intent: "과정평가형",
      answer: "공조냉동기계산업기사는 과정평가형 자격 과정이 개설되는 종목입니다. 검정형 시험과 달리 지정 교육·훈련과정을 이수하고 내부·외부평가를 거치는 방식이므로, 일반 응시자격이 맞지 않는 경우에도 본인에게 적합한 과정이 있는지 확인해볼 수 있습니다.",
      points: ["과정평가형 개설 여부와 모집기간 확인", "교육시간이 긴 편이므로 출석 가능 여부 확인", "과정별 비용·지원조건 확인"]
    },
    {
      query: "공조냉동기계산업기사와 기사는 공부 범위가 같은가요?",
      intent: "등급차이",
      answer: "공통되는 냉동·공조 개념이 있지만 출제범위와 난이도가 완전히 같지는 않습니다. 기사에는 더 넓거나 심화된 영역이 포함될 수 있으므로 산업기사가 목표라면 산업기사 출제기준과 문제유형에 맞춰 준비하는 것이 효율적입니다."
    },
    {
      query: "시설관리 취업을 목표로 하면 어떤 자격과 함께 준비하면 좋나요?",
      intent: "자격조합",
      answer: "공조냉동은 냉난방·냉동설비와 직접 연결되고 시설관리 채용에서는 전기·에너지·소방 등 다른 설비 역량도 함께 요구될 수 있습니다. 처음부터 자격증 수를 늘리기보다 목표 채용공고에서 반복적으로 요구하는 직무와 자격을 확인한 뒤 다음 자격을 정하는 것이 좋습니다."
    }
  ],
  "air-conditioning-refrigeration-engineer": [
    {
      query: "비전공자도 공조냉동기계기사를 준비할 수 있나요?",
      intent: "비전공자",
      answer: "기사 등급은 응시자격을 먼저 충족해야 하므로 비전공자라면 현재 학력·전공·보유자격·실무경력 중 인정되는 조건을 우선 확인해야 합니다. 학점은행제 등을 검토하는 수험생도 있지만 개인별 인정조건이 다르므로 Q-Net 응시자격 자가진단과 공식 상담을 기준으로 판단하는 것이 안전합니다."
    },
    {
      query: "공조냉동기계기사 실기만 국비지원 훈련을 받을 수도 있나요?",
      intent: "국비지원",
      answer: "고용24에는 시기에 따라 공조냉동기계기사 실기 대비 직업훈련 과정이 등록되기도 합니다. 훈련비 전액이 항상 지원되는 것은 아니며 훈련유형과 개인 조건에 따라 자비부담액이 달라질 수 있으므로 신청 화면의 실제 부담액을 확인해야 합니다."
    },
    {
      query: "공조냉동기계기사와 산업기사 중 무엇을 먼저 따는 게 좋나요?",
      intent: "등급선택",
      answer: "기사 응시자격을 이미 갖췄고 장기적으로 설계·관리 등 높은 수준의 직무를 목표로 한다면 기사에 바로 도전할 수 있습니다. 반면 산업기사 취득이 더 빠르게 필요한 상황이라면 산업기사 출제범위에 집중해 먼저 취득한 뒤 기사로 확장하는 방법도 현실적입니다."
    }
  ],
  "automotive-maintenance-craftsman": [
    {
      query: "자동차정비기능사도 국비지원 학원에서 준비할 수 있나요?",
      intent: "국비지원",
      answer: "자동차정비 분야는 국민내일배움카드 훈련과정이 개설되는 분야이며 기능사 실기나 자동차정비 실무가 포함된 과정도 확인할 수 있습니다. 지역과 시기에 따라 과정이 크게 달라지므로 고용24에서 현재 모집 중인 과정과 자비부담액을 확인하세요."
    },
    {
      query: "자동차정비기능사 다음에는 산업기사를 따는 게 좋나요?",
      intent: "상위자격",
      answer: "정비 분야에서 계속 경력을 쌓을 계획이라면 기능사 취득 후 자동차정비산업기사로 확장하는 경로를 검토할 수 있습니다. 산업기사는 기능사보다 이론과 진단 역량의 요구 수준이 높으므로 응시자격 충족 시점과 실제 경력을 함께 고려하는 것이 좋습니다."
    },
    {
      query: "전기차 시대에도 자동차정비기능사가 도움이 되나요?",
      intent: "전기차",
      answer: "자동차정비의 기본적인 점검·정비 체계를 익히는 데 의미가 있지만 전기차는 고전압 전기·전자 시스템 등 추가 역량이 필요합니다. 장기 취업을 목표로 한다면 자격 취득 후 전기차 진단·안전 관련 실무교육을 함께 보완하는 편이 좋습니다."
    }
  ]
};

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function deriveNationalSpecialItems(cert: CertificateData): NonNullable<SearchIntentData["items"]> {
  if (cert.basic.type !== "national") return [];

  const name = cert.basic.name;
  const licenseType = cert.basic.licenseType || "";
  const category = cert.basic.category || "";
  const examText = JSON.stringify(cert.exam ?? {});
  const keyInfoText = JSON.stringify(cert.keyInfo ?? {});
  const items: NonNullable<SearchIntentData["items"]> = [];

  const hasPractical = includesAny(examText, ["실기", "작업형", "실무"]);
  const isCraftsman = includesAny(licenseType + name, ["기능사"]);
  const isIndustrialEngineer = includesAny(licenseType + name, ["산업기사"]);
  const isEngineer = !isIndustrialEngineer && includesAny(licenseType + name, ["기사"]);
  const isTechnical = includesAny(licenseType, ["국가기술", "기능사", "산업기사", "기사"]);

  if (isCraftsman) {
    items.push({
      query: `${name} 취득 후 어떤 상위 자격을 준비하면 좋나요?`,
      intent: "상위자격",
      answer: `${name}를 입문 자격으로 활용한 뒤 같은 직무계열의 산업기사·기사 또는 인접 분야 자격으로 확장할 수 있습니다. 다만 상위 등급은 응시자격과 시험범위가 달라질 수 있으므로, 실제 취업 목표와 경력 계획을 먼저 정한 뒤 다음 자격을 선택하는 편이 효율적입니다.`,
      points: ["같은 직무계열의 상위 등급 존재 여부 확인", "상위 등급 응시자격 확인", "목표 채용공고에서 우대 자격 비교"]
    });
  }

  if (isIndustrialEngineer) {
    items.push({
      query: `${name}와 기사 등급은 어떤 차이가 있나요?`,
      intent: "등급차이",
      answer: `${name}와 같은 계열의 기사 자격은 응시자격과 출제범위, 요구되는 이론·실무 수준이 다를 수 있습니다. 현재 응시 가능한 등급과 취업 목적을 기준으로 선택하고, 장기적으로 기사까지 필요하다면 산업기사 준비 과정에서 공통 기초를 탄탄히 만드는 것이 좋습니다.`
    });
  }

  if (isEngineer) {
    items.push({
      query: `비전공자가 ${name}를 준비할 때 가장 먼저 확인할 것은 무엇인가요?`,
      intent: "비전공자",
      answer: `${name}처럼 기사 등급에 해당하는 자격은 공부를 시작하기 전에 응시자격 충족 여부를 먼저 확인해야 합니다. 학력·전공·보유 자격·실무경력에 따라 인정 조건이 달라질 수 있으므로 공식 응시자격 자가진단이나 시행기관 안내를 기준으로 확인한 뒤 학습계획을 세우세요.`
    });
  }

  if (hasPractical && isTechnical) {
    items.push({
      query: `${name} 실기는 학원이나 실습장이 꼭 필요한가요?`,
      intent: "실기준비",
      answer: `${name} 실기 준비는 시험 방식에 따라 장비·공구·재료·작업공간 또는 반복적인 실무 연습이 필요할 수 있습니다. 독학 가능 여부를 단정하기보다 최신 공개문제와 준비물, 작업환경을 먼저 확인하고 혼자 확보하기 어려운 부분이 있을 때 실습장이나 교육과정을 활용하는 것이 좋습니다.`,
      points: ["최신 실기 공개문제·출제기준 확인", "필요 장비·공구·재료 확인", "실습환경을 혼자 확보할 수 있는지 판단"]
    });
  }

  if (includesAny(category + name, ["전기", "전자", "기계", "설비", "건설", "토목", "안전", "환경", "자동차", "용접", "조리", "미용"])) {
    items.push({
      query: `${name}만 취득하면 바로 취업에 충분한가요?`,
      intent: "현장활용",
      answer: `${name}는 관련 직무의 기초지식이나 전문성을 보여주는 수단이지만 자격증 하나만으로 취업이 자동으로 보장되지는 않습니다. 채용에서는 경력, 실무숙련도, 안전의식, 장비 활용능력과 다른 우대조건을 함께 보는 경우가 많으므로 실제 채용공고를 기준으로 부족한 역량을 보완하는 것이 좋습니다.`
    });
  }

  if (includesAny(name + category, ["공인중개사", "주택관리사", "직업상담", "사회복지", "청소년", "상담", "한국어", "세무", "회계"])) {
    items.push({
      query: `${name}는 자격 취득 후 바로 실무를 시작할 수 있나요?`,
      intent: "실무진입",
      answer: `${name} 취득 후 실제 업무를 시작할 때는 자격증 외에도 기관별 채용요건, 등록·보수교육 여부, 실무경험 또는 추가 절차가 필요한지 확인해야 합니다. 자격 취득을 끝으로 보기보다 실제 활동을 시작하기 위한 후속 절차까지 함께 확인하는 것이 좋습니다.`
    });
  }

  if (items.length === 0) {
    items.push({
      query: `${name}를 준비할 때 독학과 강의 중 어떤 방식이 더 맞나요?`,
      intent: "학습방법",
      answer: `${name}는 현재 기초지식, 시험형태, 실기 여부와 확보 가능한 공부시간에 따라 적합한 방식이 달라집니다. 먼저 최신 출제기준과 기출·예시문제를 확인해 혼자 이해하기 어려운 영역을 찾고, 필요한 부분만 강의나 교재를 보완하는 방식이 비용과 시간을 줄이기 좋습니다.`
    });
  }

  // 지나치게 긴 추가 섹션이 되지 않도록 자동 파생 검색의도는 최대 3개만 사용합니다.
  return items.slice(0, 3);
}

export function mergeSpecialSearchIntent(cert: CertificateData): SearchIntentData | undefined {
  if (cert.basic.type !== "national") return cert.searchIntent;

  const explicitItems = SPECIAL_SEARCH_INTENTS[cert.basic.slug] ?? [];
  const derivedItems = deriveNationalSpecialItems(cert);
  const currentItems = cert.searchIntent?.items ?? [];

  const seen = new Set<string>();
  const mergedItems = [...currentItems, ...explicitItems, ...derivedItems].filter((item) => {
    const key = `${item.intent ?? ""}|${item.query.trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    ...cert.searchIntent,
    items: mergedItems,
  };
}
