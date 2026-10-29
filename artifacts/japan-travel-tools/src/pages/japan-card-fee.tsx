import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { formatNumber, CARD_FEE_TABLE } from "@/lib/calculators";
import { useSeo } from "@/lib/seo";

const linkClass = "text-[var(--jp-accent)] underline";
const strong = "text-[var(--jp-ink)]";

// 2026-10-28 的官網資料：Visa、Mastercard 匯率計算機（日圓換台幣、銀行手續費填 0），臺灣銀行歷史匯率收盤價
const EXAMPLE_YEN = 30000;
const EXAMPLE_CARDS = [
  { name: "Visa", rate: "0.206107", twd: 6183.204288 },
  { name: "Mastercard", rate: "0.2060902", twd: 6182.71 },
];
const BOT_CASH_SELL = 0.209;
const EXAMPLE_FEE = 0.015;

const FAQS = [
  {
    q: "日本刷卡手續費是多少？",
    a: "台灣多數信用卡是 1.5%：Visa、Mastercard、JCB 國際組織收 1%，發卡銀行再收 0.5%。中國信託、玉山、永豐的官網都是這樣寫，你的卡實際收多少，看發卡銀行的公告。",
  },
  {
    q: "日本刷卡手續費怎麼算？",
    a: "先用國際組織在結匯日的匯率把日圓換成台幣，再用台幣金額乘以 1.5%。中國信託官網的例子是：換算後台幣 10,000 元，手續費就是 10,000 × 1.5% ＝ 150 元。",
  },
  {
    q: "刷卡時選台幣，就不用付手續費嗎？",
    a: "不是。選台幣就是 DCC（動態貨幣轉換），匯率由店家那邊決定。玉山、中國信託的官網都寫明，在國外用新臺幣結帳一樣收 1.5%，所以刷卡被問幣別時選日圓。",
  },
  {
    q: "退貨刷退的話，手續費會退嗎？",
    a: "看銀行和卡別。玉山：Visa 不退原本那筆的手續費，Mastercard、JCB 會退刷退金額的手續費。中國信託：刷退不另外收，但原本那筆的手續費不退。永豐：兩筆的手續費都退。",
  },
  {
    q: "去日本刷卡還是換現金划算？",
    a: "以 2026 年 10 月 28 日的匯率算，30,000 日圓用 Visa 刷卡加 1.5% 約 6,276 元，在臺灣銀行換現鈔是 6,270 元，差不到 10 元。刷卡用的是結匯日的匯率，會跟著匯率變動；鄉下的店、民宿和實體 Suica 儲值還是要現金，兩種都要準備。",
  },
];

const BANKS = [
  ["中國信託", "在國外刷台幣一樣收 1.5%。刷退不另外收，但原本那筆的手續費不退。"],
  ["玉山", "在國外刷台幣一樣收 1.5%。刷退時，Visa 不退原本那筆的手續費，Mastercard、JCB 會退刷退金額的手續費。"],
  ["永豐", "官網沒有寫在國外刷台幣的情況。刷退時，消費和刷退兩筆的手續費都退。"],
];

const SOURCES = [
  {
    href: "https://service.ctbcbank.com/FAQ/Page01?kmid=4724",
    label: "中國信託：國外交易手續費如何收取？",
  },
  {
    href: "https://www.esunbank.com/zh-tw/about/faq/content?q=credit_card%2F018",
    label: "玉山銀行：持信用卡在國外消費會收取什麼費用？",
  },
  {
    href: "https://bank.sinopac.com/sinopacBT/personal/article/smart-consumption/foreign-transaction-fee.html",
    label: "永豐銀行：海外刷卡手續費怎麼算？",
  },
  {
    href: "https://www.taishinbank.com.tw/TSB/personal/credit/intro/payment/notice/TSBankGridPage-000004/",
    label: "台新銀行：Visa 金融卡收費說明",
  },
  {
    href: "https://www.visa.com.tw/support/consumer/travel-support/exchange-rate-calculator.html",
    label: "Visa：匯率轉換器",
  },
  {
    href: "https://www.mastercard.com/tw/zh/personal/get-support/currency-exchange-rate-converter.html",
    label: "Mastercard：貨幣匯率轉換器",
  },
  {
    href: "https://rate.bot.com.tw/xrt/all/2026-10-28",
    label: "臺灣銀行：歷史匯率收盤價（2026/10/28）",
  },
];

