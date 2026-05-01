import { useState } from "react";
import PageHero from "@/components/PageHero";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";

const subjects = ["General Inquiry", "Partnership Matrix", "Technical Support", "Donation Inquiry", "Media & Press"];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! We'll be in touch within 48 hours.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <>
      <PageHero
        eyebrow="Global Connectivity"
        title="Get in"
        highlight="Touch"
        description="Open channels for collaboration, support, and institutional inquiries. We're here to answer your questions."
      />

      <section className="container-zc py-24 grid lg:grid-cols-12 gap-12">
        {/* Contact info */}
        <aside className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-secondary p-8">
            <span className="eyebrow">Contact Information</span>
            <h2 className="mt-3 text-3xl font-black text-navy">Reach our team</h2>
            <ul className="mt-8 space-y-6">
              {[
                { icon: MapPin, title: "Our Office", value: "Monrovia, Liberia" },
                { icon: Phone, title: "Phone Numbers", value: "+231 886 727 619 / +231 777 253 865" },
                { icon: Mail, title: "Email Address", value: "info@zealcare.org" },
                { icon: Clock, title: "Working Hours", value: "Mon – Fri: 9:00 AM – 5:00 PM" },
              ].map((c) => (
                <li key={c.title} className="flex gap-4">
                  <div className="size-12 rounded-2xl bg-accent text-navy flex items-center justify-center shrink-0">
                    <c.icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-black text-navy">{c.title}</div>
                    <div className="text-navy/70 mt-0.5">{c.value}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-secondary">
              <div className="font-black text-navy mb-4">Follow Us</div>
              <div className="flex gap-3">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Social" className="size-11 rounded-full bg-secondary text-primary hover:bg-accent hover:text-navy transition-colors flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} className="bg-white rounded-3xl border border-secondary p-8 md:p-10 shadow-card-lg">
            <span className="eyebrow">Send a Message</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-navy">We'd love to hear from you</h2>

            <div className="mt-8 grid md:grid-cols-2 gap-5">
              <Field label="Full Name" name="name" required />
              <Field label="Email Address" name="email" type="email" required />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-bold text-navy mb-2">Subject</label>
              <select name="subject" className="w-full bg-secondary/50 border border-secondary rounded-xl px-4 py-3.5 font-medium text-navy focus:outline-none focus:ring-2 focus:ring-primary">
                {subjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-bold text-navy mb-2">Message</label>
              <textarea name="message" required rows={5}
                className="w-full bg-secondary/50 border border-secondary rounded-xl px-4 py-3.5 font-medium text-navy focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>

            <button type="submit" disabled={submitting} className="mt-7 btn-primary w-full sm:w-auto disabled:opacity-60">
              {submitting ? "Sending…" : "Send Message"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="container-zc pb-24">
        <span className="eyebrow">Our Location</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-black text-navy">Find Us in Monrovia</h2>
        <div className="mt-8 rounded-[2rem] overflow-hidden border border-secondary aspect-[16/8] bg-secondary relative">
          <iframe
            title="Zeal Care Office"
            className="w-full h-full grayscale-[20%]"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-10.85,6.27,-10.65,6.39&layer=mapnik&marker=6.3156,-10.8074"
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-card-lg flex items-center gap-3 max-w-xs">
            <div className="size-10 rounded-xl bg-accent text-navy flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Operational HQ</div>
              <div className="font-black text-navy">Monrovia, Liberia</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-bold text-navy mb-2">{label}</label>
      <input type={type} name={name} required={required}
        className="w-full bg-secondary/50 border border-secondary rounded-xl px-4 py-3.5 font-medium text-navy focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}
