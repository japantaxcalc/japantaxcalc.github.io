import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  updated?: string;
  children?: ReactNode;
}

export default function Hero({ eyebrow, title, description, updated, children }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--jp-border)] bg-[var(--jp-hero)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, var(--jp-accent-soft) 0%, transparent 45%), radial-gradient(circle at 85% 0%, var(--jp-accent-soft-2) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 py-14 sm:py-20">
        {eyebrow && (
          <p className="mb-3 inline-flex items-center rounded-full border border-[var(--jp-border)] bg-[var(--jp-paper)]/70 px-3 py-1 text-xs font-medium tracking-wide text-[var(--jp-ink-muted)]">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight text-[var(--jp-ink)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--jp-ink-muted)] sm:text-lg">
          {description}
        </p>
        {updated && (
          <p className="mt-3 text-xs text-[var(--jp-ink-faint)]">最後更新：{updated}</p>
        )}
        {children}
      </div>
    </section>
  );
}
