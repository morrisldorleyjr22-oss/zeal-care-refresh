import PageHero from "@/components/PageHero";
import { Heart, Users, Globe2, Eye, Sparkles, HandHeart, Target, Compass, Award, Lightbulb, Shield, Smile, Brain, Quote } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/hooks/useLanguage";

const valueIcons = [Heart, HandHeart, Globe2, Eye, Sparkles, Users];
const charIcons = [Brain, Lightbulb, Users, Smile, Compass, Award, HandHeart, Shield];

export default function About() {
  const c = usePageContent("about");
  const { t } = useLanguage();
  const a = t.about;

  const values = [
    { icon: valueIcons[0], ...a.values.integrity },
    { icon: valueIcons[1], ...a.values.community },
    { icon: valueIcons[2], ...a.values.diversity },
    { icon: valueIcons[3], ...a.values.transparency },
    { icon: valueIcons[4], ...a.values.innovation },
    { icon: valueIcons[5], ...a.values.teamwork },
  ];

  const cards = [
    { id: "mission", ...a.cards.mission },
    { id: "vision", ...a.cards.vision },
    { id: "goals", ...a.cards.goals },
  ];

  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
      />

      {/* Mission · Vision · Goals */}
      <section className="container-zc py-14 sm:py-18 md:py-24 lg:py-28 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const isVision = i === 1;
          return (
            <article
              id={card.id}
              key={card.tag}
              className={
                isVision
                  ? "scroll-mt-32 rounded-[2rem] p-8 md:p-10 bg-hero-gradient text-white border-2 border-primary/40 shadow-[0_20px_45px_-15px_hsl(var(--primary)/0.55)] ring-1 ring-white/10 hover:shadow-[0_28px_60px_-15px_hsl(var(--primary)/0.7)] transition-all relative overflow-hidden"
                  : "scroll-mt-32 rounded-[2rem] p-8 md:p-10 bg-white border-2 border-primary/25 shadow-[0_12px_30px_-12px_hsl(var(--primary)/0.35)] hover:border-primary/50 hover:shadow-[0_20px_45px_-15px_hsl(var(--primary)/0.5)] hover:-translate-y-1 transition-all"
              }
            >
              {isVision && (
                <div className="absolute -top-20 -right-20 size-56 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
              )}
              <span className={`relative inline-block text-[11px] font-bold uppercase tracking-[0.2em] ${isVision ? "text-accent" : "text-primary"}`}>
                {card.tag}
              </span>
              <h2 className={`relative mt-3 text-3xl font-black ${isVision ? "text-white" : "text-navy"}`}>{card.title}</h2>
              <p className={`relative mt-4 leading-relaxed ${isVision ? "text-white/85" : "text-navy/70"}`}>{card.body}</p>
            </article>
          );
        })}
      </section>

      {/* Values */}
      <section id="values" className="scroll-mt-32 bg-soft-gradient py-14 sm:py-20 md:py-24">
        <div className="container-zc">
          <div className="max-w-3xl">
            <span className="eyebrow">{a.valuesEyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-navy">{a.valuesTitle}</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="relative bg-white rounded-3xl p-8 border-2 border-primary/20 ring-1 ring-inset ring-primary/5 shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.35)] hover:border-primary/50 hover:shadow-[0_18px_40px_-15px_hsl(var(--primary)/0.5)] hover:-translate-y-1 transition-all group overflow-hidden"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-t-3xl" />
                <div className="size-14 rounded-2xl bg-secondary text-primary flex items-center justify-center ring-1 ring-primary/15 group-hover:bg-accent group-hover:text-navy group-hover:ring-accent/40 transition-colors">
                  <v.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="mt-5 text-xl font-black text-navy">{v.title}</h3>
                <p className="mt-2 text-navy/70 font-medium">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Belief */}
      <section id="belief" className="scroll-mt-32 container-zc py-14 sm:py-20 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="eyebrow">What We Believe</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-navy">{c.get("belief_title")}</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            {c.get("belief_body_1")}
          </p>
          <figure className="mt-8 quote-frame">
            <span className="quote-mark" aria-hidden="true">
              <Quote />
            </span>
            <blockquote className="text-lg md:text-xl font-semibold text-navy leading-relaxed italic">
              {c.get("belief_body_2")}
            </blockquote>
            <figcaption className="mt-4 text-[11px] font-bold text-primary uppercase tracking-[0.2em]">
              — Our Belief
            </figcaption>
          </figure>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-yellow-gradient rounded-[2rem] p-10 shadow-yellow-glow">
            <Target className="h-10 w-10 text-navy" />
            <p className="mt-6 text-2xl font-black text-navy leading-snug">
              {c.get("belief_quote")}
            </p>
          </div>
        </div>
      </section>

      {/* SDG Focus */}
      <section id="sdg" className="scroll-mt-32 bg-hero-gradient text-white py-14 sm:py-20 md:py-24">
        <div className="container-zc">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{a.sdgEyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black">{a.sdgTitle}</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {a.sdgs.map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-3xl sm:text-4xl font-black text-accent tabular-nums tracking-tighter">{s.n}</div>
                <div className="mt-3 font-black text-white">{s.title}</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Characteristics We Develop */}
      <section id="characteristics" className="scroll-mt-32 container-zc py-14 sm:py-20 md:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">{a.charEyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-navy">{a.charTitle}</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {a.characteristics.map((title, idx) => {
            const Icon = charIcons[idx];
            return (
            <div key={title} className="bg-white rounded-2xl p-6 border border-secondary text-center hover:shadow-card-lg hover:-translate-y-1 transition-all">
              <div className="size-12 mx-auto rounded-2xl bg-accent text-navy flex items-center justify-center">
                <Icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="mt-4 font-black text-navy text-sm">{title}</div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Quote band */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={c.get("img_quote_band")}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="container-zc relative py-14 sm:py-20 md:py-24 lg:py-32 text-center text-white">
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto text-balance">
            {c.get("quote_band_text")}
          </p>
        </div>
      </section>
    </>
  );
}
