import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { articleJsonLd, useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";
const strong = "text-[var(--jp-ink)]";

const FAQS = [
  { q: "日本便利商店可以退稅嗎？", a: "部分門市有免稅服務，但不是每一家都有。可以先看門口或收銀台有沒有免稅標誌。" },
  { q: "唐吉訶德可以退稅嗎？", a: "多數唐吉訶德門市有免稅服務，一樣要符合同一天、同一家店未稅 5,000 日圓以上的門檻。" },
  { q: "免稅一定要護照嗎？", a: "需要。在免稅店結帳時要出示護照；2026 年 11 月 1 日以後購買的，出境時也要在機場刷護照完成海關確認。" },
  {
    q: "日本機場可以辦理退稅嗎？",
    a: "2026 年 11 月 1 日以後在市區免稅店買的東西，要在出境時於機場完成海關確認才能退稅。另外，機場出境區的 Duty Free 免稅店是直接用免稅價購買，不需要另外辦退稅。",
  },
];

const SOURCES = [
  { href: "https://www.mlit.go.jp/kankocho/tax-free/", label: "日本觀光廳：Japan Tax-free Shop（免稅店制度）" },
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html",
    label: "日本觀光廳：What is the Refund Method?",
  },
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00027.html",
    label: "日本觀光廳：Frequently Asked Questions for Travelers (Refund Method)",
  },
  { href: "https://www.japan.travel/en/plan/japans-tax-exemption/", label: "JNTO 日本國家旅遊局：Japan's Tax Exemption" },
];

export default function JapanDutyFreeGuide() {
  useSeo({
    title: "日本免稅店攻略｜哪些店可以退稅？Duty Free 與 Tax Free 差異一次看懂",
    description:
      "日本免稅店攻略：Tax Free 與 Duty Free 差異、哪些店可以退稅、Japan Tax-free Shop 標誌、未稅 5,000 日圓門檻，以及 2026/11/1 新制之後在店裡結帳的改變。",
    jsonLd: [
      articleJsonLd({
        path: "/japan-duty-free-guide",
        headline: "日本免稅店攻略｜哪些店可以退稅？",
        description: "Tax Free 與 Duty Free 差異、哪些店可以退稅、免稅標誌、門檻，以及 2026/11/1 新制之後在店裡結帳的改變。",
        published: "2026-06-08",
        modified: "2026-10-05",
      }),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  return (
    <Layout>
      <Hero
        eyebrow="購物攻略"
        title="日本免稅店攻略｜哪些店可以退稅？"
        description="Tax Free 跟 Duty Free 差在哪、怎麼認出免稅店、門檻多少，還有 11/1 新制之後在店裡結帳會變怎樣，一篇看懂 🛍️"
        author="Miff"
        updated="2026年10月"
      />

      <Section>
        <ContentCard>
          <p>在日本逛街一定常看到 Tax Free、Duty Free 這兩種牌子，很多人以為是一樣的東西，其實差蠻多的喔。</p>
          <p>
            這篇幫你整理免稅店的種類、怎麼認出免稅店、門檻怎麼算，還有 2026 年 11 月 1 日新制上路後，在店裡結帳會有什麼改變。規定的部分我都照日本觀光廳的公告寫，來源放在最下面。
          </p>
        </ContentCard>

        <ContentCard title="Tax Free 與 Duty Free 有什麼不同？">
          <DataTable
            headers={["類型", "免什麼", "常見地點", "怎麼買"]}
            rows={[
              ["Tax Free", "日本消費稅", "市區的藥妝店、百貨公司、電器行等", "達到門檻、出示護照"],
              ["Duty Free", "消費稅以及關稅、酒稅等", "機場出境區（出境審查之後）", "出示登機證"],
            ]}
          />
          <p>
            一般在市區逛街，碰到的幾乎都是 Tax Free。Duty Free 則是出境之後在機場裡面的免稅店，價格已經是免稅價，不用另外辦退稅。
          </p>
        </ContentCard>

        <ContentCard title="日本哪些店可以退稅？">
          <p>只要是登記為免稅店（Tax-free Shop）的店家都可以，像是：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>唐吉訶德（Don Quijote）</li>
            <li>Bic Camera、Yodobashi Camera 等電器行</li>
            <li>松本清、大國藥妝等藥妝店</li>
            <li>高島屋、伊勢丹、三越等百貨公司</li>
          </ul>
          <p>
            不過同一個品牌，也不是每間分店都有免稅服務，結帳前先看一下門口或收銀台有沒有免稅標誌比較保險。想知道退稅的完整規則，可以看
            <Link href="/guide" className={linkClass}>
              日本退稅完整教學
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="如何辨認日本免稅店？">
          <p>日本觀光廳有一個官方的免稅店標誌（Japan Tax-free Shop 的シンボルマーク），免稅店通常會貼在門口、收銀台或免稅櫃台附近。</p>
          <p>看到這個標誌，就代表這家店可以辦免稅。沒看到的話，直接問店員「Tax free OK?」也可以啦 😂</p>
        </ContentCard>

        <ContentCard title="日本免稅門檻是多少？">
          <DataTable
            headers={["項目", "10/31 以前購買", "11/1 以後購買"]}
            rows={[
              ["門檻", "同一天、同一家店，未稅 5,000 日圓以上", "不變"],
              ["商品分類", "一般物品、消耗品分開計算", "取消分類，合併計算"],
              ["消耗品上限", "未稅 50 萬日圓", "取消，以自己能帶出境為限"],
            ]}
          />
          <p>
            門檻看的是「未稅」金額，含稅價要先除以 1.1（食品是 1.08）才知道有沒有到 5,000 日圓喔。買了好幾家店的話，可以用
            <Link href="/shopping-trip-estimator" className={linkClass}>
              購物清單試算器
            </Link>
            一次檢查。
          </p>
        </ContentCard>

        <ContentCard title="11/1 新制之後，在店裡結帳有什麼改變？">
          <p>2026 年 11 月 1 日以後，在免稅店買東西會變成這樣：</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>用含稅價結帳，一樣要出示護照。</li>
            <li>店家會說明怎麼登錄退款方式，例如銀行轉帳、退回信用卡、App 退款，或在出境港領現金，各店提供的方式不同。</li>
            <li>購買日起 90 天內出境，在機場托運前完成海關確認。</li>
            <li>確認之後，由店家或店家委託的退款業者退稅。</li>
          </ol>
          <p>
            所以 11/1 之後，在店裡最重要的就是兩件事：<b className={strong}>問清楚退款怎麼拿</b>，還有
            <b className={strong}>收據跟商品一起收好</b> 🧾 機場那一段怎麼辦，我整理在
            <Link href="/japan-airport-tax-refund" className={linkClass}>
              日本機場退稅流程
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="日本免稅店常見問題 FAQ">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
          <p>
            延伸閱讀：
            <Link href="/japan-tax-2026" className={linkClass}>
              2026 日本退稅新制整理
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="參考來源">
          <ul className="list-disc space-y-1 pl-5">
            {SOURCES.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className={linkClass}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>以上依 2026 年 10 月查到的官方公告整理。各店是否提供免稅服務，以店家現場公告為準。</p>
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-duty-free-guide" />
      <ArticleCards currentPath="/japan-duty-free-guide" />
    </Layout>
  );
}
