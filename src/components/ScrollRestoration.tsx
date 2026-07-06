"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The browser's native scroll restoration fights with Next.js client-side
 * navigation and can leave new pages scrolled to whatever offset the
 * previous page was at. Take manual control once, then force every route
 * change back to the top.
 */
export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !("scrollRestoration" in window.history)) {
      return;
    }
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
