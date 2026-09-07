import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import ContentCard, {
  DataTable,
  FaqItem,
  Section,
} from "@/components/site/ContentCard";
import {
  calcYenToTwd,
  formatNumber,
  YEN_TWD_TABLE,
} from "@/lib/calculators";
import { useSeo } from "@/lib/seo";

const REFERENCE_FAQS = [
  { yen: 22000, twd: 4400 },
  { yen: 24200, twd: 4840 },
  { yen: 3990, twd: 798 },
  { yen: 50000, twd: 10000 },
  { yen: 10780, twd: 2156 },
  { yen: 5990, twd: 1198 },
  { yen: 34100, twd: 6820 },
  { yen: 42500, twd: 8500 },
  { yen: 24750, twd: 4950 },
  { yen: 17400, twd: 3480 },
  { yen: 100000, twd: 20000 },
];

export default function YenToTwd() {
  useSeo({
    title:
      "日幣台幣換算｜日圓換台幣計算機｜22000日幣等於多少台幣？",
    description:
      "日幣台幣換算工具，快速查詢 22000、24200、3990、50000 日幣等於多少台幣。支援日本旅遊購物、日圓換台幣與常見日幣金額換算",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: REFERENCE_FAQS.map((r) => ({
        "@type": "Question",
        name: `${formatNumber(r.yen)}日幣等於多少台幣？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `以匯率 0.20 計算，${formatNumber(
            r.yen
          )} 日幣約等於 ${formatNumber(r.twd)} 元台幣。`,
        },
      })),
    },
  });

  const [yen, setYen] = useState("10000");
  const [rate, setRate] = useState("0.20");
  const [twd, setTwd] = useState<number | null>(null);

  function handleConvert() {
    const yenNum = parseFloat(yen);
    const rateNum = parseFloat(rate);

    if (
      Number.isNaN(yenNum) ||
      Number.isNaN(rateNum) ||
      yenNum < 0 ||
      rateNum < 0
    ) {
      alert("請輸入正確數字");
      return;
    }

    setTwd(calcYenToTwd(yenNum, rateNum));
  }

  return (
    <Layout>
      <Hero
        eyebrow="匯率換算工具"
        title="日幣台幣換算"
        description="快速換算日幣（JPY）與台幣（TWD），適合日本旅遊、購物、退稅與海外刷卡費用估算。"
      >
        <div className="mt-8 max-w-xl rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-6 shadow-sm sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">
                日幣金額（JPY）
              </label>

              <input
                type="number"
                min="0"
                value={yen}
                onChange={(e) => setYen(e.target.value)}
                placeholder="例如：10000"
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">
                匯率（1日幣 = 台幣）
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
                預設匯率為 0.20，僅供參考，可依照銀行、信用卡或實際換匯匯率自行調整。
              </p>
            </div>

            <button
              onClick={handleConvert}
              className="w-full rounded-full bg-[var(--jp-ink)] px-5 py-3 text-sm font-semibold text-[var(--jp-paper)] transition-opacity hover:opacity-90"
            >
              開始換算
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-[var(--jp-accent-soft)] p-5">
            <p className="text-xs font-medium text-[var(--jp-ink-muted)]">
              換算結果
            </p>

            <p className="mt-1 text-3xl font-bold text-[var(--jp-accent)]">
              {twd === null ? "0" : formatNumber(twd)} 元
            </p>
          </div>
        </div>
      </Hero>

      <ToolCards currentPath="/yen-to-twd" />

      <Section>
        {/* Step 2：把高曝光搜尋需求放到頁面前段 */}
        <ContentCard title="22000日幣等於多少台幣？">
          <p>
            以匯率 0.20 計算，<strong>22,000 日幣約等於 4,400 元台幣</strong>。
          </p>

          <p>
            實際換算結果會依日圓對台幣的匯率而變動。如果是日本購物或刷卡，
            還可能受到信用卡海外交易手續費、店家退稅手續費等因素影響。
          </p>

          <p>
            如果你有自己的匯率，可以直接在上方日幣台幣換算工具輸入金額與匯率，
            計算實際換算結果。
          </p>
        </ContentCard>

        <ContentCard title="日幣台幣怎麼換算？">
          <p>
            日幣換算台幣的基本公式很簡單：
          </p>

          <div className="my-4 rounded-2xl bg-[var(--jp-accent-soft)] p-5 text-center">
            <p className="text-lg font-semibold text-[var(--jp-ink)]">
              日幣金額 × 日圓對台幣匯率 ＝ 台幣金額
            </p>
          </div>

          <p>
            例如匯率為 0.20 時，22,000 日幣的換算方式為：
          </p>

          <p className="font-medium text-[var(--jp-ink)]">
            22,000 × 0.20 ＝ 4,400 元台幣
          </p>

          <p>
            以上只是示範計算。實際換匯或刷卡時，應以交易當下適用的匯率及相關費用為準。
          </p>
        </ContentCard>

        <ContentCard title="常見日幣匯率參考">
          <p>
            為了方便估算日本旅遊與購物預算，可以使用不同匯率試算同一筆日幣金額。
            以下僅作為計算示例，不代表即時市場匯率。
          </p>

          <DataTable
            headers={["日幣", "匯率 0.20", "匯率 0.21", "匯率 0.22"]}
            rows={[
              [formatNumber(10000), "2,000", "2,100", "2,200"],
              [formatNumber(22000), "4,400", "4,620", "4,840"],
              [formatNumber(50000), "10,000", "10,500", "11,000"],
              [formatNumber(100000), "20,000", "21,000", "22,000"],
            ]}
          />

          <p>
            實際匯率每天可能變動，若是信用卡消費，也可能與單純使用市場匯率換算的結果不同。
          </p>
        </ContentCard>

        {/* Step 2：Search Console 實際高曝光金額 */}
        <ContentCard title="熱門日幣金額快速換算">
          <p>
            以下整理日本旅遊與購物常見的日幣金額，方便快速估算台幣價格。
            表格以匯率 0.20 作為示例。
          </p>

          <DataTable
            headers={["日幣金額", "台幣約多少？"]}
            rows={REFERENCE_FAQS.map((r) => [
              `${formatNumber(r.yen)} 日幣`,
              `${formatNumber(r.twd)} 元台幣`,
            ])}
          />

          <p className="text-sm text-[var(--jp-ink-muted)]">
            以上結果以 1 日幣 = 0.20 台幣計算。實際金額請依交易當日匯率重新換算。
          </p>
        </ContentCard>

        <ContentCard title="日本購物熱門金額換算">
          <div className="space-y-4">
            {REFERENCE_FAQS.slice(0, 6).map((r) => (
              <div
                key={r.yen}
                className="rounded-2xl border border-[var(--jp-border)] p-4"
              >
                <p className="font-medium text-[var(--jp-ink)]">
                  {formatNumber(r.yen)} 日幣等於多少台幣？
                </p>

                <p className="mt-1">
                  以匯率 0.20 計算，{formatNumber(r.yen)} 日幣約等於{" "}
                  {formatNumber(r.twd)} 元台幣。
                </p>
              </div>
            ))}
          </div>
        </ContentCard>

        <ContentCard title="常見日本購物價格換算表">
          <p>
            以下以匯率 0.20 為例進行試算，方便日本旅遊與購物時快速估算。
            實際匯率請以交易當下適用的銀行、信用卡或換匯管道為準。
          </p>

          <DataTable
            headers={["日幣", "台幣（0.20 匯率）"]}
            rows={YEN_TWD_TABLE.map((y) => [
              formatNumber(y),
              formatNumber(y * 0.2),
            ])}
          />
        </ContentCard>

        {/* Step 3：FAQ 對準實際搜尋意圖 */}
        <ContentCard title="日幣換台幣常見問題">
          <FaqItem
            q="22000日幣等於多少台幣？"
            a="以 1 日幣 = 0.20 台幣計算，22,000 日幣約等於 4,400 元台幣。實際金額會依交易當下匯率變動。"
          />

          <FaqItem
            q="24200日幣台幣多少？"
            a="以匯率 0.20 計算，24,200 日幣約等於 4,840 元台幣。"
          />

          <FaqItem
            q="3990日幣等於多少台幣？"
            a="以匯率 0.20 計算，3,990 日幣約等於 798 元台幣。"
          />

          <FaqItem
            q="50000日幣多少台幣？"
            a="以匯率 0.20 計算，50,000 日幣約等於 10,000 元台幣。"
          />

          <FaqItem
            q="10780日幣等於多少台幣？"
            a="以匯率 0.20 計算，10,780 日幣約等於 2,156 元台幣。"
          />

          <FaqItem
            q="5990日幣是多少台幣？"
            a="以匯率 0.20 計算，5,990 日幣約等於 1,198 元台幣。"
          />

          <FaqItem
            q="34100日幣等於多少台幣？"
            a="以匯率 0.20 計算，34,100 日幣約等於 6,820 元台幣。"
          />

          <FaqItem
            q="42500日幣等於多少台幣？"
            a="以匯率 0.20 計算，42,500 日幣約等於 8,500 元台幣。"
          />

          <FaqItem
            q="24750日幣等於多少台幣？"
            a="以匯率 0.20 計算，24,750 日幣約等於 4,950 元台幣。"
          />

          <FaqItem
            q="17400日幣等於多少台幣？"
            a="以匯率 0.20 計算，17,400 日幣約等於 3,480 元台幣。"
          />

          <FaqItem
            q="日幣匯率 0.20 怎麼算？"
            a="日幣金額乘以 0.20 即可得到約略台幣金額。例如 50,000 日幣 × 0.20 = 10,000 元台幣。"
          />

          <FaqItem
            q="日本刷卡匯率怎麼算？"
            a={
              <>
                日本刷卡的實際台幣成本通常不只是日幣金額乘以單一匯率，
                還可能受到 Visa 或 Mastercard 的匯率、發卡銀行海外交易手續費，
                以及部分店家的退稅手續費影響。因此刷卡後的實際成本可能與單純的日幣台幣換算不同。
              </>
            }
          />

          <FaqItem
            q="去日本刷卡還是換現金比較划算？"
            a="沒有所有情況都適用的單一答案。比較時可以同時考慮信用卡匯率、海外交易手續費、現金換匯成本，以及日本商店是否接受信用卡。"
          />
        </ContentCard>

        <ContentCard title="日本購物時，除了匯率還要注意什麼？">
          <p>
            如果只是把日幣換成台幣，使用日幣金額 × 匯率即可。
            但如果你正在計算日本購物的「最終成本」，還可能需要考慮其他因素。
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>日本商品是否含消費稅</li>
            <li>是否符合日本免稅資格</li>
            <li>百貨公司是否收取退稅手續費</li>
            <li>是否使用百貨或店家優惠券</li>
            <li>信用卡海外交易手續費</li>
            <li>實際刷卡或換匯時所使用的匯率</li>
          </ul>

          <p>
            因此，如果你是在規劃日本購物預算，建議先用本頁換算日幣與台幣，
            再搭配其他工具估算退稅與刷卡相關成本。
          </p>
        </ContentCard>

        <ContentCard title="相關工具">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link
                href="/"
                className="text-[var(--jp-accent)] underline"
              >
                日本退稅計算機
              </Link>
            </li>

            <li>
              <Link
                href="/japan-card-fee"
                className="text-[var(--jp-accent)] underline"
              >
                日本刷卡手續費計算機
              </Link>
            </li>

            <li>
              <Link
                href="/shopping-trip-estimator"
                className="text-[var(--jp-accent)] underline"
              >
                日本購物預算估算工具
              </Link>
            </li>

            <li>
              <Link
                href="/japan-tax-8-vs-10"
                className="text-[var(--jp-accent)] underline"
              >
                日本消費稅 8% 與 10% 差異
              </Link>
            </li>

            <li>
              <Link
                href="/japan-tax-2026"
                className="text-[var(--jp-accent)] underline"
              >
                2026 日本退稅制度
              </Link>
            </li>
          </ul>
        </ContentCard>
      </Section>

      <ArticleCards currentPath="/yen-to-twd" />
    </Layout>
  );
}
