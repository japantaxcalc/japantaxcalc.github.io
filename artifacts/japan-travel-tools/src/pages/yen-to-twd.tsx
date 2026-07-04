import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { calcYenToTwd, formatNumber, YEN_TWD_TABLE } from "@/lib/calculators";
import { useSeo } from "@/lib/seo";

const REFERENCE_FAQS = [
  { yen: 22000, twd: 4400 },
  { yen: 50000, twd: 10000 },
  { yen: 100000, twd: 20000 },
  { yen: 34100, twd: 6820 },
  { yen: 24200, twd: 4840 },
  { yen: 3990, twd: 798 },
  { yen: 10780, twd: 2156 },
  { yen: 24750, twd: 4950 },
  { yen: 17400, twd: 3480 },
  { yen: 42500, twd: 8500 },
];

export default function YenToTwd() {
  useSeo({
    title: "日幣台幣換算｜日圓換台幣計算機、日本旅遊匯率換算工具",
    description:
      "日幣台幣換算工具，支援日圓(JPY)換算台幣(TWD)、日本旅遊預算估算、購物價格換算。提供1000、5000、10000、22000、50000、100000日圓換算台幣參考。",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: REFERENCE_FAQS.map((r) => ({
        "@type": "Question",
        name: `${formatNumber(r.yen)}日幣等於多少台幣？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `以0.20匯率計算，${formatNumber(r.yen)}日幣約等於${formatNumber(r.twd)}元台幣。`,
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
    if (Number.isNaN(yenNum) || Number.isNaN(rateNum)) {
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
              <label className="text-sm font-medium text-[var(--jp-ink)]">日幣金額（JPY）</label>
              <input
                type="number"
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
                step="0.001"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                預設匯率為 0.20，僅供參考，可依照銀行、信用卡或即時匯率自行調整。
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
            <p className="text-xs font-medium text-[var(--jp-ink-muted)]">換算結果</p>
            <p className="mt-1 text-3xl font-bold text-[var(--jp-accent)]">
              {twd === null ? "0" : formatNumber(twd)} 元
            </p>
          </div>
        </div>
      </Hero>

      <ToolCards currentPath="/yen-to-twd" />

      <Section>
        <ContentCard title="常見日幣匯率參考">
          <p>日幣匯率每天都會變動，以下提供常見換算區間供參考：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>0.20：近期常見匯率區間</li>
            <li>0.21：保守估算</li>
            <li>0.22：近年常見匯率</li>
            <li>0.23：匯率較高時期</li>
          </ul>
          <p>實際匯率仍應以銀行、信用卡公司或換匯平台公告為準。</p>
        </ContentCard>

        <ContentCard title="日本購物熱門金額換算">
          <div className="space-y-3">
            {REFERENCE_FAQS.map((r) => (
              <div key={r.yen}>
                <p className="font-medium text-[var(--jp-ink)]">
                  {formatNumber(r.yen)} 日幣等於多少台幣？
                </p>
                <p>
                  以匯率 0.20 計算，{formatNumber(r.yen)} 日幣約等於 {formatNumber(r.twd)} 元台幣。
                </p>
              </div>
            ))}
          </div>
        </ContentCard>

        <ContentCard title="常見日本購物價格換算表">
          <p>以下以匯率 0.20 為例進行試算，實際匯率請以銀行或信用卡公司公告為準。</p>
          <DataTable
            headers={["日幣", "台幣（0.20 匯率）"]}
            rows={YEN_TWD_TABLE.map((y) => [formatNumber(y), formatNumber(y * 0.2)])}
          />
        </ContentCard>

        <ContentCard title="日本購物常見價格換算問題">
          <FaqItem
            q="日幣匯率 0.20 怎麼算？"
            a="計算方式非常簡單：日幣金額 × 0.20 = 約略台幣金額。例如 50000 日幣 × 0.20，約等於 10000 台幣。"
          />
          <FaqItem
            q="UNIQLO 外套 5990 日幣是多少台幣？"
            a="以匯率 0.20 計算，5990 日幣約等於 1198 元台幣。"
          />
          <FaqItem q="Switch 主機 32980 日幣是多少台幣？" a="約等於 6596 元台幣。" />
          <FaqItem q="iPhone 16 124800 日幣是多少台幣？" a="約等於 24960 元台幣。" />
          <FaqItem
            q="日本刷卡匯率怎麼算？"
            a={
              <>
                海外刷卡通常會包含：Visa / Master 匯率、銀行海外交易手續費（約 1%~2%）、部分百貨退稅手續費。因此實際刷卡金額通常會高於即時匯率。
              </>
            }
          />
          <FaqItem q="去日本刷卡還是換現金比較划算？" a="通常信用卡匯率會比機場換匯更好，但仍需考慮海外交易手續費。" />
        </ContentCard>

        <ContentCard title="相關工具">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/" className="text-[var(--jp-accent)] underline">
                日本退稅計算機
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

      <ArticleCards currentPath="/yen-to-twd" />
    </Layout>
  );
}
