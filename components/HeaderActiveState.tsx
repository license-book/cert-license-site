"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import certificates from "@/data/catalog/certificates.json";

type CatalogItem = {
  type?: string;
};

const certificateCatalog = certificates as Record<string, CatalogItem>;

function getActiveHref(pathname: string) {
  if (pathname === "/") return "/";
  if (pathname.startsWith("/national-certificates")) return "/national-certificates";
  if (pathname.startsWith("/private-certificates")) return "/private-certificates";

  if (pathname.startsWith("/cert/")) {
    const slug = pathname.split("/")[2] || "";
    const certificate = certificateCatalog[slug];

    if (certificate?.type === "national") return "/national-certificates";
    if (certificate?.type === "private") return "/private-certificates";
  }

  if (pathname.startsWith("/rank")) return "/rank";
  if (pathname.startsWith("/compare")) return "/compare";
  if (pathname.startsWith("/guide") || pathname.startsWith("/roadmap")) return "/guide";
  if (pathname.startsWith("/resources")) return "/resources";
  return null;
}

function toggleClass(element: HTMLElement, className: string, enabled: boolean) {
  if (element.classList.contains(className) !== enabled) {
    element.classList.toggle(className, enabled);
  }
}

export default function HeaderActiveState() {
  const pathname = usePathname();

  useEffect(() => {
    const activeHref = getActiveHref(pathname);
    let frameId = 0;

    const applyActiveState = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const links = document.querySelectorAll<HTMLAnchorElement>(
          'header nav[aria-label="주요 메뉴"] a[href], header nav[aria-label="모바일 메뉴"] a[href]',
        );

        links.forEach((link) => {
          const href = link.getAttribute("href");
          const isActive = Boolean(activeHref && href === activeHref);
          const isMobile = Boolean(link.closest('nav[aria-label="모바일 메뉴"]'));

          toggleClass(link, "!text-blue-600", isActive);
          toggleClass(link, "border-b-2", isActive && !isMobile);
          toggleClass(link, "border-blue-600", isActive && !isMobile);
          toggleClass(link, "!bg-blue-50", isActive && isMobile);

          if (isActive) {
            if (link.getAttribute("aria-current") !== "page") {
              link.setAttribute("aria-current", "page");
            }
          } else if (link.hasAttribute("aria-current")) {
            link.removeAttribute("aria-current");
          }
        });
      });
    };

    applyActiveState();

    const header = document.querySelector("header");
    const observer = new MutationObserver(() => applyActiveState());

    if (header) {
      observer.observe(header, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    window.addEventListener("scroll", applyActiveState, { passive: true });
    window.addEventListener("resize", applyActiveState);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", applyActiveState);
      window.removeEventListener("resize", applyActiveState);
    };
  }, [pathname]);

  return null;
}
