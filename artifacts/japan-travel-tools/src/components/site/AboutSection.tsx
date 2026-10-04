import { Link } from "wouter";

export default function AboutSection() {
  return (
    <section className="border-b border-[var(--jp-border)] bg-[var(--jp-paper)] py-14">
      <div className="mx-auto max-w-5xl px-5">
        <div className="rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-8 sm:p-10">
          <p className="text-xs font-medium tracking-wide text-[var(--jp-accent)]">關於這個網站</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-[var(--jp-ink)]">
            把日本官方的退稅規則，整理成算得出來的工具
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--jp-ink-muted)]">
            日本旅遊工具箱由 Miff 製作與維護，內容整理自日本觀光廳、國稅廳公開的免稅與消費稅資料，以及各百貨公司公告的退稅手續費率。日本自
            2026 年 11 月 1 日起改採先付後退的退稅新制，網站會持續追蹤官方公告，更新文章與計算邏輯，幫第一次去日本自由行的旅人，把每一筆花費算清楚。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-full bg-[var(--jp-ink)] px-5 py-2.5 text-sm font-medium text-[var(--jp-paper)] transition-opacity hover:opacity-90"
            >
              閱讀完整的關於我們
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-[var(--jp-border)] px-5 py-2.5 text-sm font-medium text-[var(--jp-ink)] transition-colors hover:bg-[var(--jp-accent-soft)]"
            >
              聯絡我們
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
