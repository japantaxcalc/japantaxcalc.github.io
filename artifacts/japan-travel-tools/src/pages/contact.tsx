import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ContentCard, { Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

export default function Contact() {
  useSeo({
    title: "聯絡我們",
    description: "有任何關於日本退稅、匯率換算或網站內容的問題與建議，都歡迎與日本旅遊工具箱聯絡。",
  });

  return (
    <Layout>
      <Hero eyebrow="聯絡我們" title="聯絡我們" description="有問題、發現錯誤，或想提供建議？我們很樂意聽聽你的想法。" />

      <Section>
        <ContentCard title="我們想聽到你的意見">
          <p>
            日本旅遊工具箱的內容由我們持續整理與更新，但日本的稅制、匯率與各店家手續費規定仍可能隨時間調整。如果你在使用計算工具或閱讀文章時，發現任何資訊有誤、已經過時，或是有不清楚的地方，都非常歡迎讓我們知道。
          </p>
          <p>你也可以告訴我們你在規劃日本旅遊時，還想看到哪些主題的計算工具或教學文章，我們會列入未來更新的參考方向。</p>
        </ContentCard>

        <ContentCard title="聯絡方式">
          <p>
            目前我們主要透過網站內容進行更新與溝通，若你有回饋或問題，建議先確認是否已經在
            <Link href="/guide" className="font-medium text-[var(--jp-accent)] underline">
              日本退稅完整教學
            </Link>
            或各工具頁面的 FAQ 中找到解答。若仍有疑問，也可以透過你取得本網站連結的原始平台（例如社群貼文、論壇留言）留言與我們聯繫，我們會盡量在合理時間內回覆。
          </p>
        </ContentCard>

        <ContentCard title="關於廣告與內容合作">
          <p>
            本站部分頁面顯示由 Google AdSense 提供的第三方廣告，用於維持網站的營運與內容更新。若你對廣告顯示或內容合作有任何疑問，也歡迎一併與我們聯繫。
          </p>
          <p>
            更多關於本站的介紹，可以參考
            <Link href="/about" className="font-medium text-[var(--jp-accent)] underline">
              關於我們
            </Link>
            頁面；若想了解我們如何處理瀏覽資料與 Cookie，可以參考
            <Link href="/privacy" className="font-medium text-[var(--jp-accent)] underline">
              隱私政策
            </Link>
            。
          </p>
        </ContentCard>
      </Section>
    </Layout>
  );
}
