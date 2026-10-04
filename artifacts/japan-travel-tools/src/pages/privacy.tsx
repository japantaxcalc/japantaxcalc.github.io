import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ContentCard, { Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

export default function Privacy() {
  useSeo({
    title: "隱私政策",
    description:
      "日本旅遊工具箱隱私政策：計算工具不收集你輸入的資料、Google AdSense 廣告 Cookie 的使用方式與停用個人化廣告的方法，以及歐洲訪客的 Cookie 同意訊息。",
  });

  return (
    <Layout>
      <Hero
        eyebrow="隱私政策"
        title="隱私政策"
        description="說明本站會處理哪些資料、第三方服務如何使用 Cookie，以及你可以怎麼選擇。"
        updated="2026年10月"
      />

      <Section>
        <ContentCard title="本站收集哪些資料">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              你在退稅計算機、匯率換算、刷卡手續費計算機和購物清單試算器輸入的金額與匯率，都只在你的瀏覽器裡計算，不會傳送到任何伺服器，也不會被儲存。
            </li>
            <li>本站沒有會員註冊，不會要求你提供姓名、電話、Email 等個人資料。</li>
          </ul>
        </ContentCard>

        <ContentCard title="Cookie 與 Google AdSense 廣告">
          <p>本站使用 Google AdSense 顯示廣告：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>第三方供應商（包括 Google）會使用 Cookie，根據使用者先前造訪本站或其他網站的紀錄放送廣告。</li>
            <li>
              Google 使用廣告 Cookie，讓 Google 及其合作夥伴能依據使用者造訪本站及／或網際網路上其他網站的情況，向使用者放送廣告。
            </li>
            <li>
              你可以前往 <ExternalLink href="https://adssettings.google.com/">Google 廣告設定</ExternalLink>{" "}
              停用個人化廣告，也可以到 <ExternalLink href="https://www.aboutads.info/choices/">www.aboutads.info</ExternalLink>{" "}
              停用第三方供應商使用 Cookie 放送個人化廣告。
            </li>
            <li>
              想進一步了解 Google 如何使用這些資料，請參考{" "}
              <ExternalLink href="https://policies.google.com/technologies/partner-sites">
                Google 如何使用合作夥伴網站或應用程式的資訊
              </ExternalLink>
              。
            </li>
          </ul>
          <p>你也可以透過瀏覽器設定，封鎖或清除 Cookie。</p>
        </ContentCard>

        <ContentCard title="歐洲經濟區、英國與瑞士的訪客">
          <p>
            如果你從歐洲經濟區（EEA）、英國或瑞士造訪本站，會先看到經 Google 認證的同意管理平台（CMP）顯示的 Cookie
            同意訊息，你可以選擇是否同意本站與廣告合作夥伴使用 Cookie。
          </p>
        </ContentCard>

        <ContentCard title="網站流量分析">
          <p>
            本站目前沒有使用 Google Analytics 或其他流量分析工具。我會透過 Google Search Console 查看網站在 Google
            搜尋中的曝光與點擊次數，這些是 Google 提供的彙總統計，不會在你的瀏覽器上設定 Cookie。若日後加入分析工具，會先更新本頁說明。
          </p>
        </ContentCard>

        <ContentCard title="網站主機">
          <p>
            本站由 GitHub Pages 託管。GitHub 可能為了安全與維運目的，記錄訪客的 IP 位址等連線紀錄，詳見{" "}
            <ExternalLink href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub 隱私聲明
            </ExternalLink>
            。
          </p>
        </ContentCard>

        <ContentCard title="寫信給本站">
          <p>
            如果你寫信到 japantaxcalc@gmail.com，我只會用你提供的資訊回覆你，不會提供給第三方，也不會用於行銷。
          </p>
        </ContentCard>

        <ContentCard title="外部連結">
          <p>
            本站文章會連到日本官方機構、百貨公司或其他網站。這些網站有各自的隱私政策，本站無法控制，建議使用前先閱讀該網站的說明。
          </p>
        </ContentCard>

        <ContentCard title="政策更新">
          <p>
            本政策可能因網站功能或法規調整而更新，最新版本會公布在本頁，並更新上方的「最後更新」日期。對本政策有任何疑問，請透過
            <Link href="/contact" className={linkClass}>
              聯絡我們
            </Link>
            與我聯繫。
          </p>
        </ContentCard>
      </Section>
    </Layout>
  );
}
