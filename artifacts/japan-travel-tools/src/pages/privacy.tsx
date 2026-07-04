import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ContentCard, { Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

export default function Privacy() {
  useSeo({
    title: "隱私政策",
    description:
      "日本旅遊工具箱隱私政策，說明本站如何處理 Cookie、廣告服務與使用者資料，以及第三方服務（如 Google AdSense）的資料使用方式。",
  });

  return (
    <Layout>
      <Hero eyebrow="隱私政策" title="隱私政策" description="說明本站如何處理你的瀏覽資料與 Cookie。" />

      <Section>
        <ContentCard title="我們收集哪些資料">
          <p>
            日本旅遊工具箱是一個純前端的計算工具網站，你在退稅計算機、匯率換算或刷卡手續費計算機中輸入的金額、稅率與匯率，都只會在你的瀏覽器中進行計算，不會被傳送到我們的伺服器或儲存下來。我們不會要求你註冊帳號，也不會主動收集姓名、電話、Email
            等個人識別資料。
          </p>
        </ContentCard>

        <ContentCard title="Cookie 與第三方廣告服務">
          <p>
            本網站可能使用第三方廣告服務（如 Google AdSense）在頁面上顯示廣告內容。這些第三方服務可能會使用 Cookie
            或類似技術，根據你先前造訪本站或其他網站的紀錄，顯示與你興趣相關的廣告內容。
          </p>
          <p>
            Google 及其合作夥伴可能會使用 Cookie 提供廣告服務。如果你想了解 Google 如何使用這些資料，或想調整個人化廣告設定，可以參考
            Google 官方的
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--jp-accent)] underline"
            >
              廣告技術合作夥伴政策
            </a>
            。你也可以透過瀏覽器設定停用或清除第三方 Cookie。
          </p>
        </ContentCard>

        <ContentCard title="網站流量分析">
          <p>
            我們可能使用網站流量分析工具，了解訪客大致的瀏覽行為（例如瀏覽哪些頁面、停留時間），以協助我們改善網站內容與使用體驗。這類統計資料通常是匿名且彙總的，不會用於識別特定個人身份。
          </p>
        </ContentCard>

        <ContentCard title="外部連結">
          <p>
            本站文章中可能包含連往日本官方機構、百貨公司或其他第三方網站的連結，這些外部網站有各自獨立的隱私政策，本站不對其內容或資料處理方式負責，建議你在使用前先閱讀該網站的隱私權說明。
          </p>
        </ContentCard>

        <ContentCard title="政策更新">
          <p>
            我們可能會不時更新本隱私政策，以反映網站功能或法規上的變化。若有重大變更，我們會在本頁面公告最新版本。建議你偶爾回來查看本頁面以了解最新規定。
          </p>
          <p>
            如果你對本隱私政策有任何疑問，歡迎透過
            <Link href="/contact" className="font-medium text-[var(--jp-accent)] underline">
              聯絡我們
            </Link>
            頁面與我們聯繫。
          </p>
        </ContentCard>
      </Section>
    </Layout>
  );
}
