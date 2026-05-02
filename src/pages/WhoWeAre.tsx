import PageHero from "@/components/PageHero";
import { usePageContent } from "@/hooks/usePageContent";
import { Quote, Handshake, Trophy, ShieldCheck, FileBarChart2, Briefcase, FileText, Clock } from "lucide-react";
import community from "@/assets/community-wide.jpg?responsive";
import teamMeeting from "@/assets/team-meeting.jpg?responsive";
import partnershipPhoto from "@/assets/leader-team-classroom.jpg?responsive";
import portraitTitus from "@/assets/leader-titus.jpg?responsive";
import portraitMohammed from "@/assets/leader-mohammed.jpg?responsive";
import portraitBeverley from "@/assets/leader-beverley.jpg?responsive";
import ResponsiveImage from "@/components/ResponsiveImage";

const leadership = [
  { name: "Titus S. Foko", role: "Founder & Executive Director", bio: "Strategic vision and program architect leading Zeal Care's mission across Liberia.", photo: portraitTitus },
  { name: "Mohammed Soko Kamara", role: "ED, Marketing & Communications", bio: "Champions Zeal Care's voice, partnerships, and storytelling across Africa and beyond.", photo: portraitMohammed },
  { name: "Beverley Chelsea Saungweme", role: "ED, International Affairs", bio: "Former Project Team Lead for phase one. Drives Zeal Care's global partnerships and diaspora engagement.", photo: portraitBeverley },
  { name: "William Mammie", role: "Graphic & Media Officer", bio: "Designs the operational backbone and visual narrative that scales our work across new communities." },
];

const board = [
  { name: "Jluedoe M. Bornor", role: "Acting Board Chairperson" },
  { name: "Yewande Olaiya-Oni", role: "Project Advisor" },
  { name: "Mambiyea W. Kapee", role: "Children Education Impact Advisor" },
  { name: "Sonay Knakay Monger Mason", role: "Strategy Partnership Advisor" },
];

const partners = [
  "Ministry of Education", "UNICEF Liberia", "MTN Foundation", "Orange Liberia",
  "Local Schools Network", "Diaspora Donors", "Tech for Africa", "Sendwave",
];

const history = [
  { year: "2013", title: "The Spark", body: "Founded in Monrovia with 15 children and a single after-school program." },
  { year: "2017", title: "First Hub", body: "Opened our first dedicated learning center in Chicken Soup Factory." },
  { year: "2021", title: "STEM Lab", body: "Launched Liberia's first community robotics lab for under-served youth." },
  { year: "2024", title: "850+ Scholars", body: "Crossed the milestone of 850 active beneficiaries across two communities." },
  { year: "2026", title: "Grand Bassa", body: "Expanding into rural Grand Bassa County with three new digital hubs." },
];

const awards = [
  { year: "2024", title: "Liberia Youth Impact Award", body: "Recognized for innovation in community-led education." },
  { year: "2023", title: "Africa Changemaker Honor", body: "Pan-African recognition for STEM access in low-income communities." },
  { year: "2022", title: "Civic Excellence Citation", body: "Awarded by the Monrovia City Corporation for community service." },
];

