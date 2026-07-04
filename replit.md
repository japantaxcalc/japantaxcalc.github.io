# 日本旅遊工具箱 (Japan Travel Tools)

A Traditional Chinese content site for Taiwanese travelers to Japan — offers a tax-refund calculator, JPY↔TWD currency converter, and overseas card-fee calculator, plus in-depth guide articles on Japan's tax-refund system.

## Run & Operate

- Site lives in `artifacts/japan-travel-tools` (frontend-only React + Vite artifact, no backend/DB).
- `pnpm --filter @workspace/japan-travel-tools run dev` — run locally (normally handled by its workflow)
- `pnpm --filter @workspace/japan-travel-tools run typecheck` — typecheck this artifact
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite, wouter routing, Tailwind v4, shadcn/ui
- No backend/DB needed for this artifact — all calculators run client-side

## Where things live

- `artifacts/japan-travel-tools/src/lib/calculators.ts` — pure calculator functions (tax refund, card fee, yen→twd) ported exactly from the original site's JS logic (default refund rate 0.20, default card fee 1.5%, tax divisors 1.1 / 1.08).
- `artifacts/japan-travel-tools/src/components/site/` — shared layout primitives: `Layout`, `Header`, `Footer`, `Hero`, `ToolCards`, `ArticleCards`, `AboutSection`, `ContentCard` (+ `Section`, `DataTable`, `FaqItem`).
- `artifacts/japan-travel-tools/src/data/site.ts` — single source of truth for site name/tagline, `TOOLS`, `ARTICLES`, `NAV_LINKS`, `FOOTER_LINKS` metadata used across pages.
- `artifacts/japan-travel-tools/src/lib/seo.ts` — `useSeo` hook for per-page title/description/JSON-LD (FAQPage/Article schema).
- `artifacts/japan-travel-tools/src/pages/` — one file per route: `home` (`/`), `yen-to-twd`, `japan-card-fee`, `japan-tax-8-vs-10`, `japan-tax-2026`, `japan-duty-free-guide`, `japan-airport-tax-refund`, `guide`, `about`, `privacy`, `contact`.
- `artifacts/japan-travel-tools/public/sitemap.xml` — static sitemap listing all routes.

## Architecture decisions

- Every page shares the same `Layout` (Header/Nav/Footer) + `Hero` + `ToolCards` + `ArticleCards` composition so the site reads as one consistent product instead of disconnected landing pages — this was a direct requirement to pass AdSense review after a "Low Value Content" rejection.
- All numeric facts (tax thresholds, refund rates, card fee %, FAQ text, comparison tables) were preserved verbatim from the original 12 static HTML/XML files; no content was replaced with generic filler.
- `about`/`privacy`/`contact` were substantially expanded (originals were 19–23 lines) since thin policy/about pages were a likely factor in the AdSense rejection.
- JSON-LD (FAQPage, Article) is attached per-page via `useSeo` to preserve/extend the SEO structured data from the original site.

## Product

- Home (`/`): Japan tax-refund calculator (refund amount, store fee, card fee, final payment).
- `/yen-to-twd`: JPY→TWD currency converter with reference tables.
- `/japan-card-fee`: overseas credit-card fee calculator for Japan purchases.
- `/guide`: long-form tax-refund guide article (Article + FAQPage + BreadcrumbList-style JSON-LD).
- `/japan-tax-2026`, `/japan-tax-8-vs-10`, `/japan-duty-free-guide`, `/japan-airport-tax-refund`: supporting educational articles.
- `/about`, `/privacy`, `/contact`: expanded policy/info pages.

## User preferences

- Preserve all real facts/numbers/FAQ content from the original 12 uploaded files — never replace with generic content.
- Content language: Traditional Chinese (zh-TW).
- Visual style: unified "Japandi" theme (warm paper/ink palette) applied consistently across all pages via shared `--jp-*` CSS variables.

## Gotchas

- The original site's calculator defaults (refund rate 0.20, card fee 1.5%, 1.1/1.08 tax divisors) must stay in sync with `src/lib/calculators.ts` — don't recompute these ad hoc in page components.
- `public/sitemap.xml` uses a placeholder domain (`example.com`); update to the real production domain before relying on it for search-engine submission.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
