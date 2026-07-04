import type { ReactNode } from "react";

export default function ContentCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-6 sm:p-8 ${className}`}
    >
      {title && (
        <h2 className="font-serif text-xl font-semibold text-[var(--jp-ink)] sm:text-2xl">
          {title}
        </h2>
      )}
      <div className="prose-content mt-4 space-y-4 text-sm leading-relaxed text-[var(--jp-ink-muted)] sm:text-base">
        {children}
      </div>
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="bg-[var(--jp-paper)] py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5">{children}</div>
    </section>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--jp-border)]">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--jp-accent-soft)]">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-[var(--jp-ink)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[var(--jp-border)]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[var(--jp-ink-muted)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqItem({ q, a }: { q: string; a: ReactNode }) {
  return (
    <div className="border-b border-[var(--jp-border)] pb-4 last:border-0 last:pb-0">
      <p className="font-semibold text-[var(--jp-ink)]">{q}</p>
      <p className="mt-1.5 text-[var(--jp-ink-muted)]">{a}</p>
    </div>
  );
}
