"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

type DetailTocProps = {
  items: TocItem[];
};

export default function DetailToc({ items }: DetailTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const navRef = useRef<HTMLElement | null>(null);

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!itemIds.length) return;

    const updateActiveSection = () => {
      const headerOffset = window.innerWidth >= 768 ? 176 : 152;
      let currentId = itemIds[0];

      for (const id of itemIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= headerOffset) {
          currentId = id;
        } else {
          break;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (nearBottom) {
        currentId = itemIds[itemIds.length - 1];
      }

      setActiveId(currentId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [itemIds]);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLAnchorElement>(
      `[data-toc-id="${activeId}"]`
    );

    activeLink?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = window.innerWidth >= 768 ? 176 : 152;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  if (!items.length) return null;

  return (
    <div className="sticky top-20 z-40 border-y border-slate-200 bg-white/95 shadow-sm backdrop-blur md:top-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <div className="flex items-center gap-4">
          <span className="hidden shrink-0 py-4 text-sm font-black text-slate-950 lg:block">
            목차
          </span>

          <nav
            ref={navRef}
            aria-label="상세페이지 목차"
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:py-4"
          >
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-toc-id={item.id}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => handleClick(event, item.id)}
                  className={[
                    "shrink-0 snap-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-extrabold transition",
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
