import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, Sparkles, GraduationCap, Lightbulb, Cpu, Quote, ChevronRight, BookOpenCheck, Compass, FlaskConical } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSetting } from "@/hooks/useSiteSettings";
import { usePageContent } from "@/hooks/usePageContent";

const stats = [
  { value: "850+", label: "Active Scholars" },
  { value: "12-Year", label: "Impact Promise" },
  { value: "50+", label: "Partner Schools" },
  { value: "24k", label: "Tech Hours" },
  { value: "100%", label: "Transparency" },
];

const advantages = [
  { icon: ShieldCheck, color: "bg-accent text-navy", rotate: "rotate-3", title: "Radical Integrity",
    body: "We operate with 100% transparency. Every dollar is tracked and its impact is documented for our partners." },
  { icon: Clock, color: "bg-primary text-white", rotate: "-rotate-3", title: "Long-term Commitment",
    body: "We don't just provide a one-time gift. We commit to a child's education for up to 12 years, ensuring lasting change." },
  { icon: Sparkles, color: "bg-navy text-accent", rotate: "rotate-6", title: "Holistic Development",
    body: "Beyond academics, we provide mentorship, tech literacy, and character building to create well-rounded leaders." },
];

const programKeys = [
  { icon: BookOpenCheck, title: "Education Sponsorship", imgKey: "img_program_education",
    desc: "Removing financial barriers for the most vulnerable children in Liberia." },
  { icon: Compass, title: "Leadership Modules", imgKey: "img_program_leadership",
    desc: "Developing character and ethical leadership through specialized workshops." },
  { icon: FlaskConical, title: "STEM Career Labs", imgKey: "img_program_stem",
    desc: "Bridging the digital divide with coding, robotics, and science equipment." },
];

const partners = ["USAID", "Orange", "Ecobank", "UNICEF", "Global Fund", "World Vision"];

