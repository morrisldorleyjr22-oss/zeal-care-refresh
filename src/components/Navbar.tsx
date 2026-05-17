import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone, ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ICON_STROKE } from "@/lib/icon-defaults";
import ContactChip from "@/components/ContactChip";
import DonateButton from "@/components/DonateButton";
import { useSetting } from "@/hooks/useSiteSettings";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import logo from "@/assets/zealcare-logo.png";

type Child = { hash: string; labelKey: string };
type NavItem = { to: string; labelKey: string; children?: Child[] };

const NAV: NavItem[] = [
  { to: "/", labelKey: "home" },
  {
    to: "/about", labelKey: "aboutUs",
    children: [
      { hash: "mission", labelKey: "mission" },
      { hash: "vision", labelKey: "vision" },
      { hash: "goals", labelKey: "goals" },
      { hash: "values", labelKey: "values" },
      { hash: "belief", labelKey: "belief" },
      { hash: "sdg", labelKey: "sdg" },
      { hash: "characteristics", labelKey: "characteristics" },
    ],
  },
  {
    to: "/why-empowerment", labelKey: "whyEmpowerment",
    children: [
      { hash: "social-justice", labelKey: "socialJustice" },
      { hash: "economic-development", labelKey: "economicDevelopment" },
    ],
  },
  {
    to: "/who-we-are", labelKey: "whoWeAre",
    children: [
      { hash: "leadership", labelKey: "leadership" },
      { hash: "board", labelKey: "board" },
      { hash: "beneficiaries", labelKey: "beneficiaries" },
      { hash: "partners", labelKey: "partners" },
      { hash: "history", labelKey: "history" },
      { hash: "awards", labelKey: "awards" },
      { hash: "safeguarding", labelKey: "safeguarding" },
      { hash: "finance", labelKey: "finance" },
      { hash: "careers", labelKey: "careers" },
      { hash: "tenders", labelKey: "tenders" },
    ],
  },
  {
    to: "/what-we-do", labelKey: "whatWeDo",
    children: [
      { hash: "how", labelKey: "howOperate" },
      { hash: "where", labelKey: "whereOperate" },
      { hash: "programs", labelKey: "programs" },
      { hash: "apart", labelKey: "apart" },
      { hash: "impact", labelKey: "impact" },
    ],
  },
  {
    to: "/ways-to-give", labelKey: "ignitingPotential",
    children: [
      { hash: "ways", labelKey: "waysToGive" },
      { hash: "appeals", labelKey: "appeals" },
      { hash: "partner", labelKey: "becomePartner" },
      { hash: "faq", labelKey: "givingFaq" },
    ],
  },
  {
    to: "/media", labelKey: "media",
    children: [
      { hash: "newsroom", labelKey: "newsroom" },
      { hash: "stories", labelKey: "stories" },
      { hash: "video", labelKey: "video" },
      { hash: "gallery", labelKey: "gallery" },
      { hash: "events", labelKey: "events" },
    ],
  },
  { to: "/contact", labelKey: "contact" },
];

