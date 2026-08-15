import Affiliate from "@/components/cert/Affiliate";
import CareerInfo from "@/components/cert/CareerInfo";
import CertificateIntro from "@/components/cert/CertificateIntro";
import EligibilityInfo from "@/components/cert/EligibilityInfo";
import CertHero from "@/components/cert/CertHero";
import CertSummary from "@/components/cert/CertSummary";
import CostInfo from "@/components/cert/CostInfo";
import ExamStatistics from "@/components/cert/ExamStatistics";
import OfficialInfo from "@/components/cert/OfficialInfo";
import RealityGuide from "@/components/cert/RealityGuide";
import Related from "@/components/cert/Related";
import RelatedRoadmaps from "@/components/cert/RelatedRoadmaps";
import StudyStrategy from "@/components/cert/StudyStrategy";
import TrustInfo from "@/components/cert/TrustInfo";
import FinalCTA from "@/components/cert/FinalCTA";
import DetailToc from "@/components/cert/DetailToc";
import FadeInSection from "@/components/common/FadeInSection";
import JsonLd from "@/components/common/JsonLd";
import AdSlot from "@/components/common/AdSlot";
import { CERTIFICATE_SECTIONS, createCertificateJsonLd, type CertificateSectionId, type CertificateViewModel } from "@/lib/certificate-engine";

function SectionContent({ id, model }: { id: CertificateSectionId; model: CertificateViewModel }) {
  const { cert, relatedItems, relatedRoadmaps } = model;
  switch (id) {
    case "intro": return cert.certificateIntro ? <CertificateIntro data={cert.certificateIntro} /> : null;
    case "official-info": return <OfficialInfo data={cert.officialInfo} exam={cert.exam} examWeight={cert.charts?.examWeight?.items} />;
    case "statistics": return <ExamStatistics statistics={cert.statistics} />;
    case "eligibility": return <EligibilityInfo data={cert.eligibility} />;
    case "summary": return <CertSummary title={cert.keyInfo.title} items={cert.keyInfo.items} />;
    case "reality-guide": return cert.realityGuide ? <RealityGuide data={cert.realityGuide} /> : null;
    case "cost": return cert.cost ? <CostInfo data={cert.cost} /> : null;
    case "study-strategy": return cert.studyStrategy ? <StudyStrategy data={cert.studyStrategy} /> : null;
    case "career": return cert.career ? <CareerInfo data={cert.career} /> : null;
    case "affiliate": return <Affiliate affiliate={cert.affiliate} />;
    case "trust-info": return cert.trustInfo ? <TrustInfo data={cert.trustInfo} /> : null;
    case "related-roadmaps": return <RelatedRoadmaps items={relatedRoadmaps} />;
    case "related": return <Related items={relatedItems} currentSlug={cert.basic.slug} />;
    case "final-cta": return cert.finalCta ? <FinalCTA data={cert.finalCta} /> : null;
  }
}

export default function CertificateRenderer({ model }: { model: CertificateViewModel }) {
  const { cert, heroMetrics, tocItems, visibility } = model;
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {createCertificateJsonLd(cert).map((data, index) => <JsonLd key={index} data={data} />)}
      <CertHero
        name={cert.hero.title}
        summary={cert.hero.subtitle}
        licenseType={cert.basic.licenseType}
        category={cert.basic.category}
        agency={cert.basic.agency}
        image={cert.hero.image}
        eligibility={cert.eligibility?.statusLabel ?? "확인 필요"}
        difficulty={heroMetrics.difficulty}
        studyPeriod={heroMetrics.studyPeriod}
        usefulness={heroMetrics.usefulness}
      />
      <DetailToc items={tocItems} />
      <section className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-14">
        <AdSlot
          label="상단"
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP}
          className="mt-0"
        />

        {CERTIFICATE_SECTIONS.map((section) => {
          if (!visibility[section.id]) return null;

          return (
            <div key={section.id}>
              <section id={section.id} className="scroll-mt-44 md:scroll-mt-52">
                <FadeInSection delay={section.delay} className={section.className}>
                  <SectionContent id={section.id} model={model} />
                </FadeInSection>
              </section>

              {section.id === "summary" ? (
                <AdSlot label="본문 중단 1" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1} />
              ) : null}

              {section.id === "study-strategy" ? (
                <AdSlot label="본문 중단 2" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_2} />
              ) : null}

              {section.id === "affiliate" ? (
                <AdSlot label="하단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />
              ) : null}
            </div>
          );
        })}
      </section>
    </main>
  );
}
