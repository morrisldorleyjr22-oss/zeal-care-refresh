import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-hero-gradient text-white overflow-hidden">
      <div className="absolute -top-32 -right-32 size-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-[28rem] bg-primary-glow/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container-zc relative pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">{eyebrow}</span>
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-balance">
            {title}{" "}
            {highlight && <span className="text-accent">{highlight}</span>}
          </h1>
          {description && (
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>

      {/* Curved bottom */}
      <svg className="block w-full -mb-px" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 L0,0 C480,60 960,60 1440,0 L1440,60 Z" fill="hsl(var(--background))" />
      </svg>
    </section>
  );
}
