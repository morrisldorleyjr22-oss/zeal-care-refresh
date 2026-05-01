import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks which section id is currently most-visible in the viewport.
 * Syncs the URL hash via history.replaceState (does NOT trigger react-router
 * navigation, so the page does not re-scroll).
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  const { pathname, hash } = useLocation();

  // Initialize from hash on route change
  useEffect(() => {
    const fromHash = hash.replace("#", "");
    if (fromHash && ids.includes(fromHash)) setActive(fromHash);
    else setActive("");
  }, [pathname, hash, ids]);

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    let raf = 0;
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visibility.set(e.target.id, e.intersectionRatio);
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          let bestId = "";
          let bestRatio = 0;
          visibility.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          });
          if (bestRatio > 0.15) {
            setActive((prev) => {
              if (prev === bestId) return prev;
              const newHash = `#${bestId}`;
              if (window.location.hash !== newHash) {
                // Update URL silently — no scroll, no react-router re-render
                window.history.replaceState(
                  window.history.state,
                  "",
                  `${window.location.pathname}${window.location.search}${newHash}`,
                );
              }
              return bestId;
            });
          }
        });
      },
      {
        rootMargin: "-110px 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ids.join("|")]);

  return active;
}
