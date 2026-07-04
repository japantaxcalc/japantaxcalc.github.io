import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const FAQS = [
  { q: "日本便利商店可以退稅嗎？", a: "部分大型便利商店門市提供免稅服務，但並非所有分店皆可辦理。" },
  { q: "唐吉訶德可以退稅嗎？", a: "可以，大部分唐吉訶德門市皆提供免稅服務，但需符合最低消費門檻。" },
  { q: "免稅一定要護照嗎？", a: "需要，結帳時通常需出示護照，部分店家也接受 Visit Japan Web 免稅 QR Code。" },
  { q: "日本機場可以辦理退稅嗎？", a: "目前大部分退稅是在購買時完成，但 2026 年新制後將改為機場統一退稅。" },
];

export default function JapanDutyFreeGuide() {
  useSeo({
    title: "日本免稅店攻略｜哪些店可以退稅？Duty Free 與 Tax Free 差異一次看懂",
    description:
      "日本免稅店攻略，整理 Tax Free 與 Duty Free 差異、日本哪些商店可以退稅、免稅店標誌、退稅門檻與注意事項。",
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
        eyebrow="購物攻略"
        title="日本免稅店攻略｜哪些店可以退稅？"
        description="整理 Tax Free 與 Duty Free 差異、日本哪些商店可以退稅，以及免稅店標誌辨認方式。"
      />

      <Section>
        <ContentCard>
          <p>許多旅客到日本旅遊時，經常看到 Tax Free、Duty Free 等標示，卻不清楚兩者之間有什麼差異。</p>
          <p>本篇整理日本免稅店種類、退稅資格、常見免稅商店與購物注意事項，讓第一次到日本購物也能輕鬆搞懂！</p>
        </ContentCard>

        <ContentCard title="Tax Free 與 Duty Free 有什麼不同？">
          <DataTable
            headers={["類型", "說明"]}
            rows={[
              ["Tax Free", "免除日本消費稅（最常見）"],
              ["Duty Free", "免除關稅與消費稅，多見於機場免稅店"],
            ]}
          />
          <p>一般旅客在日本市區購物時，最常接觸到的是 Tax Free，例如藥妝店、百貨公司與電器行等。</p>
        </ContentCard>

        <ContentCard title="日本哪些店可以退稅？">
          <p>常見可辦理免稅的商店包括：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>唐吉訶德（Don Quijote）</li>
            <li>Bic Camera</li>
            <li>Yodobashi Camera</li>
            <li>松本清</li>
            <li>大國藥妝</li>
            <li>高島屋百貨</li>
            <li>伊勢丹百貨</li>
            <li>三越百貨</li>
          </ul>
          <p>實際仍需以店家是否具有免稅資格為準，結帳前可先確認是否有免稅標誌。</p>
          <p>
            延伸閱讀：
            <Link href="/guide" className="font-medium text-[var(--jp-accent)] underline">
              日本退稅完整攻略
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="如何辨認日本免稅店？">
          <p>具有免稅資格的商店，通常會貼有紅白色的 Japan Tax-Free Shop 標誌。</p>
          <p>購物前可先查看店門口、收銀台附近或免稅櫃檯標示。</p>
        </ContentCard>

        <ContentCard title="日本免稅門檻是多少？">
          <DataTable
            headers={["商品類型", "免稅門檻"]}
            rows={[
              ["一般商品", "未稅 5,000 日圓以上"],
              ["消耗品", "未稅 5,000 日圓以上"],
            ]}
          />
          <p>符合資格的外國旅客，在免稅店購物達門檻後即可享有免稅優惠。</p>
          <p>日本預計自 2026 年 11 月起改採「先付後退」制度，相關規定未來可能再調整。</p>
          <p>
            延伸閱讀：
            <Link href="/japan-tax-2026" className="font-medium text-[var(--jp-accent)] underline">
              2026 日本退稅新制
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本免稅店常見問題 FAQ">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
          <p>
            延伸閱讀：
            <Link href="/japan-airport-tax-refund" className="font-medium text-[var(--jp-accent)] underline">
              日本機場退稅指南
            </Link>
          </p>
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-duty-free-guide" />
      <ArticleCards currentPath="/japan-duty-free-guide" />
    </Layout>
  );
}
