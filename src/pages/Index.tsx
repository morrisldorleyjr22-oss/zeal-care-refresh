import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, Sparkles, GraduationCap, Lightbulb, Cpu, Quote, ChevronRight } from "lucide-react";
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
  { icon: GraduationCap, title: "Education Sponsorship", imgKey: "img_program_education",
    desc: "Removing financial barriers for the most vulnerable children in Liberia." },
  { icon: Lightbulb, title: "Leadership Modules", imgKey: "img_program_leadership",
    desc: "Developing character and ethical leadership through specialized workshops." },
  { icon: Cpu, title: "STEM Career Labs", imgKey: "img_program_stem",
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
      <section className="relative bg-hero-gradient text-white overflow-hidden">
        <div className="absolute -top-32 -right-32 size-[28rem] bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 size-[32rem] bg-primary-glow/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container-zc relative pt-16 pb-32 md:pt-24 md:pb-44 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 flex flex-col gap-7 animate-fade-up">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-5 py-2 w-max">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-balance">
              {hero.title}
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-[46ch]">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to={hero.cta_primary_url} className="btn-primary">
                {hero.cta_primary_label}
                <span className="size-6 bg-navy rounded-full flex items-center justify-center text-accent">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
              <Link to={hero.cta_secondary_url} className="btn-secondary">{hero.cta_secondary_label}</Link>
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
            <ResponsiveImage
              picture={stemImg}
              alt="Children learning together with technology"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="block w-full aspect-[4/5]"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-accent text-navy rounded-2xl px-6 py-5 shadow-yellow-glow max-w-[16rem] hidden md:block">
            <div className="text-3xl font-black tabular-nums">12+</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1">Years Of Sustained Care Per Child</div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <span className="eyebrow">Our Institutional Purpose</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-navy">
            Our Mission
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-navy/75 max-w-2xl">
            At <strong>ZEAL CARE</strong>, we believe every child deserves a chance to thrive, regardless of their background.
            Our mission is to break the cycle of poverty by providing quality education and mentorship to underserved communities.
          </p>
          <blockquote className="mt-7 border-l-4 border-accent bg-secondary/60 rounded-r-2xl p-5 text-navy italic font-medium text-base md:text-lg">
            <Quote className="h-5 w-5 text-accent mb-2" />
            "Education is the most powerful weapon which you can use to change the world."
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
          {programs.map((p, i) => (
            <article key={p.title} className={`reveal reveal-delay-${i + 1} hover-lift group rounded-[2rem] overflow-hidden border border-secondary bg-white`}>
              <div className="aspect-[4/3] overflow-hidden">
                <ResponsiveImage
                  picture={p.img}
                  alt={p.title}
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 90vw"
                  className="block w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="size-11 -mt-11 mb-3 relative bg-accent rounded-2xl flex items-center justify-center shadow-yellow-glow tilt-hover">
                  <p.icon className="h-5 w-5 text-navy" strokeWidth={2.5} />
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
      <section className="bg-navy text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[28rem] bg-accent/15 rounded-full blur-3xl" />
        <div className="container-zc relative">
          <div className="max-w-4xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Voices of Impact</span>
            <Quote className="h-10 w-10 text-accent mt-5" />
            <p className="mt-5 text-2xl md:text-3xl font-light leading-tight text-balance">
              "The digital skills I learned here got me my first job at a local tech firm. I am now the breadwinner for my family."
            </p>
            <div className="mt-7 flex items-center gap-4">
              <div className="size-12 rounded-full bg-accent flex items-center justify-center font-black text-navy text-lg">K</div>
              <div>
                <div className="font-bold text-sm">Kelvin M.</div>
                <div className="text-xs text-white/60">STEM Scholar</div>
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

      {/* INTEGRITY */}
      <section className="container-zc pb-24 md:pb-32">
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
    </div>
  );
}
