import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ContentCard, { Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

export default function About() {
  useSeo({
    title: "關於我們",
    description:
      "日本旅遊工具箱由一群常跑日本自由行的旅人整理維護，提供日本退稅計算機、匯率換算與海外刷卡手續費工具，並持續追蹤日本稅制與退稅政策的最新變化。",
  });

  return (
    <Layout>
      <Hero
        eyebrow="關於我們"
        title="關於日本旅遊工具箱"
        description="我們是一群常跑日本自由行的旅人，把每次購物退稅、換匯與刷卡的實際經驗，整理成好用的計算工具與教學文章。"
      />

      <Section>
        <ContentCard title="我們在做什麼">
          <p>
            日本旅遊工具箱提供日本退稅、日幣台幣匯率換算與海外刷卡手續費計算工具，幫助台灣旅客在出發前就能快速估算購物的實際花費。我們相信退稅、匯率與手續費這些數字看起來瑣碎，但加總起來往往影響一次旅行的預算規劃，因此把常見的計算邏輯整理成隨手可用的工具，讓每一位旅人都能把帳算得清清楚楚。
          </p>
          <p>
            除了計算工具，我們也整理了多篇深入的教學文章，包含《日本退稅完整教學》、《2026 日本退稅新制》、《日本消費稅 8% 與 10%
            差異》、《日本免稅店攻略》以及《日本機場退稅流程》，涵蓋從資格條件、退稅門檻、商品分類、百貨公司手續費，到 2026
            年即將上路的先付後退新制。這些內容都以台灣旅客最常遇到的實際購物情境為出發點撰寫。
          </p>
        </ContentCard>

        <ContentCard title="內容從哪裡來">
          <p>
            我們持續參考日本國稅廳（National Tax Agency）公開的消費稅與免稅制度說明、各大百貨公司與商店公告的退稅手續費率，並結合我們每次赴日購物退稅的實際流程與經驗，交叉比對後才整理成文章與計算邏輯。日本的退稅制度與稅率會隨政策調整（例如
            2026 年 11 月即將上路的先付後退新制），我們會持續追蹤相關公告，並更新頁面內容與計算機邏輯，確保資訊盡量貼近最新規定。
          </p>
          <p>
            不過，日本稅制、匯率與各店家手續費仍可能隨時變動，本站計算結果僅供旅遊規劃參考，實際退稅金額、匯率與手續費請以店家、銀行或日本官方公告為準。
          </p>
        </ContentCard>

        <ContentCard title="我們的立場">
          <p>本站不代表任何日本政府機關、百貨公司或信用卡發卡銀行，純粹是旅人整理給旅人的參考工具與筆記。</p>
          <p>
            本站部分頁面可能顯示由 Google AdSense 提供的第三方廣告，廣告收入用於維持網站運作與持續更新內容。若你發現任何資訊有誤或已過時，歡迎透過
            <Link href="/contact" className="font-medium text-[var(--jp-accent)] underline">
              聯絡我們
            </Link>
            頁面告訴我們，我們會盡快確認並更新。
          </p>
        </ContentCard>

        <ContentCard title="快速開始">
          <p>如果你正準備前往日本旅遊，可以先試試看以下工具：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/" className="text-[var(--jp-accent)] underline">
                日本退稅計算機
              </Link>
              ：估算購物退稅金額與最終支付價格
            </li>
            <li>
              <Link href="/yen-to-twd" className="text-[var(--jp-accent)] underline">
                日幣台幣換算
              </Link>
              ：快速換算日圓與台幣
            </li>
            <li>
              <Link href="/japan-card-fee" className="text-[var(--jp-accent)] underline">
                海外刷卡手續費計算機
              </Link>
              ：估算刷卡的實際入帳金額
            </li>
            <li>
              <Link href="/guide" className="text-[var(--jp-accent)] underline">
                日本退稅完整教學
              </Link>
              ：從資格條件到退稅流程一次搞懂
            </li>
          </ul>
        </ContentCard>
      </Section>
    </Layout>
  );
}
