import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import { ARTICLES } from "@/data/site";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/blog";
import { useSeo } from "@/lib/seo";

const TUTORIAL = "退稅教學";
const ALL = "全部";

// The five tutorials keep their own URLs; here they are listed under one tag with the blog posts
const ENTRIES = [
  ...ARTICLES.map((a) => ({ ...a, tag: TUTORIAL })),
  ...BLOG_POSTS.map((p) => ({ path: p.path, title: p.title, description: p.description, updated: p.updated, tag: p.category })),
];
const TAGS = [ALL, TUTORIAL, ...BLOG_CATEGORIES];

export default function Blog() {
  useSeo({
    title: "日本購物與退稅文章｜退稅教學、藥妝、Outlet、機場、刷卡付款",
    description:
      "日本旅遊工具箱的全部文章：日本退稅教學與 11/1 新制，藥妝、雜貨、服飾購物攻略，關東、關西、九州 Outlet，關西、羽田、新千歲機場伴手禮，還有刷卡、換匯與購物預算。",
  });

  const [tag, setTag] = useState(ALL);
  const shown = tag === ALL ? ENTRIES : ENTRIES.filter((e) => e.tag === tag);

  return (
    <Layout>
      <Hero
        eyebrow="文章"
        title="日本購物與退稅文章"
        description="退稅規則、購物攻略、Outlet、機場伴手禮，還有刷卡和換匯，依照官方資料整理的文章都在這裡。"
      />

      <section className="bg-[var(--jp-paper)] py-10">
        <div className="mx-auto max-w-5xl px-5">
          <div role="group" aria-label="文章分類" className="flex flex-wrap gap-2">
            {TAGS.map((t) => {
              const count = t === ALL ? ENTRIES.length : ENTRIES.filter((e) => e.tag === t).length;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tag === t}
                  onClick={() => setTag(t)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    tag === t
                      ? "border-[var(--jp-ink)] bg-[var(--jp-ink)] text-[var(--jp-paper)]"
                      : "border-[var(--jp-border)] text-[var(--jp-ink-muted)] hover:border-[var(--jp-ink)] hover:text-[var(--jp-ink)]"
                  }`}
                >
                  {t}（{count}）
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {shown.map((e) => (
              <Link
                key={e.path}
                href={e.path}
                className="group flex flex-col rounded-2xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--jp-ink)]/40 hover:shadow-md"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-[var(--jp-accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--jp-accent)]">
                  {e.tag}
                </span>
                <h2 className="mt-3 font-serif text-base font-semibold leading-snug text-[var(--jp-ink)]">
                  {e.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--jp-ink-muted)]">{e.description}</p>
                <p className="mt-4 text-xs text-[var(--jp-ink-faint)]">更新於 {e.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ToolCards currentPath="/blog" />
    </Layout>
  );
}
