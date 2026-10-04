import { parseFrontmatter } from "@/lib/markdown";

// Blog posts are the .md files in src/content/blog; the file name is the URL (/blog/<file name>).
// Keep the list of routes in scripts/prerender.mjs and public/sitemap.xml in sync when adding a post.

export const BLOG_CATEGORIES = ["購物攻略", "Outlet", "機場", "預算與付款"] as const;

export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  order: number;
  tools: string[];
  image?: string;
  imageAlt?: string;
  body: string;
}

const files = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const BLOG_POSTS: BlogPost[] = Object.entries(files)
  .map(([file, raw]) => {
    const slug = file.split("/").pop()!.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      path: `/blog/${slug}`,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      updated: data.updated ?? "",
      category: data.category ?? "",
      order: Number(data.order ?? 99),
      tools: (data.tools ?? "").split(",").map((t) => t.trim()).filter(Boolean),
      image: data.image,
      imageAlt: data.imageAlt,
      body,
    };
  })
  .sort((a, b) => a.order - b.order);

export function findPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
