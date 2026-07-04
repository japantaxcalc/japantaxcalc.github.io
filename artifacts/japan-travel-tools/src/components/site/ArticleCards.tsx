import { Link } from "wouter";
import { ARTICLES } from "@/data/site";

interface ArticleCardsProps {
  currentPath?: string;
  title?: string;
  description?: string;
}

export default function ArticleCards({
  currentPath,
  title = "延伸閱讀：日本退稅與購物教學",
  description = "從免稅資格、稅率差異到新制上路時程，深入了解日本購物退稅的每個細節。",
}: ArticleCardsProps) {
  const articles = ARTICLES.filter((a) => a.path !== currentPath);

  return (
    <section className="border-b border-[var(--jp-border)] bg-[var(--jp-hero)] py-14">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-8 max-w-xl">
          <h2 className="font-serif text-2xl font-semibold text-[var(--jp-ink)]">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--jp-ink-muted)]">{description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.slice(0, 4).map((article) => (
            <Link
              key={article.path}
              href={article.path}
              className="group flex flex-col rounded-2xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--jp-ink)]/40 hover:shadow-md"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-[var(--jp-accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--jp-accent)]">
                {article.category}
              </span>
              <h3 className="mt-3 font-serif text-base font-semibold leading-snug text-[var(--jp-ink)]">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--jp-ink-muted)]">
                {article.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--jp-ink-faint)]">
                <span>閱讀時間 {article.readTime}</span>
                <span>·</span>
                <span>更新於 {article.updated}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
