import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import AboutSection from "@/components/site/AboutSection";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import RefundSystemToggle from "@/components/site/RefundSystemToggle";
import {
  calcCardFee,
  calcTaxRefund,
  calcTaxRefundNew,
  defaultRefundSystem,
  formatNumber,
  splitPrice,
  taxFreeShortfall,
  TAX_FREE_MIN,
  type RefundSystem,
  type TaxRefundInput,
} from "@/lib/calculators";
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
  {
    q: "信用卡海外交易會加價嗎？",
    a: "大部分銀行會收取約 1%~2% 海外交易手續費。2026 年 11 月 1 日起的新制要先付含稅價，手續費會用含稅金額計算。",
  },
  {
    q: "日本退稅最低門檻是多少？",
    a: "同一天、同一家店，未稅合計 5,000 日圓以上。2026 年 11 月 1 日起的新制，門檻一樣不變。",
  },
  {
    q: "日本退稅一定要在機場嗎？",
    a: (
      <>
        看購買日。2026 年 10 月 31 日以前購買的，大多在店裡就完成免稅；11 月 1 日以後購買的，必須在出境時於機場或港口完成海關確認，才能退稅。延伸閱讀：
        <Link href="/japan-airport-tax-refund" className="underline">
          日本機場退稅流程教學
        </Link>
        。
      </>
    ),
  },
  {
    q: "11 月 1 日以後買的東西，計算機要怎麼算？",
    a: "購買日期選「11/1 以後（新制）」。計算機會分開算出結帳時先付的金額（含海外刷卡手續費）、出境後拿回的稅金，以及扣掉退稅之後的實際成本。",
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
  const [system, setSystem] = useState<RefundSystem>(defaultRefundSystem);
  // 按下「計算退稅」時的輸入；切換購買日期時直接用同一組輸入重算
  const [input, setInput] = useState<TaxRefundInput | null>(null);

  function handleCalc() {
    const priceNum = parseFloat(price);
    const rateNum = parseFloat(exchangeRate);
    if (Number.isNaN(priceNum) || Number.isNaN(rateNum)) {
      alert("請輸入正確數字");
      return;
    }
    setInput({
      price: priceNum,
      taxRateDivisor,
      isTaxIncluded,
      shopFeePercent: parseFloat(shopFeePercent) || 0,
      cardFeePercent: parseFloat(cardFeePercent) || 0,
      exchangeRate: rateNum,
    });
  }

  const split = input ? splitPrice(input.price, input.taxRateDivisor, input.isTaxIncluded) : null;
  const shortfall = split ? taxFreeShortfall(split.noTax) : 0;
  // 未達門檻：不能免稅，付含稅價＋海外手續費
  const fullPrice =
    input && split ? calcCardFee(split.taxIncluded, input.cardFeePercent, input.exchangeRate) : null;
  const result = input && system === "old" ? calcTaxRefund(input) : null;
  const newResult = input && system === "new" ? calcTaxRefundNew(input) : null;

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
            <RefundSystemToggle value={system} onChange={setSystem} />
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
              <label className="text-sm font-medium text-[var(--jp-ink)]">退稅手續費 (%)</label>
              <input
                type="number"
                value={shopFeePercent}
                onChange={(e) => setShopFeePercent(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                {system === "new"
                  ? "新制的手續費看各店或退款業者公告；不確定的話，可以先用 0%～1.55% 估算"
                  : "常見手續費：藥妝店 0%、百貨公司約 1.55%、部分商店 1%~2%"}
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
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                {system === "new" ? "海外刷卡通常約 1%~2%，新制用含稅金額計算" : "海外刷卡通常約 1%~2%"}
              </p>
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

          {split && fullPrice && shortfall > 0 && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[var(--jp-accent)] p-5">
                <p className="text-xs font-medium text-[var(--jp-ink-muted)]">⚠️ 還沒到免稅門檻</p>
                <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                  還差 ¥{formatNumber(shortfall)}
                </p>
                <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                  這筆未稅 ¥{formatNumber(split.noTax)}。同一天、同一家店，未稅合計滿 ¥
                  {formatNumber(TAX_FREE_MIN)} 才能免稅，同一家店買的東西可以合起來算喔。
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5">
                <p className="font-medium text-[var(--jp-ink)]">💳 這筆要付（不能免稅）</p>
                <p className="mt-2 text-xl font-bold text-emerald-700">
                  ¥{formatNumber(fullPrice.finalYen)}
                </p>
                <p className="text-sm text-[var(--jp-ink-muted)]">
                  約合台幣 NT${formatNumber(fullPrice.finalTwd)}
                </p>
                <p className="mt-2 text-xs text-[var(--jp-ink-faint)]">
                  含稅價 ¥{formatNumber(split.taxIncluded)}＋信用卡手續費 ¥
                  {formatNumber(fullPrice.feeCost)}
                </p>
              </div>
            </div>
          )}

          {newResult && shortfall === 0 && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[var(--jp-border)] p-5">
                <p className="font-medium text-[var(--jp-ink)]">💳 結帳先付</p>
                <p className="mt-2 text-xl font-bold text-[var(--jp-ink)]">
                  ¥{formatNumber(newResult.paidYen)}
                </p>
                <p className="text-sm text-[var(--jp-ink-muted)]">
                  約合台幣 NT${formatNumber(newResult.paidTwd)}
                </p>
                <p className="mt-2 text-xs text-[var(--jp-ink-faint)]">
                  含稅價 ¥{formatNumber(newResult.taxIncluded)}＋信用卡手續費 ¥
                  {formatNumber(newResult.cardFeeCost)}。大筆購物前記得確認信用卡額度。
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--jp-accent-soft)] p-5">
                <p className="text-xs font-medium text-[var(--jp-ink-muted)]">💰 出境後拿回的稅金</p>
                <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                  ¥{formatNumber(newResult.refundYen)}
                </p>
                <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                  稅額 ¥{formatNumber(newResult.taxAmount)} − 退稅手續費 ¥
                  {formatNumber(newResult.refundFeeCost)}。購買日起 90 天內出境，並在托運行李前完成海關確認才會退。
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5">
                <p className="font-medium text-[var(--jp-ink)]">✅ 退稅後實際成本</p>
                <p className="mt-2 text-xl font-bold text-emerald-700">
                  ¥{formatNumber(newResult.finalYen)}
                </p>
                <p className="text-sm text-[var(--jp-ink-muted)]">
                  約合台幣 NT${formatNumber(newResult.finalTwd)}
                </p>
              </div>
              {newResult.cardFeeOnTax > 0 && (
                <p className="text-xs leading-relaxed text-[var(--jp-ink-muted)]">
                  📌 先付的稅金也被收了約 ¥{formatNumber(newResult.cardFeeOnTax)}{" "}
                  的海外手續費。退回信用卡時，這筆會不會退、匯率怎麼算，要看你的發卡銀行。
                </p>
              )}
            </div>
          )}

          {result && shortfall === 0 && (
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
                <p>退稅手續費：¥{formatNumber(result.shopFeeCost)}</p>
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
            10%。外國旅客在同一天、同一家店購物，未稅合計滿 5,000 日圓以上，就可以享有免稅。
          </p>
          <p>最常見的退稅公式為：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>10% 稅率：含稅價格 ÷ 1.1 = 未稅價格</li>
            <li>8% 稅率：含稅價格 ÷ 1.08 = 未稅價格</li>
          </ul>
          <p>
            部分百貨公司可能收取約 1.55% 退稅手續費，海外信用卡也可能收取 1%~2% 交易手續費。
          </p>
          <p>
            要注意的是，2026 年 11 月 1 日起改成「先付後退」：結帳先付含稅價，出境時在機場或港口完成海關確認後才退稅。刷卡的話，海外手續費會用含稅金額計算，先付的金額也比較高，大筆購物前記得確認一下信用卡額度喔 💳
          </p>
          <p>本工具可快速計算：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>新制結帳先付多少、出境後拿回多少</li>
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
