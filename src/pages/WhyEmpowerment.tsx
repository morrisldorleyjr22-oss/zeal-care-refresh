import PageHero from "@/components/PageHero";
import { Scale, Sprout, Shield } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

export default function WhyEmpowerment() {
  const c = usePageContent("why");
  const stats = c.list<{ value: string; label: string }>("stats");
  const econStats = c.list<{ v: string; l: string }>("econ_stats");
  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
      />

      {/* Philosophy */}
      <section className="container-zc py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="eyebrow">Our Philosophy</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">{c.get("philosophy_title")}</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            {c.get("philosophy_body_1")}
          </p>
          <p className="mt-4 text-navy/75 text-lg leading-relaxed">
            {c.get("philosophy_body_2")}
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="rounded-[2rem] overflow-hidden shadow-card-lg ring-4 ring-accent ring-offset-4 ring-offset-background">
            <img src={c.get("img_philosophy")} alt="Children receiving books" className="w-full aspect-[4/5] object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-accent rounded-2xl p-5 shadow-yellow-glow rotate-[-4deg]">
            <Sprout className="h-8 w-8 text-navy" />
          </div>
        </div>
      </section>

      {/* Social Justice */}
      <section id="social-justice" className="scroll-mt-32 bg-hero-gradient text-white py-24 md:py-32">
        <div className="container-zc grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-[2rem] overflow-hidden border border-white/10">
              <img src={c.get("img_social_justice")} alt="Mentorship in action" className="w-full aspect-[4/3] object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
              <Scale className="h-3.5 w-3.5 text-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">The Ethical Imperative</span>
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-black">Social Justice</h2>
            <p className="mt-5 text-white/80 text-lg leading-relaxed">
              No child should be disadvantaged because of their family's income. Empowerment is not charity — it is justice.
              Every child deserves access to educational opportunity and the tools to build a meaningful future.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Our 2024–2025 surveys in Chicken Soup Factory and West Point revealed that over 73% of children lacked access to
              digital learning devices, and 57% dropped out due to financial constraints. These gaps limit future opportunities
              long before adulthood begins.
            </p>
          </div>
        </div>
      </section>

      {/* Economic Development */}
      <section id="economic-development" className="scroll-mt-32 container-zc py-24 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="eyebrow">The Multiplier Effect</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Economic Development</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            Empowerment is not just a moral act — it is the most cost-effective economic strategy any nation can adopt. Every child we
            educate becomes an entrepreneur, a teacher, a healthcare worker, or an innovator. That ripple effect lifts entire households
            out of poverty within a single generation.
          </p>
          <p className="mt-4 text-navy/70 leading-relaxed">
            Our entrepreneurship and STEM programs prepare scholars not only to find jobs, but to create them — building local industries
            that keep talent and capital inside Liberia.
          </p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[
            { v: "10×", l: "Return on every $1 invested in girls' education" },
            { v: "+25%", l: "Lifetime earnings per added year of schooling" },
            { v: "3×", l: "Faster GDP growth in nations prioritizing education" },
            { v: "1 gen", l: "Time needed to break the poverty cycle" },
          ].map((s) => (
            <div key={s.l} className="bg-white rounded-2xl border border-secondary p-5">
              <div className="text-3xl font-black text-primary tabular-nums tracking-tighter">{s.v}</div>
              <div className="mt-2 text-xs font-bold text-navy/60 uppercase tracking-widest leading-tight">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container-zc py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-soft-gradient rounded-3xl p-10 border-2 border-primary/70 ring-1 ring-primary/20 text-center shadow-card-lg">
              <div className="text-6xl font-black text-primary tabular-nums tracking-tighter">{s.value}</div>
              <div className="mt-3 text-sm font-bold text-navy/70 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="container-zc pb-24">
        <div className="bg-accent rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
          <Shield className="h-16 w-16 text-navy shrink-0" />
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-navy">{c.get("promise_text")}</h3>
          </div>
        </div>
      </section>
    </>
  );
}
