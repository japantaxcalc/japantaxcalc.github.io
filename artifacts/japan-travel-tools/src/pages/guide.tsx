import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { FaqItem, Section } from "@/components/site/ContentCard";
import { articleJsonLd, useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";
const strong = "text-[var(--jp-ink)]";

const FAQS = [
  { q: "日本退稅一定要護照嗎？", a: "需要。在免稅店結帳時要出示護照；2026 年 11 月 1 日以後購買的免稅品，出境時也要在機場的終端機刷護照。" },
  { q: "日本退稅門檻是多少？", a: "同一天、同一家店，未稅合計 5,000 日圓以上。2026 年 11 月 1 日起的新制，門檻一樣不變。" },
  {
    q: "日本退稅是 8% 還是 10%？",
    a: "看商品。一般商品是 10%；食品、飲料（不含酒類和外食）是 8%。另外日本政府有一個方案，預計 2027 年 4 月起兩年把食品飲料降到 1%，但還要等國會通過。",
  },
  {
    q: "日本退稅商品可以拆封嗎？",
    a: "2026 年 10 月 31 日以前購買的消耗品，特殊包裝在出境前不能拆。11 月 1 日以後購買的取消特殊包裝，但在日本吃掉、用掉的就不能退稅。",
  },
  {
    q: "日本退稅會直接退現金嗎？",
    a: "10 月 31 日以前購買的，多數店家直接用免稅價結帳，部分百貨公司是到退稅櫃台退款。11 月 1 日以後購買的，依店家提供的方式退款，包括銀行轉帳、退回信用卡、App 退款，或在出境港完成海關確認後領現金。",
  },
  {
    q: "2026 日本退稅新制是什麼？",
    a: "2026 年 11 月 1 日以後購買的免稅品，結帳時先付含稅價，購買日起 90 天內出境，並在托運行李前完成海關確認，之後由店家或退款業者退稅。",
  },
  { q: "百貨公司退稅為什麼沒有拿回完整 10%？", a: "部分百貨公司會收取退稅手續費，常見在 1.1% 到 1.55% 之間，所以實際拿回的會比 10% 少。" },
  { q: "日本刷卡退稅後還會有額外費用嗎？", a: "有可能。台灣的信用卡多會收 1% 到 2% 的海外交易手續費；新制要先付含稅價，手續費會用含稅金額計算。" },
];

const SOURCES = [
  { href: "https://www.japan.travel/en/plan/japans-tax-exemption/", label: "JNTO 日本國家旅遊局：Japan's Tax Exemption" },
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html",
    label: "日本觀光廳：What is the Refund Method?",
  },
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00027.html",
    label: "日本觀光廳：Frequently Asked Questions for Travelers (Refund Method)",
  },
  { href: "https://www.nta.go.jp/english/taxes/consumption_tax/01.htm", label: "日本國稅廳：Consumption Tax（稅率與輕減稅率）" },
];

