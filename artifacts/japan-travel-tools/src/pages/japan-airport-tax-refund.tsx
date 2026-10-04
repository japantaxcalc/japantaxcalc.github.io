import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { articleJsonLd, useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";
const strong = "text-[var(--jp-ink)]";

const FAQS = [
  {
    q: "日本退稅一定要在機場嗎？",
    a: "看購買日。2026 年 10 月 31 日以前購買的，大多在店裡就完成免稅；11 月 1 日以後購買的，必須在出境時於機場或港口完成海關確認，才能退稅。",
  },
  {
    q: "日本退稅商品可以托運嗎？",
    a: "11 月 1 日以後購買的免稅品，要在托運行李之前，先到免稅手續終端機完成海關確認；托運之後不能為了辦退稅再把行李拿回來。確認完成後就可以托運。",
  },
  {
    q: "日本退稅會檢查商品嗎？",
    a: "可能會。刷護照後終端機顯示綠色代表確認完成；顯示紅色就要帶著免稅品到海關查驗區接受檢查。",
  },
  {
    q: "日本退稅會退現金嗎？",
    a: "看店家。日本觀光廳列出的方式有銀行轉帳、退回信用卡、App 退款，以及在出境港完成海關確認後領現金。",
  },
  {
    q: "日本退稅需要多久？",
    a: "終端機從刷護照到顯示結果只要幾秒；如果被要求查驗，需要額外的時間，所以要提早到機場。",
  },
];

const SOURCES = [
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html",
    label: "日本觀光廳：What is the Refund Method?",
  },
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00027.html",
    label: "日本觀光廳：Frequently Asked Questions for Travelers (Refund Method)",
  },
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/content/001991258.pdf",
    label: "日本觀光廳：退稅新制旅客說明單張（繁體中文 PDF）",
  },
  { href: "https://services.digital.go.jp/en/visit-japan-web/", label: "日本數位廳：Visit Japan Web" },
];

