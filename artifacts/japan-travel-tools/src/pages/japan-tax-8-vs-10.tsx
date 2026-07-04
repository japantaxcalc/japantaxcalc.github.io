import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const FAQS = [
  { q: "日本現在消費稅是幾%？", a: "日本目前主要分為 8% 與 10% 兩種消費稅率。" },
  { q: "日本餐廳內用是幾%？", a: "大部分日本餐廳內用適用 10% 消費稅。" },
  { q: "日本外帶為什麼比較便宜？", a: "因為外帶通常適用 8% 的輕減稅率。" },
  { q: "日本藥妝是 8% 還是 10%？", a: "大部分藥妝、化妝品與保養品適用 10% 消費稅。" },
];

export default function JapanTax8Vs10() {
  useSeo({
    title: "日本消費稅 8% 與 10% 差在哪？外帶內用、食品與藥妝完整整理",
    description:
      "日本消費稅為什麼有 8% 與 10%？完整整理日本輕減稅率、外帶內用差異、食品與藥妝稅率，以及日本退稅計算方式。",
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
        eyebrow="稅制知識"
        title="日本消費稅 8% 與 10% 差在哪？"
        description="外帶內用、食品與藥妝完整整理，搞懂日本輕減稅率制度。"
      />

      <Section>
        <ContentCard>
          <p>很多人到日本旅遊時，都會發現有些商品是 8% 消費稅，有些卻是 10%。</p>
          <p>尤其在便利商店、餐廳、藥妝店或百貨公司購物時，經常會看到不同稅率，讓人搞不清楚到底怎麼算。</p>
          <p>
            其實日本目前採用的是：<b className="text-[var(--jp-ink)]">「輕減稅率制度」</b>。
          </p>
          <p>一般商品大多適用 10% 消費稅，但部分食品、飲料與外帶餐點，則可能適用 8% 稅率。</p>
        </ContentCard>

        <ContentCard title="日本 8% 與 10% 消費稅比較">
          <DataTable
            headers={["商品類型", "稅率"]}
            rows={[
              ["衣服、鞋子、包包", "10%"],
              ["電器、3C 商品", "10%"],
              ["藥妝、美妝保養品", "多數 10%"],
              ["食品、飲料", "8%"],
              ["便利商店外帶餐點", "8%"],
              ["餐廳內用", "10%"],
              ["咖啡店 Take Out 外帶", "8%"],
            ]}
          />
        </ContentCard>

        <ContentCard title="為什麼日本會有 8% 與 10%？">
          <p>日本原本消費稅為 8%，但在 2019 年調升至 10%。</p>
          <p>不過為了減少民生負擔，日本政府同時推出「輕減稅率制度」。</p>
          <p>因此部分民生相關商品，像是食品與飲料，仍維持 8% 稅率。</p>
        </ContentCard>

        <ContentCard title="日本外帶與內用稅率差異">
          <p>日本最容易搞混的，其實是「外帶」與「內用」。</p>
          <p>例如同一間咖啡店：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>店內用餐：10%</li>
            <li>Take Out 外帶：8%</li>
          </ul>
          <p>因此在日本結帳時，店員常常會詢問：「店內用餐嗎？」</p>
          <p>如果選擇外帶，通常可以適用 8% 消費稅。</p>
        </ContentCard>

        <ContentCard title="日本藥妝是 8% 還是 10%？">
          <p>很多人會以為藥妝屬於食品，因此適用 8%。</p>
          <p>但其實大部分藥妝、化妝品與保養品，通常仍屬於 10% 消費稅。</p>
          <p>只有部分食品、健康食品與飲料，可能適用 8%。</p>
        </ContentCard>

        <ContentCard title="日本退稅與消費稅關係">
          <p>外國旅客在日本購物時，若符合免稅資格，通常可以免除消費稅。</p>
          <p>因此如果商品原本為 10%，退稅後通常可省下約 10%。</p>
          <p>但部分百貨公司可能會收取 1%、1.1% 或 1.55% 等退稅手續費，因此實際退回金額不一定剛好 10%。</p>
          <p>
            想快速計算退稅後價格，也可以直接使用本站的：
            <Link href="/" className="font-medium text-[var(--jp-accent)] underline">
              日本退稅計算機
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本消費稅怎麼算？">
          <p>若商品未稅價格為 1000 日圓：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>8% 稅率：1080 日圓</li>
            <li>10% 稅率：1100 日圓</li>
          </ul>
          <p>購買食品、飲料與外帶餐點時，通常適用 8% 稅率；衣服、電器、藥妝與餐廳內用，則多數適用 10% 稅率。</p>
        </ContentCard>

        <ContentCard title="日本常見商品稅率整理">
          <DataTable
            headers={["商品", "稅率"]}
            rows={[
              ["UNIQLO 衣服", "10%"],
              ["藥妝", "10%"],
              ["零食", "8%"],
            ]}
          />
        </ContentCard>

        <ContentCard title="FAQ 常見問題">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-tax-8-vs-10" />
      <ArticleCards currentPath="/japan-tax-8-vs-10" />
    </Layout>
  );
}