export default function Guide() {
  useSeo({
    title: "日本退稅教學｜2026 最新免稅規則、退稅流程與計算方式",
    description:
      "2026 最新日本退稅教學：誰可以退稅、同一天同一家店未稅 5,000 日圓門檻、10/31 以前與 11/1 以後的退稅流程、8% 與 10% 怎麼算，以及百貨手續費與信用卡海外手續費。",
    jsonLd: [
      articleJsonLd({
        path: "/guide",
        headline: "日本退稅教學｜2026 最新免稅規則、退稅流程與退稅計算完整指南",
        description: "誰可以退稅、門檻怎麼算、10/31 以前與 11/1 以後的退稅流程差在哪，以及實際能拿回多少。",
        published: "2026-06-08",
        modified: "2026-10-05",
      }),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  return (
    <Layout>
      <Hero
        eyebrow="完整教學"
        title="日本退稅教學｜2026 最新免稅規則、退稅流程與退稅計算完整指南"
        description="誰可以退稅、門檻怎麼算、店裡跟機場要做什麼，還有 2026 年 11 月 1 日起的先付後退新制。第一次去日本購物前，看這篇就夠了 🧾"
        author="Miff"
        updated="2026年10月"
      />

      <Section>
        <ContentCard>
          <p>
            日本退稅說難不難，但細節真的蠻多的。尤其 2026 年 11 月 1 日開始改成先付後退，網路上新舊資訊混在一起，很容易越看越頭昏（我查資料的時候也是😂）。
          </p>
          <p>
            所以我把日本觀光廳、國稅廳公告的規定整理成這篇，從「誰可以退」到「實際能拿回多少」一次講清楚。我自己沒有在日本辦過退稅，所以規定的部分都照官方寫，最下面附了來源，你可以自己點過去查喔。
          </p>
          <p>
            想直接算數字的話，用
            <Link href="/" className={linkClass}>
              👉 日本退稅計算機
            </Link>
            就可以囉。
          </p>
        </ContentCard>

        <ContentCard title="日本退稅是什麼？">
          <p>
            日本退稅（Tax-free Shopping）是讓短期來日本的外國旅客，在免稅店購買要帶出日本的商品時，不用負擔日本消費稅的制度。日本的消費稅率有兩種：
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>10%：一般商品，例如衣服、包包、電器、藥妝、化妝品</li>
            <li>8%：食品、飲料（不含酒類和外食）</li>
          </ul>
          <p>所以買衣服、電器、藥妝這些 10% 的東西，退稅會最有感喔。</p>
        </ContentCard>

        <ContentCard title="誰可以辦理日本退稅？">
          <p>依日本的規定，需要符合以下條件：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>在日本沒有住所的外國旅客，例如以觀光等短期停留身分入境</li>
            <li>購買的商品要帶出日本</li>
            <li>在免稅店結帳時出示護照</li>
          </ul>
          <p>拿台灣護照去日本觀光的話，基本上都符合資格。只是記得逛街時要把護照正本帶在身上，不然到了收銀台才發現沒帶就可惜了啦。</p>
        </ContentCard>

        <ContentCard title="日本退稅門檻是多少？">
          <p>
            門檻是<b className={strong}>同一天、同一家店，未稅合計 5,000 日圓以上</b>。2026 年 11 月 1 日起的新制，這個門檻一樣不變。
          </p>
          <p>
            舉例來說，在同一家藥妝店買了未稅 3,000 日圓和 2,500 日圓的東西，合計 5,500 日圓就過門檻了；但如果分成兩天買，每天都沒到 5,000
            日圓，就不能退稅。
          </p>
          <p>
            另外要注意，門檻看的是「未稅」金額喔。含稅 5,400 日圓的東西，未稅其實只有 4,909 日圓，還差一點點 😅 出發前可以用
            <Link href="/shopping-trip-estimator" className={linkClass}>
              購物清單試算器
            </Link>
            一家一家檢查有沒有過門檻。
          </p>
        </ContentCard>

        <ContentCard title="一般商品與消耗品有什麼差異？">
          <p className={`font-medium ${strong}`}>2026 年 10 月 31 日以前購買</p>
          <p>現行制度把免稅品分成兩類，分開計算 5,000 日圓門檻：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>一般物品：衣服、鞋子、包包、電器、精品等，買了可以直接使用。</li>
            <li>
              消耗品：食品、飲料、藥品、化妝品等，會用特殊包裝封起來，出境前不能拆封，每人每天同一家店的上限是未稅 50 萬日圓。
            </li>
          </ul>
          <p>一般物品如果也用特殊包裝封起來，可以和消耗品合併計算門檻。</p>
          <p className={`font-medium ${strong}`}>2026 年 11 月 1 日以後購買</p>
          <p>
            取消一般物品和消耗品的分類，也取消特殊包裝和 50 萬日圓上限，數量以自己能帶出境為限。但食品、飲料、化妝品如果在日本用掉一部分或全部，就不能退稅。
          </p>
          <p>簡單說，11/1 以後就不用再管「這是一般還是消耗品」了，只要記得別在日本拆來吃、拆來用就好 😂</p>
        </ContentCard>

        <ContentCard title="日本退稅流程教學">
          <p className={`font-medium ${strong}`}>2026 年 10 月 31 日以前購買：在店裡就完成</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>在免稅店結帳時出示護照。</li>
            <li>多數店家直接用免稅價結帳；部分百貨公司是先付含稅價，再到館內退稅櫃台辦理退款。</li>
            <li>消耗品會放在特殊包裝裡，出境前不要拆。</li>
            <li>出境時把免稅品帶出日本。</li>
          </ol>
          <p className={`font-medium ${strong}`}>2026 年 11 月 1 日以後購買：先付後退</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>在免稅店用含稅價購買，並出示護照。</li>
            <li>依店家的說明登錄退款方式。</li>
            <li>購買日起 90 天內出境，在機場或港口托運行李前，到免稅手續終端機刷護照完成海關確認。</li>
            <li>確認完成後，由購買的免稅店或店家委託的退款業者退稅。</li>
          </ol>
          <p>
            機場那一段的細節（終端機在哪、綠燈紅燈是什麼意思）我整理在
            <Link href="/japan-airport-tax-refund" className={linkClass}>
              日本機場退稅流程
            </Link>
            ，出國前記得看一下喔 ✈️
          </p>
        </ContentCard>

        <ContentCard title="日本退稅怎麼算？">
          <p>退稅金額就是你付的消費稅，公式如下：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>10% 的商品：含稅價 ÷ 1.1 ＝ 未稅價，含稅價 − 未稅價 ＝ 稅金</li>
            <li>8% 的商品：含稅價 ÷ 1.08 ＝ 未稅價，含稅價 − 未稅價 ＝ 稅金</li>
          </ul>
          <p>
            例如含稅 11,000 日圓的保養品，未稅價是 10,000 日圓，稅金 1,000 日圓；含稅 1,080 日圓的零食，未稅價是 1,000 日圓，稅金 80 日圓。
          </p>
          <p>
            稅率怎麼分，可以看
            <Link href="/japan-tax-8-vs-10" className={linkClass}>
              日本消費稅 8% 與 10% 差異
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="百貨公司退稅手續費">
          <p>
            很多人以為退稅就是拿回完整的 10%，但其實不一定。現行制度下，部分百貨公司是先收含稅價，再到退稅櫃台退款，這時會扣一筆退稅手續費，常見在
            1.1% 到 1.55% 之間（各家不同）。
          </p>
          <p>
            以 1.55% 來算，10% 的商品實際拿回來大約是 8.45%。新制之後，退款改由店家或退款業者處理，手續費怎麼收要看各店公告。想知道扣完手續費實際拿多少，丟進
            <Link href="/" className={linkClass}>
              日本退稅計算機
            </Link>
            算一下就知道了。
          </p>
        </ContentCard>

        <ContentCard title="信用卡海外刷卡手續費">
          <p>
            在日本刷台灣的信用卡，大部分銀行會收 1% 到 2% 左右的海外交易手續費。新制要先付含稅價，手續費是用含稅金額算的，這筆也記得算進去喔 💳
          </p>
          <p>
            兩張卡哪張比較划算，可以用
            <Link href="/japan-card-fee" className={linkClass}>
              日本海外刷卡手續費計算機
            </Link>
            比比看。
          </p>
        </ContentCard>

        <ContentCard title="2026 日本退稅新制">
          <p>
            2026 年 11 月 1 日（含）以後購買的免稅品改為先付後退：結帳先付含稅價，購買日起 90
            天內出境，在托運行李前完成海關確認，之後由店家或退款業者退稅。新舊制是看購買日，不是看出境日。
          </p>
          <p>
            哪些情況會拿不到退稅、退款怎麼拿，我都整理在
            <Link href="/japan-tax-2026" className={linkClass}>
              2026 日本退稅新制完整整理
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="日本退稅常見問題 FAQ">
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
          <p>以上依 2026 年 10 月查到的官方公告整理，百貨手續費與信用卡手續費以各店家、各銀行公告為準。</p>
        </ContentCard>
      </Section>

      <ToolCards currentPath="/guide" />
      <ArticleCards currentPath="/guide" />
    </Layout>
  );
}
