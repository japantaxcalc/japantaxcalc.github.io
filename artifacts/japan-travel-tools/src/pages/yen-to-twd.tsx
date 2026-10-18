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

const linkClass = "text-[var(--jp-accent)] underline";
const strong = "text-[var(--jp-ink)]";

// 台灣多數信用卡的海外交易手續費：國際組織 1% ＋ 發卡銀行 0.5%
const CARD_FEE = 0.015;

const FAQS = [
  {
    q: "日本刷卡匯率怎麼算？",
    a: "用 Visa、Mastercard、JCB 等信用卡國際組織在結匯日的匯率換成台幣，再加上發卡銀行的海外交易手續費，台灣多數信用卡是 1.5%。所以刷卡當下自己算的金額，和帳單上的金額可能會差一點。",
  },
  {
    q: "去日本刷卡還是換現金比較划算？",
    a: "沒有所有情況都適用的單一答案。比較時可以同時考慮信用卡匯率、海外交易手續費、現金換匯成本，以及日本商店是否接受信用卡。在車站售票機儲值交通卡、鄉下的小店和民宿，常常還是只收現金。",
  },
  {
    q: "日本標價要用含稅還是未稅金額換算？",
    a: "用實際要付的含稅價，也就是標示「税込」的金額。有些標價會把未稅價寫得比較大，看到「税抜」或「本体価格」就是未稅價，結帳時還要再加 8% 或 10% 的消費稅。",
  },
  {
    q: "刷卡時被問要用日圓還是台幣，要選哪個？",
    a: "選日圓。選台幣就是 DCC（動態貨幣轉換），匯率由店家那邊決定，台灣的發卡銀行一樣會收 1.5% 的海外交易手續費。",
  },
];

const SOURCES = [
  { href: "https://rate.bot.com.tw/xrt?Lang=zh-TW", label: "臺灣銀行：牌告匯率" },
  {
    href: "https://www.esunbank.com/zh-tw/about/faq/content?q=credit_card%2F018",
    label: "玉山銀行：持信用卡在國外消費會收取什麼費用？",
  },
  {
    href: "https://service.ctbcbank.com/FAQ/Page01?kmid=4724",
    label: "中國信託：國外交易手續費如何收取？",
  },
];

export default function YenToTwd() {
  useSeo({
    title: "日幣台幣換算｜日圓換台幣計算機，可自訂匯率",
    description:
      "輸入日幣金額和自己的匯率，換算成台幣。附常見金額換算表（跟著你輸入的匯率更新、含刷卡 1.5% 手續費），以及換現金、刷卡實際用的匯率怎麼看。",
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

  const [yen, setYen] = useState("10000");
  const [rate, setRate] = useState("0.20");
  const [twd, setTwd] = useState<number | null>(null);

  // 換算表跟著輸入的匯率更新；匯率還沒輸入完整時先用 0.20
  const typedRate = parseFloat(rate);
  const tableRate = typedRate > 0 ? typedRate : 0.2;
  const tableRateLabel = typedRate > 0 ? rate.trim() : "0.20";

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
            例如匯率為 0.20 時，10,000 日幣的換算方式為：
          </p>

          <p className="font-medium text-[var(--jp-ink)]">
            10,000 × 0.20 ＝ 2,000 元台幣
          </p>

          <p>
            實際換現金或刷卡時，用的匯率和手續費都不太一樣，下面有整理。
          </p>
        </ContentCard>

        <ContentCard title="常見金額換算表">
          <p>
            表格用你在上方輸入的匯率計算，改了匯率，表格會跟著更新。最右邊一欄加上台灣多數信用卡的 1.5% 海外交易手續費，是在日本刷卡大約會付的台幣。
          </p>

          <DataTable
            fit
            headers={[
              "日幣",
              `台幣（匯率 ${tableRateLabel}）`,
              "刷卡加 1.5% 手續費",
            ]}
            rows={YEN_TWD_TABLE.map((y) => [
              formatNumber(y),
              formatNumber(y * tableRate),
              formatNumber(y * tableRate * (1 + CARD_FEE)),
            ])}
          />

          <p className="text-sm text-[var(--jp-ink-muted)]">
            5,500 日幣：10% 的商品含稅 5,500 日幣，未稅剛好 5,000 日幣，就到免稅門檻（同一天、同一家店的未稅合計）。8% 的食品是含稅 5,400 日幣。詳細可以看{" "}
            <Link href="/japan-tax-8-vs-10" className={linkClass}>
              日本消費稅 8% 與 10% 差異
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="網路上查到的匯率，和實際付的不一樣">
          <p>
            Google 或新聞上看到的日幣匯率是市場的參考匯率。真的換錢或刷卡時，用的是銀行或信用卡國際組織的匯率，有時還要加手續費，所以本頁的匯率可以自己改。
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              <b className={strong}>在台灣換日幣現鈔</b>
              ：看銀行牌告匯率「現金匯率」底下的「本行賣出」。現鈔的匯率會比即期匯率高一點，例如 2026 年 10 月 17 日上午，臺灣銀行的日圓現金賣出是 0.2082，即期賣出是 0.2072。
            </li>
            <li>
              <b className={strong}>在日本刷卡</b>
              ：用 Visa、Mastercard、JCB 等國際組織在結匯日的匯率換成台幣，再加上海外交易手續費。台灣多數信用卡是 1.5%（國際組織 1% 加發卡銀行 0.5%）。
            </li>
            <li>
              <b className={strong}>刷卡時選台幣（DCC）</b>
              ：匯率由店家那邊決定，1.5% 一樣照收，通常比選日圓貴。原因和例子可以看{" "}
              <Link href="/blog/dcc-yen-or-twd" className={linkClass}>
                在日本刷卡選日圓還是台幣
              </Link>
              。
            </li>
          </ul>

          <p>
            想估要帶多少現金，可以看{" "}
            <Link href="/blog/how-much-yen-cash" className={linkClass}>
              去日本要換多少日幣
            </Link>
            ；信用卡的手續費不是 1.5% 的話，用{" "}
            <Link href="/japan-card-fee" className={linkClass}>
              海外刷卡手續費計算機
            </Link>
            換成自己的費率。
          </p>
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

        <ContentCard title="日幣換台幣常見問題">
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
          <p>以上依 2026 年 10 月查到的銀行官網資料整理，實際匯率和手續費以各銀行的公告為準。</p>
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
