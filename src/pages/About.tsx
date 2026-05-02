import PageHero from "@/components/PageHero";
import { Heart, Users, Globe2, Eye, Sparkles, HandHeart, Target, BookOpen, Compass, Award, Lightbulb, Shield, Smile, Brain } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const values = [
  { icon: Heart, title: "Integrity", body: "We fulfill our commitments and conduct ourselves in a way that is true to our identity." },
  { icon: HandHeart, title: "Community Services", body: "We strive to create equal opportunities, foster growth, and inspire lifelong learning." },
  { icon: Globe2, title: "Diversity & Inclusion", body: "Accepting diverse ways of life and opinions found within a multicultural environment." },
  { icon: Eye, title: "Transparency & Accountability", body: "Upholding a culture of total accountability in every decision and internal process." },
  { icon: Sparkles, title: "Innovation", body: "Embracing creativity, adaptability, and new approaches to enhance our initiative." },
  { icon: Users, title: "Teamwork", body: "Collaboration, shared goals, and mutual respect are the engines of the change we seek." },
];

const cards = [
  { id: "mission", tag: "Mission", title: "Our Mission",
    body: "Empower underprivileged children from low- or no-income backgrounds to break the cycle of poverty by providing resources, opportunities, and support through education sponsorship, leadership, entrepreneurship, STEM, and digital education." },
  { id: "vision", tag: "Vision", title: "Our Vision",
    body: "We envision underprivileged children realizing their full potential by learning and contributing to society. Talent and knowledge are the only limits to destiny." },
  { id: "goals", tag: "Goals", title: "Our Goals",
    body: "Ensuring access to education regardless of background, equipping children with skills to break poverty cycles, and building a community network that champions child safety across Africa." },
];

const sdgs = [
  { n: "01", title: "No Poverty", desc: "Breaking generational cycles through education access." },
  { n: "04", title: "Quality Education", desc: "Inclusive, equitable learning for every child we serve." },
  { n: "05", title: "Gender Equality", desc: "65% of our scholars are young women and girls." },
  { n: "10", title: "Reduced Inequalities", desc: "Targeting slums and rural communities most often left behind." },
  { n: "17", title: "Partnerships", desc: "Building coalitions of donors, schools, and local leaders." },
];

const characteristics = [
  { icon: Brain, title: "Critical Thinking" },
  { icon: Lightbulb, title: "Creativity" },
  { icon: Users, title: "Collaboration" },
  { icon: Smile, title: "Confidence" },
  { icon: Compass, title: "Self-Awareness" },
  { icon: Award, title: "Leadership" },
  { icon: HandHeart, title: "Empathy" },
  { icon: Shield, title: "Resilience" },
];

export default function About() {
  const c = usePageContent("about");
  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
      />

      {/* Mission · Vision · Goals */}
      <section className="container-zc py-20 md:py-28 grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <article id={c.id} key={c.tag} className={`scroll-mt-32 rounded-[2rem] p-8 md:p-10 border border-secondary ${i === 1 ? "bg-navy text-white" : "bg-white"} hover:shadow-card-lg transition-all`}>
            <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.2em] ${i === 1 ? "text-accent" : "text-primary"}`}>
              {c.tag}
            </span>
            <h2 className={`mt-3 text-3xl font-black ${i === 1 ? "text-white" : "text-navy"}`}>{c.title}</h2>
            <p className={`mt-4 leading-relaxed ${i === 1 ? "text-white/80" : "text-navy/70"}`}>{c.body}</p>
          </article>
        ))}
      </section>

      {/* Values */}
      <section id="values" className="scroll-mt-32 bg-soft-gradient py-24">
        <div className="container-zc">
          <div className="max-w-3xl">
            <span className="eyebrow">The Zeal Compass</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Our Core Values</h2>
            <p className="mt-4 text-navy/70 text-lg">Six principles that anchor every decision, partnership, and program we run.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-3xl p-8 border border-secondary hover:shadow-card-lg transition-all group">
                <div className="size-14 rounded-2xl bg-secondary text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-navy transition-colors">
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
      <section id="belief" className="scroll-mt-32 container-zc py-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="eyebrow">What We Believe</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">{c.get("belief_title")}</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            {c.get("belief_body_1")}
          </p>
          <p className="mt-4 text-navy/70 leading-relaxed">
            {c.get("belief_body_2")}
          </p>
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
      <section id="sdg" className="scroll-mt-32 bg-navy text-white py-24">
        <div className="container-zc">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Global Alignment</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">SDG Focus</h2>
            <p className="mt-4 text-white/75 text-lg">
              Our work is anchored in the United Nations Sustainable Development Goals — five priority areas where Zeal Care drives measurable impact.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sdgs.map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-4xl font-black text-accent tabular-nums tracking-tighter">{s.n}</div>
                <div className="mt-3 font-black text-white">{s.title}</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Characteristics We Develop */}
      <section id="characteristics" className="scroll-mt-32 container-zc py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">The Zeal Profile</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Characteristics We Develop</h2>
          <p className="mt-4 text-navy/70 text-lg">
            Every child in our program leaves with more than knowledge — they leave with the eight traits of a confident, capable changemaker.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {characteristics.map((ch) => (
            <div key={ch.title} className="bg-white rounded-2xl p-6 border border-secondary text-center hover:shadow-card-lg hover:-translate-y-1 transition-all">
              <div className="size-12 mx-auto rounded-2xl bg-accent text-navy flex items-center justify-center">
                <ch.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="mt-4 font-black text-navy text-sm">{ch.title}</div>
            </div>
          ))}
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
        <div className="container-zc relative py-24 md:py-32 text-center text-white">
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto text-balance">
            {c.get("quote_band_text")}
          </p>
        </div>
      </section>
    </>
  );
}