function Avatar({ name, photo }: { name: string; photo?: { sources: Record<string, string>; img: { src: string; w: number; h: number } } }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  if (photo) {
    return (
      <div className="size-20 rounded-2xl overflow-hidden ring-2 ring-accent/60 shadow-yellow-glow">
        <ResponsiveImage
          picture={photo}
          alt={name}
          sizes="80px"
          className="block w-full h-full"
          imgClassName="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="size-20 rounded-2xl bg-yellow-gradient flex items-center justify-center text-navy font-black text-2xl shadow-yellow-glow">
      {initials}
    </div>
  );
}

export default function WhoWeAre() {
  const c = usePageContent("who_we_are");
  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
      />

      {/* Team meeting hero strip */}
      <section className="container-zc pt-16">
        <figure className="rounded-[2rem] overflow-hidden border border-secondary shadow-card-lg">
          <ResponsiveImage
            picture={teamMeeting}
            alt="Zeal Care team in person meeting while others joined online"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="block w-full"
            imgClassName="w-full h-auto object-cover"
            eager
          />
          <figcaption className="bg-navy text-white/80 text-xs font-medium px-6 py-3 text-center">
            Zeal Care Team in person meeting while others far away joined online to participate
          </figcaption>
        </figure>
      </section>

      {/* Leadership */}
      <section className="container-zc py-24 md:py-32 scroll-mt-32" id="leadership">
        <div className="max-w-3xl">
          <span className="eyebrow">Institutional Force</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Our Leadership</h2>
          <p className="mt-4 text-navy/70 text-lg">Run entirely by young people passionate about creating positive change.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((p) => (
            <article key={p.name} className="bg-white rounded-[2rem] p-7 border border-secondary hover:shadow-card-lg transition-all">
              <Avatar name={p.name} photo={p.photo} />
              <h3 className="mt-5 text-lg font-black text-navy">{p.name}</h3>
              <p className="text-sm font-bold text-primary mt-1">{p.role}</p>
              <p className="mt-3 text-sm text-navy/70 leading-relaxed">{p.bio}</p>
            </article>
          ))}
        </div>

        {/* Partnership snapshot */}
        <div className="mt-16 grid lg:grid-cols-12 gap-8 items-center bg-soft-gradient rounded-[2rem] border border-secondary p-6 md:p-8">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden">
            <ResponsiveImage
              picture={partnershipPhoto}
              alt="Zeal Care Team and Esfans Academy administrator in a partnership discussion"
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="block w-full h-full aspect-[4/3]"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5">
            <span className="eyebrow">In the field</span>
            <h3 className="mt-2 text-2xl md:text-3xl font-black text-navy">Partnership in motion</h3>
            <p className="mt-3 text-navy/70 leading-relaxed text-sm">
              Zeal Care Team and the Esfans Academy administrator in a partnership discussion — one of many on-the-ground
              conversations that shape how we deliver education across Monrovia and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Board */}
      <section id="board" className="scroll-mt-32 bg-soft-gradient py-24">
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
      <section id="beneficiaries" className="scroll-mt-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage picture={community} alt="" sizes="100vw" className="block w-full h-full" imgClassName="w-full h-full object-cover" />
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

      {/* Partners */}
      <section id="partners" className="scroll-mt-32 container-zc py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">Coalition of Care</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Our Partners</h2>
          <p className="mt-4 text-navy/70 text-lg">A network of institutions, companies, and community leaders who multiply our impact.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p} className="bg-white rounded-2xl border border-secondary p-6 text-center hover:shadow-soft transition-all">
              <Handshake className="h-6 w-6 text-primary mx-auto" />
              <div className="mt-3 font-bold text-navy text-sm">{p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section id="history" className="scroll-mt-32 bg-soft-gradient py-24">
        <div className="container-zc">
          <div className="max-w-3xl">
            <span className="eyebrow">From Spark to Movement</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Our History</h2>
          </div>
          <div className="mt-12 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary" aria-hidden="true" />
            <div className="space-y-8">
              {history.map((h, i) => (
                <div key={h.year} className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                  <div className="pl-12 md:pl-0 md:pr-12 md:text-right">
                    <div className="inline-block bg-accent text-navy font-black text-sm px-3 py-1 rounded-full">{h.year}</div>
                    <h3 className="mt-3 text-xl font-black text-navy">{h.title}</h3>
                    <p className="mt-2 text-navy/70">{h.body}</p>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 size-4 rounded-full bg-primary border-4 border-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section id="awards" className="scroll-mt-32 container-zc py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">Recognition</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Awards & Prizes</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {awards.map((a) => (
            <div key={a.title} className="bg-white rounded-3xl border border-secondary p-8 hover:shadow-card-lg transition-all">
              <Trophy className="h-8 w-8 text-accent" />
              <div className="mt-4 text-xs font-bold text-primary uppercase tracking-widest">{a.year}</div>
              <h3 className="mt-1 text-lg font-black text-navy">{a.title}</h3>
              <p className="mt-2 text-sm text-navy/70 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safeguarding */}
      <section id="safeguarding" className="scroll-mt-32 bg-navy text-white py-24">
        <div className="container-zc grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Our Promise</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">Protection & Safeguarding</h2>
            <p className="mt-5 text-white/80 text-lg leading-relaxed">
              The safety and dignity of every child in our programs is non-negotiable. We maintain rigorous safeguarding policies,
              background-checked staff, mandatory child protection training, and confidential reporting channels for any concern.
            </p>
            <ul className="mt-6 space-y-2 text-white/80">
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" /> Zero-tolerance abuse policy with independent oversight.</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" /> Annual safeguarding audits and staff certification.</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" /> Confidential reporting line for children, families, and staff.</li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 text-center">
              <div className="size-20 mx-auto rounded-2xl bg-accent text-navy flex items-center justify-center">
                <ShieldCheck className="h-10 w-10" strokeWidth={2.5} />
              </div>
              <p className="mt-6 text-2xl font-black">Every child. Every day. Without compromise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Finance & Accountability */}
      <section id="finance" className="scroll-mt-32 container-zc py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="eyebrow">Open Books</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Finance & Accountability</h2>
            <p className="mt-5 text-navy/75 text-lg leading-relaxed">
              We publish annual audited financials and hold ourselves to the highest standard of transparency. Donors, partners, and the
              communities we serve all deserve to see exactly where every dollar goes.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-navy">
              <FileBarChart2 className="h-4 w-4" /> Download 2024 Annual Report
            </a>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              { v: "100%", l: "Donations to programs" },
              { v: "0%", l: "Public funds on overhead" },
              { v: "Annual", l: "Independent audit" },
              { v: "Quarterly", l: "Donor reports" },
            ].map((s) => (
              <div key={s.l} className="bg-soft-gradient rounded-2xl border border-secondary p-6">
                <div className="text-3xl font-black text-primary tabular-nums tracking-tighter">{s.v}</div>
                <div className="mt-2 text-xs font-bold text-navy/60 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work for Us */}
      <section id="careers" className="scroll-mt-32 bg-soft-gradient py-24">
        <div className="container-zc grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">Careers</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Work for Us</h2>
            <p className="mt-5 text-navy/70 text-lg leading-relaxed">
              Join a team of young, mission-driven changemakers building the future of education in Liberia. We're always looking for
              educators, program officers, designers, and operations talent who share our vision.
            </p>
            <a href="mailto:careers@zealcare.org" className="mt-6 inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-primary transition-colors">
              <Briefcase className="h-4 w-4" /> See open roles
            </a>
          </div>
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 border border-secondary">
            <Clock className="h-8 w-8 text-primary" />
            <p className="mt-4 font-black text-navy text-lg">No openings right now?</p>
            <p className="mt-2 text-navy/70 text-sm">Send your CV to <a className="text-primary font-bold" href="mailto:careers@zealcare.org">careers@zealcare.org</a> and we'll keep it on file for the next role that fits.</p>
          </div>
        </div>
      </section>

      {/* Tenders */}
      <section id="tenders" className="scroll-mt-32 container-zc py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">Procurement</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Tenders & Opportunities</h2>
          <p className="mt-4 text-navy/70 text-lg">
            We publish all open tenders, RFPs, and supplier opportunities here. Bids are evaluated transparently against published criteria.
          </p>
        </div>
        <div className="mt-10 bg-white rounded-3xl border border-secondary p-10 text-center">
          <FileText className="h-10 w-10 text-primary mx-auto" />
          <p className="mt-4 font-black text-navy text-lg">No active tenders at this time.</p>
          <p className="mt-2 text-navy/60 text-sm">Check back soon, or email <a className="text-primary font-bold" href="mailto:procurement@zealcare.org">procurement@zealcare.org</a> to be added to our supplier database.</p>
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
