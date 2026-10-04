import { useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import ContentCard, { FaqItem, Section } from "@/components/site/ContentCard";
import RefundSystemToggle from "@/components/site/RefundSystemToggle";
import {
  calcCardFee,
  calcTaxRefund,
  calcTaxRefundNew,
  defaultRefundSystem,
  formatNumber,
  splitPrice,
  taxFreeShortfall,
  type RefundSystem,
} from "@/lib/calculators";
import { useSeo } from "@/lib/seo";

interface LineItem {
  id: string;
  name: string;
  price: string;
  taxRateDivisor: number;
  isTaxIncluded: boolean;
  shopFeePercent: string;
}

function makeItem(overrides?: Partial<LineItem>): LineItem {
  return {
    id: Math.random().toString(36).slice(2),
    name: "",
    price: "",
    taxRateDivisor: 1.1,
    isTaxIncluded: true,
    shopFeePercent: "0",
    ...overrides,
  };
}

const FAQS = [
  {
    q: "購物清單試算器和退稅計算機有什麼不同？",
    a: "退稅計算機一次只能算一件商品，購物清單試算器可以把整趟旅程的多個商品加總，直接看到整趟旅行退稅後的總花費與換算台幣金額。",
  },
  {
    q: "可以同時放入 8% 和 10% 稅率的商品嗎？",
    a: "可以。每一筆商品都能個別選擇 8% 或 10% 稅率，也能個別設定是否含稅與退稅手續費，系統會分別計算再加總。",
  },
  {
    q: "為什麼有些商品顯示「還差」？",
    a: "日本免稅的門檻是同一天、同一家店，未稅合計 5,000 日圓以上。未達門檻的那一筆不會算進退稅；如果是同一家店買的，可以把金額合成一筆輸入。",
  },
  {
    q: "信用卡手續費是怎麼加進總金額的？",
    a: "10/31 以前購買（舊制）：先加總每筆商品免稅後的金額（未稅＋退稅手續費），再套用一次海外刷卡手續費。11/1 以後購買（新制）：結帳先付含稅價，所以手續費是用含稅合計計算，出境後拿回的稅金另外列出。最後都會換算成台幣。",
  },
  {
    q: "這個工具的資料會被儲存嗎？",
    a: "不會。所有輸入與計算都只在你的瀏覽器中進行，不會上傳或儲存到任何伺服器。",
  },
];

export default function ShoppingTripEstimator() {
  useSeo({
    title: "日本購物清單試算器｜多商品退稅、刷卡手續費一次算清楚",
    description:
      "把整趟日本旅行的購物清單一次輸入，自動計算每件商品的退稅金額、加總刷卡手續費，並換算成台幣，快速估算整趟旅程的實際花費。",
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

  const [items, setItems] = useState<LineItem[]>([
    makeItem({ name: "藥妝店保養品", price: "8800", shopFeePercent: "0" }),
    makeItem({ name: "唐吉訶德零食伴手禮", price: "5200", taxRateDivisor: 1.08, shopFeePercent: "0" }),
    makeItem({ name: "百貨公司包包", price: "34100", shopFeePercent: "1.55" }),
  ]);
  const [cardFeePercent, setCardFeePercent] = useState("1.5");
  const [exchangeRate, setExchangeRate] = useState("0.20");
  const [system, setSystem] = useState<RefundSystem>(defaultRefundSystem);

  const rateNum = parseFloat(exchangeRate) || 0;
  const cardFeeNum = parseFloat(cardFeePercent) || 0;

  const rows = useMemo(
    () =>
      items.map((item) => {
        const priceNum = parseFloat(item.price);
        if (Number.isNaN(priceNum) || priceNum <= 0) {
          return { item, result: null };
        }
        const input = {
          price: priceNum,
          taxRateDivisor: item.taxRateDivisor,
          isTaxIncluded: item.isTaxIncluded,
          shopFeePercent: parseFloat(item.shopFeePercent) || 0,
          cardFeePercent: 0,
          exchangeRate: rateNum,
        };
        const { noTax, taxIncluded } = splitPrice(priceNum, item.taxRateDivisor, item.isTaxIncluded);
        const shortfall = taxFreeShortfall(noTax);
        const old = calcTaxRefund(input);
        const next = calcTaxRefundNew(input);
        const eligible = shortfall === 0;
        // 未達門檻：付含稅價、沒有退稅。舊制在店裡就扣稅；新制先付含稅價，出境後才拿回
        const result =
          system === "new"
            ? {
                checkout: taxIncluded,
                saved: eligible ? next.taxAmount : 0,
                fee: eligible ? next.refundFeeCost : 0,
                refund: eligible ? next.refundYen : 0,
              }
            : {
                checkout: eligible ? old.noTax + old.shopFeeCost : taxIncluded,
                saved: eligible ? old.savedAmount : 0,
                fee: eligible ? old.shopFeeCost : 0,
                refund: 0,
              };
        return { item, result: { ...result, original: priceNum, noTax, shortfall } };
      }),
    [items, rateNum, system]
  );

  const validRows = rows.filter((r) => r.result !== null) as {
    item: LineItem;
    result: NonNullable<(typeof rows)[number]["result"]>;
  }[];

  const checkoutTotal = validRows.reduce((sum, r) => sum + r.result.checkout, 0);
  const totalSaved = validRows.reduce((sum, r) => sum + r.result.saved, 0);
  const totalShopFee = validRows.reduce((sum, r) => sum + r.result.fee, 0);
  const totalRefund = validRows.reduce((sum, r) => sum + r.result.refund, 0);
  const cardResult = calcCardFee(checkoutTotal, cardFeeNum, rateNum);
  const finalYen = cardResult.finalYen - totalRefund;

  function addItem() {
    setItems((prev) => [...prev, makeItem()]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  return (
    <Layout>
      <Hero
        eyebrow="購物清單試算器"
        title="日本購物清單試算器｜整趟旅程退稅＋刷卡手續費一次算"
        description="把這趟日本旅行想買的商品一項一項輸入日圓價格，系統會自動算出每件商品的退稅金額、加總信用卡海外交易手續費，並換算成台幣，讓你出發前就知道大概要準備多少預算。"
      />

      <Section>
        <ContentCard>
          <div className="mb-4">
            <div className="max-w-md">
              <RefundSystemToggle value={system} onChange={setSystem} />
            </div>
            <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
              門檻是同一天、同一家店未稅合計 5,000 日圓，同一家店買的東西可以合成一筆輸入。
            </p>
          </div>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    placeholder={`商品 ${index + 1}（例如：藥妝、包包）`}
                    className="w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2 text-sm text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length <= 1}
                    className="shrink-0 rounded-full border border-[var(--jp-border)] px-3 py-2 text-xs font-medium text-[var(--jp-ink-muted)] transition-colors hover:border-[var(--jp-ink)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    刪除
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--jp-ink-muted)]">
                      金額（日圓）
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, { price: e.target.value })}
                      placeholder="例如 8800"
                      className="mt-1 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2 text-sm text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--jp-ink-muted)]">稅率</label>
                    <select
                      value={item.taxRateDivisor}
                      onChange={(e) =>
                        updateItem(item.id, { taxRateDivisor: parseFloat(e.target.value) })
                      }
                      className="mt-1 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2 text-sm text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
                    >
                      <option value={1.1}>10%</option>
                      <option value={1.08}>8%</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--jp-ink-muted)]">
                      價格類型
                    </label>
                    <select
                      value={item.isTaxIncluded ? "tax" : "noTax"}
                      onChange={(e) =>
                        updateItem(item.id, { isTaxIncluded: e.target.value === "tax" })
                      }
                      className="mt-1 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2 text-sm text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
                    >
                      <option value="tax">含稅</option>
                      <option value="noTax">未稅</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--jp-ink-muted)]">
                      退稅手續費 (%)
                    </label>
                    <input
                      type="number"
                      value={item.shopFeePercent}
                      onChange={(e) => updateItem(item.id, { shopFeePercent: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2 text-sm text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
                    />
                  </div>
                </div>
                {rows[index]?.result && (
                  <p className="mt-2 text-xs text-[var(--jp-ink-faint)]">
                    {rows[index]!.result!.shortfall > 0 ? (
                      <span className="text-[var(--jp-accent)]">
                        ⚠️ 未稅 ¥{formatNumber(rows[index]!.result!.noTax)}，還差 ¥
                        {formatNumber(rows[index]!.result!.shortfall)} 才到 5,000 日圓門檻，這筆不算退稅
                      </span>
                    ) : system === "new" ? (
                      <>
                        結帳先付 ¥{formatNumber(rows[index]!.result!.checkout)}，出境後拿回 ¥
                        {formatNumber(rows[index]!.result!.refund)}
                      </>
                    ) : (
                      <>
                        退稅後約 ¥{formatNumber(rows[index]!.result!.checkout)}
                        （省下 ¥{formatNumber(rows[index]!.result!.saved)}）
                      </>
                    )}
                  </p>
                )}
              </div>
            ))}

            <button
              onClick={addItem}
              className="w-full rounded-full border border-dashed border-[var(--jp-border)] px-5 py-3 text-sm font-medium text-[var(--jp-ink-muted)] transition-colors hover:border-[var(--jp-ink)] hover:text-[var(--jp-ink)]"
            >
              ＋ 新增一項商品
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">
                信用卡海外手續費 (%)
              </label>
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
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">預設匯率為 0.20，僅供參考</p>
            </div>
          </div>

          {system === "new" ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--jp-border)] p-5">
                <p className="font-medium text-[var(--jp-ink)]">💳 結帳先付合計</p>
                <p className="mt-2 text-xl font-bold text-[var(--jp-ink)]">
                  ¥{formatNumber(cardResult.finalYen)}
                </p>
                <p className="text-sm text-[var(--jp-ink-muted)]">
                  約合台幣 NT${formatNumber(cardResult.finalTwd)}
                </p>
                <p className="mt-2 text-xs text-[var(--jp-ink-faint)]">
                  含信用卡海外交易手續費 ¥{formatNumber(cardResult.feeCost)}，記得預留信用卡額度
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--jp-accent-soft)] p-5">
                <p className="text-xs font-medium text-[var(--jp-ink-muted)]">💰 出境後拿回的稅金</p>
                <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                  ¥{formatNumber(totalRefund)}
                </p>
                <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                  已扣除退稅手續費 ¥{formatNumber(totalShopFee)}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5">
                <p className="font-medium text-[var(--jp-ink)]">✅ 退稅後實際成本</p>
                <p className="mt-2 text-xl font-bold text-emerald-700">¥{formatNumber(finalYen)}</p>
                <p className="text-sm text-[var(--jp-ink-muted)]">
                  約合台幣 NT${formatNumber(finalYen * rateNum)}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[var(--jp-accent-soft)] p-5">
                <p className="text-xs font-medium text-[var(--jp-ink-muted)]">
                  💰 整趟旅程退稅總金額（你省了）
                </p>
                <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                  ¥{formatNumber(totalSaved)}
                </p>
                <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                  退稅手續費 ¥{formatNumber(totalShopFee)} 已算進刷卡金額
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5">
                <p className="font-medium text-[var(--jp-ink)]">💳 整趟旅程最終刷卡金額</p>
                <p className="mt-2 text-xl font-bold text-emerald-700">
                  ¥{formatNumber(cardResult.finalYen)}
                </p>
                <p className="text-sm text-[var(--jp-ink-muted)]">
                  約合台幣 NT${formatNumber(cardResult.finalTwd)}
                </p>
                <p className="mt-2 text-xs text-[var(--jp-ink-faint)]">
                  含信用卡海外交易手續費 ¥{formatNumber(cardResult.feeCost)}
                </p>
              </div>
            </div>
          )}

          {validRows.length > 0 && (
            <div className="mt-6 rounded-2xl border border-[var(--jp-border)] p-5 text-sm text-[var(--jp-ink-muted)]">
              <p className="font-medium text-[var(--jp-ink)]">📊 明細清單</p>
              <div className="mt-3 space-y-2">
                {validRows.map((r, i) => (
                  <div
                    key={r.item.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--jp-border)] pb-2 last:border-none last:pb-0"
                  >
                    <span className="text-[var(--jp-ink)]">
                      {r.item.name || `商品 ${i + 1}`}（¥{formatNumber(r.result.original)}）
                    </span>
                    <span>
                      {r.result.shortfall > 0
                        ? "未達門檻，不能免稅"
                        : system === "new"
                          ? `先付 ¥${formatNumber(r.result.checkout)}｜拿回 ¥${formatNumber(r.result.refund)}`
                          : `退稅後 ¥${formatNumber(r.result.checkout)}｜省 ¥${formatNumber(r.result.saved)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ContentCard>
      </Section>

      <ToolCards currentPath="/shopping-trip-estimator" />

      <Section>
        <ContentCard title="購物清單試算器怎麼用？">
          <p>這個工具把本站三個計算機（退稅計算機、海外刷卡手續費計算機、日幣台幣換算）合併成一趟旅程的整體估算：</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>先選購買日期：10/31 以前（舊制）或 11/1 以後（新制）</li>
            <li>把這趟旅行預計購買的商品一項一項輸入日圓價格</li>
            <li>依商品分別設定 8% / 10% 稅率、是否含稅、退稅手續費</li>
            <li>系統自動加總所有商品退稅後的金額</li>
            <li>再套用一次信用卡海外交易手續費，計算整趟旅程實際刷卡金額</li>
            <li>最後換算成台幣，讓你出發前就能抓出大概預算</li>
          </ol>
          <p>
            如果只需要計算單一商品，也可以直接使用
            <Link href="/" className="font-medium text-[var(--jp-accent)] underline">
              日本退稅計算機
            </Link>
            、
            <Link href="/japan-card-fee" className="font-medium text-[var(--jp-accent)] underline">
              海外刷卡手續費計算機
            </Link>
            或
            <Link href="/yen-to-twd" className="font-medium text-[var(--jp-accent)] underline">
              日幣台幣換算
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="FAQ 常見問題">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ContentCard>
      </Section>

      <ArticleCards currentPath="/shopping-trip-estimator" />
    </Layout>
  );
}
