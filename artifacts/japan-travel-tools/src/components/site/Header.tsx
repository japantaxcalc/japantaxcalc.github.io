import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/data/site";

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--jp-border)] bg-[var(--jp-paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--jp-ink)] font-serif text-lg text-[var(--jp-paper)]">
            日
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold text-[var(--jp-ink)]">
              {SITE_NAME}
            </span>
            <span className="text-xs text-[var(--jp-ink-muted)]">{SITE_TAGLINE}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = location === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--jp-ink)] text-[var(--jp-paper)]"
                    : "text-[var(--jp-ink)]/80 hover:bg-[var(--jp-accent-soft)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="開啟選單"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--jp-ink)] md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--jp-border)] bg-[var(--jp-paper)] px-5 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                location === link.path
                  ? "bg-[var(--jp-ink)] text-[var(--jp-paper)]"
                  : "text-[var(--jp-ink)]/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