export default function JapanCardFee() {
  useSeo({
    title: "日本海外刷卡手續費計算機｜日幣刷卡換算台幣",
    description:
      "照信用卡帳單的算法，把日圓換成台幣、再算 1.5% 國外交易服務費。附 2026/10/28 Visa、Mastercard 匯率實算，以及各銀行選台幣、刷退時手續費的規定。",
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

  const [yen, setYen] = useState("50000");
  const [fee, setFee] = useState("1.5");
  const [rate, setRate] = useState("0.20");
  const [result, setResult] = useState<{
    yen: number;
    feePercent: number;
    twd: number;
    feeTwd: number;
  } | null>(null);

  // 試算表跟著輸入的匯率和手續費更新；還沒輸入完整時先用 0.20、1.5%
  const typedRate = parseFloat(rate);
  const tableRate = typedRate > 0 ? typedRate : 0.2;
  const tableRateLabel = typedRate > 0 ? rate.trim() : "0.20";
  const typedFee = parseFloat(fee);
  const tableFee = typedFee >= 0 ? typedFee : 1.5;
  const tableFeeLabel = typedFee >= 0 ? fee.trim() : "1.5";

  function handleCalc() {
    const yenNum = parseFloat(yen);
    const rateNum = parseFloat(rate);
    const feeNum = parseFloat(fee);
    if ([yenNum, rateNum, feeNum].some((n) => Number.isNaN(n) || n < 0)) {
      alert("請輸入正確數字");
      return;
    }
    // 銀行用換算後的台幣金額算手續費
    const twd = yenNum * rateNum;
    setResult({ yen: yenNum, feePercent: feeNum, twd, feeTwd: twd * (feeNum / 100) });
  }

  return (
    <Layout>
      <Hero
        eyebrow="海外刷卡手續費計算機"
        title="日本海外刷卡手續費計算機"
        description="輸入日圓金額、匯率和手續費，照信用卡帳單的算法，算出台幣金額、國外交易服務費和合計。"
      >
        <div className="mt-8 max-w-xl rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--jp-ink)]">立即計算</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">刷卡金額（日圓）</label>
              <input
                type="number"
                min="0"
                value={yen}
                onChange={(e) => setYen(e.target.value)}
                placeholder="例如 50000"
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">海外交易手續費 (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                台灣多數信用卡是 1.5%（國際組織 1% ＋ 發卡銀行 0.5%）
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">
                匯率（1日圓 = 台幣）
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                預設匯率為 0.20，僅供參考。信用卡的匯率可以到 Visa、Mastercard 官網的匯率計算機查（銀行手續費填 0）。
              </p>
            </div>
            <button
              onClick={handleCalc}
              className="w-full rounded-full bg-[var(--jp-ink)] px-5 py-3 text-sm font-semibold text-[var(--jp-paper)] transition-opacity hover:opacity-90"
            >
              開始計算
            </button>
          </div>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-[var(--jp-accent-soft)] p-5">
                <p className="text-xs font-medium text-[var(--jp-ink-muted)]">💳 國外交易服務費</p>
                <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                  NT${formatNumber(result.feeTwd)}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5 text-sm text-[var(--jp-ink-muted)]">
                <p className="font-medium text-[var(--jp-ink)]">🧾 帳單上大約會是</p>
                <p className="mt-2">刷卡金額：¥{formatNumber(result.yen)}</p>
                <p>換算台幣：NT${formatNumber(result.twd)}</p>
                <p>國外交易服務費（{result.feePercent}%）：NT${formatNumber(result.feeTwd)}</p>
                <p className="font-medium text-[var(--jp-ink)]">
                  合計：NT${formatNumber(result.twd + result.feeTwd)}
                </p>
              </div>
            </div>
          )}
        </div>
      </Hero>

      <ToolCards currentPath="/japan-card-fee" />

      <Section>
        <ContentCard title="日本刷卡手續費怎麼算？">
          <p>在日本刷台灣的信用卡，帳單上的金額分兩段算：</p>

          <div className="my-4 space-y-1 rounded-2xl bg-[var(--jp-accent-soft)] p-5 text-center">
            <p className="text-lg font-semibold text-[var(--jp-ink)]">日圓金額 × 結匯日匯率 ＝ 台幣金額</p>
            <p className="text-lg font-semibold text-[var(--jp-ink)]">台幣金額 × 1.5% ＝ 國外交易服務費</p>
          </div>

          <p>
            1.5% 是兩筆費用加起來：Visa、Mastercard、JCB 國際組織收 1%，發卡銀行再收 0.5%。永豐銀行官網說明，銀行加收的部分依金管會規定不能超過 0.5%。
          </p>
          <p>
            手續費是用<b className={strong}>台幣金額</b>算的。中國信託官網的例子：在日本消費，換算成台幣 10,000 元，手續費就是 10,000 × 1.5% ＝ 150 元。
          </p>
          <p>
            匯率用的是國際組織在「結匯日」的匯率，不一定是刷卡那天，所以刷卡當下自己算的金額，和帳單可能會差一點。
          </p>
        </ContentCard>

        <ContentCard title="用 2026/10/28 的匯率，刷 30,000 日圓要多少台幣？">
          <p>
            Visa、Mastercard 官網都有匯率計算機，可以查某一天的匯率。下面是 2026 年 10 月 28 日的匯率（日圓換台幣、銀行手續費填 0），再加上 1.5%：
          </p>

          <DataTable
            fit
            headers={["", ...EXAMPLE_CARDS.map((c) => c.name)]}
            rows={[
              ["匯率（1 日圓）", ...EXAMPLE_CARDS.map((c) => c.rate)],
              ["換算台幣", ...EXAMPLE_CARDS.map((c) => formatNumber(c.twd, 2))],
              ["手續費 1.5%", ...EXAMPLE_CARDS.map((c) => formatNumber(c.twd * EXAMPLE_FEE, 2))],
              ["合計（約）", ...EXAMPLE_CARDS.map((c) => formatNumber(c.twd * (1 + EXAMPLE_FEE)))],
            ]}
          />

          <p>
            這天 Visa 和 Mastercard 換算出來只差不到 1 元，選哪一張卡，匯率差別不大，手續費才是固定會多付的部分。
          </p>
          <p>
            同一天在臺灣銀行換日圓現鈔（現金賣出 {BOT_CASH_SELL}），{formatNumber(EXAMPLE_YEN)} 日圓是{" "}
            {formatNumber(EXAMPLE_YEN * BOT_CASH_SELL)} 元，和刷卡加 1.5% 差不到 10 元。換現鈔、直接刷卡、金融卡提款、信用卡預借現金 4 種方式的比較，整理在{" "}
            <Link href="/blog/how-much-yen-cash" className={linkClass}>
              去日本要換多少日幣
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="各家銀行官網怎麼寫？">
          <p>
            三家官網寫的手續費都是 1.5%：中國信託是國際組織 1% ＋ 銀行 0.5%，玉山的 Visa、Mastercard、JCB 都是 1.5%，永豐是國際組織 1% ＋ 銀行最多 0.5%。不過選台幣結帳、退貨刷退的時候，各家的規定不太一樣：
          </p>
          <ul className="list-disc space-y-2 pl-5">
            {BANKS.map(([name, rule]) => (
              <li key={name}>
                <b className={strong}>{name}</b>：{rule}
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--jp-ink-muted)]">
            這裡只寫官網上查得到的內容（2026 年 10 月查詢）。11/1 以後退稅款可以退回信用卡，退款時的匯差和手續費可以看{" "}
            <Link href="/blog/tax-refund-card-fees" className={linkClass}>
              日本退稅新制刷卡要注意什麼
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="1.5% 會出現在哪些地方？">
          <p>只要交易的幣別不是台幣，或是商店在國外，就會收國外交易服務費。去日本玩常遇到的有這些：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <b className={strong}>在日本刷卡選日圓</b>：國際組織的匯率 ＋ 1.5%。
            </li>
            <li>
              <b className={strong}>刷卡選台幣（DCC）</b>：店家那邊的匯率 ＋ 1.5%，通常比選日圓貴，可以看{" "}
              <Link href="/blog/dcc-yen-or-twd" className={linkClass}>
                在日本刷卡選日圓還是台幣
              </Link>
              。
            </li>
            <li>
              <b className={strong}>在台灣買日本網站</b>：永豐銀行官網寫，消費的公司屬於國外企業也算國外交易，一樣有 1.5%。透過代購的話，是代購自己的匯率和費用，比較可以看{" "}
              <Link href="/blog/japan-proxy-buying-cost" className={linkClass}>
                日本網購用代購寄回台灣，比去日本買貴多少
              </Link>
              。
            </li>
            <li>
              <b className={strong}>退稅退回信用卡</b>：手續費退不退，看上面各家銀行的規定。
            </li>
            <li>
              <b className={strong}>iPhone 用 Apple Pay 儲值 Welcome Suica Mobile</b>：儲值的是日圓，照銀行的規定也算國外交易。
            </li>
            <li>
              <b className={strong}>在日本 ATM 提款</b>：台新 Visa 金融卡是 1.5% ＋ 每筆 70 元；玉山信用卡預借現金是金額的 3.5% ＋ 150 元，另外還有利息。
            </li>
          </ul>
          <p>
            Suica 和 ATM 的細節整理在{" "}
            <Link href="/blog/how-much-yen-cash" className={linkClass}>
              去日本要換多少日幣
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="常見日本刷卡手續費試算">
          <p>
            表格用你在上方輸入的匯率和手續費計算，改了數字，表格會跟著更新。
          </p>
          <DataTable
            fit
            headers={["日幣", `台幣（匯率 ${tableRateLabel}）`, `手續費 ${tableFeeLabel}%`, "合計"]}
            rows={CARD_FEE_TABLE.map((y) => [
              formatNumber(y),
              formatNumber(y * tableRate),
              formatNumber(y * tableRate * (tableFee / 100)),
              formatNumber(y * tableRate * (1 + tableFee / 100)),
            ])}
          />
        </ContentCard>

        <ContentCard title="日本刷卡手續費常見問題">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
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
          <p>
            以上依 2026 年 10 月查到的銀行官網資料整理，例子用的是 2026 年 10 月 28 日的官網匯率。實際手續費以各發卡銀行的公告為準。
          </p>
        </ContentCard>

        <ContentCard title="相關工具">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/" className="text-[var(--jp-accent)] underline">
                日本退稅計算機
              </Link>
            </li>
            <li>
              <Link href="/yen-to-twd" className="text-[var(--jp-accent)] underline">
                日幣台幣換算
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
                日本消費稅 8% 與 10% 差異
              </Link>
            </li>
          </ul>
        </ContentCard>
      </Section>

      <ArticleCards currentPath="/japan-card-fee" />
    </Layout>
  );
}
