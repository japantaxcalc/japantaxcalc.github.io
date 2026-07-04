import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { FaqItem, Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const FAQS = [
  { q: "日本退稅一定要護照嗎？", a: "需要。大部分免稅商店在結帳時都會要求出示護照正本以確認旅客身份。" },
  { q: "日本退稅門檻是多少？", a: "一般情況下，同一天於同一家店購買商品，未稅金額滿 5000 日圓即可符合退稅資格。" },
  { q: "日本退稅是 8% 還是 10%？", a: "依商品類型而定。一般商品多適用 10% 消費稅，部分食品與飲料則可能適用 8% 稅率。" },
  { q: "日本退稅商品可以拆封嗎？", a: "一般商品通常可以立即使用，但部分消耗品完成退稅後應保留封裝，並於離境後再拆封使用。" },
  { q: "日本退稅會直接退現金嗎？", a: "依店家規定而定。有些店家直接以免稅價格結帳，有些百貨公司則需至退稅櫃台辦理退款。" },
  { q: "2026 日本退稅新制是什麼？", a: "日本政府規劃自 2026 年 11 月起推動先付後退制度，旅客需先支付含稅價格，再於離境時申請退稅。" },
  { q: "百貨公司退稅為什麼沒有拿回完整 10%？", a: "部分百貨公司會收取約 1% 至 1.55% 的退稅服務費，因此實際拿回的金額可能低於理論退稅金額。" },
  { q: "日本刷卡退稅後還會有額外費用嗎？", a: "可能會。部分信用卡會收取約 1% 至 2% 的海外交易手續費，因此實際支出需同時考量退稅與刷卡成本。" },
];

export default function Guide() {
  useSeo({
    title: "日本退稅教學｜2026 最新免稅規則、退稅流程與計算方式",
    description:
      "2026 最新日本退稅教學，整理日本免稅規則、退稅流程、2026 日本退稅新制、8%與10%消費稅差異、百貨公司手續費與信用卡海外刷卡費。",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "日本退稅教學｜2026 最新免稅規則、退稅流程與退稅計算完整指南",
        description:
          "2026 最新日本退稅教學，整理日本退稅規則、日本免稅資格、退稅流程、2026 日本退稅新制、百貨公司手續費與退稅計算方式。",
        author: { "@type": "Organization", name: "日本旅遊工具箱" },
        publisher: { "@type": "Organization", name: "日本旅遊工具箱" },
        datePublished: "2026-06-08",
        dateModified: "2026-06-08",
        inLanguage: "zh-TW",
        keywords: [
          "日本退稅",
          "日本退稅教學",
          "日本免稅",
          "日本退稅計算",
          "日本退稅流程",
          "2026日本退稅新制",
          "日本消費稅",
          "日本購物退稅",
        ],
      },
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
        eyebrow="完整教學"
        title="日本退稅教學｜2026 最新免稅規則、退稅流程與退稅計算完整指南"
        description="從資格條件、退稅門檻到百貨手續費，一篇搞懂日本退稅所有細節。"
        updated="2026年6月"
      />

      <Section>
        <ContentCard>
          <p>
            日本一直是台灣旅客最熱門的旅遊國家之一，無論是東京、大阪、京都、北海道還是沖繩，每年都有大量旅客前往日本旅遊與購物。由於日本實施消費稅制度，因此許多人在日本購物時最關心的問題之一，就是「日本退稅怎麼算」、「日本退稅門檻是多少」以及「2026
            日本退稅新制會如何影響旅客」。
          </p>
          <p>
            本篇文章整理日本退稅教學、日本免稅規則、日本退稅流程、日本消費稅制度、百貨公司退稅手續費、信用卡海外刷卡費，以及 2026
            日本退稅新制內容。
          </p>
          <p>如果你想快速計算購物後實際可省下多少金額，可以直接使用本站的：</p>
          <p>
            <Link href="/" className="font-medium text-[var(--jp-accent)] underline">
              👉 日本退稅計算機
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本退稅是什麼？">
          <p>
            日本退稅（Tax Free Shopping）是日本政府提供給短期停留外國旅客的一項購物優惠制度。符合資格的旅客在指定免稅商店購物時，可以免除日本消費稅，因此實際支付的金額會比一般日本居民更低。
          </p>
          <p>許多人會把日本退稅與日本免稅混用。實際上兩者意思相近，都是指外國旅客在符合規定的情況下，可以免除部分或全部消費稅。</p>
          <p>目前日本主要消費稅率為：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>10%（一般商品）</li>
            <li>8%（部分食品與飲料）</li>
          </ul>
          <p>因此旅客在購買服飾、電器、精品、藥妝與生活用品時，往往能透過退稅節省不少開銷。</p>
        </ContentCard>

        <ContentCard title="誰可以辦理日本退稅？">
          <p>並非所有人都能享有日本退稅優惠。根據日本現行規定，通常需要符合以下條件：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>非日本居民</li>
            <li>持短期停留簽證入境</li>
            <li>停留時間未超過規定期限</li>
            <li>購買商品將攜帶離開日本</li>
          </ul>
          <p>台灣旅客以觀光身份赴日旅遊時，通常都符合日本退稅資格。</p>
          <p>結帳時店員通常會要求出示護照，因此建議旅客購物時務必攜帶護照正本。</p>
        </ContentCard>

        <ContentCard title="日本退稅門檻是多少？">
          <p>目前日本免稅制度最重要的條件之一，就是購物金額必須達到規定門檻。一般情況下：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>同一天</li>
            <li>同一家店</li>
            <li>未稅金額滿 5,000 日圓</li>
          </ul>
          <p>即可辦理退稅。</p>
          <p>舉例來說，如果你在東京的 Bic Camera 購買耳機與相機配件，只要同一天於同一家分店累積購買金額超過規定門檻，即有機會享受免稅優惠。</p>
          <p>如果未達退稅門檻，則必須支付完整消費稅。</p>
        </ContentCard>

        <ContentCard title="一般商品與消耗品有什麼差異？">
          <p>日本退稅制度將商品大致分成兩類：一般商品與消耗品。</p>
          <p className="font-medium text-[var(--jp-ink)]">一般商品</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>服飾</li>
            <li>鞋子</li>
            <li>電器</li>
            <li>包包</li>
            <li>精品</li>
          </ul>
          <p>一般商品完成退稅後可以直接使用。</p>
          <p className="font-medium text-[var(--jp-ink)]">消耗品</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>藥妝</li>
            <li>保健食品</li>
            <li>食品</li>
            <li>飲料</li>
            <li>化妝品</li>
          </ul>
          <p>消耗品退稅後通常會被封裝，依規定應於離境後再拆封使用。如果於日本境內提前拆封，理論上可能影響退稅資格。</p>
        </ContentCard>

        <ContentCard title="日本退稅流程教學">
          <p>目前大部分旅客在日本購物時會遇到兩種退稅模式：</p>
          <p className="font-medium text-[var(--jp-ink)]">方式一：直接免稅</p>
          <p>店家在結帳時直接扣除消費稅。旅客只需支付未稅價格。這是目前最方便也最常見的方式。</p>
          <p className="font-medium text-[var(--jp-ink)]">方式二：退稅櫃台辦理</p>
          <p>部分百貨公司會先收取含稅價格，之後再前往退稅櫃台申請退款。常見流程如下：</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>購買商品</li>
            <li>保留收據</li>
            <li>前往退稅櫃台</li>
            <li>出示護照</li>
            <li>辦理退稅</li>
            <li>領取退稅金額</li>
          </ol>
        </ContentCard>

        <ContentCard title="日本退稅怎麼算？">
          <p>許多旅客最常搜尋的問題就是：日本退稅怎麼算？</p>
          <p>如果商品適用 10% 消費稅：含稅價格 ÷ 1.1 = 未稅價格。例如：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>11,000 日圓（含稅）</li>
            <li>未稅價格約 10,000 日圓</li>
            <li>退稅金額約 1,000 日圓</li>
          </ul>
          <p>若商品適用 8% 消費稅：含稅價格 ÷ 1.08 = 未稅價格。不同商品適用稅率不同，因此實際退稅金額也會有所差異。</p>
          <p>
            延伸閱讀：
            <Link href="/japan-tax-8-vs-10" className="font-medium text-[var(--jp-accent)] underline">
              日本消費稅 8% 與 10% 差異
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="百貨公司退稅手續費">
          <p>許多旅客以為退稅等於完全拿回消費稅，但實際情況並非如此。部分百貨公司會收取退稅服務費。常見費率約：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>1%</li>
            <li>1.1%</li>
            <li>1.55%</li>
          </ul>
          <p>因此即使商品稅率為 10%，實際到手退稅金額可能低於理論值。想快速估算實際支付金額，可以直接使用本站的：</p>
          <p>
            <Link href="/" className="font-medium text-[var(--jp-accent)] underline">
              日本退稅計算機
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="信用卡海外刷卡手續費">
          <p>除了退稅手續費，使用信用卡在日本消費時，通常也會產生海外交易手續費，大部分台灣銀行約收取 1%~2%。</p>
          <p>
            延伸閱讀：
            <Link href="/japan-card-fee" className="font-medium text-[var(--jp-accent)] underline">
              日本海外刷卡手續費計算機
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="2026 日本退稅新制">
          <p>
            日本政府預計自 2026 年 11 月 1 日起，將現行「結帳即時免稅」制度改為「先付後退」，旅客需先支付含稅價格，並於機場或港口出境時統一辦理退稅。
          </p>
          <p>
            延伸閱讀：
            <Link href="/japan-tax-2026" className="font-medium text-[var(--jp-accent)] underline">
              2026 日本退稅新制完整整理
            </Link>{" "}
            ／{" "}
            <Link href="/japan-airport-tax-refund" className="font-medium text-[var(--jp-accent)] underline">
              日本機場退稅流程教學
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本退稅常見問題 FAQ">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ContentCard>
      </Section>

      <ToolCards currentPath="/guide" />
      <ArticleCards currentPath="/guide" />
    </Layout>
  );
}
