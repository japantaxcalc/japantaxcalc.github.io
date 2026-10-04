import { useMemo } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ContentCard, { Section } from "@/components/site/ContentCard";
import NotFound from "@/pages/not-found";
import { TOOLS } from "@/data/site";
import { BLOG_POSTS, findPost } from "@/data/blog";
import { MarkdownBlocks, parseSections } from "@/lib/markdown";
import { articleJsonLd, useSeo } from "@/lib/seo";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);

  const jsonLd = useMemo(
    () =>
      post &&
      articleJsonLd({
        path: post.path,
        headline: post.title,
        description: post.description,
        published: post.date,
        modified: post.date,
      }),
    [post],
  );
  useSeo({
    title: post?.title ?? "找不到這篇文章",
    description: post?.description ?? "",
    jsonLd,
  });
  const sections = useMemo(() => (post ? parseSections(post.body) : []), [post]);

  if (!post) return <NotFound />;

  // 1 main tool + at most 1 more, in the order written in the post
  const tools = post.tools
    .map((p) => TOOLS.find((t) => t.path === p))
    .filter((t): t is (typeof TOOLS)[number] => t !== undefined);
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <Hero
        eyebrow={post.category}
        title={post.title}
        description={post.description}
        author="Miff"
        updated={post.updated}
      />

      <Section>
        {post.image && (
          <figure className="overflow-hidden rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)]">
            <img src={post.image} alt={post.imageAlt ?? ""} width={1280} height={720} className="h-auto w-full" />
            <figcaption className="px-5 py-3 text-xs text-[var(--jp-ink-faint)]">AI 生成示意圖</figcaption>
          </figure>
        )}

        {sections.map((s, i) => (
          <ContentCard key={i} title={s.title}>
            <MarkdownBlocks blocks={s.blocks} />
          </ContentCard>
        ))}

        {tools.length > 0 && (
          <ContentCard title="這篇用到的工具">
            <div className="grid gap-3 sm:grid-cols-2">
              {tools.map((t) => (
                <Link
                  key={t.path}
                  href={t.path}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--jp-border)] bg-[var(--jp-paper)] p-4 transition-colors hover:border-[var(--jp-ink)]/40"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {t.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold text-[var(--jp-ink)]">{t.title}</span>
                    <span className="mt-1 block text-sm text-[var(--jp-ink-muted)]">{t.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </ContentCard>
        )}

        <ContentCard title={`更多「${post.category}」文章`}>
          <ul className="list-disc space-y-1 pl-5">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={p.path} className="font-medium text-[var(--jp-accent)] underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/blog" className="font-medium text-[var(--jp-accent)] underline">
              看全部文章 →
            </Link>
          </p>
        </ContentCard>
      </Section>

      <ArticleCards currentPath={post.path} />
    </Layout>
  );
}
