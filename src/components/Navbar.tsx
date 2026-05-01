import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone, ChevronDown, ChevronRight, MapPin, Heart } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

type Child = { hash: string; label: string };
type NavItem = {
  to: string;
  label: string;
  children?: Child[];
};

const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About Us",
    children: [
      { hash: "mission", label: "Our Mission" },
      { hash: "vision", label: "Our Vision" },
      { hash: "goals", label: "Our Goals" },
      { hash: "values", label: "Our Values" },
      { hash: "belief", label: "Our Belief" },
      { hash: "sdg", label: "SDG Focus" },
      { hash: "characteristics", label: "Characteristics We Develop" },
    ],
  },
  {
    to: "/why-empowerment",
    label: "Why Empowerment",
    children: [
      { hash: "social-justice", label: "Social Justice" },
      { hash: "economic-development", label: "Economic Development" },
    ],
  },
  {
    to: "/who-we-are",
    label: "Who We Are",
    children: [
      { hash: "leadership", label: "Our Leadership" },
      { hash: "board", label: "Board of Advisors" },
      { hash: "beneficiaries", label: "Our Beneficiaries" },
      { hash: "partners", label: "Our Partners" },
      { hash: "history", label: "Our History" },
      { hash: "awards", label: "Awards & Prizes" },
      { hash: "safeguarding", label: "Protection & Safeguarding" },
      { hash: "finance", label: "Finance & Accountability" },
      { hash: "careers", label: "Work for Us" },
      { hash: "tenders", label: "Tenders & Opportunities" },
    ],
  },
  {
    to: "/what-we-do",
    label: "What We Do",
    children: [
      { hash: "how", label: "How We Operate" },
      { hash: "where", label: "Where We Operate" },
      { hash: "programs", label: "Our Programs" },
      { hash: "apart", label: "What Sets Us Apart" },
      { hash: "impact", label: "Impact in Numbers" },
    ],
  },
  {
    to: "/ways-to-give",
    label: "Igniting Potential",
    children: [
      { hash: "ways", label: "Ways to Give" },
      { hash: "appeals", label: "Appeals" },
      { hash: "partner", label: "Become a Partner" },
      { hash: "faq", label: "Giving FAQ" },
    ],
  },
  {
    to: "/media",
    label: "Media",
    children: [
      { hash: "newsroom", label: "Newsroom" },
      { hash: "stories", label: "Success Stories" },
      { hash: "video", label: "Video" },
      { hash: "gallery", label: "Photo Gallery" },
      { hash: "events", label: "Events & Calendar" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

// ---------- Desktop dropdown ----------
function DesktopItem({
  item,
  parentActive,
  activeSection,
}: {
  item: NavItem;
  parentActive: boolean;
  activeSection: string;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        end={item.to === "/"}
        className={({ isActive }) =>
          `relative px-3 py-2 text-[13px] font-semibold rounded-full transition-colors ${
            isActive ? "text-primary" : "text-navy/70 hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {item.label}
            {isActive && (
              <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-accent rounded-full" />
            )}
          </>
        )}
      </NavLink>
    );
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <NavLink
        to={item.to}
        className={`group inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-full transition-all relative ${
          parentActive
            ? "text-primary"
            : "text-navy/70 hover:text-primary"
        }`}
        onClick={() => setOpen(false)}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
        {parentActive && (
          <span className="absolute left-3 right-6 -bottom-0.5 h-0.5 bg-accent rounded-full" />
        )}
      </NavLink>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 z-50">
          {/* arrow */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 top-2 size-3 rotate-45 bg-white border-l border-t border-secondary"
          />
          <div className="relative bg-white rounded-2xl border border-secondary shadow-card-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Parent link header */}
            <Link
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 px-4 py-3 bg-navy text-white hover:bg-primary transition-colors group"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Section
                </div>
                <div className="text-sm font-black mt-0.5">{item.label} overview</div>
              </div>
              <ChevronRight className="h-4 w-4 text-accent group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <ul className="py-2">
              {item.children.map((child) => {
                const isActive = parentActive && activeSection === child.hash;
                return (
                  <li key={child.hash}>
                    <Link
                      to={`${item.to}#${child.hash}`}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 px-4 py-2 text-[13px] font-semibold transition-colors ${
                        isActive
                          ? "text-primary bg-secondary/70"
                          : "text-navy/75 hover:text-primary hover:bg-secondary/40"
                      }`}
                    >
                      <span
                        className={`block h-1.5 w-1.5 rounded-full transition-all ${
                          isActive
                            ? "bg-accent shadow-yellow-glow scale-125"
                            : "bg-secondary group-hover:bg-primary/50"
                        }`}
                      />
                      <span className="flex-1">{child.label}</span>
                      {isActive && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-accent/30 px-1.5 py-0.5 rounded">
                          Now
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Mobile drawer item ----------
function MobileItem({
  item,
  parentActive,
  activeSection,
  expanded,
  onToggleExpand,
  onNavigate,
}: {
  item: NavItem;
  parentActive: boolean;
  activeSection: string;
  expanded: boolean;
  onToggleExpand: () => void;
  onNavigate: () => void;
}) {
  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        end={item.to === "/"}
        onClick={onNavigate}
        className={({ isActive }) =>
          `block px-3 py-3 text-sm font-semibold rounded-xl ${
            isActive ? "text-primary bg-secondary" : "text-navy/80"
          }`
        }
      >
        {item.label}
      </NavLink>
    );
  }
  return (
    <div className="border-b border-secondary/60 last:border-0">
      <button
        onClick={onToggleExpand}
        aria-expanded={expanded}
        className={`w-full flex items-center justify-between px-3 py-3 text-sm font-semibold transition-colors ${
          parentActive ? "text-primary" : "text-navy/80"
        }`}
      >
        <span className="flex items-center gap-2">
          {parentActive && <span className="size-1.5 rounded-full bg-accent" />}
          {item.label}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="pb-2 pl-3 animate-in slide-in-from-top-1 duration-150">
          <Link
            to={item.to}
            onClick={onNavigate}
            className="block px-3 py-2 text-[12px] font-bold uppercase tracking-widest text-primary"
          >
            Overview
          </Link>
          {item.children.map((c) => {
            const isActive = parentActive && activeSection === c.hash;
            return (
              <Link
                key={c.hash}
                to={`${item.to}#${c.hash}`}
                onClick={onNavigate}
                className={`flex items-center gap-2 px-3 py-2 text-[13px] font-medium transition-colors ${
                  isActive ? "text-primary font-bold" : "text-navy/70 hover:text-primary"
                }`}
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-accent" : "bg-secondary"
                  }`}
                />
                {c.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Persist expanded mobile sections across re-renders while drawer is open
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const { pathname } = useLocation();

  // Build the id list for the *current* parent route only
  const currentParent = useMemo(
    () => NAV.find((n) => n.children && (pathname === n.to || pathname.startsWith(n.to + "/"))),
    [pathname],
  );
  const sectionIds = useMemo(
    () => currentParent?.children?.map((c) => c.hash) ?? [],
    [currentParent],
  );
  const activeSection = useActiveSection(sectionIds);

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Auto-expand the current parent in the mobile drawer when it opens
  useEffect(() => {
    if (open && currentParent) {
      setExpanded((prev) => (prev[currentParent.to] ? prev : { ...prev, [currentParent.to]: true }));
    }
  }, [open, currentParent]);

  // Outside-tap + Escape to close drawer
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (toggleBtnRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Defer attaching so the same click that opened the drawer doesn't close it
    const t = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointer);
      document.addEventListener("keydown", onKey);
    }, 0);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Lock body scroll while mobile drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const toggleExpanded = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar — matches hero blue */}
      <div className="hidden md:block bg-hero-gradient text-white text-xs border-b border-white/10">
        <div className="container-zc flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6">
            <a href="mailto:info@zealcare.org" className="group flex items-center gap-2 text-white/85 hover:text-accent transition-colors">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/10 group-hover:bg-accent/20 transition-colors">
                <Mail className="h-3 w-3" strokeWidth={2.25} />
              </span>
              <span className="font-medium tracking-wide">info@zealcare.org</span>
            </a>
            <a href="tel:+231886727619" className="group flex items-center gap-2 text-white/85 hover:text-accent transition-colors">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/10 group-hover:bg-accent/20 transition-colors">
                <Phone className="h-3 w-3" strokeWidth={2.25} />
              </span>
              <span className="font-medium tracking-wide">+231 886 727 619</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/80 font-semibold">
            <MapPin className="h-3 w-3 text-accent" strokeWidth={2.5} />
            Monrovia · Liberia
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-secondary shadow-soft"
            : "bg-white/90 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="container-zc h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="size-10 bg-accent rounded-2xl flex items-center justify-center shadow-soft">
              <div className="size-3.5 bg-navy rounded-full" />
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tight text-primary uppercase leading-none mt-1">
              Zeal Care
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => {
              const parentActive =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <DesktopItem
                  key={item.to}
                  item={item}
                  parentActive={parentActive}
                  activeSection={activeSection}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/ways-to-give"
              className="hidden sm:inline-flex items-center gap-2 bg-accent text-navy px-5 py-3 rounded-full font-bold text-sm shadow-yellow-glow hover:scale-[1.04] active:scale-100 transition-transform duration-300"
            >
              <Heart className="h-4 w-4 fill-navy" strokeWidth={2.25} />
              Donate Now
            </Link>
            <button
              ref={toggleBtnRef}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden size-11 rounded-2xl bg-secondary text-primary flex items-center justify-center"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer + backdrop */}
        {open && (
          <>
            <div
              aria-hidden="true"
              className="lg:hidden fixed inset-0 top-20 bg-navy/30 backdrop-blur-sm z-40"
            />
            <div
              ref={drawerRef}
              className="lg:hidden relative z-50 border-t border-secondary bg-white max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
            >
              <div className="container-zc py-3 flex flex-col">
                {NAV.map((item) => {
                  const parentActive =
                    item.to === "/"
                      ? pathname === "/"
                      : pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <MobileItem
                      key={item.to}
                      item={item}
                      parentActive={parentActive}
                      activeSection={activeSection}
                      expanded={!!expanded[item.to]}
                      onToggleExpand={() => toggleExpanded(item.to)}
                      onNavigate={() => setOpen(false)}
                    />
                  );
                })}
                <Link
                  to="/ways-to-give"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 bg-accent text-navy px-5 py-3 rounded-full font-bold text-sm shadow-yellow-glow"
                >
                  <Heart className="h-4 w-4 fill-navy" strokeWidth={2.25} />
                  Donate Now
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
