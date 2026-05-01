import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PageHero from "@/components/PageHero";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/useReveal";

const subjects = [
  "General Inquiry",
  "Partnership",
  "Volunteer With Us",
  "Donation Inquiry",
  "Media & Press",
] as const;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name must be under 80 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(160, "Email must be under 160 characters"),
  phone: z
    .string()
    .trim()
    .max(40, "Phone must be under 40 characters")
    .optional()
    .or(z.literal("")),
  subject: z.enum(subjects, { errorMap: () => ({ message: "Choose a subject" }) }),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(1500, "Message must be under 1500 characters"),
  // Honeypot — must remain empty
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// FormSubmit AJAX endpoint — works without backend, deliverable to org inbox.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@zealcare.org";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "General Inquiry" },
    mode: "onTouched",
  });

  const messageLength = (watch("message") ?? "").length;

  const onSubmit = async (values: ContactFormValues) => {
    if (values.website) return; // honeypot tripped
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || "—",
          subject: `[Zeal Care] ${values.subject}`,
          message: values.message,
          _subject: `[Zeal Care] ${values.subject} — ${values.name}`,
          _template: "table",
        }),
      });

      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch within 48 hours.");
      reset();
    } catch (err) {
      toast.error("Something went wrong. Please email info@zealcare.org directly.");
    }
  };

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Get in touch"
        title="Let's"
        highlight="Connect"
        description="Open channels for collaboration, support, and institutional inquiries. We're here to answer your questions."
      />

      <section className="container-zc py-16 md:py-20 grid lg:grid-cols-12 gap-10">
        {/* Contact info */}
        <aside className="lg:col-span-5 space-y-4 reveal">
          <div className="bg-white rounded-3xl border border-secondary p-7 hover-lift">
            <span className="eyebrow">Contact Information</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-black text-navy">Reach our team</h2>
            <ul className="mt-7 space-y-5">
              {[
                { icon: MapPin, title: "Our Office", value: "Monrovia, Liberia" },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+231 886 727 619 / +231 777 253 865",
                },
                { icon: Mail, title: "Email", value: "info@zealcare.org" },
                { icon: Clock, title: "Working Hours", value: "Mon – Fri · 9:00 AM – 5:00 PM" },
              ].map((c) => (
                <li key={c.title} className="flex gap-4">
                  <div className="size-11 rounded-2xl bg-accent text-navy flex items-center justify-center shrink-0 tilt-hover">
                    <c.icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-bold text-navy text-sm">{c.title}</div>
                    <div className="text-navy/70 text-sm mt-0.5">{c.value}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-7 border-t border-secondary">
              <div className="font-bold text-navy text-sm mb-3">Follow Us</div>
              <div className="flex gap-3">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social"
                    className="size-10 rounded-full bg-secondary text-primary hover:bg-accent hover:text-navy transition-colors flex items-center justify-center"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Form / Success */}
        <div className="lg:col-span-7 reveal reveal-delay-1">
          {submitted ? (
            <div className="bg-white rounded-3xl border border-secondary p-8 md:p-10 shadow-card-lg text-center animate-fade-up">
              <div className="mx-auto size-16 rounded-full bg-accent text-navy flex items-center justify-center shadow-yellow-glow">
                <CheckCircle2 className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <h2 className="mt-5 text-2xl md:text-3xl font-black text-navy">
                Message received — thank you!
              </h2>
              <p className="mt-3 text-navy/70 max-w-md mx-auto text-sm md:text-base">
                A member of the Zeal Care team will respond within 48 hours. For urgent matters,
                reach us directly at <span className="font-bold text-primary">info@zealcare.org</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center gap-2 bg-secondary text-navy font-bold px-5 py-3 rounded-full text-sm hover:bg-accent transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-white rounded-3xl border border-secondary p-7 md:p-9 shadow-card-lg"
            >
              <span className="eyebrow">Send a Message</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-navy">
                We'd love to hear from you
              </h2>

              {/* Honeypot */}
              <input
                type="text"
                {...register("website")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  error={errors.name?.message}
                  inputProps={{ ...register("name"), placeholder: "Jane Doe", autoComplete: "name" }}
                />
                <Field
                  label="Email Address"
                  error={errors.email?.message}
                  inputProps={{
                    ...register("email"),
                    type: "email",
                    placeholder: "you@example.com",
                    autoComplete: "email",
                  }}
                />
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <Field
                  label="Phone (optional)"
                  error={errors.phone?.message}
                  inputProps={{
                    ...register("phone"),
                    type: "tel",
                    placeholder: "+231 …",
                    autoComplete: "tel",
                  }}
                />
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    {...register("subject")}
                    className={inputClass(!!errors.subject)}
                  >
                    {subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.subject && <ErrorText msg={errors.subject.message!} />}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className={`${inputClass(!!errors.message)} resize-none`}
                />
                <div className="mt-1 flex items-center justify-between">
                  {errors.message ? (
                    <ErrorText msg={errors.message.message!} />
                  ) : (
                    <span className="text-xs text-navy/50">Min 10 characters</span>
                  )}
                  <span
                    className={`text-xs font-medium tabular-nums ${
                      messageLength > 1500 ? "text-destructive" : "text-navy/50"
                    }`}
                  >
                    {messageLength}/1500
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map */}
      <section className="container-zc pb-20 reveal">
        <span className="eyebrow">Our Location</span>
        <h2 className="mt-2 text-2xl md:text-3xl font-black text-navy">Find us in Monrovia</h2>
        <div className="mt-6 rounded-[2rem] overflow-hidden border border-secondary aspect-[16/8] bg-secondary relative">
          <iframe
            title="Zeal Care Office"
            className="w-full h-full grayscale-[20%]"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-10.85,6.27,-10.65,6.39&layer=mapnik&marker=6.3156,-10.8074"
            loading="lazy"
          />
          <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-4 py-3 shadow-card-lg flex items-center gap-3 max-w-xs">
            <div className="size-9 rounded-xl bg-accent text-navy flex items-center justify-center">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Operational HQ
              </div>
              <div className="font-black text-navy text-sm">Monrovia, Liberia</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full bg-secondary/40 border rounded-xl px-4 py-3 text-sm font-medium text-navy",
    "focus:outline-none focus:ring-2 transition-colors",
    hasError
      ? "border-destructive focus:ring-destructive/40"
      : "border-secondary focus:ring-primary/50 focus:border-primary",
  ].join(" ");
}

function Field({
  label,
  error,
  inputProps,
}: {
  label: string;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & { name?: string };
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <input {...inputProps} className={inputClass(!!error)} />
      {error && <ErrorText msg={error} />}
    </div>
  );
}

function ErrorText({ msg }: { msg: string }) {
  return (
    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-destructive">
      <AlertCircle className="h-3.5 w-3.5" /> {msg}
    </p>
  );
}
