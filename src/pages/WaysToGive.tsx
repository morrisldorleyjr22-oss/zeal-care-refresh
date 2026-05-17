import { useState } from "react";
import PageHero from "@/components/PageHero";
import { CalendarClock, Smartphone, ArrowRight, Heart, CheckCircle2, Copy, Share2, Loader2, Building2, Phone } from "lucide-react";
import { ICON_STROKE } from "@/lib/icon-defaults";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageContent } from "@/hooks/usePageContent";
import { getIcon } from "@/lib/icon-registry";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";

type WayItem = { title: string; body: string; icon: string; to: string };
type AllocationItem = { label: string; sub: string; value: string; color: string };
type FaqItem = { q: string; a: string };

// Official payment details — hardcoded for accuracy
const BANK = {
  name: "UBA (United Bank for Africa)",
  accountName: "Zeal Care",
  usd: "53080550013011",
  lrd: "53080550013028",
};

const MOBILE_PROVIDERS = [
  {
    name: "Lonestar Cell MTN",
    code: "*156*3*0887071690#",
    note: "Dial code on your Lonestar MTN phone, follow prompts",
    color: "bg-[#FFCC00] text-[#001F5B]",
    textAccent: "text-[#001F5B]",
  },
  {
    name: "Orange Money (USD)",
    code: "*144*164*7811005#",
    note: "For USD transfers via Orange Money Liberia",
    color: "bg-[#FF6600] text-white",
    textAccent: "text-orange-100",
  },
  {
    name: "Orange Money (LRD)",
    code: "*144*253*7811005#",
    note: "For LRD transfers via Orange Money Liberia",
    color: "bg-[#FF6600] text-white",
    textAccent: "text-orange-100",
  },
];

