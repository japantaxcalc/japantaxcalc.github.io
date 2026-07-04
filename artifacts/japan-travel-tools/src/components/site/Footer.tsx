import { Link } from "wouter";
import { FOOTER_LINKS, SITE_NAME, SITE_TAGLINE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-[var(--jp-ink)] py-12 text-[var(--jp-paper)]">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--jp-paper)] font-serif text-base text-[var(--jp-ink)]">
                日
              </span>
              <span className="font-serif text-lg font-semibold">{SITE_NAME}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--jp-paper)]/70">
              {SITE_TAGLINE}。內容僅供旅遊參考，實際稅率、匯率與手續費請以官方與銀行公告為準。
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-[var(--jp-paper)]/70 transition-colors hover:text-[var(--jp-paper)]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/sitemap.xml"
              className="text-[var(--jp-paper)]/70 transition-colors hover:text-[var(--jp-paper)]"
            >
              Sitemap
            </a>
          </nav>
        </div>
        <div className="mt-10 border-t border-[var(--jp-paper)]/15 pt-6 text-xs text-[var(--jp-paper)]/50">
          © {new Date().getFullYear()} {SITE_NAME}．本站部分頁面可能顯示由 Google AdSense 提供的廣告。
        </div>
      </div>
    </footer>
  );
}
