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

      <div className="container-zc relative pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">{eyebrow}</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-balance">
            {title}{" "}
            {highlight && <span className="text-accent">{highlight}</span>}
          </h1>
          {description && (
            <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">{description}</p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>

      {/* Curved bottom */}
      <svg className="block w-full -mb-px" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 L0,0 C480,60 960,60 1440,0 L1440,60 Z" fill="hsl(var(--background))" />
      </svg>
    </section>
  );
}
