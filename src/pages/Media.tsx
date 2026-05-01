import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Play, Newspaper, ArrowRight, Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { articles, categories } from "@/data/articles";
import comm from "@/assets/community-wide.jpg";
import stem from "@/assets/program-stem.jpg";
import lead from "@/assets/program-leadership.jpg";

const events = [
  { date: "May 18, 2026", title: "Annual Donor Gala", place: "Monrovia, Liberia" },
  { date: "Jun 04, 2026", title: "STEM Open House", place: "West Point Hub" },
  { date: "Jul 22, 2026", title: "Sponsor Field Visit", place: "Grand Bassa County" },
];

export default function Media() {
  const ref = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchCat = active === "All" || a.tag === active;
      const matchQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="News & stories"
        title="The"
        highlight="Impact Hub"
        description="Direct narratives from the frontlines of African potential. Stay updated with our latest stories, films, and events."
      />

      {/* Newsroom */}
      <section className="container-zc py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="eyebrow">Institutional Updates</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-navy">Newsroom</h2>
          </div>
          <div className="text-xs font-bold text-navy/60 uppercase tracking-widest">
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          </div>
        </div>

        {/* Filter + search */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={[
                    "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                    isActive
                      ? "bg-navy text-white shadow-soft"
                      : "bg-secondary text-navy hover:bg-accent",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories…"
              className="w-full bg-secondary/50 border border-secondary rounded-full pl-10 pr-4 py-2.5 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-secondary/40 rounded-3xl">
            <p className="text-navy/60 font-medium text-sm">
              No stories match your filter. Try another category.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n, i) => (
              <article
                key={n.slug}
                className={`reveal reveal-delay-${(i % 3) + 1} hover-lift group rounded-[1.75rem] overflow-hidden border border-secondary bg-white`}
              >
                <Link to={`/media/${n.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={n.img}
                      alt={n.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-accent text-navy text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {n.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-navy/60 uppercase tracking-widest">
                      <Newspaper className="h-3.5 w-3.5" /> {n.date} · {n.readTime}
                    </div>
                    <h3 className="mt-2 text-base md:text-lg font-black text-navy leading-snug">
                      {n.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy/65 line-clamp-2">{n.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all">
                      Read story <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Cinematics */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="container-zc">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Visual Narratives
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-black">Cinematics</h2>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {[comm, stem, lead].map((img, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} group relative aspect-video rounded-[1.5rem] overflow-hidden cursor-pointer`}
              >
                <img
                  src={img}
                  alt="Featured film"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-14 rounded-full bg-accent text-navy flex items-center justify-center shadow-yellow-glow group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="container-zc py-16 md:py-20">
        <span className="eyebrow">Mark Your Calendar</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-black text-navy">Upcoming Events</h2>

        <div className="mt-8 space-y-3">
          {events.map((e, i) => (
            <div
              key={e.title}
              className={`reveal reveal-delay-${i + 1} hover-lift bg-white rounded-2xl border border-secondary p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4`}
            >
              <div className="size-14 rounded-2xl bg-accent text-navy flex flex-col items-center justify-center shrink-0 font-black tilt-hover">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {e.date}
                </div>
                <div className="mt-0.5 text-base md:text-lg font-black text-navy">{e.title}</div>
                <div className="text-xs text-navy/60">{e.place}</div>
              </div>
              <Link
                to="/contact"
                className="bg-navy text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary transition-colors"
              >
                RSVP
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
