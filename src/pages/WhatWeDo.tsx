import PageHero from "@/components/PageHero";
import { GraduationCap, Lightbulb, Briefcase, Cpu, Smartphone, HeartHandshake, BookOpen, Shield } from "lucide-react";
import community from "@/assets/community-wide.jpg";
import stem from "@/assets/program-stem.jpg";
import edu from "@/assets/program-education.jpg";
import lead from "@/assets/program-leadership.jpg";
import ent from "@/assets/program-entrepreneurship.jpg";

const supports = [
  { label: "School Fees & Tuition", icon: GraduationCap },
  { label: "Uniforms & Books", icon: BookOpen },
  { label: "Shoes & Supplies", icon: Shield },
  { label: "Mentorship & Training", icon: HeartHandshake },
  { label: "Inclusive Advocacy", icon: Lightbulb },
  { label: "Digital Exposure", icon: Smartphone },
];

const programs = [
  { icon: GraduationCap, img: edu, title: "Education Sponsorship & Advocacy",
    desc: "Tailored for children aged 4–17 in slums and rural communities. We provide tuition, supplies, and advocate for inclusive education.",
    quote: '"The best way to fight poverty is to empower people through access to quality education." — John Legend' },
  { icon: Lightbulb, img: lead, title: "Leadership Development",
    desc: "Structured initiatives focusing on personal development, mentorship, coaching, and problem-solving through summits and seminars.",
    quote: '"If your actions inspire others to dream more, learn more, do more, and become more, you are a leader." — John Quincy Adams' },
  { icon: Briefcase, img: ent, title: "Entrepreneurship Programs",
    desc: "Equipping youth with the knowledge and mindset to identify business opportunities and manage growth.",
    quote: '"It\'s not about ideas. It\'s about making ideas happen." — Scott Belsky' },
  { icon: Cpu, img: stem, title: "Career Paths in STEM",
    desc: "Hands-on labs in coding, robotics, and applied science that bridge the digital divide for the next generation of African innovators.",
    quote: '"Science is a way of thinking much more than it is a body of knowledge." — Carl Sagan' },
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="Our Methodology"
        title="What"
        highlight="We Do"
        description="Architecting holistic intervention systems that multiply opportunity for the next generation of leaders."
      />

      {/* How we operate */}
      <section className="container-zc py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <span className="eyebrow">Our Approach</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">How We Operate</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            Zeal Care creates a model that radically improves the lives of underprivileged children. We believe that effectively
            supporting an individual means investing in the structures that surround them.
          </p>
          <p className="mt-4 text-navy/75 leading-relaxed">
            We work in partnership with slums and rural communities — partnerships founded on trust and deep respect for local expertise.
            Successfully supporting a child means providing both financial and social support.
          </p>
        </div>
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {supports.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-secondary flex items-center gap-3 hover:shadow-soft transition-all">
              <div className="size-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <s.icon className="h-5 w-5 text-navy" />
              </div>
              <span className="text-sm font-bold text-navy">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="bg-soft-gradient py-24 md:py-32">
        <div className="container-zc">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Our Core Initiatives</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Strategic Programs</h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {programs.map((p, i) => (
              <article key={p.title} className="bg-white rounded-[2rem] overflow-hidden border border-secondary hover:shadow-card-lg transition-all">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3">
                    <div className={`size-12 rounded-2xl ${i % 2 === 0 ? "bg-accent text-navy" : "bg-primary text-white"} flex items-center justify-center`}>
                      <p.icon className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-navy">{p.title}</h3>
                  </div>
                  <p className="mt-4 text-navy/70 leading-relaxed">{p.desc}</p>
                  <p className="mt-5 text-sm italic text-navy/60 border-l-2 border-accent pl-4">{p.quote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact band */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={community} alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="container-zc relative py-20 text-white grid md:grid-cols-3 gap-8 text-center">
          {[{ v: "850+", l: "Children Empowered" }, { v: "12+", l: "Years of Sustained Care" }, { v: "2+", l: "Communities Impacted" }].map((s) => (
            <div key={s.l}>
              <div className="text-5xl md:text-6xl font-black text-accent tabular-nums tracking-tighter">{s.v}</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-widest text-white/80">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
