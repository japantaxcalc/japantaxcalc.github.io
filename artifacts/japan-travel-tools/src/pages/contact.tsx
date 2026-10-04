import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ContentCard, { Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";

export default function Contact() {
  useSeo({
    title: "聯絡我們",
    description:
      "寫信給日本旅遊工具箱：回報內容錯誤、計算工具問題、功能建議或合作洽詢。Email：japantaxcalc@gmail.com，通常 7 天內回覆。",
  });

  return (
    <Layout>
      <Hero
        eyebrow="聯絡我們"
        title="聯絡我們"
        description="發現資訊有誤、計算機算得怪怪的，或想看到新的工具，都歡迎寫信給我。"
      />

      <Section>
        <ContentCard title="Email">
          <p className="text-lg font-semibold text-[var(--jp-ink)] sm:text-xl">
            <a href="mailto:japantaxcalc@gmail.com" className="underline decoration-[var(--jp-accent)] underline-offset-4">
              japantaxcalc@gmail.com
            </a>
          </p>
          <p>網站由 Miff 一個人維護，通常會在 7 天內回覆。</p>
        </ContentCard>

        <ContentCard title="回報錯誤時，附上這些會更快">
          <ul className="list-disc space-y-1 pl-5">
            <li>哪一頁、哪一段內容（附上網址更好）</li>
            <li>你知道的正確資訊和來源，例如官方網站連結、店家公告的照片</li>
            <li>如果是計算機的問題：你輸入的數字，以及你預期的結果</li>
          </ul>
        </ContentCard>

        <ContentCard title="特別歡迎的回報：新制實際流程">
          <p>
            日本自 2026 年 11 月 1 日起改採先付後退的退稅新制，各店家和機場的實際做法，可能和官方說明有出入。如果你剛從日本回來，願意分享退稅的實際流程（例如店家怎麼結帳、機場在哪裡辦理、退款多久入帳），對其他讀者會很有幫助。
          </p>
        </ContentCard>

        <ContentCard title="合作洽詢">
          <p>歡迎旅遊、支付、票券相關的合作提案，請在信件主旨註明「合作洽詢」。如有合作內容，會在文章中清楚標示。</p>
        </ContentCard>

        <ContentCard title="其他說明">
          <p>
            想了解網站是誰做的、內容怎麼查核，請看
            <Link href="/about" className={linkClass}>
              關於我們
            </Link>
            ；本站如何處理 Cookie 與你寄來的信件，請看
            <Link href="/privacy" className={linkClass}>
              隱私政策
            </Link>
            ；計算結果的使用限制，請看
            <Link href="/disclaimer" className={linkClass}>
              免責聲明
            </Link>
            。
          </p>
        </ContentCard>
      </Section>
    </Layout>
  );
}
