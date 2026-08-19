"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    if (window.location.hash) {
      return () => {
        history.scrollRestoration = previousScrollRestoration;
      };
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.dispatchEvent(new Event("scroll"));
    };

    resetScroll();

    const frame = window.requestAnimationFrame(() => {
      resetScroll();
    });

    const timeout = window.setTimeout(() => {
      resetScroll();
    }, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname]);

  return null;
}
