import type { GuideData } from "@/lib/guide-engine";

export default function GuideToc({ guide }: { guide: GuideData }) {
  const items = [
    { id: "summary", label: "핵심 요약" },
    ...guide.sections.map((section) => ({ id: section.id, label: section.title })),
    ...(guide.faq?.items?.length ? [{ id: "faq", label: "자주 묻는 질문" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur" aria-label="가이드 목차">
      <div className="mx-auto flex max-w-[1200px] gap-2 overflow-x-auto px-5 py-3 md:px-6">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
