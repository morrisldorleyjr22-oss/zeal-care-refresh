import PageHero from "@/components/PageHero";
import { Quote } from "lucide-react";
import community from "@/assets/community-wide.jpg";

const leadership = [
  { name: "Titus S. Foko", role: "Founder & Executive Director", bio: "Strategic vision and program architect leading Zeal Care's mission across Liberia." },
  { name: "Mohammed Soko Kamara", role: "ED, Marketing & Communications", bio: "Champions Zeal Care's voice, partnerships, and storytelling across Africa and beyond." },
  { name: "Joetta C. Paye", role: "ED, Talent Management", bio: "Builds the people systems that allow our young, mission-driven team to thrive." },
  { name: "William Mammie", role: "ED, Organization Development", bio: "Designs the operational backbone that scales our work across new communities." },
];

const board = [
  { name: "Jluedoe M. Bornor", role: "Acting Board Chairperson" },
  { name: "Yewande Olaiya-Oni", role: "Project Advisor" },
  { name: "Mambiyea W. Kapee", role: "Children Education Impact Advisor" },
  { name: "Sonay Knakay Monger Mason", role: "Strategy Partnership Advisor" },
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className="size-20 rounded-2xl bg-yellow-gradient flex items-center justify-center text-navy font-black text-2xl shadow-yellow-glow">
      {initials}
    </div>
  );
}

export default function WhoWeAre() {
  return (
    <>
      <PageHero
        eyebrow="Our Identity"
        title="Who"
        highlight="We Are"
        description="The people, partners, and systems behind Zeal Care's mission to transform education in Liberia."
      />

      {/* Leadership */}
      <section className="container-zc py-24 md:py-32" id="leadership">
        <div className="max-w-3xl">
          <span className="eyebrow">Institutional Force</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Our Leadership</h2>
          <p className="mt-4 text-navy/70 text-lg">Run entirely by young people passionate about creating positive change.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((p) => (
            <article key={p.name} className="bg-white rounded-[2rem] p-7 border border-secondary hover:shadow-card-lg transition-all">
              <Avatar name={p.name} />
              <h3 className="mt-5 text-lg font-black text-navy">{p.name}</h3>
              <p className="text-sm font-bold text-primary mt-1">{p.role}</p>
              <p className="mt-3 text-sm text-navy/70 leading-relaxed">{p.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Board */}
      <section className="bg-soft-gradient py-24">
        <div className="container-zc">
          <div className="max-w-3xl">
            <span className="eyebrow">Strategic Governance</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Board of Advisors</h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {board.map((b) => (
              <div key={b.name} className="bg-white rounded-3xl p-7 border border-secondary text-center">
                <div className="size-16 mx-auto rounded-full bg-secondary text-primary flex items-center justify-center font-black text-xl">
                  {b.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <h3 className="mt-4 font-black text-navy">{b.name}</h3>
                <p className="text-sm text-navy/60 mt-1">{b.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="relative overflow-hidden" id="finance">
        <div className="absolute inset-0">
          <img src={community} alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
        </div>
        <div className="container-zc relative py-24 md:py-32 text-white grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Heart of the Mission</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">Our Beneficiaries</h2>
            <p className="mt-5 text-white/85 text-lg leading-relaxed max-w-2xl">
              We serve over 850 children across Liberia who demonstrate exceptional grit but lack financial access to modern education.
              Our beneficiaries are chosen not just based on need, but on their desire to lead and transform their communities.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[{ v: "850+", l: "Children Served" }, { v: "65%", l: "Female Scholars" }, { v: "100%", l: "Enrollment Rate" }, { v: "12yr", l: "Commitment" }].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-6">
                <div className="text-4xl font-black text-accent tabular-nums tracking-tighter">{s.v}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/85 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice */}
      <section className="container-zc py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-secondary p-10 md:p-14 shadow-card-lg">
          <Quote className="h-10 w-10 text-accent" />
          <p className="mt-5 text-2xl md:text-3xl font-light leading-snug text-navy text-balance">
            "The STEM lab changed my life. I never knew I could build robots in Grand Bassa. ZEAL CARE gave me a path to the future."
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="size-12 rounded-full bg-accent flex items-center justify-center font-black text-navy">S</div>
            <div>
              <div className="font-black text-navy">Samuel K.</div>
              <div className="text-sm text-navy/60">Age 15, STEM Scholar</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
