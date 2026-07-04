import { Link } from "wouter";
import { TOOLS } from "@/data/site";

interface ToolCardsProps {
  currentPath?: string;
  title?: string;
  description?: string;
}

export default function ToolCards({
  currentPath,
  title = "日本旅遊實用計算工具",
  description = "三個工具幫你算清楚退稅、匯率與刷卡手續費，出發前先做好功課。",
}: ToolCardsProps) {
  return (
    <section className="border-b border-[var(--jp-border)] bg-[var(--jp-paper)] py-14">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-8 max-w-xl">
          <h2 className="font-serif text-2xl font-semibold text-[var(--jp-ink)]">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--jp-ink-muted)]">{description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {TOOLS.map((tool) => {
            const isCurrent = tool.path === currentPath;
            return (
              <Link
                key={tool.path}
                href={tool.path}
                className={`group flex flex-col rounded-2xl border p-5 transition-all ${
                  isCurrent
                    ? "border-[var(--jp-ink)] bg-[var(--jp-accent-soft)]"
                    : "border-[var(--jp-border)] bg-[var(--jp-card)] hover:-translate-y-0.5 hover:border-[var(--jp-ink)]/40 hover:shadow-md"
                }`}
              >
                <span className="text-2xl">{tool.emoji}</span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-[var(--jp-ink)]">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--jp-ink-muted)]">
                  {tool.description}
                </p>
                <span className="mt-4 text-sm font-medium text-[var(--jp-accent)]">
                  {isCurrent ? "目前所在工具" : "開始使用 →"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
