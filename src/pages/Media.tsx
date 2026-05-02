import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Play, Newspaper, ArrowRight, Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { usePageContent } from "@/hooks/usePageContent";
import { categories } from "@/data/articles";
import { rowsToArticles, type CmsArticleRow } from "@/lib/cms-articles";
import gallerySurvey from "@/assets/project-survey.jpg?responsive";
import galleryAnalysis from "@/assets/project-analysis.jpg?responsive";
import galleryInterviews from "@/assets/project-interviews.jpg?responsive";
import galleryMaterials from "@/assets/project-materials-row.jpg?responsive";
import galleryFeePayment from "@/assets/project-feepayment.jpg?responsive";
import galleryTeam from "@/assets/team-meeting.jpg?responsive";
import ResponsiveImage from "@/components/ResponsiveImage";
import ArticleImage from "@/components/ArticleImage";

type EventRow = { date: string; title: string; place: string };

export default function Media() {
  const ref = useReveal<HTMLDivElement>();
  const cms = usePageContent("media");
  const articles = useMemo(
    () => rowsToArticles(cms.list<CmsArticleRow>("news_articles")),
    [cms],
  );
  const events = cms.list<EventRow>("events");
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
  }, [active, query, articles]);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow={cms.get("hero_eyebrow")}
        title={cms.get("hero_title")}
        highlight={cms.get("hero_highlight")}
        description={cms.get("hero_description")}
      />

      {/* Newsroom */}
      <section id="newsroom" className="scroll-mt-32 container-zc py-16 md:py-20">
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
                    <ArticleImage
                      picture={n.img}
                      alt={n.title}
                      sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 90vw"
                      className="block w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* Success Stories */}
      <section id="stories" className="scroll-mt-32 bg-soft-gradient py-16 md:py-20">
        <div className="container-zc">
          <div className="max-w-3xl">
            <span className="eyebrow">Voices from the Hub</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-navy">Success Stories</h2>
            <p className="mt-3 text-navy/70">Real scholars. Real outcomes. Their words, not ours.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { name: "Samuel K., 15", quote: "The STEM lab changed my life. I never knew I could build robots in Liberia.", track: "Robotics Scholar" },
              { name: "Aminata D., 14", quote: "I was going to drop out. Now I'm planning to study engineering.", track: "Education Sponsorship" },
              { name: "Joseph T., 17", quote: "I started my first business with skills I learned at Zeal Care.", track: "Entrepreneurship" },
            ].map((s) => (
              <article key={s.name} className="bg-white rounded-[1.75rem] border border-secondary p-7 hover-lift">
                <div className="size-12 rounded-2xl bg-accent text-navy flex items-center justify-center font-black text-lg">
                  {s.name[0]}
                </div>
                <p className="mt-5 text-navy/80 leading-relaxed italic">"{s.quote}"</p>
                <div className="mt-6">
                  <div className="font-black text-navy text-sm">{s.name}</div>
                  <div className="text-[11px] font-bold text-primary uppercase tracking-widest">{s.track}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematics / Video */}
      <CinematicsSection cms={cms} />

      {/* Photo Gallery */}
      <section id="gallery" className="scroll-mt-32 container-zc py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">In Pictures</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-black text-navy">Photo Gallery</h2>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { img: galleryTeam, caption: "Team meeting — in person & online" },
            { img: gallerySurvey, caption: "Project digital survey, June 2024" },
            { img: galleryAnalysis, caption: "Educational survey analysis, Bloc D" },
            { img: galleryInterviews, caption: "Candidate & guardian interviews" },
            { img: galleryMaterials, caption: "Procuring school materials" },
            { img: galleryFeePayment, caption: "School fee payment with bloc leadership" },
          ].map((g, i) => (
            <figure key={i} className="relative aspect-square overflow-hidden rounded-2xl group">
              <ResponsiveImage
                picture={g.img}
                alt={g.caption}
                sizes="(min-width: 768px) 32vw, 50vw"
                className="block w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent text-white text-[11px] font-medium px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-32 bg-soft-gradient py-16 md:py-20">
        <div className="container-zc">
          <span className="eyebrow">Mark Your Calendar</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-black text-navy">Events & Calendar</h2>

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
        </div>
      </section>
    </div>
  );
}

type CmsHelper = { get: (key: string) => string };

function getYouTubeEmbed(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

function CinematicVideo({ src, title, poster }: { src: string; title: string; poster: string }) {
  const embed = getYouTubeEmbed(src);
  return (
    <div className="group relative aspect-video rounded-[1.5rem] overflow-hidden bg-navy/60 shadow-soft">
      {embed ? (
        <iframe
          src={embed}
          title={title || "Cinematic"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <video
          src={src}
          poster={poster || undefined}
          controls
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      )}
      {title && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4 pointer-events-none">
          <div className="text-white text-sm font-bold">{title}</div>
        </div>
      )}
    </div>
  );
}

function CinematicsSection({ cms }: { cms: CmsHelper }) {
  const slots = [1, 2, 3].map((n) => ({
    src: cms.get(`video_cinematic_${n}`),
    title: cms.get(`video_cinematic_${n}_title`),
    poster: cms.get(`video_cinematic_${n}_poster`),
  }));
  const videos = slots.filter((s) => s.src && s.src.trim().length > 0);
  const eyebrow = cms.get("cinematic_section_eyebrow");
  const title = cms.get("cinematic_section_title");
  const emptyMsg = cms.get("cinematic_empty_message");

  return (
    <section id="video" className="scroll-mt-32 bg-hero-gradient text-white py-16 md:py-20">
      <div className="container-zc">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-black">{title}</h2>

        {videos.length === 0 ? (
          <div className="mt-10 rounded-[1.5rem] border border-white/15 bg-white/5 backdrop-blur-sm p-10 md:p-14 text-center">
            <div className="mx-auto size-14 rounded-full bg-accent/20 grid place-items-center">
              <Play className="h-6 w-6 text-accent" />
            </div>
            <p className="mt-4 text-white/80 max-w-md mx-auto text-sm md:text-base">
              {emptyMsg}
            </p>
          </div>
        ) : (
          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                <CinematicVideo src={v.src} title={v.title} poster={v.poster} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
