import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { useSeo } from "@/lib/seo";

const FAQS = [
  { q: "2026 日本退稅新制什麼時候開始？", a: "目前預計於 2026 年 11 月 1 日正式上路。" },
  { q: "日本退稅為什麼改制？", a: "主要目的是減少免稅制度濫用並加強商品出境管理。" },
  { q: "未來日本退稅需要去機場嗎？", a: "未來可能需要於機場海關完成退稅程序。" },
];

export default function JapanTax2026() {
  useSeo({
    title: "2026 日本退稅新制｜日本改採先付後退？最新退稅規則整理",
    description:
      "2026 日本退稅新制懶人包，日本將改採先付後退制度。整理日本退稅新規則、機場退稅流程、8%與10%稅率差異與旅客注意事項。",
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
        eyebrow="新制解析"
        title="2026 日本退稅新制｜日本改採先付後退？"
        description="日本政府預計自 2026 年 11 月 1 日起，正式導入新的免稅退稅制度。"
        updated="2026年6月"
      />

      <Section>
        <ContentCard>
          <p>
            如果你最近在查「日本退稅新制」、「日本先付後退」、「2026 日本退稅規定」，那你可能已經看到不少人在討論：日本即將修改免稅制度。
          </p>
          <p>日本政府目前預計於 2026 年 11 月 1 日起，正式導入新的退稅制度。</p>
          <p>最大的改變是：未來旅客在日本購物時，可能需要先支付含稅價格，並於離境時再到機場辦理退稅。</p>
          <p>也就是大家現在常說的「先付後退」制度。</p>
          <p>本篇幫大家整理：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>2026 日本退稅新制重點</li>
            <li>日本退稅新舊制差異</li>
            <li>機場退稅流程</li>
            <li>8% 與 10% 稅率差別</li>
            <li>消耗品與一般商品規定</li>
          </ul>
          <p>
            如果想快速估算退稅後價格，也可以直接使用本站的：
            <Link href="/" className="font-medium text-[var(--jp-accent)] underline">
              日本退稅計算機
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本退稅新制是什麼？">
          <p>目前日本多數免稅店，會直接於結帳時扣除消費稅，旅客當下即可享有免稅價格。</p>
          <p>但 2026 年起，日本預計改採「先付款、後退稅」制度。</p>
          <p>也就是：旅客需先支付完整含稅價格，出境時再向海關申請退稅。</p>
          <p>目前預計將有現金、信用卡、電子貨幣等退稅方式。</p>
        </ContentCard>

        <ContentCard title="日本退稅新舊制差在哪？">
          <DataTable
            headers={["項目", "現行制度", "2026 新制"]}
            rows={[
              ["退稅時機", "免稅店結帳時直接扣除消費稅", "先支付含稅價格，出境後再退稅"],
              ["退稅地點", "店家或百貨退稅櫃檯", "機場／港口海關"],
              ["商品分類", "分一般商品與消耗品", "取消分類"],
              ["消耗品包裝", "需使用密封袋，不可拆封", "預計取消密封包裝限制"],
              ["免稅金額上限", "消耗品上限 50 萬日圓", "預計取消上限"],
              ["別送（郵寄）", "過去可郵寄出境", "已逐步取消，需自行攜帶出境"],
              ["退稅完成時間", "購物當下完成", "出境後完成"],
            ]}
          />
        </ContentCard>

        <ContentCard title="2026 日本機場退稅流程">
          <p>未來日本退稅流程，大致可能如下：</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>於日本店家支付含稅價格</li>
            <li>保留商品與購買紀錄</li>
            <li>前往機場海關</li>
            <li>出示護照與商品</li>
            <li>完成退稅程序</li>
          </ol>
          <p>因此未來旅客可能需要：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>提早抵達機場</li>
            <li>保留商品未拆封</li>
            <li>準備更多現金或信用卡額度</li>
          </ul>
          <p>
            延伸閱讀：
            <Link href="/japan-airport-tax-refund" className="font-medium text-[var(--jp-accent)] underline">
              日本機場退稅流程完整教學
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本 8% 與 10% 消費稅差在哪？">
          <p>日本目前主要有兩種消費稅率：8% 與 10%。</p>
          <p>一般來說：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>衣服、包包、電器、藥妝、精品等，多數適用 10%</li>
            <li>部分食品、飲料、外帶餐點，可能適用 8%</li>
          </ul>
          <p>例如：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>便利商店御飯糰外帶：8%</li>
            <li>店內用餐：10%</li>
            <li>星巴克外帶：8%</li>
            <li>星巴克內用：10%</li>
          </ul>
          <p>
            延伸閱讀：
            <Link href="/japan-tax-8-vs-10" className="font-medium text-[var(--jp-accent)] underline">
              日本消費稅 8% 與 10% 差異完整整理
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="FAQ 常見問題">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-tax-2026" />
      <ArticleCards currentPath="/japan-tax-2026" />
    </Layout>
  );
}
