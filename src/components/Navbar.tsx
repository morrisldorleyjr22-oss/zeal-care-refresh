import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/why-empowerment", label: "Why Empowerment" },
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/what-we-do", label: "What We Do" },
  { to: "/ways-to-give", label: "Igniting Potential" },
  { to: "/media", label: "Media" },
  { to: "/contact", label: "Contact" },
];

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

  useEffect(() => { setOpen(false); }, [pathname]);

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

          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
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
          <div className="lg:hidden border-t border-secondary bg-white">
            <div className="container-zc py-4 flex flex-col">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `px-3 py-3 text-sm font-semibold rounded-xl ${
                      isActive ? "text-primary bg-secondary" : "text-navy/80"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/ways-to-give"
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
