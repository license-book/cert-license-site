import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Affiliate from "@/components/cert/Affiliate";
import CareerInfo from "@/components/cert/CareerInfo";
import CertificateIntro from "@/components/cert/CertificateIntro";
import EligibilityInfo from "@/components/cert/EligibilityInfo";
import CertHero from "@/components/cert/CertHero";
import CertSummary from "@/components/cert/CertSummary";
import CostInfo from "@/components/cert/CostInfo";
import ExamStatistics from "@/components/cert/ExamStatistics";
import FAQ from "@/components/cert/FAQ";
import OfficialInfo from "@/components/cert/OfficialInfo";
import RealityGuide from "@/components/cert/RealityGuide";
import Related from "@/components/cert/Related";
import StudyStrategy from "@/components/cert/StudyStrategy";
import TrustInfo from "@/components/cert/TrustInfo";
import FinalCTA from "@/components/cert/FinalCTA";
import DetailToc from "@/components/cert/DetailToc";
import FadeInSection from "@/components/common/FadeInSection";
import { getRelatedCertificates } from "@/lib/related-certificates";

type CertData = {
  basic: {
    slug: string;
    name: string;
    shortName: string;
    type: "national" | "private";
    licenseType: string;
    category: string;
    agency: string;
  };

  hero: {
    title: string;
    subtitle: string;
    image?: string;
  };

  certificateIntro?: {
    title: string;
    description: string;
    highlights?: string[];
  };

  eligibility?: {
    title: string;
    status: "none" | "conditional" | "restricted";
    statusLabel: string;
    summary: string;
    conditions?: {
      label: string;
      description: string;
    }[];
    commonQuestion?: {
      question: string;
      answer: string;
    };
    officialNotice?: string;
  };

  display?: {
    charts?: boolean;
    career?: boolean;
    benefits?: boolean;
    cost?: boolean;
    schedule?: boolean;
    affiliate?: boolean;
  };

  keyInfo: {
    title: string;
    items: {
      label: string;
      value: string;
      note?: string;
    }[];
  };

  statistics?: {
    enabled?: boolean;
    title?: string;
    summary?: string;
    groups?: {
      id: string;
      title: string;
      description?: string;
      items: {
        year: number;
        applicants: number;
        passed: number;
        passRate: number;
      }[];
    }[];
    source?: {
      label?: string;
      url?: string;
      lastVerified?: string;
    };
    analysis?: string[];
    notice?: string;
  };

  realityGuide?: {
    title: string;
    summary: string;
    recommendedFor: string[];
    reconsiderIf: string[];
    beforeStart: string[];
    realityPoints: string[];
    firstStep?: {
      title: string;
      description: string;
    };
    nextStep?: {
      title: string;
      description: string;
    };
  };

  exam?: {
    written?: string;
    practical?: string;
    passingCriteria?: string;
    subjects?: string[];
  };

  charts?: {
    examWeight?: {
      enabled: boolean;
      items: {
        label: string;
        value: number;
      }[];
    };
  };

  cost?: {
    title: string;
    summary?: string;
    items: {
      label: string;
      value: string;
      note?: string;
    }[];
    realisticNote?: string;
  };

  studyStrategy?: string[];

  career?: {
    title: string;
    summary?: string;
    sections: {
      title: string;
      items: {
        label: string;
        description: string;
      }[];
    }[];
    realisticNote?: string;
  };

  officialInfo?: {
    title: string;
    summary?: string;
    organization: string;
    website: string;
    items: {
      label: string;
      description: string;
    }[];
    importantNotice?: string[];
    buttons?: {
      title: string;
      url: string;
    }[];
  };

  affiliate?: {
    lecture?: string;
    book?: string;
    application?: string;
  };

  faq?: {
    question: string;
    answer: string;
  }[];

  seo?: {
    title: string;
    description: string;
    keywords?: string[];
  };

  trustInfo?: {
    title: string;
    description?: string;
    sourceLabel: string;
    sourceUrl?: string;
    lastVerified?: string;
    lastUpdated?: string;
    notice?: string;
  };

  finalCta?: {
    title: string;
    description?: string;
    primaryButton?: {
      label: string;
      url: string;
    };
    secondaryButton?: {
      label: string;
      url: string;
    };
  };

  update?: {
    version: string;
    lastUpdated: string;
    lastVerified: string;
    verified: boolean;
    note?: string;
  };
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCertData(slug: string): CertData | null {
  const filePath = path.join(
    process.cwd(),
    "data",
    "certificates",
    `${slug}.json`
  );

  if (!fs.existsSync(filePath)) return null;

  try {
    return JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ) as CertData;
  } catch (error) {
    console.error(`자격증 JSON 읽기 실패: ${slug}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertData(slug);

  if (!cert) {
    return {
      title: "자격증 정보를 찾을 수 없습니다",
    };
  }

  return {
    title: cert.seo?.title ?? cert.basic.name,
    description: cert.seo?.description ?? cert.hero.subtitle,
    keywords: cert.seo?.keywords,
  };
}

export default async function CertDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cert = getCertData(slug);

  if (!cert) notFound();

  const relatedItems = getRelatedCertificates(slug);
  const showStatistics = cert.statistics?.enabled === true;

  const showCost =
    cert.display?.cost !== false &&
    Boolean(cert.cost);

  const showCareer =
    cert.display?.career !== false &&
    Boolean(cert.career);

  const showAffiliate =
    cert.display?.affiliate !== false &&
    Boolean(
      cert.affiliate?.lecture ||
        cert.affiliate?.book ||
        cert.affiliate?.application
    );

  const difficulty =
    cert.keyInfo.items.find((item) => item.label === "현실 난이도")?.value ??
    "정보 확인 중";

  const studyPeriod =
    cert.keyInfo.items.find((item) => item.label === "평균 준비기간")?.value ??
    "개인별 차이";

  const usefulness =
    cert.keyInfo.items.find((item) => item.label === "취업 활용도")?.value ??
    "정보 확인 중";

  const tocItems = [
    { id: "intro", label: "자격증 소개", visible: Boolean(cert.certificateIntro) },
    { id: "official-info", label: "시험 정보", visible: Boolean(cert.officialInfo || cert.exam) },
    { id: "statistics", label: "시험 통계", visible: showStatistics },
    { id: "eligibility", label: "응시자격", visible: Boolean(cert.eligibility) },
    { id: "summary", label: "한눈에 보기", visible: true },
    { id: "reality-guide", label: "현실 가이드", visible: Boolean(cert.realityGuide) },
    { id: "cost", label: "응시 비용", visible: showCost },
    { id: "study-strategy", label: "공부 전략", visible: Boolean(cert.studyStrategy?.length) },
    { id: "career", label: "취업·활용", visible: showCareer },
    { id: "affiliate", label: "추천 자료", visible: showAffiliate },
    { id: "faq", label: "FAQ", visible: Boolean(cert.faq?.length) },
    { id: "trust-info", label: "정보 출처", visible: Boolean(cert.trustInfo) },
    { id: "final-cta", label: "다음 단계", visible: Boolean(cert.finalCta) },
    { id: "related", label: "관련 자격증", visible: relatedItems.length > 0 },
  ]
    .filter((item) => item.visible)
    .map(({ id, label }) => ({ id, label }));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <CertHero
        name={cert.hero.title}
        summary={cert.hero.subtitle}
        licenseType={cert.basic.licenseType}
        category={cert.basic.category}
        agency={cert.basic.agency}
        image={cert.hero.image}
        eligibility={cert.eligibility?.statusLabel ?? "확인 필요"}
        difficulty={difficulty}
        studyPeriod={studyPeriod}
        usefulness={usefulness}
      />

      <DetailToc items={tocItems} />

      <section className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-14">
        {cert.certificateIntro ? (
          <section id="intro" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection>
              <CertificateIntro data={cert.certificateIntro} />
            </FadeInSection>
          </section>
        ) : null}

        {cert.officialInfo || cert.exam ? (
          <section id="official-info" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={60} className="mt-10 md:mt-12">
              <OfficialInfo
                data={cert.officialInfo}
                exam={cert.exam}
                examWeight={cert.charts?.examWeight?.items}
              />
            </FadeInSection>
          </section>
        ) : null}

        {showStatistics ? (
          <section id="statistics" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={100} className="mt-10 md:mt-12">
              <ExamStatistics statistics={cert.statistics} />
            </FadeInSection>
          </section>
        ) : null}

        {cert.eligibility ? (
          <section id="eligibility" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={140}>
              <EligibilityInfo data={cert.eligibility} />
            </FadeInSection>
          </section>
        ) : null}

        <section id="summary" className="scroll-mt-44 md:scroll-mt-52">
          <FadeInSection delay={160} className="mt-10">
            <CertSummary title={cert.keyInfo.title} items={cert.keyInfo.items} />
          </FadeInSection>
        </section>

        {cert.realityGuide ? (
          <section id="reality-guide" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={180}>
              <RealityGuide data={cert.realityGuide} />
            </FadeInSection>
          </section>
        ) : null}

        {showCost ? (
          <section id="cost" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={200}>
              <CostInfo data={cert.cost} />
            </FadeInSection>
          </section>
        ) : null}

        {cert.studyStrategy?.length ? (
          <section id="study-strategy" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={220}>
              <StudyStrategy items={cert.studyStrategy} />
            </FadeInSection>
          </section>
        ) : null}

        {showCareer ? (
          <section id="career" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={240}>
              <CareerInfo data={cert.career} />
            </FadeInSection>
          </section>
        ) : null}

        {showAffiliate ? (
          <section id="affiliate" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={260}>
              <Affiliate affiliate={cert.affiliate} />
            </FadeInSection>
          </section>
        ) : null}

        {cert.faq?.length ? (
          <section id="faq" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={280}>
              <FAQ items={cert.faq} />
            </FadeInSection>
          </section>
        ) : null}

        {cert.trustInfo ? (
          <section id="trust-info" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={290}>
              <TrustInfo data={cert.trustInfo} />
            </FadeInSection>
          </section>
        ) : null}

        {cert.finalCta ? (
          <section id="final-cta" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={295}>
              <FinalCTA data={cert.finalCta} />
            </FadeInSection>
          </section>
        ) : null}

        {relatedItems.length ? (
          <section id="related" className="scroll-mt-44 md:scroll-mt-52">
            <FadeInSection delay={300}>
              <Related items={relatedItems} />
            </FadeInSection>
          </section>
        ) : null}
      </section>
    </main>
  );
}
