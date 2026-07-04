import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import AboutSection from "@/components/site/AboutSection";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { calcTaxRefund, formatNumber } from "@/lib/calculators";
import { useSeo } from "@/lib/seo";

const FAQS = [
  {
    q: "日本退稅是幾%？",
    a: (
      <>
        日本主要有 8% 與 10% 兩種消費稅率，一般商品多為 10%，部分食品與飲料可能適用 8%。延伸閱讀：
        <Link href="/japan-tax-8-vs-10" className="underline">
          日本消費稅 8% 與 10% 差異
        </Link>
        。
      </>
    ),
  },
  { q: "百貨公司為什麼退不到 10%？", a: "部分百貨公司會收取約 1%~1.55% 退稅手續費。" },
  { q: "信用卡海外交易會加價嗎？", a: "大部分銀行會收取約 1%~2% 海外交易手續費。" },
  { q: "日本退稅最低門檻是多少？", a: "一般為未稅 5,000 日圓以上。" },
  {
    q: "日本退稅一定要在機場嗎？",
    a: (
      <>
        目前日本大部分免稅店都能直接於購物時免稅，因此現在通常不需要特地到機場退稅。延伸閱讀：
        <Link href="/japan-airport-tax-refund" className="underline">
          日本機場退稅流程教學
        </Link>
        。
      </>
    ),
  },
];

export default function Home() {
  useSeo({
    title: "日本退稅計算機｜免稅＋手續費完整計算",
    description:
      "日本退稅計算機，快速計算日本免稅、百貨公司手續費、信用卡海外交易費與日幣換算台幣。",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: typeof f.a === "string" ? f.a : "" },
      })).filter((f) => f.acceptedAnswer.text),
    },
  });

  const [price, setPrice] = useState("23100");
  const [taxRateDivisor, setTaxRateDivisor] = useState(1.1);
  const [isTaxIncluded, setIsTaxIncluded] = useState(true);
  const [shopFeePercent, setShopFeePercent] = useState("0");
  const [cardFeePercent, setCardFeePercent] = useState("1.5");
  const [exchangeRate, setExchangeRate] = useState("0.20");
  const [result, setResult] = useState<ReturnType<typeof calcTaxRefund> | null>(null);

  function handleCalc() {
    const priceNum = parseFloat(price);
    const rateNum = parseFloat(exchangeRate);
    if (Number.isNaN(priceNum) || Number.isNaN(rateNum)) {
      alert("請輸入正確數字");
      return;
    }
    setResult(
      calcTaxRefund({
        price: priceNum,
        taxRateDivisor,
        isTaxIncluded,
        shopFeePercent: parseFloat(shopFeePercent) || 0,
        cardFeePercent: parseFloat(cardFeePercent) || 0,
        exchangeRate: rateNum,
      })
    );
  }

  return (
    <Layout>
      <Hero
        eyebrow="日本退稅計算機"
        title="日本退稅計算機｜免稅＋手續費完整計算"
        description="快速計算日本免稅、百貨公司手續費、信用卡海外交易費與日幣換算台幣。"
      >
        <div className="mt-8 max-w-xl rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--jp-ink)]">立即計算</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">金額（日圓）</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="例如 23100"
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-[var(--jp-ink)]">日本消費稅率</label>
                <select
                  value={taxRateDivisor}
                  onChange={(e) => setTaxRateDivisor(parseFloat(e.target.value))}
                  className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
                >
                  <option value={1.1}>10%</option>
                  <option value={1.08}>8%</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--jp-ink)]">價格類型</label>
                <select
                  value={isTaxIncluded ? "tax" : "noTax"}
                  onChange={(e) => setIsTaxIncluded(e.target.value === "tax")}
                  className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
                >
                  <option value="tax">含稅</option>
                  <option value="noTax">未稅</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">店鋪手續費 (%)</label>
              <input
                type="number"
                value={shopFeePercent}
                onChange={(e) => setShopFeePercent(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                常見手續費：藥妝店 0%、百貨公司約 1.55%、部分商店 1%~2%
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">信用卡手續費 (%)</label>
              <input
                type="number"
                value={cardFeePercent}
                onChange={(e) => setCardFeePercent(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">海外刷卡通常約 1%~2%</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">
                匯率（1日圓 = 台幣）
              </label>
              <input
                type="number"
                step="0.01"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                預設匯率為 0.20，僅供參考，可依照銀行、信用卡或即時匯率自行調整。
              </p>
            </div>
            <button
              onClick={handleCalc}
              className="w-full rounded-full bg-[var(--jp-ink)] px-5 py-3 text-sm font-semibold text-[var(--jp-paper)] transition-opacity hover:opacity-90"
            >
              計算退稅
            </button>
          </div>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-[var(--jp-accent-soft)] p-5">
                <p className="text-xs font-medium text-[var(--jp-ink-muted)]">
                  💰 退稅金額（你省了）
                </p>
                <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                  ¥{formatNumber(result.savedAmount)}
                </p>
                <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">與含稅價格相比</p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5 text-sm text-[var(--jp-ink-muted)]">
                <p className="font-medium text-[var(--jp-ink)]">📊 計算明細</p>
                <p className="mt-2">原始價格：¥{formatNumber(result.original)}</p>
                <p>未稅價格：¥{formatNumber(result.noTax)}</p>
                <p>店鋪手續費：¥{formatNumber(result.shopFeeCost)}</p>
                <p>信用卡手續費：¥{formatNumber(result.cardFeeCost)}</p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5">
                <p className="font-medium text-[var(--jp-ink)]">💳 最終支付</p>
                <p className="mt-2 text-xl font-bold text-emerald-700">
                  ¥{formatNumber(result.finalYen)}
                </p>
                <p className="text-sm text-[var(--jp-ink-muted)]">
                  約合台幣 NT${formatNumber(result.finalTwd)}
                </p>
              </div>
            </div>
          )}
        </div>
      </Hero>

      <ToolCards currentPath="/" />

      <Section>
        <ContentCard title="日本退稅教學">
          <p>
            第一次去日本購物不知道如何退稅？了解日本免稅門檻、2026 退稅新制、百貨公司手續費與退稅流程。
          </p>
          <p>
            <Link href="/guide" className="font-medium text-[var(--jp-accent)] underline">
              閱讀完整日本退稅教學 →
            </Link>
          </p>
        </ContentCard>

        <ContentCard title="日本退稅怎麼算？簡單快速看！">
          <p>
            日本目前主要有 8% 與 10% 兩種消費稅率，一般物品（衣物、電器、包包）多適用 10%；消耗品（食品、藥妝）可能適用 8% 或
            10%。外國旅客在日本購物滿 5,000 日圓以上，通常即可享有免稅優惠。
          </p>
          <p>最常見的退稅公式為：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>10% 稅率：含稅價格 ÷ 1.1 = 未稅價格</li>
            <li>8% 稅率：含稅價格 ÷ 1.08 = 未稅價格</li>
          </ul>
          <p>
            部分百貨公司可能收取約 1.55% 退稅手續費，海外信用卡也可能收取 1%~2% 交易手續費。本工具可快速計算：
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>日本退稅金額</li>
            <li>百貨公司退稅手續費</li>
            <li>信用卡海外交易費</li>
            <li>日幣換算台幣</li>
          </ul>
        </ContentCard>

        <ContentCard title="FAQ 常見問題">
          <div className="space-y-4">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </ContentCard>
      </Section>

      <ArticleCards currentPath="/" />
      <AboutSection />
    </Layout>
  );
}
