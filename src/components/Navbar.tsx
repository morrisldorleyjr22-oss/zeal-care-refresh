import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone, ChevronDown } from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  children?: { to: string; label: string }[];
};

const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About Us",
    children: [
      { to: "/about#mission", label: "Our Mission" },
      { to: "/about#vision", label: "Our Vision" },
      { to: "/about#goals", label: "Our Goals" },
      { to: "/about#values", label: "Our Values" },
      { to: "/about#belief", label: "Our Belief" },
      { to: "/about#sdg", label: "SDG Focus" },
      { to: "/about#characteristics", label: "Characteristics We Develop" },
    ],
  },
  {
    to: "/why-empowerment",
    label: "Why Empowerment",
    children: [
      { to: "/why-empowerment#social-justice", label: "Social Justice" },
      { to: "/why-empowerment#economic-development", label: "Economic Development" },
    ],
  },
  {
    to: "/who-we-are",
    label: "Who We Are",
    children: [
      { to: "/who-we-are#leadership", label: "Our Leadership" },
      { to: "/who-we-are#board", label: "Board of Advisors" },
      { to: "/who-we-are#beneficiaries", label: "Our Beneficiaries" },
      { to: "/who-we-are#partners", label: "Our Partners" },
      { to: "/who-we-are#history", label: "Our History" },
      { to: "/who-we-are#awards", label: "Awards & Prizes" },
      { to: "/who-we-are#safeguarding", label: "Protection & Safeguarding" },
      { to: "/who-we-are#finance", label: "Finance & Accountability" },
      { to: "/who-we-are#careers", label: "Work for Us" },
      { to: "/who-we-are#tenders", label: "Tenders & Opportunities" },
    ],
  },
  {
    to: "/what-we-do",
    label: "What We Do",
    children: [
      { to: "/what-we-do#how", label: "How We Operate" },
      { to: "/what-we-do#where", label: "Where We Operate" },
      { to: "/what-we-do#programs", label: "Our Programs" },
      { to: "/what-we-do#apart", label: "What Sets Us Apart" },
      { to: "/what-we-do#impact", label: "Impact in Numbers" },
    ],
  },
  {
    to: "/ways-to-give",
    label: "Igniting Potential",
    children: [
      { to: "/ways-to-give#ways", label: "Ways to Give" },
      { to: "/ways-to-give#appeals", label: "Appeals" },
      { to: "/ways-to-give#partner", label: "Become a Partner" },
      { to: "/ways-to-give#faq", label: "Giving FAQ" },
    ],
  },
  {
    to: "/media",
    label: "Media",
    children: [
      { to: "/media#newsroom", label: "Newsroom" },
      { to: "/media#stories", label: "Success Stories" },
      { to: "/media#video", label: "Video" },
      { to: "/media#gallery", label: "Photo Gallery" },
      { to: "/media#events", label: "Events & Calendar" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

function DesktopItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 120);
  };

  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        end={item.to === "/"}
        className={({ isActive }) =>
          `px-3 py-2 text-[13px] font-semibold rounded-full transition-colors ${
            isActive ? "text-primary bg-secondary" : "text-navy/70 hover:text-primary"
          }`
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-full transition-colors ${
            isActive ? "text-primary bg-secondary" : "text-navy/70 hover:text-primary"
          }`
        }
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </NavLink>
      {open && (
        <div className="absolute left-0 top-full pt-3 w-64 z-50">
          <div className="bg-white rounded-2xl border border-secondary shadow-card-lg overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {item.children.map((child) => (
              <Link
                key={child.to}
                to={child.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-[13px] font-semibold text-navy/75 hover:text-primary hover:bg-secondary/60 transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
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
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-navy/80"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-2 pl-3">
          <Link
            to={item.to}
            onClick={onNavigate}
            className="block px-3 py-2 text-[13px] font-bold text-primary"
          >
            Overview
          </Link>
          {item.children.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              onClick={onNavigate}
              className="block px-3 py-2 text-[13px] font-medium text-navy/70 hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block bg-navy text-navy-foreground/80 text-xs">
        <div className="container-zc flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href="mailto:info@zealcare.org" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5" /> info@zealcare.org
            </a>
            <a href="tel:+231886727619" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-3.5 w-3.5" /> +231 886 727 619
            </a>
          </div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-white/60">Monrovia · Liberia</div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`transition-all duration-300 border-b ${scrolled ? "bg-white/95 backdrop-blur-xl border-secondary shadow-soft" : "bg-white/90 backdrop-blur-md border-transparent"}`}>
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
            {NAV.map((item) => (
              <DesktopItem key={item.to} item={item} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/ways-to-give"
              className="hidden sm:inline-flex bg-navy text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-primary transition-colors"
            >
              Donate Now
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden size-11 rounded-2xl bg-secondary text-primary flex items-center justify-center"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden border-t border-secondary bg-white max-h-[80vh] overflow-y-auto">
            <div className="container-zc py-3 flex flex-col">
              {NAV.map((item) => (
                <MobileItem key={item.to} item={item} onNavigate={() => setOpen(false)} />
              ))}
              <Link
                to="/ways-to-give"
                onClick={() => setOpen(false)}
                className="mt-3 bg-navy text-white px-5 py-3 rounded-full font-bold text-sm text-center"
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
