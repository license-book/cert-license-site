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

export default function HeaderActiveState() {
  const pathname = usePathname();

  useEffect(() => {
    const activeHref = getActiveHref(pathname);
    const links = document.querySelectorAll<HTMLAnchorElement>(
      'header nav[aria-label="주요 메뉴"] a[href], header nav[aria-label="모바일 메뉴"] a[href]',
    );

    links.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = Boolean(activeHref && href === activeHref);
      const isMobile = Boolean(link.closest('nav[aria-label="모바일 메뉴"]'));

      link.classList.toggle("!text-blue-600", isActive);
      link.classList.toggle("border-b-2", isActive && !isMobile);
      link.classList.toggle("border-blue-600", isActive && !isMobile);
      link.classList.toggle("!bg-blue-50", isActive && isMobile);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, [pathname]);

  return null;
}
