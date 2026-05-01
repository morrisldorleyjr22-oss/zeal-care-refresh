import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Tracks which section id is currently most-visible in the viewport
 * and keeps the URL hash in sync (without scroll-jumping).
 *
 * Returns the active section id (without the leading #), or "" if none.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

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
          if (bestRatio > 0.15 && bestId !== active) {
            setActive(bestId);
            // Quietly sync the hash without scrolling
            const newHash = `#${bestId}`;
            if (window.location.hash !== newHash) {
              navigate(`${pathname}${newHash}`, { replace: true });
            }
          }
        });
      },
      {
        // Account for sticky navbar (~100px) and detect mid-viewport sections
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
