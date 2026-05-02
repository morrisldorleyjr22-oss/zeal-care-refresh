import { ReactNode, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Scrolls to a section by id, retrying for up to ~1.5s while the page mounts.
 * Honors prefers-reduced-motion by jumping instantly instead of smoothly.
 */
function scrollToId(id: string, attempts = 0) {
  const el = document.getElementById(id);
  if (el) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({
      top: y,
      behavior: (prefersReducedMotion ? "auto" : "smooth") as ScrollBehavior,
    });
    return;
  }
  if (attempts < 30) {
    window.setTimeout(() => scrollToId(id, attempts + 1), 50);
  }
}

function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      scrollToId(id);
    } else if (navType !== "POP") {
      // Top-of-page scroll on regular navigation; always instant.
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash, key, navType]);

  // Catch native in-page hash clicks (<a href="#foo">) too.
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace("#", "");
      if (id) scrollToId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <ScrollManager />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
