import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import ContactChip from "@/components/ContactChip";
import DonateButton from "@/components/DonateButton";
import { ICON_STROKE_LG } from "@/lib/icon-defaults";

export default function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      {/* CTA strip */}
      <div className="container-zc py-16 md:py-20 border-b border-white/10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-balance">
              Ready to make an impact?
            </h2>
            <p className="mt-3 text-white/70 text-base md:text-lg max-w-2xl">
              Your support helps us provide a future full of hope and possibility for underprivileged children in Liberia.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
            <DonateButton label="Become a Donor" size="lg" />
            <Link to="/contact" className="inline-flex items-center justify-center bg-white/10 text-white border-2 border-white/20 font-semibold px-7 py-4 rounded-full uppercase tracking-wide text-sm hover:bg-white/20 transition-colors">
              Volunteer Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-zc py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 bg-accent rounded-2xl flex items-center justify-center">
              <div className="size-3.5 bg-navy rounded-full" />
            </div>
            <span className="font-black text-xl tracking-tight text-white uppercase">Zeal Care</span>
          </Link>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            Empowering youth through education, STEM, and leadership. Together, we ignite potential and inspire change for a brighter future.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="group size-10 rounded-xl bg-white/5 border border-white/10 hover:bg-accent hover:border-accent hover:text-navy flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">
                <Icon className="h-4 w-4" strokeWidth={ICON_STROKE_LG} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Organization" links={[
          { to: "/about", label: "About Us" },
          { to: "/who-we-are", label: "Our Team" },
          { to: "/who-we-are", label: "Accountability" },
          { to: "/about", label: "Transparency" },
        ]} />
        <FooterCol title="Impact" links={[
          { to: "/what-we-do", label: "Our Programs" },
          { to: "/why-empowerment", label: "Why Empowerment" },
          { to: "/media", label: "News & Stories" },
          { to: "/ways-to-give", label: "Ways to Give" },
        ]} />

        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="font-bold uppercase text-xs tracking-[0.2em] text-accent">Get in Touch</h4>
          <ul className="space-y-3">
            <li><ContactChip icon={MapPin} label="Monrovia, Liberia" variant="light" /></li>
            <li><ContactChip icon={Phone} label="+231 886 727 619" href="tel:+231886727619" variant="light" /></li>
            <li><ContactChip icon={Mail} label="info@zealcare.org" href="mailto:info@zealcare.org" variant="light" /></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-zc py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Zeal Care. All rights reserved.</p>
          <p>Igniting Potential · Inspiring Change</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="md:col-span-2 flex flex-col gap-4">
      <h4 className="font-bold uppercase text-xs tracking-[0.2em] text-accent">{title}</h4>
      <ul className="space-y-3 text-sm text-white/75">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-accent transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
