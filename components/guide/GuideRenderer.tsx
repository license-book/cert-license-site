import AdSlot from "@/components/common/AdSlot";
import JsonLd from "@/components/common/JsonLd";
import { createGuideJsonLd, type GuideData } from "@/lib/guide-engine";
import GuideContent from "./GuideContent";
import GuideCTA from "./GuideCTA";
import GuideFAQ from "./GuideFAQ";
import GuideHero from "./GuideHero";
import GuideSummary from "./GuideSummary";
import GuideToc from "./GuideToc";
import RelatedGuides from "./RelatedGuides";

export default function GuideRenderer({ guide }: { guide: GuideData }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {createGuideJsonLd(guide).map((data, index) => <JsonLd key={index} data={data} />)}
      <GuideHero guide={guide} />
      <GuideToc guide={guide} />
      <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-10 md:px-6 md:py-14">
        <AdSlot label="가이드 상단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} className="mt-0" />
        <GuideSummary summary={guide.summary} />
        {guide.sections.map((section, index) => (
          <div key={section.id} className="grid gap-6">
            <GuideContent section={section} />
            {index === 1 ? <AdSlot label="가이드 본문 중단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE_1} /> : null}
          </div>
        ))}
        {guide.faq?.items?.length ? <GuideFAQ faq={guide.faq} /> : null}
        <AdSlot label="가이드 하단" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />
        {guide.related?.items?.length ? <RelatedGuides related={guide.related} /> : null}
        {guide.finalCta ? <GuideCTA cta={guide.finalCta} /> : null}
      </div>
    </main>
  );
}
