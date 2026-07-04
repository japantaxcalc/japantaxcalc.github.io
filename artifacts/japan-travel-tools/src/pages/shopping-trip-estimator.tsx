import { useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import ContentCard, { FaqItem, Section } from "@/components/site/ContentCard";
import { calcCardFee, calcTaxRefund, formatNumber } from "@/lib/calculators";
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
    a: "可以。每一筆商品都能個別選擇 8% 或 10% 稅率，也能個別設定是否含稅與店鋪手續費，系統會分別計算再加總。",
  },
  {
    q: "信用卡手續費是怎麼加進總金額的？",
    a: "系統會先加總所有商品退稅後的未稅＋店鋪手續費金額，再對這筆合計金額套用一次海外刷卡手續費，最後換算成台幣，符合實際刷卡請款的計算方式。",
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

  const rateNum = parseFloat(exchangeRate) || 0;
  const cardFeeNum = parseFloat(cardFeePercent) || 0;

  const rows = useMemo(
    () =>
      items.map((item) => {
        const priceNum = parseFloat(item.price);
        if (Number.isNaN(priceNum) || priceNum <= 0) {
          return { item, result: null };
        }
        const result = calcTaxRefund({
          price: priceNum,
          taxRateDivisor: item.taxRateDivisor,
          isTaxIncluded: item.isTaxIncluded,
          shopFeePercent: parseFloat(item.shopFeePercent) || 0,
          cardFeePercent: 0,
          exchangeRate: rateNum,
        });
        return { item, result };
      }),
    [items, rateNum]
  );

  const validRows = rows.filter((r) => r.result !== null) as {
    item: LineItem;
    result: NonNullable<ReturnType<typeof calcTaxRefund>>;
  }[];

  const subtotalYenBeforeCard = validRows.reduce(
    (sum, r) => sum + r.result.noTax + r.result.shopFeeCost,
    0
  );
  const totalSaved = validRows.reduce((sum, r) => sum + r.result.savedAmount, 0);
  const totalShopFee = validRows.reduce((sum, r) => sum + r.result.shopFeeCost, 0);
  const cardResult = calcCardFee(subtotalYenBeforeCard, cardFeeNum, rateNum);

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
                      店鋪手續費 (%)
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
                    退稅後約 ¥{formatNumber(rows[index]!.result!.noTax + rows[index]!.result!.shopFeeCost)}
                    （省下 ¥{formatNumber(rows[index]!.result!.savedAmount)}）
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
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">預設匯率為 0.20，僅供參考</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--jp-accent-soft)] p-5">
              <p className="text-xs font-medium text-[var(--jp-ink-muted)]">
                💰 整趟旅程退稅總金額（你省了）
              </p>
              <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                ¥{formatNumber(totalSaved)}
              </p>
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                已扣除店鋪手續費 ¥{formatNumber(totalShopFee)}
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
                      退稅後 ¥{formatNumber(r.result.noTax + r.result.shopFeeCost)}｜省 ¥
                      {formatNumber(r.result.savedAmount)}
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
            <li>把這趟旅行預計購買的商品一項一項輸入日圓價格</li>
            <li>依商品分別設定 8% / 10% 稅率、是否含稅、店鋪手續費</li>
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
