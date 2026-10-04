import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ContentCard, { Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";

export default function Disclaimer() {
  useSeo({
    title: "免責聲明",
    description:
      "日本旅遊工具箱的計算結果與文章僅供旅遊規劃參考，不構成稅務、法律或財務建議；退稅規定、匯率與手續費以日本官方、店家與發卡銀行公告為準。",
  });

  return (
    <Layout>
      <Hero
        eyebrow="免責聲明"
        title="免責聲明"
        description="使用本站的計算工具與文章前，請先閱讀以下說明。"
        updated="2026年10月"
      />

      <Section>
        <ContentCard title="資訊僅供參考">
          <p>
            本站內容是為一般旅客整理的旅遊與購物資訊，不構成稅務、法律或財務建議。日本的退稅制度、交通、店家營業資訊與機場設施可能隨時調整，請以日本觀光廳、日本國稅廳、機場、交通業者與店家的最新公告為準。
          </p>
        </ContentCard>

        <ContentCard title="計算工具的限制">
          <ul className="list-disc space-y-1 pl-5">
            <li>計算結果是依你輸入的金額、稅率、手續費率與匯率估算的參考值。</li>
            <li>實際的退稅金額、退稅手續費與退款方式，依各免稅店或退款業者的規定。</li>
            <li>信用卡帳單金額依發卡組織請款日的匯率與發卡銀行的規定計算，可能和試算結果不同。</li>
            <li>是否達到免稅門檻、商品是否適用免稅，以店家與海關的判斷為準。</li>
          </ul>
        </ContentCard>

        <ContentCard title="關於 2026 年退稅新制">
          <p>
            日本自 2026 年 11 月 1 日起改採先付後退的退稅方式（Refund 方式）。本站依官方公布的資料整理，但實施初期的細節與各店家做法可能陸續調整，出發前請再次確認官方與購買店家的說明。
          </p>
        </ContentCard>

        <ContentCard title="外部連結與廣告">
          <p>
            本站連到的外部網站，內容由各網站自行負責。頁面上的廣告由 Google AdSense 等第三方提供，不代表本站推薦或保證其商品與服務。
          </p>
        </ContentCard>

        <ContentCard title="責任限制">
          <p>本站會盡力維持內容正確，但不保證資訊完全無誤或即時。因使用本站資訊或工具而產生的任何損失，本站不負賠償責任。</p>
        </ContentCard>

        <ContentCard title="發現錯誤？">
          <p>
            歡迎寫信到{" "}
            <a href="mailto:japantaxcalc@gmail.com" className={linkClass}>
              japantaxcalc@gmail.com
            </a>{" "}
            或透過
            <Link href="/contact" className={linkClass}>
              聯絡我們
            </Link>
            告訴我，確認後會盡快更新。
          </p>
        </ContentCard>
      </Section>
    </Layout>
  );
}