export default function Index() {
  const ref = useReveal<HTMLDivElement>();
  const hero = useSetting("hero_home");
  const c = usePageContent("home");
  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="relative text-white overflow-hidden bg-hero-gradient">

        <div className="container-zc relative pt-16 pb-24 sm:pt-20 sm:pb-32 md:pt-28 md:pb-40 lg:pt-36 lg:pb-52 grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 lg:gap-7 animate-fade-up text-center lg:text-left items-center lg:items-start">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 w-max">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/90">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] sm:leading-[1.05] tracking-tight text-balance">
              {hero.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-[42ch] sm:max-w-[46ch] mx-auto lg:mx-0">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-1 sm:mt-2">
              <Link to={hero.cta_primary_url} className="btn-primary">
                {hero.cta_primary_label}
                <span className="size-6 bg-navy rounded-full flex items-center justify-center text-accent">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
              <Link to={hero.cta_secondary_url || "/who-we-are"} className="btn-secondary group">
                {hero.cta_secondary_label || "Learn More"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Collage */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[560px] w-full">
            <div className="absolute top-0 right-0 w-[78%] h-[88%] rounded-[2.5rem] overflow-hidden shadow-card-lg rotate-2 z-20 ring-1 ring-white/20">
              <img
                src={c.get("img_hero_main")}
                alt="Joyful Liberian schoolchildren raising their hands in class"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[55%] h-[58%] bg-accent rounded-[2rem] p-2 shadow-yellow-glow -rotate-3 z-30 animate-float">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                <img
                  src={c.get("img_hero_portrait")}
                  alt="Smiling young scholar holding her books"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute top-1/4 -left-2 size-24 bg-accent rounded-full z-10 flex items-center justify-center shadow-yellow-glow animate-float">
              <span className="text-navy font-black text-2xl">A+</span>
            </div>
          </div>
        </div>

        {/* Stats card overlap */}
        <div className="container-zc relative -mt-20 pb-2 z-30">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card-lg border border-secondary grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-secondary">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center text-center px-4 py-4 md:py-2">
                <span className="text-2xl md:text-3xl font-black text-primary tabular-nums tracking-tighter">
                  {s.value}
                </span>
                <span className="text-[10px] font-bold text-navy mt-1 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="container-zc py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="rounded-[2rem] overflow-hidden shadow-card-lg">
            <img
              src={c.get("img_mission")}
              alt="Children learning together with technology"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-accent text-navy rounded-2xl px-6 py-5 shadow-yellow-glow max-w-[16rem] hidden md:block">
            <div className="text-3xl font-black tabular-nums">12+</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1">Years Of Sustained Care Per Child</div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <span className="eyebrow">{c.get("mission_eyebrow")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy">
            {c.get("mission_title")}
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-navy/75 max-w-2xl">
            {c.get("mission_body")}
          </p>
          <blockquote className="mt-7 border-l-4 border-accent bg-secondary/60 rounded-r-2xl p-5 text-navy italic font-medium text-base md:text-lg">
            <Quote className="h-5 w-5 text-accent mb-2" />
            {c.get("mission_quote")}
          </blockquote>
          <div className="mt-8 flex gap-4">
            <Link to="/about" className="inline-flex items-center gap-2 font-bold text-primary hover:text-navy transition-colors">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT SETS US APART */}
      <section className="bg-soft-gradient py-24 md:py-32">
        <div className="container-zc">
          <div className="text-center max-w-3xl mx-auto reveal">
            <span className="eyebrow">The Zeal Advantage</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy text-balance">
              We don't do band-aids. <span className="text-primary">We build foundations.</span>
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((a, i) => (
              <div key={a.title} className={`reveal reveal-delay-${i + 1} hover-lift group bg-white rounded-[2rem] p-7 md:p-8 border border-secondary flex flex-col`}>
                <div className={`size-14 ${a.color} ${a.rotate} rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1.5 transition-transform`}>
                  <a.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-navy mb-2">{a.title}</h3>
                <p className="text-sm md:text-base text-navy/70 leading-relaxed font-medium flex-grow">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="container-zc py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Our Impact Areas</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy">Our Core Programs</h2>
          </div>
          <Link to="/what-we-do" className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:text-navy transition-colors">
            View all programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programKeys.map((p, i) => (
            <article key={p.title} className={`reveal reveal-delay-${i + 1} hover-lift group relative rounded-[2rem] overflow-hidden border-2 border-primary/20 ring-1 ring-inset ring-primary/5 bg-white shadow-[0_12px_30px_-15px_hsl(var(--primary)/0.35)] hover:border-primary/50 hover:shadow-[0_20px_45px_-15px_hsl(var(--primary)/0.5)] transition-all`}>
              <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary z-10" />
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.get(p.imgKey)}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className={`-mt-12 mb-3 relative program-icon ${i % 2 === 0 ? "program-icon--accent" : ""}`}>
                  <p.icon />
                </div>
                <h3 className="text-lg md:text-xl font-black text-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-navy/70 font-medium">{p.desc}</p>
                <Link to="/what-we-do" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:text-navy transition-colors">
                  View details <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-hero-gradient text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[28rem] bg-accent/15 rounded-full blur-3xl" />
        <div className="container-zc relative">
          <div className="max-w-4xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Voices of Impact</span>
            <Quote className="h-10 w-10 text-accent mt-5" />
            <p className="mt-5 text-2xl md:text-3xl font-light leading-tight text-balance">
              {c.get("testimonial_quote")}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <div className="size-12 rounded-full bg-accent flex items-center justify-center font-black text-navy text-lg">{c.get("testimonial_name").trim().charAt(0) || "K"}</div>
              <div>
                <div className="font-bold text-sm">{c.get("testimonial_name")}</div>
                <div className="text-xs text-white/60">{c.get("testimonial_role")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container-zc py-20">
        <div className="text-center mb-10">
          <span className="eyebrow">Strategic Global Ecosystem</span>
          <h2 className="mt-3 text-2xl md:text-3xl font-black text-navy">Our Strategic Partners</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((p) => (
            <span key={p} className="text-xl md:text-2xl font-black text-navy/30 hover:text-primary transition-colors tracking-tight">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* INTEGRITY / ACCOUNTABILITY */}
      <section className="container-zc pb-20 md:pb-24">
        <div className="bg-soft-gradient rounded-[2.5rem] border border-secondary p-8 md:p-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">Accountability Standard</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-navy">Radical Integrity.</h2>
            <p className="mt-4 text-base md:text-lg text-navy/70 leading-relaxed">
              Our verified fiscal methodology ensures that institutional resources are deployed where they create the most equity.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 bg-accent text-navy font-black rounded-2xl px-5 py-3.5">
              <span className="text-2xl tabular-nums">85%</span>
              <span className="text-xs uppercase tracking-widest">Direct Impact</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            {[
              { label: "Field Programs & Scholarships", value: 85, color: "bg-primary" },
              { label: "Strategic Operations", value: 10, color: "bg-navy" },
              { label: "Growth & Mobilization", value: 5, color: "bg-accent" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm font-bold text-navy mb-2">
                  <span>{b.label}</span>
                  <span>{b.value}%</span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden border border-secondary">
                  <div className={`h-full ${b.color} rounded-full transition-all`} style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAY CONNECTED / NEWSLETTER */}
      <section className="container-zc pb-20 md:pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-hero-gradient text-white p-8 md:p-14 shadow-card-lg">
          <div className="absolute -top-24 -right-24 size-72 bg-accent/20 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="inline-block bg-accent text-navy text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded">
                Stay Connected
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight">
                The Zeal <span className="text-accent italic">Impact</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/85 max-w-md">
                Join 12,000+ monthly readers receiving direct impact reports from the field.
              </p>
            </div>
            <form
              className="lg:col-span-6 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/25 rounded-2xl px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent/60"
              />
              <button type="submit" className="btn-primary justify-center">
                Join Movement
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* READY TO MAKE AN IMPACT - FINAL CTA */}
      <section className="container-zc pb-24 md:pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Take Action Today</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-navy text-balance">
            Ready to make an <span className="text-primary">impact?</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-navy/70 leading-relaxed">
            Your support transforms lives. Sponsor a child, partner with us, or share our mission — every action counts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={hero.cta_primary_url} className="btn-primary">
              {hero.cta_primary_label}
              <span className="size-6 bg-navy rounded-full flex items-center justify-center text-accent">
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-navy text-navy font-bold px-6 py-3 hover:bg-navy hover:text-white transition-colors">
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
