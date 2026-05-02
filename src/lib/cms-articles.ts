// Helpers to convert admin-managed article rows from page_content into the
// shape used by the Media + ArticleDetail pages.
import { articles as fallbackArticles, type Article } from "@/data/articles";

export type CmsArticleRow = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  iso: string;
  readTime: string;
  author: string;
  excerpt: string;
  body: string;
  img: string;
};

export function rowsToArticles(rows: CmsArticleRow[]): Article[] {
  if (!rows || rows.length === 0) return fallbackArticles;
  return rows
    .filter((r) => r && r.slug && r.title)
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      tag: (r.tag || "Field Story") as Article["tag"],
      date: r.date || "",
      iso: r.iso || "",
      readTime: r.readTime || "3 min read",
      author: r.author || "Zeal Care",
      excerpt: r.excerpt || "",
      body: (r.body || "")
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
      img: r.img || "",
    }));
}
