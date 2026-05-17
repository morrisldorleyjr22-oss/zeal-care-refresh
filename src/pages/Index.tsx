import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, Sparkles, Quote, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSetting } from "@/hooks/useSiteSettings";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/hooks/useLanguage";
import { getIcon } from "@/lib/icon-registry";

const partners = ["USAID", "Orange", "Ecobank", "UNICEF", "Global Fund", "World Vision"];

type HomeProgram = { title: string; desc: string; icon: string; image?: string; to?: string };

export default function Index() {
  const ref = useReveal<HTMLDivElement>();
  const hero = useSetting("hero_home");
  const c = usePageContent("home");
  const homePrograms = c.list<HomeProgram>("programs");
  const { t } = useLanguage();
  const h = t.home;

  const stats = [
    { value: "850+", label: h.stats.scholars },
    { value: "12-Year", label: h.stats.promise },
    { value: "50+", label: h.stats.schools },
    { value: "24k", label: h.stats.tech },
    { value: "100%", label: h.stats.transparency },
  ];

  const advantages = [
    { icon: ShieldCheck, color: "bg-accent text-navy", rotate: "rotate-3", ...h.advantages.integrity },
    { icon: Clock, color: "bg-primary text-white", rotate: "-rotate-3", ...h.advantages.commitment },
    { icon: Sparkles, color: "bg-navy text-accent", rotate: "rotate-6", ...h.advantages.holistic },
  ];

  const impact = (amount: number) =>
    amount >= 1000 ? h.stats.transparency :
    amount >= 500 ? t.give.impactLevels.fullScholarship :
    amount >= 100 ? t.give.impactLevels.quarterly :
    t.give.impactLevels.monthly;
  void impact;

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="relative text-white overflow-hidden bg-hero-gradient">
        <div className="container-zc relative pt-14 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-36 lg:pt-32 lg:pb-44 grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 animate-fade-up text-center lg:text-left items-center lg:items-start">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 w-max">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-balance">
              {hero.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-[44ch] mx-auto lg:mx-0">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-1">
              <Link to={hero.cta_primary_url} className="btn-primary">
                {hero.cta_primary_label}
                <span className="size-6 bg-navy rounded-full flex items-center justify-center text-accent">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
              <Link to={hero.cta_secondary_url || "/who-we-are"} className="btn-secondary group">
                {hero.cta_secondary_label || t.common.learnMore}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Collage — simplified for mobile */}
          <div className="lg:col-span-6 relative h-[340px] sm:h-[440px] lg:h-[500px] w-full">
            <div className="absolute top-0 right-0 w-[80%] h-[90%] rounded-[2rem] overflow-hidden shadow-card-lg rotate-2 z-20 ring-1 ring-white/20">
              <img
                src={c.get("img_hero_main")}
                alt="Joyful Liberian schoolchildren raising their hands in class"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[48%] h-[52%] bg-accent rounded-[1.75rem] p-1.5 shadow-yellow-glow -rotate-3 z-30 animate-float hidden sm:block">
              <div className="w-full h-full rounded-[1.25rem] overflow-hidden">
                <img
                  src={c.get("img_hero_portrait")}
                  alt="Smiling young scholar holding her books"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute top-1/3 -left-2 size-20 bg-accent rounded-full z-10 flex items-center justify-center shadow-yellow-glow animate-float hidden sm:flex">
              <span className="text-navy font-black text-xl">A+</span>
            </div>
          </div>
        </div>

        {/* Stats strip — below hero, no card overlap */}
        <div className="bg-white/10 border-t border-white/10">
          <div className="container-zc py-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center px-4 py-4 bg-navy/40">
                  <span className="text-2xl md:text-3xl font-black text-accent tabular-nums tracking-tighter">
                    {s.value}
                  </span>
                  <span className="text-[10px] font-bold text-white/70 mt-1 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="container-zc py-14 sm:py-20 md:py-24 lg:py-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="rounded-[2rem] overflow-hidden shadow-card-lg">
            <img
              src={c.get("img_mission")}
              alt="Children learning together with technology"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-accent text-navy rounded-2xl px-5 py-4 shadow-yellow-glow max-w-[14rem] hidden md:block">
            <div className="text-3xl font-black tabular-nums">12+</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1">{h.mission.years}</div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-6">
          <span className="eyebrow">{c.get("mission_eyebrow")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy">
            {c.get("mission_title")}
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-navy/70 max-w-2xl">
            {c.get("mission_body")}
          </p>
          <blockquote className="mt-6 border-l-4 border-accent bg-secondary/50 rounded-r-2xl p-5 text-navy italic font-medium text-base">
            <Quote className="h-5 w-5 text-accent mb-2" />
            {c.get("mission_quote")}
          </blockquote>
          <div className="mt-7">
            <Link to="/about" className="inline-flex items-center gap-2 font-bold text-primary hover:text-navy transition-colors">
              {h.mission.readStory} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT SETS US APART */}
      <section className="bg-soft-gradient py-14 sm:py-20 md:py-24">
        <div className="container-zc">
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="eyebrow">{h.advantages.eyebrow}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy text-balance">
              {h.advantages.heading} <span className="text-primary">{h.advantages.headingHighlight}</span>
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <div key={a.title} className={`reveal reveal-delay-${i + 1} hover-lift group bg-white rounded-[2rem] p-7 border border-secondary flex flex-col`}>
                <div className={`size-13 ${a.color} ${a.rotate} rounded-2xl flex items-center justify-center mb-5 group-hover:-translate-y-1.5 transition-transform`}>
                  <a.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black text-navy mb-2">{a.title}</h3>
                <p className="text-sm md:text-base text-navy/70 leading-relaxed font-medium flex-grow">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="container-zc py-14 sm:py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="eyebrow">{h.programs.eyebrow}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy">{h.programs.title}</h2>
          </div>
          <Link to="/what-we-do" className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:text-navy transition-colors">
            {h.programs.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {homePrograms.map((p, i) => {
            const Icon = getIcon(p.icon);
            const to = p.to && p.to.length > 0 ? p.to : "/what-we-do";
            return (
              <article key={`${p.title}-${i}`} className={`reveal reveal-delay-${i + 1} group relative rounded-[2rem] overflow-hidden border-2 border-primary/20 ring-1 ring-inset ring-primary/5 bg-white shadow-[0_8px_25px_-12px_hsl(var(--primary)/0.3)] hover:border-primary/50 hover:shadow-[0_16px_40px_-12px_hsl(var(--primary)/0.5)] hover:-translate-y-1 transition-all`}>
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-10" />
                <div className={`program-hero ${i % 2 === 0 ? "program-hero--accent" : ""}`} role="img" aria-label={`${p.title} — program illustration`}>
                  <Icon aria-hidden="true" focusable="false" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-navy">{p.title}</h3>
                  <p className="mt-3 text-navy/70 leading-relaxed text-sm md:text-base">{p.desc}</p>
                  <Link to={to} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:text-navy transition-colors">
                    {h.programs.viewDetails} <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-navy py-14 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[28rem] bg-accent/10 rounded-full blur-3xl" />
        <div className="container-zc relative">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{h.testimonial.eyebrow}</span>
            <Quote className="h-9 w-9 text-accent mt-5" />
            <p className="mt-4 text-xl md:text-2xl font-light leading-snug text-white/90 text-balance">
              {c.get("testimonial_quote")}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="size-11 rounded-full bg-accent flex items-center justify-center font-black text-navy text-lg">
                {c.get("testimonial_name").trim().charAt(0) || "K"}
              </div>
              <div>
                <div className="font-bold text-sm text-white">{c.get("testimonial_name")}</div>
                <div className="text-xs text-white/55">{c.get("testimonial_role")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container-zc py-16">
        <div className="text-center mb-8">
          <span className="eyebrow">{h.partners.eyebrow}</span>
          <h2 className="mt-3 text-2xl md:text-3xl font-black text-navy">{h.partners.title}</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {partners.map((p) => (
            <span key={p} className="text-lg md:text-xl font-black text-navy/25 hover:text-primary transition-colors tracking-tight">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* INTEGRITY / ACCOUNTABILITY */}
      <section className="container-zc pb-16 md:pb-20">
        <div className="bg-soft-gradient rounded-[2rem] border border-secondary p-7 md:p-12 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">{h.accountability.eyebrow}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-navy">{h.accountability.title}</h2>
            <p className="mt-4 text-base text-navy/70 leading-relaxed">
              {h.accountability.body}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-accent text-navy font-black rounded-2xl px-5 py-3">
              <span className="text-2xl tabular-nums">85%</span>
              <span className="text-xs uppercase tracking-widest">{h.accountability.directImpact}</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {[
              { label: h.accountability.programs, value: 85, color: "bg-primary" },
              { label: h.accountability.operations, value: 10, color: "bg-navy" },
              { label: h.accountability.growth, value: 5, color: "bg-accent" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm font-bold text-navy mb-2">
                  <span>{b.label}</span>
                  <span>{b.value}%</span>
                </div>
                <div className="h-2.5 bg-white rounded-full overflow-hidden border border-secondary">
                  <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-zc pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-hero-gradient text-white p-6 sm:p-8 md:p-12 shadow-card-lg">
          <div className="absolute -top-20 -right-20 size-64 bg-accent/15 rounded-full blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-12 items-center">
            <div className="md:col-span-1 lg:col-span-6">
              <span className="inline-block bg-accent text-navy text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded">
                {h.newsletter.badge}
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                {h.newsletter.title} <span className="text-accent italic">{h.newsletter.titleItalic}</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/85 max-w-md leading-relaxed">
                {h.newsletter.body}
              </p>
            </div>
            <form
              className="md:col-span-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">{h.newsletter.label}</label>
              <input
                id="newsletter-email" type="email" required
                placeholder={h.newsletter.placeholder}
                className="w-full bg-white/10 border border-white/25 rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-white/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              />
              <button type="submit" className="btn-primary justify-center">
                {h.newsletter.button}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-zc pb-20 md:pb-28">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{h.cta.eyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy text-balance">
            {h.cta.title} <span className="text-primary">{h.cta.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-navy/70 leading-relaxed">
            {h.cta.body}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link to={hero.cta_primary_url} className="btn-primary">
              {hero.cta_primary_label}
              <span className="size-6 bg-navy rounded-full flex items-center justify-center text-accent">
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-navy text-navy font-bold px-6 py-3 hover:bg-navy hover:text-white transition-colors text-sm">
              {h.cta.getInTouch}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