export default function JapanAirportTaxRefund() {
  useSeo({
    title: "日本機場退稅流程｜成田、羽田、關西機場退稅教學",
    description:
      "日本機場退稅流程 2026 新制版：11/1 以後購買的免稅品要在托運前到終端機刷護照完成海關確認。整理綠燈紅燈、成田羽田關西等 7 座機場可用 Visit Japan Web、時間安排與常見問題。",
    jsonLd: [
      articleJsonLd({
        path: "/japan-airport-tax-refund",
        headline: "日本機場退稅流程｜2026 最新教學",
        description: "11/1 以後購買的免稅品要在托運前完成海關確認。整理機場流程、Visit Japan Web、時間安排與常見問題。",
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
        eyebrow="實用流程"
        title="日本機場退稅流程｜2026 最新教學"
        description="11/1 以後買的免稅品，一定要在機場托運前完成海關確認才能退稅。終端機在哪、綠燈紅燈什麼意思、要提早多久到，這篇一次說清楚 ✈️"
        author="Miff"
        updated="2026年10月"
      />

      <Section>
        <ContentCard>
          <p>最近很多人在問：「日本退稅是不是以後都要去機場辦？」</p>
          <p>答案是：看你哪天買的。</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <b className={strong}>10/31 以前買的</b>：大多在店裡就免稅了，機場不用另外辦退稅，只要記得把東西帶出日本。
            </li>
            <li>
              <b className={strong}>11/1 以後買的</b>：一定要在機場（或港口）托運行李前完成海關確認，不然拿不到退稅喔。
            </li>
          </ul>
          <p>
            這篇主要講 11/1 以後的新流程。一樣先說，我還沒有實際在機場跑過新制流程，以下都是照日本觀光廳的公告整理的，來源附在最下面。
          </p>
          <p>
            想先算算這次能退多少，可以用
            <Link href="/" className={linkClass}>
              日本退稅計算機
            </Link>
            🧾
          </p>
        </ContentCard>

        <ContentCard title="日本退稅一定要在機場嗎？">
          <DataTable
            headers={["購買日", "退稅在哪裡完成", "出境時要做什麼"]}
            rows={[
              ["2026/10/31 以前", "在店裡結帳時（部分百貨在退稅櫃台）", "把免稅品帶出日本；消耗品特殊包裝出境前不能拆"],
              ["2026/11/1 以後", "出境時海關確認後，由店家或退款業者退款", "托運前到終端機刷護照，完成海關確認"],
            ]}
          />
          <p>
            新舊制是看<b className={strong}>購買日</b>，不是看出境日。如果你的行程剛好跨過 11/1，兩種收據最好分開收，比較不會搞混喔。完整的新舊制比較在
            <Link href="/japan-tax-2026" className={linkClass}>
              2026 日本退稅新制整理
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="日本機場退稅流程（11/1 以後購買）">
          <p className={`font-medium ${strong}`}>Step 1：到機場先不要托運</p>
          <p>所有免稅品都要帶在身邊。已經托運的行李，不能為了辦退稅再拿回來。</p>
          <p className={`font-medium ${strong}`}>Step 2：找免稅手續終端機</p>
          <p>終端機（Kiosk 或電子終端機）和海關查驗區，設在國際線出發大廳、航空公司報到櫃台之前。</p>
          <p className={`font-medium ${strong}`}>Step 3：刷護照看結果</p>
          <p>
            從刷護照到顯示結果只要幾秒：<b className={strong}>綠色</b>代表確認完成；<b className={strong}>紅色</b>
            代表要帶著免稅品到海關查驗區，讓海關關員檢查。
          </p>
          <p className={`font-medium ${strong}`}>Step 4：完成後再報到、托運</p>
          <p>海關確認（包括查驗）必須在登機手續完成前做完，確認完成後就可以去報到、托運行李。</p>
          <p className={`font-medium ${strong}`}>Step 5：等店家退款</p>
          <p>海關確認後，由購買的免稅店或店家委託的退款業者退稅。退款方式和時間，以購買時店家的說明為準。</p>
          <p>
            小建議：免稅品可以集中放在一個袋子或登機箱裡。萬一抽到紅燈要查驗，就不用在報到櫃台前面打開大行李箱翻來翻去了 😂
          </p>
        </ContentCard>

        <ContentCard title="7 座機場可以用 Visit Japan Web 線上辦">
          <p>
            成田、羽田、關西、中部、福岡、新千歲、那霸這 7 座旅客比較多的機場，除了終端機之外，也可以在國際線出發大廳的專用 Wi-Fi
            範圍內（到安檢口之前），用 Visit Japan Web 線上完成手續。其他機場和港口，就用終端機辦理。
          </p>
          <p>Visit Japan Web 就是入境日本時填資料的那個網站，出發前可以先登入確認帳號還能用喔。</p>
        </ContentCard>

        <ContentCard title="出境當天的時間怎麼抓？">
          <p>日本觀光廳的公告寫得很清楚：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>海關確認（包括查驗）必須在登機手續完成前做完。</li>
            <li>因為時間不夠而放棄確認，就視為沒有完成，不會退稅。</li>
            <li>因為辦退稅而趕不上飛機，航空公司和海關都不會補償。</li>
          </ul>
          <p>
            刷護照只要幾秒，但被抽中查驗、或是新制剛上路排隊的時間，真的很難預估。我會建議比平常再多抓 30～60 分鐘，尤其是 11
            月初剛上路的那幾週 ⏰
          </p>
        </ContentCard>

        <ContentCard title="這些情況要特別注意">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <b className={strong}>國內線轉國際線</b>：要在最後離開日本的機場辦理。例如從札幌飛羽田再轉機出國，就在羽田辦。
            </li>
            <li>
              <b className={strong}>同一張收據少一件</b>：海關以收據為單位確認，少一件，那張收據的所有商品都不能退稅。
            </li>
            <li>
              <b className={strong}>在日本用掉的消耗品</b>：不要在終端機操作，直接到櫃台向海關關員說明。
            </li>
            <li>
              <b className={strong}>單件未稅 100 萬日圓以上</b>：海關可能要求出示保證書或鑑定書，建議一起帶在身上。
            </li>
          </ul>
          <p>
            更多拿不到退稅的情況，可以看
            <Link href="/japan-tax-2026" className={linkClass}>
              2026 日本退稅新制整理
            </Link>
            裡的「這些情況會拿不到退稅」。
          </p>
        </ContentCard>

        <ContentCard title="2026 日本退稅新制差異">
          <DataTable
            headers={["項目", "現行（10/31 以前購買）", "新制（11/1 以後購買）"]}
            rows={[
              ["結帳價格", "免稅價", "含稅價"],
              ["海關確認", "不需要另外辦", "出境時托運前，在終端機完成"],
              ["誰退款", "店家結帳時直接免稅", "店家或店家委託的退款業者"],
              ["商品分類", "分一般物品與消耗品", "取消"],
              ["消耗品包裝", "特殊包裝，出境前不能拆", "取消，但用掉的不能退稅"],
              ["出境期限", "—", "購買日起 90 天內"],
            ]}
          />
        </ContentCard>

        <ContentCard title="日本機場退稅常見問題 FAQ">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ContentCard>

        <ContentCard title="延伸閱讀">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/" className="text-[var(--jp-accent)] underline">
                日本退稅計算機
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
                日本 8% vs 10% 消費稅差異
              </Link>
            </li>
            <li>
              <Link href="/japan-card-fee" className="text-[var(--jp-accent)] underline">
                日本海外刷卡手續費計算
              </Link>
            </li>
          </ul>
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
          <p>以上依 2026 年 10 月查到的官方公告整理。新制剛上路，各機場的實際動線如果有更新，我會再修改這篇。</p>
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-airport-tax-refund" />
      <ArticleCards currentPath="/japan-airport-tax-refund" />
    </Layout>
  );
}
