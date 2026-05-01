import PageHero from "@/components/PageHero";
import { Calendar, Play, Newspaper, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import edu from "@/assets/program-education.jpg";
import stem from "@/assets/program-stem.jpg";
import lead from "@/assets/program-leadership.jpg";
import ent from "@/assets/program-entrepreneurship.jpg";
import comm from "@/assets/community-wide.jpg";

const news = [
  { img: edu, tag: "Field Story", date: "Mar 2026", title: "Zeal Care delivers school supplies to 200 children in West Point" },
  { img: stem, tag: "STEM Lab", date: "Feb 2026", title: "First robotics cohort completes inaugural curriculum in Monrovia" },
  { img: lead, tag: "Leadership", date: "Jan 2026", title: "Annual Youth Leadership Summit gathers scholars across Liberia" },
  { img: ent, tag: "Workshop", date: "Dec 2025", title: "Entrepreneurship bootcamp launches 12 new student-led ventures" },
  { img: comm, tag: "Christmas", date: "Dec 2025", title: "Zeal Care celebrates 2025 Christmas with kids in Chicken Soup Factory" },
  { img: edu, tag: "Advocacy", date: "Nov 2025", title: "Inclusive education roundtable convenes community leaders" },
];

const events = [
  { date: "May 18, 2026", title: "Annual Donor Gala", place: "Monrovia, Liberia" },
  { date: "Jun 04, 2026", title: "STEM Open House", place: "West Point Hub" },
  { date: "Jul 22, 2026", title: "Sponsor Field Visit", place: "Grand Bassa County" },
];

export default function Media() {
  return (
    <>
      <PageHero
        eyebrow="Global Press Hub"
        title="The"
        highlight="Impact Hub"
        description="Direct narratives from the frontlines of African potential. Stay updated with our latest news, videos, and upcoming events."
      />

      {/* Newsroom */}
      <section className="container-zc py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="eyebrow">Institutional Updates</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Newsroom</h2>
          </div>
          <div className="text-sm font-bold text-navy/60">{news.length} stories</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <article key={i} className="group rounded-[1.75rem] overflow-hidden border border-secondary bg-white hover:shadow-card-lg transition-all">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={n.img} alt={n.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-accent text-navy text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {n.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-navy/60 uppercase tracking-widest">
                  <Newspaper className="h-3.5 w-3.5" /> {n.date}
                </div>
                <h3 className="mt-3 text-lg font-black text-navy leading-snug">{n.title}</h3>
                <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-navy">
                  Read story <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cinematics */}
      <section className="bg-navy text-white py-24">
        <div className="container-zc">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Visual Narratives</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black">Cinematics</h2>

          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            {[comm, stem, lead].map((img, i) => (
              <div key={i} className="group relative aspect-video rounded-[1.5rem] overflow-hidden cursor-pointer">
                <img src={img} alt="Featured film" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-16 rounded-full bg-accent text-navy flex items-center justify-center shadow-yellow-glow group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="container-zc py-24">
        <span className="eyebrow">Mark Your Calendar</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-black text-navy">Upcoming Events</h2>

        <div className="mt-10 space-y-4">
          {events.map((e) => (
            <div key={e.title} className="bg-white rounded-2xl border border-secondary p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-soft transition-all">
              <div className="size-16 rounded-2xl bg-accent text-navy flex flex-col items-center justify-center shrink-0 font-black">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-widest text-primary">{e.date}</div>
                <div className="mt-1 text-xl font-black text-navy">{e.title}</div>
                <div className="text-sm text-navy/60">{e.place}</div>
              </div>
              <Link to="/contact" className="bg-navy text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-primary transition-colors">
                RSVP
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
