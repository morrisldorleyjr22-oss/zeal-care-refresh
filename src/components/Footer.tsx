import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import ContactChip from "@/components/ContactChip";
import DonateButton from "@/components/DonateButton";
import { ICON_STROKE, ICON_STROKE_LG } from "@/lib/icon-defaults";
import { useSetting } from "@/hooks/useSiteSettings";

export default function Footer() {
  const contact = useSetting("contact_info");
  const footer = useSetting("footer");
  const social = useSetting("social_links");
  const donate = useSetting("donate");

  const socialIcons = [
    { key: "facebook" as const, Icon: Facebook, label: "Facebook" },
    { key: "instagram" as const, Icon: Instagram, label: "Instagram" },
    { key: "linkedin" as const, Icon: Linkedin, label: "LinkedIn" },
    { key: "twitter" as const, Icon: Twitter, label: "Twitter / X" },
    { key: "youtube" as const, Icon: Youtube, label: "YouTube" },
  ].filter((s) => (social as Record<string, string>)[s.key]);

  return (
    <footer className="relative bg-hero-gradient text-white overflow-hidden">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div className="absolute -top-32 -right-32 size-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-[28rem] bg-primary-glow/25 rounded-full blur-3xl pointer-events-none" />

      {/* Yellow keyline at top */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-accent/80 to-transparent" />

      {/* CTA strip */}
      <div className="relative container-zc pt-16 md:pt-20 pb-14">
        <div className="rounded-[2rem] bg-white/8 backdrop-blur-md border border-white/15 p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          {/* Yellow corner accent */}
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-10 size-40 bg-accent/20 rounded-full blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute top-6 right-6 size-10 bg-accent rounded-2xl rotate-12 shadow-yellow-glow"
          />

          <div className="lg:col-span-7 relative">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-3 py-1">
              <Sparkles className="h-3 w-3 text-accent" strokeWidth={ICON_STROKE} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                Get Involved
              </span>
            </div>
            <h2 className="mt-4 text-2xl md:text-4xl font-black leading-tight tracking-tight text-balance">
              Ready to <span className="text-accent">make an impact?</span>
            </h2>
            <p className="mt-3 text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">
              Your support helps us provide a future full of hope and possibility for
              underprivileged children in Liberia.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end relative">
            <DonateButton label={donate.label || "Become a Donor"} to={donate.url} size="lg" />
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border-2 border-white/25 font-semibold px-7 py-4 rounded-full uppercase tracking-wide text-sm hover:bg-white/20 hover:border-white/40 transition-colors backdrop-blur-sm"
            >
              Volunteer Now
              <ArrowUpRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative container-zc pb-14 grid gap-12 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-11 bg-accent rounded-2xl flex items-center justify-center shadow-yellow-glow group-hover:rotate-6 transition-transform">
              <div className="size-3.5 bg-navy rounded-full" />
            </div>
            <span className="font-black text-xl tracking-tight text-white uppercase">
              Zeal Care
            </span>
          </Link>
          <p className="text-sm text-white/75 leading-relaxed max-w-sm">
            {footer.tagline}
          </p>

          {/* Social rail */}
          {socialIcons.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent/90 mb-3">
                Follow the journey
              </div>
              <div className="flex items-center gap-3">
                {socialIcons.map(({ Icon, label, key }) => (
                  <a
                    key={label}
                    href={(social as Record<string, string>)[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group size-10 rounded-xl bg-white/10 border border-white/15 hover:bg-accent hover:border-accent hover:text-navy flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4" strokeWidth={ICON_STROKE_LG} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <FooterCol
          title="Organization"
          links={[
            { to: "/about", label: "About Us" },
            { to: "/who-we-are", label: "Our Team" },
            { to: "/who-we-are#finance", label: "Accountability" },
            { to: "/about#values", label: "Transparency" },
          ]}
        />
        <FooterCol
          title="Impact"
          links={[
            { to: "/what-we-do#programs", label: "Our Programs" },
            { to: "/why-empowerment", label: "Why Empowerment" },
            { to: "/media", label: "News & Stories" },
            { to: "/ways-to-give", label: "Ways to Give" },
          ]}
        />

        {/* Contact */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="font-bold uppercase text-xs tracking-[0.22em] text-accent inline-flex items-center gap-2">
            <span className="block size-1.5 rounded-full bg-accent" />
            Get in Touch
          </h4>
          <ul className="space-y-3">
            <li>
              <ContactChip icon={MapPin} label="Monrovia, Liberia" variant="light" />
            </li>
            <li>
              <ContactChip
                icon={Phone}
                label="+231 886 727 619"
                href="tel:+231886727619"
                variant="light"
              />
            </li>
            <li>
              <ContactChip
                icon={Mail}
                label="info@zealcare.org"
                href="mailto:info@zealcare.org"
                variant="light"
              />
            </li>
          </ul>

          <div className="mt-2 rounded-2xl bg-accent/10 border border-accent/25 p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Office Hours
            </div>
            <div className="mt-1.5 text-sm font-semibold text-white">
              Mon – Fri · 9:00 – 17:00 GMT
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-navy/30 backdrop-blur-sm">
        <div className="container-zc py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Zeal Care. All rights reserved.</p>
          <div className="flex items-center gap-2 font-semibold uppercase tracking-[0.22em]">
            <span className="size-1 rounded-full bg-accent" />
            Igniting Potential
            <span className="text-accent">·</span>
            Inspiring Change
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div className="md:col-span-2 flex flex-col gap-4">
      <h4 className="font-bold uppercase text-xs tracking-[0.22em] text-accent inline-flex items-center gap-2">
        <span className="block size-1.5 rounded-full bg-accent" />
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm text-white/75">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="group inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <span className="h-px w-3 bg-white/20 group-hover:w-5 group-hover:bg-accent transition-all" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