// ---------- Desktop dropdown ----------
function DesktopItem({
  item, parentActive, activeSection,
}: {
  item: NavItem; parentActive: boolean; activeSection: string;
}) {
  const { t } = useLanguage();
  const nav = t.nav as Record<string, string>;
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const show = () => { if (timer.current) window.clearTimeout(timer.current); setOpen(true); };
  const hide = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), 140); };

  const label = nav[item.labelKey] ?? item.labelKey;

  if (!item.children) {
    return (
      <NavLink
        to={item.to} end={item.to === "/"}
        className={({ isActive }) =>
          `relative px-3 py-2 text-[13px] font-semibold rounded-full transition-colors ${
            isActive ? "text-primary" : "text-navy/70 hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {label}
            {isActive && <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-accent rounded-full" />}
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
          parentActive ? "text-primary" : "text-navy/70 hover:text-primary"
        }`}
        onClick={() => setOpen(false)}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`} />
        {parentActive && <span className="absolute left-3 right-6 -bottom-0.5 h-0.5 bg-accent rounded-full" />}
      </NavLink>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 z-50">
          <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-2 size-3 rotate-45 bg-white border-l border-t border-secondary" />
          <div className="relative bg-white rounded-2xl border border-secondary shadow-card-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <Link to={item.to} onClick={() => setOpen(false)} className="flex items-center justify-between gap-3 px-4 py-3 bg-navy text-white hover:bg-primary transition-colors group">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{nav.section}</div>
                <div className="text-sm font-black mt-0.5">{label} {nav.overview}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-accent group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <ul className="py-2">
              {item.children.map((child) => {
                const isActive = parentActive && activeSection === child.hash;
                const childLabel = nav[child.labelKey] ?? child.labelKey;
                return (
                  <li key={child.hash}>
                    <Link
                      to={`${item.to}#${child.hash}`}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 px-4 py-2 text-[13px] font-semibold transition-colors ${
                        isActive ? "text-primary bg-secondary/70" : "text-navy/75 hover:text-primary hover:bg-secondary/40"
                      }`}
                    >
                      <span className={`block h-1.5 w-1.5 rounded-full transition-all ${isActive ? "bg-accent shadow-yellow-glow scale-125" : "bg-secondary group-hover:bg-primary/50"}`} />
                      <span className="flex-1">{childLabel}</span>
                      {isActive && <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-accent/30 px-1.5 py-0.5 rounded">{nav.now}</span>}
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
  item, parentActive, activeSection, expanded, onToggleExpand, onNavigate,
}: {
  item: NavItem; parentActive: boolean; activeSection: string;
  expanded: boolean; onToggleExpand: () => void; onNavigate: () => void;
}) {
  const { t } = useLanguage();
  const nav = t.nav as Record<string, string>;
  const label = nav[item.labelKey] ?? item.labelKey;

  if (!item.children) {
    return (
      <NavLink
        to={item.to} end={item.to === "/"} onClick={onNavigate}
        className={({ isActive }) =>
          `block px-3 py-3 text-sm font-semibold rounded-xl ${isActive ? "text-primary bg-secondary" : "text-navy/80"}`
        }
      >
        {label}
      </NavLink>
    );
  }
  return (
    <div className="border-b border-secondary/60 last:border-0">
      <button
        onClick={onToggleExpand} aria-expanded={expanded}
        className={`w-full flex items-center justify-between px-3 py-3 text-sm font-semibold transition-colors ${parentActive ? "text-primary" : "text-navy/80"}`}
      >
        <span className="flex items-center gap-2">
          {parentActive && <span className="size-1.5 rounded-full bg-accent" />}
          {label}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="pb-2 pl-3 animate-in slide-in-from-top-1 duration-150">
          <Link to={item.to} onClick={onNavigate} className="block px-3 py-2 text-[12px] font-bold uppercase tracking-widest text-primary">
            {t.common.overview}
          </Link>
          {item.children.map((c) => {
            const isActive = parentActive && activeSection === c.hash;
            const childLabel = nav[c.labelKey] ?? c.labelKey;
            return (
              <Link
                key={c.hash} to={`${item.to}#${c.hash}`} onClick={onNavigate}
                className={`flex items-center gap-2 px-3 py-2 text-[13px] font-medium transition-colors ${isActive ? "text-primary font-bold" : "text-navy/70 hover:text-primary"}`}
              >
                <span className={`block h-1.5 w-1.5 rounded-full ${isActive ? "bg-accent" : "bg-secondary"}`} />
                {childLabel}
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();

  const currentParent = useMemo(
    () => NAV.find((n) => n.children && (pathname === n.to || pathname.startsWith(n.to + "/"))),
    [pathname],
  );
  const sectionIds = useMemo(() => currentParent?.children?.map((c) => c.hash) ?? [], [currentParent]);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open && currentParent) {
      setExpanded((prev) => (prev[currentParent.to] ? prev : { ...prev, [currentParent.to]: true }));
    }
  }, [open, currentParent]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (toggleBtnRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const toggleExpanded = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const contact = useSetting("contact_info");
  const donate = useSetting("donate");

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block bg-hero-gradient text-white text-xs border-b border-white/10">
        <div className="container-zc flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6">
            {contact.email && (
              <ContactChip icon={Mail} label={contact.email} href={`mailto:${contact.email}`} size="sm" variant="dark" />
            )}
            {contact.phone && (
              <ContactChip icon={Phone} label={contact.phone} href={`tel:${contact.phone.replace(/\s+/g, "")}`} size="sm" variant="dark" />
            )}
          </div>
          <div className="flex items-center gap-4">
            {contact.address_line && (
              <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/80 font-semibold">
                <MapPin className="h-3 w-3 text-accent" strokeWidth={ICON_STROKE} />
                {contact.address_line}
              </div>
            )}
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`transition-all duration-300 border-b ${scrolled ? "bg-white/95 backdrop-blur-xl border-secondary shadow-soft" : "bg-white/90 backdrop-blur-md border-transparent"}`}>
        <div className="container-zc h-16 md:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Zeal Care home">
            <img src={logo} alt="Zeal Care" className="h-10 md:h-12 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => {
              const parentActive = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(item.to + "/");
              return <DesktopItem key={item.to} item={item} parentActive={parentActive} activeSection={activeSection} />;
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block lg:hidden">
              <LanguageSwitcher />
            </div>
            <DonateButton className="hidden sm:inline-flex" size="sm" to={donate.url} label={donate.label} />
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

        {/* Mobile drawer */}
        {open && (
          <>
            <div aria-hidden="true" className="lg:hidden fixed inset-0 top-16 bg-navy/30 backdrop-blur-sm z-40" />
            <div
              ref={drawerRef}
              className="lg:hidden relative z-50 border-t border-secondary bg-white max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
            >
              <div className="container-zc py-3 flex flex-col">
                {NAV.map((item) => {
                  const parentActive = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <MobileItem
                      key={item.to} item={item} parentActive={parentActive} activeSection={activeSection}
                      expanded={!!expanded[item.to]} onToggleExpand={() => toggleExpanded(item.to)} onNavigate={() => setOpen(false)}
                    />
                  );
                })}
                <div className="mt-3 flex items-center gap-3">
                  <DonateButton onClick={() => setOpen(false)} variant="block" size="md" className="flex-1" to={donate.url} label={donate.label} />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