export default function WaysToGive() {
  const [amount, setAmount] = useState(50);
  const c = usePageContent("ways_to_give");
  const { t } = useLanguage();
  const g = t.give;

  const ways = c.list<WayItem>("ways");
  const allocation = c.list<AllocationItem>("allocation");
  const faq = c.list<FaqItem>("faq");

  const [pledgeOpen, setPledgeOpen] = useState(false);
  const [pledgeProvider, setPledgeProvider] = useState<string>("");
  const [pledgeStep, setPledgeStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    id: string; donor_name: string; amount: string; provider: string; reference?: string;
  } | null>(null);
  const [form, setForm] = useState({ donor_name: "", contact: "", amount: "", reference: "", note: "" });

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
      toast.error(g.pledge.errorFill);
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
      toast.error(g.pledge.errorSubmit);
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
    toast.success(g.pledge.successToast);
  }

  function copyText(text: string, field: string) {
    navigator.clipboard.writeText(text).then(
      () => { toast.success(g.pledge.copyRef); setCopiedField(field); setTimeout(() => setCopiedField(null), 2000); },
      () => toast.error(g.pledge.copyFail),
    );
  }

  async function sharePledge() {
    if (!confirmation) return;
    const text = `${g.pledge.shareText} $${confirmation.amount} ${g.pledge.shareVia} ${confirmation.provider}. ${g.pledge.shareJoin}`;
    if (navigator.share) {
      try { await navigator.share({ title: g.pledge.shareTitle, text, url: window.location.href }); } catch { /* cancelled */ }
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      toast.success(g.pledge.shareCopied);
    }
  }

  const impact =
    amount >= 1000 ? g.impactLevels.hub :
    amount >= 500 ? g.impactLevels.fullScholarship :
    amount >= 100 ? g.impactLevels.quarterly :
    g.impactLevels.monthly;

  return (
    <>
      <PageHero
        eyebrow={c.get("hero_eyebrow")}
        title={c.get("hero_title")}
        highlight={c.get("hero_highlight")}
        description={c.get("hero_description")}
      />

      {/* Impact slider */}
      <section className="container-zc py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-secondary shadow-card-lg p-6 sm:p-8 md:p-12 grid lg:grid-cols-12 gap-8 sm:gap-10">
          <div className="lg:col-span-6">
            <span className="eyebrow">{g.impactMeter.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy">{g.impactMeter.title}</h2>
            <p className="mt-3 text-navy/70">{g.impactMeter.subtitle}</p>
            <div className="mt-7">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-navy/55">
                <span>{g.impactMeter.minLabel}</span><span>{g.impactMeter.maxLabel}</span>
              </div>
              <input
                type="range" min={10} max={1000} step={10} value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full mt-3 accent-primary" aria-label="Donation amount"
              />
              <div className="mt-5 flex flex-wrap items-baseline gap-3">
                <div className="text-4xl sm:text-5xl font-black text-primary tabular-nums tracking-tighter">${amount}</div>
                <div className="text-sm font-bold text-navy/55 uppercase tracking-widest">{g.impactMeter.pledgeImpact}</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 bg-yellow-gradient rounded-[2rem] p-7 md:p-9 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-navy/65">{g.impactMeter.deliverables}</span>
              <h3 className="mt-2 text-3xl font-black text-navy">{impact}</h3>
              <p className="mt-3 text-navy/75 italic text-sm">{g.impactMeter.quote}</p>
            </div>
            <div className="mt-7">
              <div className="inline-flex items-center gap-2 bg-navy text-white rounded-full px-5 py-2 font-bold text-sm mb-4">
                {g.impactMeter.directFunding}
              </div>
              <button className="mt-2 flex items-center justify-center gap-2 bg-navy text-accent font-bold uppercase tracking-wide px-7 py-3.5 rounded-full text-sm shadow-card-lg hover:scale-[1.03] transition-transform w-max">
                <Heart className="h-4 w-4" strokeWidth={ICON_STROKE} fill="currentColor" />
                {g.impactMeter.donateNow} ${amount} {g.impactMeter.donateNowSuffix}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ways */}
      <section id="ways" className="scroll-mt-32 container-zc pb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{g.ways.eyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy">{g.ways.title}</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {ways.map((w, i) => {
            const Icon = getIcon(w.icon, CalendarClock);
            const target = w.to || "/contact";
            const isHash = target.startsWith("#");
            const inner = (
              <>
                <div className="size-13 rounded-2xl bg-primary text-white flex items-center justify-center">
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="mt-5 text-xl font-black text-navy">{w.title}</h3>
                <p className="mt-3 text-navy/70 font-medium text-sm leading-relaxed">{w.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-navy transition-colors">
                  {g.ways.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </>
            );
            const cls = "group block bg-white rounded-3xl p-7 border border-secondary hover:shadow-card-lg hover:border-primary transition-all";
            return isHash
              ? <a key={`${w.title}-${i}`} href={target} className={cls}>{inner}</a>
              : <Link key={`${w.title}-${i}`} to={target} className={cls}>{inner}</Link>;
          })}
        </div>
      </section>

      {/* Allocation */}
      <section className="bg-soft-gradient py-12 sm:py-16 md:py-20">
        <div className="container-zc grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">{g.allocation.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy">{g.allocation.title}</h2>
            <p className="mt-4 text-navy/70 leading-relaxed">{g.allocation.body}</p>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {allocation.map((a) => (
              <div key={a.label} className="bg-white rounded-2xl p-5 border border-secondary">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="font-black text-navy">{a.label}</div>
                    <div className="text-sm text-navy/55">{a.sub}</div>
                  </div>
                  <span className="text-2xl font-black text-primary tabular-nums">{a.value}%</span>
                </div>
                <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${a.color} rounded-full`} style={{ width: `${a.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Money */}
      <section className="container-zc py-12 sm:py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{g.mobileMoney.eyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy">{g.mobileMoney.title}</h2>
        </div>
        <p className="mt-4 text-center max-w-xl mx-auto text-navy/65 text-sm leading-relaxed">
          {g.mobileMoney.instruction}{" "}
          <span className="font-bold text-navy">{g.mobileMoney.instructionHighlight}</span>{" "}
          {g.mobileMoney.instructionSuffix}
        </p>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {MOBILE_PROVIDERS.map((m) => (
            <div key={m.name} className="flex flex-col rounded-3xl overflow-hidden border border-secondary shadow-soft">
              <div className={`${m.color} p-6`}>
                <Smartphone className="h-6 w-6 mb-3" strokeWidth={2} />
                <h3 className="text-lg font-black">{m.name}</h3>
                <div className="mt-3 font-mono text-xl font-bold tracking-tight break-all">{m.code}</div>
              </div>
              <div className="flex-1 bg-white p-5 flex flex-col gap-3">
                <p className="text-sm text-navy/65 leading-relaxed">{m.note}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => copyText(m.code, m.name)}
                    className="flex-1 flex items-center justify-center gap-2 border border-secondary rounded-xl px-3 py-2 text-xs font-bold text-navy hover:border-primary hover:text-primary transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copiedField === m.name ? g.bankTransfer.copied : g.bankTransfer.copy}
                  </button>
                  <button
                    type="button"
                    onClick={() => openPledge(m.name)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-white font-bold text-xs rounded-xl px-3 py-2 hover:bg-primary/90 transition-colors"
                  >
                    {g.mobileMoney.iSent}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bank Transfer */}
      <section className="bg-soft-gradient py-12 sm:py-16 md:py-20">
        <div className="container-zc">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow">{g.bankTransfer.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy">{g.bankTransfer.title}</h2>
            <p className="mt-3 text-sm text-navy/65 leading-relaxed">{g.bankTransfer.note}</p>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-secondary shadow-card-lg overflow-hidden">
            <div className="bg-hero-gradient p-6 flex items-center gap-4 text-white">
              <div className="size-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{g.bankTransfer.bankName}</div>
                <div className="text-xl font-black mt-0.5">{BANK.name}</div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {/* Account Name */}
              <div className="flex items-center justify-between bg-secondary/40 rounded-2xl px-5 py-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-navy/50">{g.bankTransfer.accountName}</div>
                  <div className="mt-1 font-black text-navy text-lg">{BANK.accountName}</div>
                </div>
              </div>
              {/* USD Account */}
              <div className="flex items-center justify-between bg-secondary/40 rounded-2xl px-5 py-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-navy/50">{g.bankTransfer.accountUSD}</div>
                  <div className="mt-1 font-mono font-black text-navy text-lg tracking-wider">{BANK.usd}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(BANK.usd, "usd")}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-navy bg-white border border-secondary rounded-xl px-3 py-2 transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedField === "usd" ? g.bankTransfer.copied : g.bankTransfer.copy}
                </button>
              </div>
              {/* LRD Account */}
              <div className="flex items-center justify-between bg-secondary/40 rounded-2xl px-5 py-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-navy/50">{g.bankTransfer.accountLRD}</div>
                  <div className="mt-1 font-mono font-black text-navy text-lg tracking-wider">{BANK.lrd}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(BANK.lrd, "lrd")}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-navy bg-white border border-secondary rounded-xl px-3 py-2 transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedField === "lrd" ? g.bankTransfer.copied : g.bankTransfer.copy}
                </button>
              </div>
              {/* Contact for wire transfers */}
              <div className="mt-2 flex items-center gap-3 text-sm text-navy/65 bg-accent/10 border border-accent/20 rounded-2xl px-5 py-3">
                <Phone className="h-4 w-4 text-accent shrink-0" strokeWidth={2} />
                <span>For international wire transfers, contact us at <span className="font-bold text-navy">info@zealcare.org</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section id="partner" className="scroll-mt-32 container-zc py-12 sm:py-16 md:py-20">
        <div className="bg-hero-gradient text-white rounded-[2rem] p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{g.partner.corporate}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black">{g.partner.title}</h2>
            <p className="mt-4 text-white/80 leading-relaxed">{g.partner.body}</p>
            <a href="mailto:partners@zealcare.org" className="mt-6 inline-flex items-center gap-2 bg-accent text-navy px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors">
              {g.partner.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {g.partner.tracks.map((p) => (
              <div key={p} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <div className="font-black text-white">{p}</div>
                <div className="mt-1 text-xs text-white/50 uppercase tracking-widest">Track</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 bg-soft-gradient py-12 sm:py-16 md:py-20">
        <div className="container-zc max-w-3xl mx-auto">
          <span className="eyebrow">{g.faq.eyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy">{g.faq.title}</h2>
          <Accordion type="single" collapsible className="mt-8 space-y-3">
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
      <section id="appeals" className="scroll-mt-32 container-zc py-12 sm:py-16 md:py-20">
        <div className="bg-hero-gradient rounded-[2rem] p-8 md:p-14 text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-72 bg-accent/15 rounded-full blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{g.finalAppeal.eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black">{c.get("appeal_title")}</h2>
            <p className="mt-4 text-white/85 leading-relaxed">{c.get("appeal_body")}</p>
            <button className="mt-7 btn-primary">{g.finalAppeal.helpUs} <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      {/* Mobile Money confirmation dialog */}
      <Dialog open={pledgeOpen} onOpenChange={setPledgeOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          {pledgeStep === "form" ? (
            <form onSubmit={submitPledge}>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-xl font-black text-navy">
                  {g.pledge.confirmTitle} {pledgeProvider} {g.pledge.confirmSuffix}
                </DialogTitle>
                <DialogDescription className="text-navy/65">{g.pledge.confirmDescription}</DialogDescription>
              </DialogHeader>
              <div className="px-6 py-5 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="donor_name">{g.pledge.fullName}</Label>
                  <Input id="donor_name" required value={form.donor_name} onChange={(e) => setForm({ ...form, donor_name: e.target.value })} placeholder={g.pledge.namePlaceholder} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact">{g.pledge.phoneEmail}</Label>
                  <Input id="contact" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder={g.pledge.contactPlaceholder} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">{g.pledge.amountUSD}</Label>
                    <Input id="amount" required type="number" min={1} step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder={g.pledge.amountPlaceholder} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reference">{g.pledge.transactionId}</Label>
                    <Input id="reference" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} placeholder={g.pledge.transactionPlaceholder} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">{g.pledge.message}</Label>
                  <Textarea id="note" rows={2} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder={g.pledge.messagePlaceholder} />
                </div>
              </div>
              <DialogFooter className="bg-secondary/40 px-6 py-4 gap-2 sm:gap-3">
                <button type="button" onClick={() => setPledgeOpen(false)} className="px-5 py-2.5 rounded-full font-bold text-sm text-navy/70 hover:text-navy">
                  {g.pledge.cancel}
                </button>
                <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm rounded-full px-6 py-3 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />{g.pledge.submitting}</> : <>{g.pledge.confirm}<ArrowRight className="h-4 w-4" /></>}
                </button>
              </DialogFooter>
            </form>
          ) : (
            <div>
              <div className="bg-hero-gradient text-white px-6 pt-8 pb-7 text-center">
                <div className="mx-auto size-16 rounded-full bg-accent text-navy flex items-center justify-center shadow-yellow-glow">
                  <CheckCircle2 className="h-9 w-9" strokeWidth={2.4} />
                </div>
                <h2 className="mt-5 text-2xl font-black tracking-tight">
                  {g.pledge.thankYou} {confirmation?.donor_name?.split(" ")[0] || g.pledge.friend}!
                </h2>
                <p className="mt-2 text-white/85 text-sm">
                  Your <span className="text-accent font-bold">${confirmation?.amount}</span> {confirmation?.provider} {g.pledge.donationRecorded}
                </p>
              </div>
              <div className="px-6 py-5 space-y-3">
                <div className="bg-secondary/50 border border-secondary rounded-2xl p-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-navy/55">{g.pledge.confirmationRef}</div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <code className="font-mono text-sm text-navy break-all">{confirmation?.id}</code>
                    <button type="button" onClick={() => copyText(confirmation?.id ?? "", "ref")} className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-navy">
                      <Copy className="h-3.5 w-3.5" /> {g.bankTransfer.copy}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-navy/55 mb-2">{g.pledge.whatsNext}</div>
                  <div className="grid gap-2">
                    <button type="button" onClick={sharePledge} className="flex items-center justify-between gap-3 bg-white border border-primary/25 rounded-2xl px-4 py-3 hover:border-primary/50 transition-all text-left">
                      <span className="flex items-center gap-3">
                        <span className="size-9 rounded-xl bg-accent text-navy flex items-center justify-center"><Share2 className="h-4 w-4" strokeWidth={2.4} /></span>
                        <span>
                          <span className="block font-bold text-navy text-sm">{g.pledge.inspire}</span>
                          <span className="block text-xs text-navy/55">{g.pledge.inspireDesc}</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </button>
                    <Link to="/what-we-do" onClick={() => setPledgeOpen(false)} className="flex items-center justify-between gap-3 bg-white border border-primary/25 rounded-2xl px-4 py-3 hover:border-primary/50 transition-all">
                      <span className="flex items-center gap-3">
                        <span className="size-9 rounded-xl bg-primary text-white flex items-center justify-center"><Heart className="h-4 w-4" strokeWidth={2.4} fill="currentColor" /></span>
                        <span>
                          <span className="block font-bold text-navy text-sm">{g.pledge.seeImpact}</span>
                          <span className="block text-xs text-navy/55">{g.pledge.seeImpactDesc}</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                    <Link to="/contact" onClick={() => setPledgeOpen(false)} className="flex items-center justify-between gap-3 bg-white border border-primary/25 rounded-2xl px-4 py-3 hover:border-primary/50 transition-all">
                      <span className="flex items-center gap-3">
                        <span className="size-9 rounded-xl bg-navy text-accent flex items-center justify-center"><CalendarClock className="h-4 w-4" strokeWidth={2.4} /></span>
                        <span>
                          <span className="block font-bold text-navy text-sm">{g.pledge.sustainer}</span>
                          <span className="block text-xs text-navy/55">{g.pledge.sustainerDesc}</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
              <DialogFooter className="bg-secondary/40 px-6 py-4">
                <button type="button" onClick={() => setPledgeOpen(false)} className="ml-auto inline-flex items-center gap-2 bg-navy text-white font-bold text-sm rounded-full px-6 py-3 hover:bg-navy/90 transition-colors">
                  {g.pledge.done}
                </button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
