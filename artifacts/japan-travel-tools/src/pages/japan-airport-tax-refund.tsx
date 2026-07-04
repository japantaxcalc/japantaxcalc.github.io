import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const FAQS = [
  { q: "日本退稅一定要在機場嗎？", a: "目前大多數店家可直接免稅，但 2026 新制後將改為機場統一退稅。" },
  { q: "日本退稅商品可以托運嗎？", a: "可以，但若海關抽查時無法出示商品，可能需要補稅。" },
  { q: "日本退稅會檢查商品嗎？", a: "部分情況下海關可能抽查，尤其是高價商品或消耗品。" },
  { q: "日本退稅會退現金嗎？", a: "依店家規定不同，有些直接折抵，有些會退現金或退刷信用卡。" },
  { q: "日本退稅需要多久？", a: "目前多數店家可於結帳時直接完成，未來 2026 新制後，機場退稅時間可能增加。" },
];

export default function JapanAirportTaxRefund() {
  useSeo({
    title: "日本機場退稅流程｜成田、羽田、關西機場退稅教學",
    description:
      "整理日本機場退稅流程、成田機場與關西機場退稅方式、日本退稅是否一定要在機場辦理，以及2026日本退稅新制差異。",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });

  return (
    <Layout>
      <Hero
        eyebrow="實用流程"
        title="日本機場退稅流程｜2026 最新教學"
        description="成田、羽田、關西機場退稅教學，整理機場退稅五大步驟與新舊制差異。"
      />

      <Section>
        <ContentCard>
          <p>
            許多人第一次去日本自由行時，都會搞不清楚：「日本退稅一定要在機場嗎？」「退稅商品可以托運嗎？」「2026
            新制是不是全部改到機場退稅？」
          </p>
          <p>其實目前日本大多數免稅店，都可以直接於結帳時完成免稅，不一定需要到機場辦理。</p>
          <p>但日本政府預計將於 2026 年 11 月 1 日起，正式改為「先付後退」制度，未來旅客需於機場或港口出境時，統一辦理退稅。</p>
          <p>
            如果想先快速計算退稅後價格，也可以直接使用本站的：
            <Link href="/" className="font-medium text-[var(--jp-accent)] underline">
              日本退稅計算機
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本退稅一定要在機場嗎？">
          <p>目前日本大部分免稅店，都能直接於購物時免稅，因此現在通常不需要特地到機場退稅。</p>
          <p>常見情況如下：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>藥妝店：結帳直接免稅</li>
            <li>唐吉訶德：直接免稅</li>
            <li>百貨公司：部分需至退稅櫃台辦理</li>
          </ul>
          <p>不過日本預計於 2026 年實施退稅新制後，將改為旅客先支付含稅價格，並於機場統一辦理退稅。</p>
          <p>
            延伸閱讀：
            <Link href="/japan-tax-2026" className="font-medium text-[var(--jp-accent)] underline">
              2026 日本退稅新制整理
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本機場退稅流程">
          <p className="font-medium text-[var(--jp-ink)]">Step 1：購買免稅商品</p>
          <p>於標有「Japan Tax-Free Shop」的店家購物，並符合免稅門檻即可辦理退稅。目前一般免稅門檻為：未稅滿 5000 日圓以上。</p>
          <p className="font-medium text-[var(--jp-ink)]">Step 2：保留商品與收據</p>
          <p>部分商品（尤其消耗品）可能需要保留完整包裝，並攜帶出境。部分百貨公司也會需要提供收據。</p>
          <p className="font-medium text-[var(--jp-ink)]">Step 3：出境前準備護照</p>
          <p>辦理退稅時，通常需要出示：護照、免稅商品、購物收據。部分旅客也會使用 Visit Japan Web 的免稅 QR Code。</p>
          <p className="font-medium text-[var(--jp-ink)]">Step 4：海關確認商品</p>
          <p>若海關抽查，旅客可能需要出示免稅商品。因此建議不要將所有免稅商品提早托運。</p>
          <p className="font-medium text-[var(--jp-ink)]">Step 5：完成退稅</p>
          <p>依店家與未來新制規定不同，退稅可能：直接扣除稅金、退現金、退刷至信用卡，或於機場統一退稅。</p>
        </ContentCard>

        <ContentCard title="2026 日本退稅新制差異">
          <DataTable
            headers={["項目", "現行制度", "2026 新制"]}
            rows={[
              ["退稅時機", "結帳時直接免稅", "先支付含稅價格，出境後退稅"],
              ["退稅地點", "店家或百貨退稅櫃台", "機場或港口統一退稅"],
              ["商品分類", "分一般商品與消耗品", "取消分類"],
              ["消耗品包裝", "需密封包裝", "取消密封限制"],
              ["免稅上限", "部分商品上限 50 萬日圓", "取消上限"],
            ]}
          />
        </ContentCard>

        <ContentCard title="日本機場退稅常見問題 FAQ">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ContentCard>

        <ContentCard title="延伸閱讀">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/" className="text-[var(--jp-accent)] underline">
                日本退稅計算機
              </Link>
            </li>
            <li>
              <Link href="/guide" className="text-[var(--jp-accent)] underline">
                日本退稅教學
              </Link>
            </li>
            <li>
              <Link href="/japan-tax-2026" className="text-[var(--jp-accent)] underline">
                2026 日本退稅新制
              </Link>
            </li>
            <li>
              <Link href="/japan-tax-8-vs-10" className="text-[var(--jp-accent)] underline">
                日本 8% vs 10% 消費稅差異
              </Link>
            </li>
            <li>
              <Link href="/japan-card-fee" className="text-[var(--jp-accent)] underline">
                日本海外刷卡手續費計算
              </Link>
            </li>
          </ul>
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-airport-tax-refund" />
      <ArticleCards currentPath="/japan-airport-tax-refund" />
    </Layout>
  );
}
