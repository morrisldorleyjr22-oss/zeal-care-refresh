import PageHero from "@/components/PageHero";
import { Sparkles } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { getIcon } from "@/lib/icon-registry";

export default function WhatWeDo() {
  const c = usePageContent("what_we_do");
  const supports = c.list<{ label: string; icon: string }>("supports");
  const locations = c.list<{ city: string; area: string; note: string }>("locations");
  const projectSteps = c.list<{ image: string; label: string; note: string }>("project_steps");
  const programs = c.list<{ title: string; desc: string; quote: string; icon: string }>("programs");
  const differentiators = c.list<{ title: string; body: string }>("differentiators");
  const impactStats = c.list<{ value: string; label: string }>("impact_stats");
  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
      />

      {/* How we operate */}
      <section id="how" className="scroll-mt-32 container-zc py-14 sm:py-20 md:py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <span className="eyebrow">Our Approach</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-navy">{c.get("approach_title")}</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            {c.get("approach_body_1")}
          </p>
          <p className="mt-4 text-navy/75 leading-relaxed">
            {c.get("approach_body_2")}
          </p>
        </div>
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {supports.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <div key={`${s.label}-${i}`} className="bg-white rounded-2xl p-5 border border-secondary flex items-center gap-3 hover:shadow-soft transition-all">
                <div className="size-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-navy" />
                </div>
                <span className="text-sm font-bold text-navy">{s.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Where We Operate */}
      <section id="where" className="scroll-mt-32 container-zc pb-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">On the Ground</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-navy">Where We Operate</h2>
            <p className="mt-5 text-navy/70 text-lg leading-relaxed">
              We are rooted in Liberia, focused on the communities where the gap between potential and opportunity is widest.
              Our hubs sit inside the neighborhoods we serve — never above them.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {locations.map((l, i) => (
              <div key={`${l.area}-${i}`} className="bg-white rounded-2xl border border-secondary p-6 hover:shadow-card-lg transition-all">
                <div className="text-[11px] font-bold text-primary uppercase tracking-widest">{l.city}</div>
                <div className="mt-1 font-black text-navy text-lg">{l.area}</div>
                <div className="mt-2 text-sm text-navy/65">{l.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project in Action */}
      <section id="in-action" className="scroll-mt-32 container-zc pt-16 pb-8">
        <div className="max-w-3xl">
          <span className="eyebrow">Project in Action</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-navy">From survey to school bag</h2>
          <p className="mt-4 text-navy/70 leading-relaxed">
            Every sponsorship begins with a community survey, leads to candidate interviews with parents and bloc leaders,
            and ends with school materials and fees paid in full — transparently, in front of the community.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectSteps.map((s, i) => (
            <figure key={`${s.label}-${i}`} className="rounded-2xl overflow-hidden border border-secondary bg-white hover:shadow-card-lg transition-all group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-4">
                <div className="text-[11px] font-bold text-primary uppercase tracking-widest">{s.label}</div>
                <p className="mt-1 text-sm text-navy/70 leading-snug">{s.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="programs" className="scroll-mt-32 bg-soft-gradient py-14 sm:py-20 md:py-24 lg:py-32">
        <div className="container-zc">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Our Core Initiatives</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-navy">Strategic Programs</h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {programs.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <article
                  key={`${p.title}-${i}`}
                  className="group relative bg-white rounded-[2rem] overflow-hidden border-2 border-primary/20 ring-1 ring-inset ring-primary/5 shadow-[0_12px_35px_-15px_hsl(var(--primary)/0.4)] hover:border-primary/50 hover:shadow-[0_22px_50px_-15px_hsl(var(--primary)/0.55)] hover:-translate-y-1 transition-all"
                >
                  <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary z-10" />
                  <div
                    className={`program-hero ${i % 2 === 0 ? "program-hero--accent" : ""}`}
                    role="img"
                    aria-label={`${p.title} — program illustration`}
                    title={`${p.title} — program illustration`}
                  >
                    <Icon aria-hidden="true" focusable="false" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl md:text-2xl font-black text-navy">{p.title}</h3>
                    <p className="mt-4 text-navy/70 leading-relaxed">{p.desc}</p>
                    <p className="mt-5 text-sm italic text-navy/60 border-l-2 border-accent pl-4">{p.quote}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section id="apart" className="scroll-mt-32 container-zc py-14 sm:py-20 md:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">The Zeal Difference</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-navy">What Sets Us Apart</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentiators.map((card, i) => (
            <div key={`${card.title}-${i}`} className="bg-white rounded-3xl border border-secondary p-7 hover:-translate-y-1 hover:shadow-card-lg transition-all">
              <div className="size-10 rounded-xl bg-accent text-navy flex items-center justify-center font-black">★</div>
              <h3 className="mt-4 font-black text-navy">{card.title}</h3>
              <p className="mt-2 text-sm text-navy/70 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact in Numbers */}
      <section id="impact" className="scroll-mt-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={c.get("img_impact_band")} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="container-zc relative py-20 text-white">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Receipts, Not Promises</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black">Impact in Numbers</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {impactStats.map((s, i) => (
              <div key={`${s.label}-${i}`} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-accent tabular-nums tracking-tighter">{s.value}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-widest text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
