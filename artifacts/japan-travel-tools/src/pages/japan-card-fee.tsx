import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ToolCards from "@/components/site/ToolCards";
import ArticleCards from "@/components/site/ArticleCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { calcCardFee, formatNumber, CARD_FEE_TABLE } from "@/lib/calculators";
import { useSeo } from "@/lib/seo";

const FAQS = [
  { q: "日本刷卡手續費是多少？", a: "大部分台灣信用卡海外交易手續費約 1% 至 2%，實際費率依銀行規定而定。" },
  { q: "日本刷卡手續費怎麼算？", a: "刷卡金額乘以海外交易手續費率即可計算，例如 50000 日圓乘以 1.5%，手續費約 750 日圓。" },
  { q: "去日本刷卡還是換現金划算？", a: "多數情況下信用卡匯率較佳，但仍須考慮海外交易手續費。" },
];

export default function JapanCardFee() {
  useSeo({
    title: "日本海外刷卡手續費計算機｜日幣刷卡換算台幣",
    description:
      "快速計算日本海外刷卡手續費，支援日幣換算台幣、Visa/Mastercard 海外交易費、日本旅遊刷卡成本估算。",
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
  const [result, setResult] = useState<ReturnType<typeof calcCardFee> | null>(null);

  function handleCalc() {
    const yenNum = parseFloat(yen);
    const rateNum = parseFloat(rate);
    if (Number.isNaN(yenNum) || Number.isNaN(rateNum)) {
      alert("請輸入正確數字");
      return;
    }
    setResult(calcCardFee(yenNum, parseFloat(fee) || 0, rateNum));
  }

  return (
    <Layout>
      <Hero
        eyebrow="海外刷卡手續費計算機"
        title="日本海外刷卡手續費計算機"
        description="快速計算日本旅遊海外刷卡手續費、日幣換算台幣與最終信用卡支付金額。"
      >
        <div className="mt-8 max-w-xl rounded-3xl border border-[var(--jp-border)] bg-[var(--jp-card)] p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--jp-ink)]">立即計算</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">刷卡金額（日圓）</label>
              <input
                type="number"
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
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[var(--jp-border)] bg-[var(--jp-paper)] px-3 py-2.5 text-[var(--jp-ink)] outline-none focus:border-[var(--jp-ink)]"
              />
              <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">
                台灣信用卡海外交易手續費通常約 1%~2%
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--jp-ink)]">
                匯率（1日圓 = 台幣）
              </label>
              <input
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
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
              開始計算
            </button>
          </div>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-[var(--jp-accent-soft)] p-5">
                <p className="text-xs font-medium text-[var(--jp-ink-muted)]">💳 手續費金額</p>
                <p className="mt-1 text-2xl font-bold text-[var(--jp-accent)]">
                  ¥{formatNumber(result.feeCost)}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--jp-border)] p-5 text-sm text-[var(--jp-ink-muted)]">
                <p className="font-medium text-[var(--jp-ink)]">📊 計算明細</p>
                <p className="mt-2">原始刷卡金額：¥{formatNumber(result.original)}</p>
                <p>海外交易手續費：¥{formatNumber(result.feeCost)}</p>
                <p>最終刷卡金額：¥{formatNumber(result.finalYen)}</p>
                <p>換算台幣：NT${formatNumber(result.finalTwd)}</p>
              </div>
            </div>
          )}
        </div>
      </Hero>

      <ToolCards currentPath="/japan-card-fee" />

      <Section>
        <ContentCard title="日本刷卡手續費怎麼算？">
          <p>在日本使用信用卡消費時，通常會產生海外交易手續費。</p>
          <p>大部分台灣銀行海外刷卡手續費約為：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Visa：約 1%~2%</li>
            <li>Mastercard：約 1%~2%</li>
            <li>JCB：約 1%~2%</li>
          </ul>
          <p>實際費用通常包含：國際組織匯率、銀行海外交易費、即時日圓匯率波動。</p>
          <p>計算公式如下：刷卡金額 × 海外交易手續費率。</p>
          <p>例如刷卡 50000 日圓，若信用卡海外交易手續費為 1.5%，則手續費約為 750 日圓。</p>
          <p>實際請款時，還會受到 Visa、Mastercard、JCB 國際組織匯率影響。</p>
        </ContentCard>

        <ContentCard title="常見日本刷卡手續費試算">
          <p>以下以海外交易手續費 1.5% 為例：</p>
          <DataTable
            headers={["刷卡金額", "手續費"]}
            rows={CARD_FEE_TABLE.map((y) => [`${formatNumber(y)}日圓`, `${formatNumber(y * 0.015)}日圓`])}
          />
        </ContentCard>

        <ContentCard title="FAQ">
          <FaqItem q="日本刷卡會比較便宜嗎？" a="通常信用卡匯率會比機場換匯更好，但仍需考慮海外交易手續費。" />
          <FaqItem q="海外刷卡手續費通常是多少？" a="大部分信用卡約 1%~2%。" />
          <FaqItem q="去日本刷卡還是現金划算？" a="通常刷卡較方便，但小店仍可能只收現金。" />
          <FaqItem q="海外刷卡會即時扣款嗎？" a="最終請款匯率可能與刷卡當下略有差異。" />
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
