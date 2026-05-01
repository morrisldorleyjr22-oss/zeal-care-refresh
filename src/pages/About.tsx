import PageHero from "@/components/PageHero";
import { Heart, Users, Globe2, Eye, Sparkles, HandHeart } from "lucide-react";
import community from "@/assets/community-wide.jpg";

const values = [
  { icon: Heart, title: "Integrity", body: "We fulfill our commitments and conduct ourselves in a way that is true to our identity." },
  { icon: HandHeart, title: "Community Services", body: "We strive to create equal opportunities, foster growth, and inspire lifelong learning." },
  { icon: Globe2, title: "Diversity & Inclusion", body: "Accepting diverse ways of life and opinions found within a multicultural environment." },
  { icon: Eye, title: "Transparency & Accountability", body: "Upholding a culture of total accountability in every decision and internal process." },
  { icon: Sparkles, title: "Innovation", body: "Embracing creativity, adaptability, and new approaches to enhance our initiative." },
  { icon: Users, title: "Teamwork", body: "Collaboration, shared goals, and mutual respect are the engines of the change we seek." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Heritage"
        title="About"
        highlight="Zeal Care"
        description="Our journey of empowerment and the values that drive every decision we make to transform lives in Liberia."
      />

      {/* Mission · Vision · Goals */}
      <section className="container-zc py-20 md:py-28 grid md:grid-cols-3 gap-6">
        {[
          { tag: "Mission", title: "Our Mission",
            body: "Empower underprivileged children from low- or no-income backgrounds to break the cycle of poverty by providing resources, opportunities, and support through education sponsorship, leadership, entrepreneurship, STEM, and digital education." },
          { tag: "Vision", title: "Our Vision",
            body: "We envision underprivileged children realizing their full potential by learning and contributing to society. Talent and knowledge are the only limits to destiny." },
          { tag: "Goals", title: "Our Goals",
            body: "Ensuring access to education regardless of background, equipping children with skills to break poverty cycles, and building a community network that champions child safety across Africa." },
        ].map((c, i) => (
          <article key={c.tag} className={`rounded-[2rem] p-8 md:p-10 border border-secondary ${i === 1 ? "bg-navy text-white" : "bg-white"} hover:shadow-card-lg transition-all`}>
            <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.2em] ${i === 1 ? "text-accent" : "text-primary"}`}>
              {c.tag}
            </span>
            <h2 className={`mt-3 text-3xl font-black ${i === 1 ? "text-white" : "text-navy"}`}>{c.title}</h2>
            <p className={`mt-4 leading-relaxed ${i === 1 ? "text-white/80" : "text-navy/70"}`}>{c.body}</p>
          </article>
        ))}
      </section>

      {/* Values */}
      <section className="bg-soft-gradient py-24">
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

      {/* Quote band */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={community} alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="container-zc relative py-24 md:py-32 text-center text-white">
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mx-auto text-balance">
            "Every child is a spark of <span className="text-accent">genius</span> waiting to be ignited."
          </p>
        </div>
      </section>
    </>
  );
}
