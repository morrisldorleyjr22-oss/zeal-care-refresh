import PageHero from "@/components/PageHero";
import { GraduationCap, Lightbulb, Briefcase, Cpu, Smartphone, HeartHandshake, BookOpen, Shield, BookOpenCheck, Compass, Rocket, FlaskConical } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const supports = [
  { label: "School Fees & Tuition", icon: GraduationCap },
  { label: "Uniforms & Books", icon: BookOpen },
  { label: "Shoes & Supplies", icon: Shield },
  { label: "Mentorship & Training", icon: HeartHandshake },
  { label: "Inclusive Advocacy", icon: Lightbulb },
  { label: "Digital Exposure", icon: Smartphone },
];

const programKeys = [
  { icon: BookOpenCheck, imgKey: "img_program_education", title: "Education Sponsorship & Advocacy",
    desc: "Tailored for children aged 4–17 in slums and rural communities. We provide tuition, supplies, and advocate for inclusive education.",
    quote: '"The best way to fight poverty is to empower people through access to quality education." — John Legend' },
  { icon: Compass, imgKey: "img_program_leadership", title: "Leadership Development",
    desc: "Structured initiatives focusing on personal development, mentorship, coaching, and problem-solving through summits and seminars.",
    quote: '"If your actions inspire others to dream more, learn more, do more, and become more, you are a leader." — John Quincy Adams' },
  { icon: Rocket, imgKey: "img_program_entrepreneurship", title: "Entrepreneurship Programs",
    desc: "Equipping youth with the knowledge and mindset to identify business opportunities and manage growth.",
    quote: '"It\'s not about ideas. It\'s about making ideas happen." — Scott Belsky' },
  { icon: FlaskConical, imgKey: "img_program_stem", title: "Career Paths in STEM",
    desc: "Hands-on labs in coding, robotics, and applied science that bridge the digital divide for the next generation of African innovators.",
    quote: '"Science is a way of thinking much more than it is a body of knowledge." — Carl Sagan' },
];

export default function WhatWeDo() {
  const c = usePageContent("what_we_do");
  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
      />

      {/* How we operate */}
      <section id="how" className="scroll-mt-32 container-zc py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <span className="eyebrow">Our Approach</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">{c.get("approach_title")}</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            {c.get("approach_body_1")}
          </p>
          <p className="mt-4 text-navy/75 leading-relaxed">
            {c.get("approach_body_2")}
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

      {/* Where We Operate */}
      <section id="where" className="scroll-mt-32 container-zc pb-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">On the Ground</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Where We Operate</h2>
            <p className="mt-5 text-navy/70 text-lg leading-relaxed">
              We are rooted in Liberia, focused on the communities where the gap between potential and opportunity is widest.
              Our hubs sit inside the neighborhoods we serve — never above them.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              { city: "Monrovia", area: "Chicken Soup Factory", note: "Flagship learning hub & STEM lab" },
              { city: "Monrovia", area: "West Point", note: "Community education center" },
              { city: "Grand Bassa County", area: "Rural Outreach", note: "3 new digital hubs (2026)" },
              { city: "Pan-African", area: "Diaspora Network", note: "Donor & mentor partnerships" },
            ].map((l) => (
              <div key={l.area} className="bg-white rounded-2xl border border-secondary p-6 hover:shadow-card-lg transition-all">
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
          {[
            { imgKey: "img_proj_survey", label: "Digital Survey", note: "Door-to-door community mapping in Bloc D, Monrovia." },
            { imgKey: "img_proj_interviews", label: "Candidate Interviews", note: "Shortlisted children meet our team with parents & bloc leaders." },
            { imgKey: "img_proj_materials", label: "Procuring Materials", note: "Uniforms, shoes, books, pens — sourced and verified." },
            { imgKey: "img_proj_fee", label: "School Fee Payment", note: "Paid directly to schools in the presence of bloc leadership." },
          ].map((s) => (
            <figure key={s.label} className="rounded-2xl overflow-hidden border border-secondary bg-white hover:shadow-card-lg transition-all group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.get(s.imgKey)}
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

      <section id="programs" className="scroll-mt-32 bg-soft-gradient py-24 md:py-32">
        <div className="container-zc">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Our Core Initiatives</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Strategic Programs</h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {programKeys.map((p, i) => (
              <article
                key={p.title}
                className="relative bg-white rounded-[2rem] overflow-hidden border-2 border-primary/20 ring-1 ring-inset ring-primary/5 shadow-[0_12px_35px_-15px_hsl(var(--primary)/0.4)] hover:border-primary/50 hover:shadow-[0_22px_50px_-15px_hsl(var(--primary)/0.55)] hover:-translate-y-1 transition-all"
              >
                <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary z-10" />
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={c.get(p.imgKey)}
                    alt={p.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3">
                    <div className={`program-icon ${i % 2 === 0 ? "program-icon--accent" : ""}`}>
                      <p.icon />
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

      {/* What Sets Us Apart */}
      <section id="apart" className="scroll-mt-32 container-zc py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">The Zeal Difference</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">What Sets Us Apart</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "Run by Young People", b: "Our team is made of the next generation, not retired observers." },
            { t: "100% Local Roots", b: "Every hub sits inside the community it serves." },
            { t: "STEM-First", b: "We don't just teach — we equip with future-of-work skills." },
            { t: "Total Transparency", b: "Open books, public reports, traceable impact." },
          ].map((card) => (
            <div key={card.t} className="bg-white rounded-3xl border border-secondary p-7 hover:-translate-y-1 hover:shadow-card-lg transition-all">
              <div className="size-10 rounded-xl bg-accent text-navy flex items-center justify-center font-black">★</div>
              <h3 className="mt-4 font-black text-navy">{card.t}</h3>
              <p className="mt-2 text-sm text-navy/70 leading-relaxed">{card.b}</p>
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
            <h2 className="mt-3 text-4xl md:text-5xl font-black">Impact in Numbers</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              { v: "850+", l: "Children Empowered" },
              { v: "12+", l: "Years of Sustained Care" },
              { v: "2+", l: "Communities Impacted" },
              { v: "65%", l: "Female Scholars" },
              { v: "100%", l: "Enrollment Rate" },
              { v: "$45K", l: "Grand Bassa Goal" },
            ].map((s) => (
              <div key={s.l} tabIndex={0} className="animated-border-ghost stat-card-dark bg-white/5">
                <div className="text-5xl font-black text-accent tabular-nums tracking-tighter">{s.v}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-widest text-white/80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
