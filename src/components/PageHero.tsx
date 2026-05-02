import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight, Sparkles } from "lucide-react";
import { ICON_STROKE } from "@/lib/icon-defaults";

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
  /** Optional breadcrumbs. Home is auto-prepended. */
  breadcrumbs?: Crumb[];
  /** Optional small stat tiles rendered at the bottom of the hero. */
  stats?: { value: string; label: string }[];
}

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
  breadcrumbs,
  stats,
}: PageHeroProps) {
  return (
    <section className="relative bg-hero-gradient text-white overflow-hidden">
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 50%, transparent 100%)",
        }}
      />

      {/* Glowing color blobs */}
      <div className="absolute -top-32 -right-32 size-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-[28rem] bg-primary-glow/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating yellow accent ring */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-20 right-16 size-40 rounded-full border-2 border-accent/40 animate-float"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-32 right-28 size-24 rounded-full border-2 border-dashed border-white/20 animate-float"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        aria-hidden="true"
        className="hidden lg:block absolute bottom-24 right-40 size-6 rounded-md bg-accent rotate-12 shadow-yellow-glow animate-float"
        style={{ animationDelay: "0.6s" }}
      />

      <div className="container-zc relative pt-10 pb-24 md:pt-14 md:pb-32">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65"
        >
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <Home className="h-3 w-3" strokeWidth={ICON_STROKE} />
            Home
          </Link>
          {(breadcrumbs ?? []).map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-accent/70" strokeWidth={ICON_STROKE} />
              {c.to ? (
                <Link to={c.to} className="hover:text-accent transition-colors">{c.label}</Link>
              ) : (
                <span className="text-accent">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-7 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 max-w-3xl animate-fade-up">
            {/* Eyebrow chip */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-accent" strokeWidth={ICON_STROKE} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/95">
                {eyebrow}
              </span>
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.04] tracking-tight text-balance">
              {title}{" "}
              {highlight && (
                <span className="relative inline-block">
                  <span className="relative z-10 text-accent">{highlight}</span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-1.5 h-2 md:h-3 bg-accent/25 rounded-sm -z-0"
                  />
                </span>
              )}
            </h1>

            {description && (
              <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}

            {children && <div className="mt-7">{children}</div>}
          </div>

          {/* Vertical accent rail */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="relative w-full max-w-[260px]">
              <div className="absolute -top-6 right-0 size-16 bg-accent rounded-2xl rotate-6 shadow-yellow-glow" />
              <div className="relative bg-white/8 backdrop-blur-md rounded-3xl border border-white/15 p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                  Section
                </div>
                <div className="mt-1 text-lg font-black leading-tight">{eyebrow}</div>
                <div className="mt-4 h-px bg-gradient-to-r from-accent/60 via-white/20 to-transparent" />
                <p className="mt-4 text-xs text-white/70 leading-relaxed">
                  Explore the sections of this page from the navigation above.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional stat row */}
        {stats && stats.length > 0 && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/8 border border-white/15 backdrop-blur-sm px-5 py-4 hover-lift"
              >
                <div className="text-2xl font-black text-accent">{s.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/75">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Yellow keyline above the curve */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      {/* Curved bottom */}
      <svg
        className="block w-full -mb-px"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,60 L0,0 C480,60 960,60 1440,0 L1440,60 Z" fill="hsl(var(--background))" />
      </svg>
    </section>
  );
}
