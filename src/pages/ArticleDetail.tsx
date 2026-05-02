import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, User } from "lucide-react";
import { articles, getArticleBySlug } from "@/data/articles";
import { useReveal } from "@/hooks/useReveal";
import ArticleImage from "@/components/ArticleImage";
import { toast } from "sonner";

export default function ArticleDetail() {
  const ref = useReveal<HTMLDivElement>();
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="container-zc py-32 text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-3 text-3xl md:text-4xl font-black text-navy">Story not found</h1>
        <p className="mt-3 text-navy/60 text-sm">
          The article you're looking for may have moved.
        </p>
        <Link
          to="/media"
          className="mt-6 inline-flex items-center gap-2 btn-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to newsroom
        </Link>
      </div>
    );
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div ref={ref}>
      {/* Hero image */}
      <section className="relative">
        <div className="aspect-[16/8] md:aspect-[21/9] w-full overflow-hidden bg-navy">
          <ArticleImage
            picture={article.img}
            alt={article.title}
            sizes="100vw"
            className="block w-full h-full"
            imgClassName="w-full h-full object-cover opacity-90"
            eager
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-zc pb-10 md:pb-14 text-white animate-fade-up">
            <Link
              to="/media"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Newsroom
            </Link>
            <span className="mt-3 inline-block bg-accent text-navy text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {article.tag}
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl text-balance">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-accent" />
                <time dateTime={article.iso}>{article.date}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-accent" />
                {article.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="container-zc py-12 md:py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 reveal">
          <p className="text-base md:text-lg text-navy/80 leading-relaxed font-medium">
            {article.excerpt}
          </p>
          <div className="mt-6 space-y-5 text-sm md:text-base text-navy/80 leading-relaxed">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-secondary">
            <Link
              to="/media"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-navy transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All stories
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-secondary text-navy text-sm font-bold px-4 py-2.5 rounded-full hover:bg-accent transition-colors"
            >
              <Share2 className="h-4 w-4" /> Share story
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 reveal reveal-delay-1">
          <div className="bg-soft-gradient rounded-3xl border border-secondary p-6">
            <span className="eyebrow">Support our work</span>
            <h3 className="mt-2 text-xl font-black text-navy leading-snug">
              Stories like this one are made possible by sponsors.
            </h3>
            <p className="mt-2 text-sm text-navy/70">
              Become a sponsor and help us reach more children across Liberia.
            </p>
            <Link to="/ways-to-give" className="mt-5 btn-primary w-full">
              Sponsor a Child <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </article>

      {/* Related */}
      <section className="container-zc pb-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-black text-navy">More stories</h2>
          <Link
            to="/media"
            className="text-xs font-bold text-primary hover:text-navy transition-colors uppercase tracking-widest"
          >
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((r, i) => (
            <Link
              to={`/media/${r.slug}`}
              key={r.slug}
              className={`reveal reveal-delay-${i + 1} hover-lift group rounded-3xl overflow-hidden border border-secondary bg-white block`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ArticleImage
                  picture={r.img}
                  alt={r.title}
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 90vw"
                  className="block w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {r.tag} · {r.date}
                </span>
                <h3 className="mt-2 text-base font-black text-navy leading-snug">{r.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
