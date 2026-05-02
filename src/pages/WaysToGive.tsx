import { useState } from "react";
import PageHero from "@/components/PageHero";
import { CalendarClock, Package, Building2, Smartphone, ArrowRight, Heart, CheckCircle2, Copy, Share2, Loader2 } from "lucide-react";
import { ICON_STROKE } from "@/lib/icon-defaults";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageContent } from "@/hooks/usePageContent";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const c = usePageContent("ways_to_give");

  // --- Mobile Money confirmation flow state ---
  const [pledgeOpen, setPledgeOpen] = useState(false);
  const [pledgeProvider, setPledgeProvider] = useState<string>("");
  const [pledgeStep, setPledgeStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    id: string;
    donor_name: string;
    amount: string;
    provider: string;
    reference?: string;
  } | null>(null);
  const [form, setForm] = useState({
    donor_name: "",
    contact: "",
    amount: "",
    reference: "",
    note: "",
  });

  function openPledge(provider: string) {
    setPledgeProvider(provider);
    setPledgeStep("form");
    setForm({ donor_name: "", contact: "", amount: "", reference: "", note: "" });
    setPledgeOpen(true);
  }

  async function submitPledge(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const amt = Number(form.amount);
    if (!form.donor_name.trim() || !form.contact.trim() || !amt || amt <= 0) {
      toast.error("Please fill in your name, contact, and a valid amount.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("mobile_money_pledges")
      .insert({
        donor_name: form.donor_name.trim(),
        contact: form.contact.trim(),
        amount: amt,
        provider: pledgeProvider,
        reference: form.reference.trim() || null,
        note: form.note.trim() || null,
      })
      .select("id, donor_name, amount, provider, reference")
      .single();
    setSubmitting(false);
    if (error) {
      console.error("[pledge] insert error", error);
      toast.error("We couldn't record your donation. Please try again.");
      return;
    }
    setConfirmation({
      id: data.id,
      donor_name: data.donor_name,
      amount: String(data.amount),
      provider: data.provider,
      reference: data.reference ?? undefined,
    });
    setPledgeStep("success");
    toast.success("Thank you! Your donation is being verified.");
  }

  function copyReference() {
    if (!confirmation) return;
    navigator.clipboard.writeText(confirmation.id).then(
      () => toast.success("Reference ID copied"),
      () => toast.error("Unable to copy"),
    );
  }

  async function sharePledge() {
    if (!confirmation) return;
    const text = `I just supported ZEAL CARE with $${confirmation.amount} via ${confirmation.provider}. Join me — every child deserves a chance.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "I supported ZEAL CARE", text, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      toast.success("Share message copied to clipboard");
    }
  }

  const impact = amount >= 1000 ? "Strategic Hub" : amount >= 500 ? "Full Scholarship" : amount >= 100 ? "Quarterly Sponsorship" : "Monthly Sustainer";

  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
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
            <button className="mt-6 inline-flex items-center justify-center gap-2 bg-navy text-accent font-bold uppercase tracking-wide px-7 py-4 rounded-full text-sm shadow-card-lg hover:scale-[1.03] transition-transform duration-300 w-max">
              <Heart className="h-4 w-4" strokeWidth={ICON_STROKE} fill="currentColor" />
              Donate ${amount} now
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
              <div key={a.label} className="animated-border p-6" style={{ borderRadius: "1rem" }}>
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
        <p className="mt-4 text-center max-w-2xl mx-auto text-navy/65">
          Send your contribution using the dial code below, then tap <span className="font-bold text-navy">"I've sent my donation"</span> so we can confirm it and send your impact receipt.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {mobile.map((m) => (
            <div key={m.name} className="flex flex-col bg-primary text-white rounded-3xl p-8 border border-primary/40 shadow-[0_18px_40px_-15px_hsl(var(--primary)/0.55)] hover:shadow-[0_28px_55px_-15px_hsl(var(--primary)/0.7)] hover:-translate-y-1 transition-all">
              <Smartphone className="h-7 w-7 text-accent" />
              <h3 className="mt-4 text-xl font-black">{m.name}</h3>
              <div className="mt-4 font-mono text-2xl text-accent tracking-tight break-all">{m.code}</div>
              <p className="mt-3 text-sm text-white/80">{m.account}</p>
              <button
                type="button"
                onClick={() => openPledge(m.name)}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-accent text-navy font-bold text-sm rounded-full px-5 py-3 hover:bg-white transition-colors w-full"
              >
                I've sent my donation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Become a Partner */}
      <section id="partner" className="scroll-mt-32 container-zc pb-24">
        <div className="bg-hero-gradient text-white rounded-[2.5rem] p-10 md:p-14 grid lg:grid-cols-12 gap-10 items-center">
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
            <h2 className="mt-3 text-4xl md:text-5xl font-black">{c.get("appeal_title")}</h2>
            <p className="mt-5 text-white/85 text-lg leading-relaxed">
              {c.get("appeal_body")}
            </p>
            <button className="mt-8 btn-primary">Help Us Build <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      {/* Mobile Money confirmation dialog */}
      <Dialog open={pledgeOpen} onOpenChange={setPledgeOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          {pledgeStep === "form" ? (
            <form onSubmit={submitPledge}>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-2xl font-black text-navy">
                  Confirm your {pledgeProvider} donation
                </DialogTitle>
                <DialogDescription className="text-navy/65">
                  Tell us a few details so we can match your transaction and send your impact receipt.
                </DialogDescription>
              </DialogHeader>

              <div className="px-6 py-5 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="donor_name">Full name</Label>
                  <Input
                    id="donor_name"
                    required
                    value={form.donor_name}
                    onChange={(e) => setForm({ ...form, donor_name: e.target.value })}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact">Phone or email</Label>
                  <Input
                    id="contact"
                    required
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="+231 88 707 1690 or you@email.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input
                      id="amount"
                      required
                      type="number"
                      min={1}
                      step="0.01"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      placeholder="50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reference">Transaction ID (optional)</Label>
                    <Input
                      id="reference"
                      value={form.reference}
                      onChange={(e) => setForm({ ...form, reference: e.target.value })}
                      placeholder="MM2026XXXX"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">Message (optional)</Label>
                  <Textarea
                    id="note"
                    rows={2}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="Dedicate this gift to…"
                  />
                </div>
              </div>

              <DialogFooter className="bg-secondary/40 px-6 py-4 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPledgeOpen(false)}
                  className="px-5 py-2.5 rounded-full font-bold text-sm text-navy/70 hover:text-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm rounded-full px-6 py-3 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Confirm donation
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </DialogFooter>
            </form>
          ) : (
            <div>
              <div className="bg-hero-gradient text-white px-6 pt-8 pb-7 text-center">
                <div className="mx-auto size-16 rounded-full bg-accent text-navy flex items-center justify-center shadow-yellow-glow">
                  <CheckCircle2 className="h-9 w-9" strokeWidth={2.4} />
                </div>
                <h2 className="mt-5 text-2xl md:text-3xl font-black tracking-tight">
                  Thank you, {confirmation?.donor_name?.split(" ")[0] || "friend"}!
                </h2>
                <p className="mt-2 text-white/85">
                  Your <span className="text-accent font-bold">${confirmation?.amount}</span> {confirmation?.provider} donation has been recorded. Our team will verify it within 24 hours and email your impact receipt.
                </p>
              </div>

              <div className="px-6 py-5 space-y-3">
                <div className="bg-secondary/50 border border-secondary rounded-2xl p-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-navy/55">
                    Confirmation reference
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <code className="font-mono text-sm text-navy break-all">{confirmation?.id}</code>
                    <button
                      type="button"
                      onClick={copyReference}
                      className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-navy"
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-navy/55 mb-2">
                    What's next?
                  </div>
                  <div className="grid gap-2">
                    <button
                      type="button"
                      onClick={sharePledge}
                      className="flex items-center justify-between gap-3 bg-white border border-primary/25 rounded-2xl px-4 py-3 hover:border-primary/50 hover:shadow-[0_10px_25px_-12px_hsl(var(--primary)/0.4)] transition-all text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span className="size-9 rounded-xl bg-accent text-navy flex items-center justify-center">
                          <Share2 className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                        <span>
                          <span className="block font-bold text-navy text-sm">Inspire a friend</span>
                          <span className="block text-xs text-navy/60">Share your gift and double the impact.</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </button>
                    <Link
                      to="/what-we-do"
                      onClick={() => setPledgeOpen(false)}
                      className="flex items-center justify-between gap-3 bg-white border border-primary/25 rounded-2xl px-4 py-3 hover:border-primary/50 hover:shadow-[0_10px_25px_-12px_hsl(var(--primary)/0.4)] transition-all"
                    >
                      <span className="flex items-center gap-3">
                        <span className="size-9 rounded-xl bg-primary text-white flex items-center justify-center">
                          <Heart className="h-4 w-4" strokeWidth={2.4} fill="currentColor" />
                        </span>
                        <span>
                          <span className="block font-bold text-navy text-sm">See your impact</span>
                          <span className="block text-xs text-navy/60">Explore the programs your gift fuels.</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setPledgeOpen(false)}
                      className="flex items-center justify-between gap-3 bg-white border border-primary/25 rounded-2xl px-4 py-3 hover:border-primary/50 hover:shadow-[0_10px_25px_-12px_hsl(var(--primary)/0.4)] transition-all"
                    >
                      <span className="flex items-center gap-3">
                        <span className="size-9 rounded-xl bg-navy text-accent flex items-center justify-center">
                          <CalendarClock className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                        <span>
                          <span className="block font-bold text-navy text-sm">Become a monthly sustainer</span>
                          <span className="block text-xs text-navy/60">Talk to our team about recurring giving.</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                  </div>
                </div>
              </div>

              <DialogFooter className="bg-secondary/40 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setPledgeOpen(false)}
                  className="ml-auto inline-flex items-center gap-2 bg-navy text-white font-bold text-sm rounded-full px-6 py-3 hover:bg-navy/90 transition-colors"
                >
                  Done
                </button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
