import { useState } from "react";
import PageHero from "@/components/PageHero";
import { CalendarClock, Package, Building2, Smartphone, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ways = [
  { icon: CalendarClock, title: "Monthly Sustainer", body: "Provide consistent support allowing for long-term STEM curricula planning and student retention." },
  { icon: Package, title: "In-Kind Donations", body: "Deploy tangible assets like laptops, STEM kits, and laboratory equipment to our rural hubs." },
  { icon: Building2, title: "Corporate Partner", body: "Align your brand with social impact through grants, professional mentorship, or tech sponsorship." },
];

const allocation = [
  { label: "Core Programs", value: 80, sub: "Education, STEM, Leadership, Entrepreneurship", color: "bg-primary" },
  { label: "Outreach & Advocacy", value: 15, sub: "Community engagement and systemic change", color: "bg-navy" },
  { label: "Accountability", value: 5, sub: "Monitoring, evaluation, and reporting", color: "bg-accent" },
];

const mobile = [
  { name: "MTN Mobile Money", code: "*156*3*0887071690#", account: "Account Name: ZEAL CARE" },
  { name: "Orange Money", code: "*144#", account: "Account Name: ZEAL CARE" },
  { name: "Sendwave Transfer", code: "Direct App Access", account: "Account Name: ZEAL CARE" },
];

const faq = [
  { q: "Is my donation tax-deductible?", a: "We are a registered nonprofit; eligibility depends on your jurisdiction. Reach out to our team for documentation." },
  { q: "Can I sponsor a specific child?", a: "Yes. Our sponsorship program pairs you with a scholar and shares quarterly progress reports." },
  { q: "How do I know my donation is making a difference?", a: "Every donor receives transparent annual impact reports including financials and outcome metrics." },
  { q: "Do you accept hardware donations?", a: "Absolutely — laptops, tablets, and STEM kits are deployed directly to our digital hubs." },
];

export default function WaysToGive() {
  const [amount, setAmount] = useState(50);

  const impact = amount >= 1000 ? "Strategic Hub" : amount >= 500 ? "Full Scholarship" : amount >= 100 ? "Quarterly Sponsorship" : "Monthly Sustainer";

  return (
    <>
      <PageHero
        eyebrow="Resource Mobilization"
        title="Ways to"
        highlight="Give"
        description="Investing in human dignity beyond the donation. Every contribution fuels the future of a child in Liberia."
      />

      {/* Impact slider */}
      <section className="container-zc py-20">
        <div className="bg-white rounded-[2.5rem] border border-secondary shadow-card-lg p-8 md:p-14 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <span className="eyebrow">Impact Meter</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">See Your Impact</h2>
            <p className="mt-4 text-navy/70 text-lg">Slide to discover how your contribution transforms a child's future.</p>

            <div className="mt-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-navy/60">
                <span>$10 min</span><span>$1,000 strategic hub</span>
              </div>
              <input
                type="range" min={10} max={1000} step={10} value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full mt-3 accent-primary"
                aria-label="Donation amount"
              />
              <div className="mt-6 flex flex-wrap items-baseline gap-4">
                <div className="text-6xl font-black text-primary tabular-nums tracking-tighter">${amount}</div>
                <div className="text-sm font-bold text-navy/60 uppercase tracking-widest">Pledge Impact</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-yellow-gradient rounded-[2rem] p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-navy/70">Direct Deliverables</span>
              <h3 className="mt-3 text-3xl md:text-4xl font-black text-navy">{impact}</h3>
              <p className="mt-4 text-navy/80 italic">"Provides direct, traceable funding for a child's education and growth."</p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 bg-navy text-white rounded-full px-5 py-2 w-max font-bold text-sm">
              100% Direct Program Funding
            </div>
            <button className="mt-6 btn-primary !bg-navy !text-accent !shadow-card-lg w-max">
              Donate ${amount} now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Ways */}
      <section id="ways" className="scroll-mt-32 container-zc pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Engagement Pathways</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">How You Can Help</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {ways.map((w) => (
            <article key={w.title} className="bg-white rounded-3xl p-8 border border-secondary hover:shadow-card-lg transition-all">
              <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center">
                <w.icon className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 text-xl font-black text-navy">{w.title}</h3>
              <p className="mt-3 text-navy/70 font-medium">{w.body}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-navy">
                Initiate Impact <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Allocation */}
      <section className="bg-soft-gradient py-24">
        <div className="container-zc grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">Transparency</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">How We Use Your Donation</h2>
            <p className="mt-5 text-navy/70 text-lg leading-relaxed">
              We ensure that 100% of public donations go directly to our core programs. Administrative costs are covered by separate institutional grants and major donors.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-5">
            {allocation.map((a) => (
              <div key={a.label} className="bg-white rounded-2xl p-6 border border-secondary">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="font-black text-navy">{a.label}</div>
                    <div className="text-sm text-navy/60">{a.sub}</div>
                  </div>
                  <span className="text-3xl font-black text-primary tabular-nums">{a.value}%</span>
                </div>
                <div className="mt-3 h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${a.color} rounded-full`} style={{ width: `${a.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile money */}
      <section className="container-zc py-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Local Giving</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Mobile Money Options</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {mobile.map((m) => (
            <div key={m.name} className="bg-navy text-white rounded-3xl p-8 hover:shadow-card-lg transition-all">
              <Smartphone className="h-7 w-7 text-accent" />
              <h3 className="mt-4 text-xl font-black">{m.name}</h3>
              <div className="mt-4 font-mono text-2xl text-accent tracking-tight">{m.code}</div>
              <p className="mt-3 text-sm text-white/70">{m.account}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Become a Partner */}
      <section id="partner" className="scroll-mt-32 container-zc pb-24">
        <div className="bg-navy text-white rounded-[2.5rem] p-10 md:p-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Corporate & Institutional</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">Become a Partner</h2>
            <p className="mt-5 text-white/80 text-lg leading-relaxed">
              Align your brand, foundation, or institution with measurable child-focused impact. Partnership tracks include flagship
              sponsorship, STEM lab co-branding, scholarship endowments, and employee mentorship programs.
            </p>
            <a href="mailto:partners@zealcare.org" className="mt-6 inline-flex items-center gap-2 bg-accent text-navy px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {["Flagship", "STEM Lab", "Scholarship", "Mentorship"].map((p) => (
              <div key={p} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <div className="font-black text-white">{p}</div>
                <div className="mt-1 text-xs text-white/60 uppercase tracking-widest">Track</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 bg-soft-gradient py-24">
        <div className="container-zc max-w-3xl mx-auto">
          <span className="eyebrow">Common Questions</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Giving FAQ</h2>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-2xl border border-secondary px-6">
                <AccordionTrigger className="font-bold text-navy hover:no-underline text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-navy/70 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final appeal */}
      <section id="appeals" className="scroll-mt-32 container-zc py-24">
        <div className="bg-hero-gradient rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-80 bg-accent/20 rounded-full blur-3xl" />
          <div className="relative max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Final Appeal</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">The Grand Bassa Expansion</h2>
            <p className="mt-5 text-white/85 text-lg leading-relaxed">
              We are currently raising <strong className="text-accent">$45,000</strong> to establish three new Digital Hubs in Grand Bassa County by late 2026.
              This will provide 450 children with their first-ever access to digital learning tools.
            </p>
            <button className="mt-8 btn-primary">Help Us Build <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
    </>
  );
}
