import { Link } from "wouter";

export default function AboutSection() {
  return (
    <section className="border-b border-[var(--jp-border)] bg-[var(--jp-paper)] py-14">
      <div className="mx-auto max-w-5xl px-5">
        <div className="rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-8 sm:p-10">
          <p className="text-xs font-medium tracking-wide text-[var(--jp-accent)]">關於這個網站</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-[var(--jp-ink)]">
            由一群常跑日本的旅人，整理給你的省錢筆記
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--jp-ink-muted)]">
            日本旅遊工具箱從 2024 年開始整理日本購物退稅、匯率換算與海外刷卡手續費的資訊，內容來自日本國稅廳公開資料、各百貨公司公告的手續費率，以及我們每次赴日購物的實際經驗。我們持續追蹤日本稅制與退稅政策的變化（包含
            2026 年即將上路的先付後退新制），並定期更新文章內容與計算邏輯，希望讓每一位第一次到日本自由行的旅人，都能把每一筆花費算得清清楚楚。
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
