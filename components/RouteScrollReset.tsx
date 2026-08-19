"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.dispatchEvent(new Event("scroll"));
  }, [pathname]);

  return null;
}
