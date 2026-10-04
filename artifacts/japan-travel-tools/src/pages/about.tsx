import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ContentCard, { Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";

function MiffAvatar() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 flex-none" role="img" aria-label="Miff 的頭像插畫">
      <circle cx="32" cy="32" r="32" style={{ fill: "var(--jp-accent-soft)" }} />
      <g transform="rotate(-8 24 30)">
        <rect x="12" y="12" width="22" height="30" rx="2" style={{ fill: "var(--jp-card)", stroke: "var(--jp-border)" }} />
        <rect x="16" y="18" width="14" height="2" rx="1" style={{ fill: "var(--jp-ink-faint)" }} />
        <rect x="16" y="23" width="10" height="2" rx="1" style={{ fill: "var(--jp-ink-faint)" }} />
        <rect x="16" y="28" width="12" height="2" rx="1" style={{ fill: "var(--jp-ink-faint)" }} />
      </g>
      <rect x="29" y="23" width="23" height="29" rx="4" style={{ fill: "var(--jp-ink)" }} />
      <rect x="32" y="26" width="17" height="7" rx="1.5" style={{ fill: "var(--jp-card)" }} />
      <text x="47" y="31.8" textAnchor="end" fontSize="6" fontWeight="700" style={{ fill: "var(--jp-accent)" }}>
        ¥
      </text>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={32.5 + col * 6}
            y={36 + row * 5}
            width="4"
            height="3"
            rx="0.8"
            style={{ fill: row === 2 && col === 2 ? "var(--jp-accent)" : "var(--jp-paper)" }}
          />
        )),
      )}
    </svg>
  );
}

export default function About() {
  useSeo({
    title: "關於我們",
    description:
      "日本旅遊工具箱由 Miff 製作與維護，把日本觀光廳、國稅廳公開的退稅規則整理成計算工具與教學文章。說明內容來源、查核方式、AI 協作與廣告收入。",
  });

  return (
    <Layout>
      <Hero
        eyebrow="關於我們"
        title="關於日本旅遊工具箱"
        description="我是 Miff，這個網站由我一個人製作與維護。我把日本官方公開的退稅規則，整理成台灣旅客出發前就能用的計算工具和教學文章。"
      />

      <Section>
        <ContentCard title="站長介紹">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <MiffAvatar />
            <div className="space-y-4">
              <p>
                嗨，我是 Miff。平常的興趣是製作產品介紹網頁（landing page），這個網站的版面、計算工具和文章，都是我自己動手做的。
              </p>
              <p>
                我注意到很多台灣旅客出發前會上網搜尋「日本退稅怎麼算」「日幣換台幣多少」這類問題，所以做了這個工具站，把退稅、匯率和刷卡手續費放在同一個地方算清楚。
              </p>
              <p>
                網站內容整理自日本官方公開的資料，並非來自我個人的旅行或退稅經驗；我也不是稅務或會計專業人士。如果你實際在日本辦過退稅，發現網站寫的和現場不一樣，非常歡迎
                <Link href="/contact" className={linkClass}>
                  寫信告訴我
                </Link>
                。
              </p>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="網站提供什麼">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/" className={linkClass}>
                日本退稅計算機
              </Link>
              ：估算退稅金額、百貨手續費與最終支付價格
            </li>
            <li>
              <Link href="/yen-to-twd" className={linkClass}>
                日幣台幣換算
              </Link>
              ：快速換算日圓與台幣
            </li>
            <li>
              <Link href="/japan-card-fee" className={linkClass}>
                海外刷卡手續費計算機
              </Link>
              ：估算在日本刷卡的實際台幣成本
            </li>
            <li>
              <Link href="/shopping-trip-estimator" className={linkClass}>
                購物清單試算器
              </Link>
              ：把整趟旅程的購物清單一次加總
            </li>
            <li>
              <Link href="/guide" className={linkClass}>
                日本退稅完整教學
              </Link>
              等 5 篇教學文章：資格條件、退稅門檻、8% 與 10% 稅率、免稅店與機場退稅流程
            </li>
          </ul>
        </ContentCard>

        <ContentCard title="內容怎麼查核">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <b>以官方資料為準</b>：免稅制度與 2026 年 11 月 1 日起的先付後退新制，以日本觀光廳的說明為準；消費稅與 8%、10%
              稅率，以日本國稅廳的說明為準；百貨公司的退稅手續費，以各店公告為準。
            </li>
            <li>
              <b>公開計算方式</b>：計算工具頁面都附有計算方式說明，你可以自己驗算。
            </li>
            <li>
              <b>制度改變時優先更新</b>：日本退稅制度在 2026 年 11 月 1 日有大幅調整，我會持續追蹤官方公告，優先更新相關文章與計算機。
            </li>
            <li>
              <b>歡迎指正</b>：發現錯誤或過時的資訊，請透過
              <Link href="/contact" className={linkClass}>
                聯絡我們
              </Link>
              告訴我，確認後會盡快修正。
            </li>
          </ul>
        </ContentCard>

        <ContentCard title="AI 協作聲明">
          <p>本站部分文章在整理資料與撰寫初稿時使用 AI 工具協助，發布前由 Miff 對照日本官方資料逐篇查核。</p>
        </ContentCard>

        <ContentCard title="廣告與收入">
          <p>
            網站的工具和文章都免費使用，營運費用來自 Google AdSense 廣告。廣告由第三方系統自動顯示，不代表我推薦其中的商品或服務，也不會影響文章內容與計算結果。
          </p>
          <p>
            廣告如何使用 Cookie，請看
            <Link href="/privacy" className={linkClass}>
              隱私政策
            </Link>
            ；計算結果與文章的使用限制，請看
            <Link href="/disclaimer" className={linkClass}>
              免責聲明
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="聯絡我">
          <p>
            Email：
            <a href="mailto:japantaxcalc@gmail.com" className={linkClass}>
              japantaxcalc@gmail.com
            </a>
            ，通常會在 7 天內回覆。也可以到
            <Link href="/contact" className={linkClass}>
              聯絡我們
            </Link>
            頁面看回報錯誤時要附上哪些資訊。
          </p>
        </ContentCard>
      </Section>
    </Layout>
  );
}
