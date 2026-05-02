import { Link } from "react-router-dom";
import { ArrowRight, Globe2, ImagePlus, Sparkles, UsersRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const cards = [
  {
    to: "/admin/global",
    icon: Globe2,
    title: "Global Settings",
    desc: "Hero copy, contact info, donate button, footer, and social links.",
  },
  {
    to: "/admin/media",
    icon: ImagePlus,
    title: "Media Library",
    desc: "Upload and manage images used across the site.",
  },
  {
    to: "/admin/users",
    icon: UsersRound,
    title: "Admin Users",
    desc: "List admin accounts and grant or remove admin access.",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="bg-hero-gradient rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-40 bg-accent/25 rounded-full blur-2xl" />
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1">
          <Sparkles className="size-3.5 text-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Welcome
          </span>
        </div>
        <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">
          Hi {user?.email?.split("@")[0]}, ready to edit?
        </h1>
        <p className="text-white/75 text-sm mt-1 max-w-2xl">
          Pick a section below to update content. Changes save to the live site instantly.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map(({ to, icon: Icon, title, desc }) => (
          <Link
            key={to}
            to={to}
            className="group bg-card border border-border rounded-2xl p-5 hover:border-accent transition shadow-sm hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-accent/15 grid place-items-center text-accent">
                <Icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
