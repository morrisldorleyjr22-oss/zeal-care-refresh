import PageHero from "@/components/PageHero";
import { Scale, Sprout, Shield } from "lucide-react";
import img1 from "@/assets/program-education.jpg";
import img2 from "@/assets/program-leadership.jpg";

const stats = [
  { value: "73%", label: "Children without digital learning devices" },
  { value: "57%", label: "Drop-out rate due to financial constraints" },
  { value: "4-17", label: "Age range of children we serve" },
];

export default function WhyEmpowerment() {
  return (
    <>
      <PageHero
        eyebrow="The Case for Change"
        title="Why"
        highlight="Empowerment?"
        description="At Zeal Care, we believe every child carries untapped greatness. Empowerment is the key to unlocking a brighter, more equitable future for Liberia."
      />

      {/* Philosophy */}
      <section className="container-zc py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="eyebrow">Our Philosophy</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Closing the Gaps Early</h2>
          <p className="mt-6 text-navy/75 text-lg leading-relaxed">
            For children ages 4 to 17 from low or no-income families, opportunity is often limited not by ability, but by circumstance.
            In many underserved communities in Liberia, children lack access to quality learning support, digital tools, mentorship, and safe spaces to grow.
          </p>
          <p className="mt-4 text-navy/75 text-lg leading-relaxed">
            To Zeal Care, empowerment means closing those gaps early — strengthening foundational literacy, introducing digital awareness,
            providing mentorship and life skills, and creating safe, inclusive environments where confidence can grow.
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="rounded-[2rem] overflow-hidden shadow-card-lg">
            <img src={img1} alt="Children receiving books" loading="lazy" className="w-full aspect-[4/5] object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-accent rounded-2xl p-5 shadow-yellow-glow rotate-[-4deg]">
            <Sprout className="h-8 w-8 text-navy" />
          </div>
        </div>
      </section>

      {/* Social Justice */}
      <section className="bg-navy text-white py-24 md:py-32">
        <div className="container-zc grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-[2rem] overflow-hidden border border-white/10">
              <img src={img2} alt="Mentorship in action" loading="lazy" className="w-full aspect-[4/3] object-cover" />
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

      {/* Stats */}
      <section className="container-zc py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-soft-gradient rounded-3xl p-10 border border-secondary text-center">
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
            <h3 className="text-2xl md:text-3xl font-black text-navy">When the right support reaches the right child at the right time, transformation becomes possible — not just for that child, but for entire communities.</h3>
          </div>
        </div>
      </section>
    </>
  );
}
