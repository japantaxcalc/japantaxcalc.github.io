import { Link } from "wouter";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import ArticleCards from "@/components/site/ArticleCards";
import ToolCards from "@/components/site/ToolCards";
import ContentCard, { DataTable, FaqItem, Section } from "@/components/site/ContentCard";
import { articleJsonLd, useSeo } from "@/lib/seo";

const linkClass = "font-medium text-[var(--jp-accent)] underline";

const FAQS = [
  {
    q: "2026 日本退稅新制什麼時候開始？",
    a: "2026 年 11 月 1 日（含）以後購買的免稅品適用新制。新舊制是看購買日，不是看出境日。",
  },
  {
    q: "日本退稅為什麼改制？",
    a: "為了防止免稅品沒有帶出日本、在日本國內轉賣等不當使用，改成海關確認商品出境之後再退稅。",
  },
  {
    q: "新制之後一定要在機場辦退稅嗎？",
    a: "要。11 月 1 日以後購買的免稅品，必須在購買日起 90 天內出境，並在機場或港口托運行李之前完成海關確認，才能退稅。",
  },
  {
    q: "新制的免稅門檻有改變嗎？",
    a: "沒有。一樣是同一天、同一家店，未稅合計 5,000 日圓以上。",
  },
  {
    q: "新制的退稅會退現金嗎？",
    a: "看店家。日本觀光廳列出的方式有銀行轉帳、退回信用卡、App 退款，以及在出境港完成海關確認後領現金，各店提供的方式不同。",
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
  {
    href: "https://www.nta.go.jp/publication/pamph/shohi/menzei/201805/format/002.htm",
    label: "日本國稅廳：輸出物品販売場制度のリファンド方式への見直し",
  },
  {
    href: "https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/zeiritsuhikisage.htm",
    label: "日本國稅廳：消費税率引下げ特設サイト（飲食料品 2 年間 1%，法案審議中）",
  },
];

export default function JapanTax2026() {
  useSeo({
    title: "2026 日本退稅新制｜日本改採先付後退？最新退稅規則整理",
    description:
      "2026 年 11 月 1 日起日本退稅改為先付後退：結帳先付含稅價，購買後 90 天內出境、托運前完成海關確認才退稅。整理新舊制差異、機場流程、容易踩雷的情況與退款方式。",
    jsonLd: [
      articleJsonLd({
        path: "/japan-tax-2026",
        headline: "2026 日本退稅新制｜日本改採先付後退？",
        description: "2026 年 11 月 1 日起日本退稅改為先付後退，整理新舊制差異、機場流程、容易踩雷的情況與退款方式。",
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
        eyebrow="新制解析"
        title="2026 日本退稅新制｜日本改採先付後退？"
        description="2026 年 11 月 1 日起在日本買的免稅品，結帳要先付含稅價，出境時讓海關確認之後才會退稅。新舊制差在哪、機場要做什麼、哪些情況會拿不到退稅，這篇一次整理給你。"
        author="Miff"
        updated="2026年10月"
      />

      <Section>
        <ContentCard>
          <p>
            先講結論：<b className="text-[var(--jp-ink)]">2026 年 11 月 1 日（含）以後買的免稅品，結帳時要先付含稅價</b>
            ，等你出境的時候在機場讓海關確認東西真的帶出日本，才會把稅退給你。這就是大家最近一直在講的「先付後退」啦。
          </p>
          <p>
            我自己還沒有在機場辦過新制的退稅（畢竟 11/1 才開始哈哈），所以這篇的規定都是我照日本觀光廳的公告一條一條整理的，最下面有附來源，想看原文可以直接點過去喔。
          </p>
          <p>
            如果你只是想知道這次能退多少，直接用
            <Link href="/" className={linkClass}>
              日本退稅計算機
            </Link>
            算一下最快 🧾
          </p>
        </ContentCard>

        <ContentCard title="日本退稅新制是什麼？">
          <p>現行制度（2026 年 10 月 31 日以前購買）是在免稅店結帳時直接扣掉消費稅，你付的就是免稅價。</p>
          <p>新制（2026 年 11 月 1 日以後購買）改成 Refund 方式，流程如下：</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>在免稅店用含稅價購買。</li>
            <li>購買日起 90 天內出境，並在出境時接受海關確認。</li>
            <li>海關確認後，由購買的免稅店，或店家委託的退款業者退還消費稅。</li>
          </ol>
          <p>
            要特別注意，新舊制是看<b className="text-[var(--jp-ink)]">購買日</b>，不是看出境日。所以 10/28
            買、11/3 才出境的東西，還是照舊制處理。
          </p>
          <p>
            為什麼要改？說白了就是之前有人用免稅價大量掃貨，結果東西根本沒帶出日本，直接在當地轉賣掉。所以現在改成先確認東西真的出境，再把稅退給你。
          </p>
        </ContentCard>

        <ContentCard title="日本退稅新舊制差在哪？">
          <DataTable
            headers={["項目", "現行（2026/10/31 以前購買）", "新制（2026/11/1 以後購買）"]}
            rows={[
              ["結帳價格", "免稅價", "含稅價"],
              ["拿回稅金的時間", "結帳當下", "出境時海關確認之後"],
              ["購物門檻", "同一天、同一家店，未稅 5,000 日圓以上", "不變"],
              ["一般物品／消耗品分類", "分開計算", "取消"],
              ["消耗品特殊包裝", "需要，出境前不能拆", "取消，但在日本用掉的不能退稅"],
              ["消耗品上限", "未稅 50 萬日圓", "取消，以自己能帶出境的數量為限"],
              ["出境期限", "—", "購買日起 90 天內"],
              ["別送（自行郵寄出境）", "已於 2025 年 3 月 31 日廢止", "已廢止"],
            ]}
          />
          <p>
            門檻沒變這點蠻重要的：同一天、同一家店，未稅合計還是要 5,000 日圓以上才能免稅。想知道自己買的東西有沒有過門檻，可以丟進
            <Link href="/shopping-trip-estimator" className={linkClass}>
              購物清單試算器
            </Link>
            一家一家檢查喔。
          </p>
        </ContentCard>

        <ContentCard title="2026 日本機場退稅流程">
          <p>11 月 1 日以後買的免稅品，出境當天在機場要做的事如下：</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>到機場後先不要托運行李，所有免稅品都要帶在身邊。</li>
            <li>在國際線出發大廳、航空公司報到櫃台之前，找到免稅手續終端機（Kiosk 或電子終端機）。</li>
            <li>
              刷護照，幾秒鐘就會顯示結果：<b className="text-[var(--jp-ink)]">綠色</b>代表確認完成；
              <b className="text-[var(--jp-ink)]">紅色</b>代表要帶著免稅品到海關查驗區接受檢查。
            </li>
            <li>確認完成後，再去報到、托運行李。</li>
          </ol>
          <p>
            成田、羽田、關西、中部、福岡、新千歲、那霸這 7 座機場，也可以在國際線出發大廳的專用 Wi-Fi 範圍內（安檢前），用
            Visit Japan Web 線上辦理。
          </p>
          <p>
            說真的，刷護照只要幾秒，但萬一抽到紅燈要查驗，或是新制剛上路大家都在排隊，時間就很難抓了。我會建議比平常再早 30～60
            分鐘到機場，寧可早到去喝杯咖啡啦 ☕️
          </p>
          <p>
            出境當天的時間安排和常見問題，我整理在
            <Link href="/japan-airport-tax-refund" className={linkClass}>
              日本機場退稅流程
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="這些情況會拿不到退稅">
          <p>以下都是日本觀光廳公告裡寫明的規定：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <b className="text-[var(--jp-ink)]">同一張收據少一件，整張都不能退</b>
              ：海關以每一筆交易（收據）為單位確認，同一張收據裡只要有一件商品不在身上，那張收據的所有商品都不能退稅。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">在日本吃掉、用掉的消耗品</b>
              ：特殊包裝雖然取消了，但食品、飲料、化妝品如果在日本用掉一部分或全部，就不能退稅。這時不要在終端機操作，直接到櫃台向海關關員說明。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">已經托運的行李</b>：托運之後不能為了辦退稅再拿回來。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">時間不夠而放棄確認</b>
              ：視為沒有完成確認，不會退稅；因此趕不上飛機，航空公司和海關都不會補償。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">國內線轉國際線</b>：要在最後離開日本的機場辦理。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">金條、白金條，以及本來就不課消費稅的商品</b>：不適用免稅。
            </li>
          </ul>
          <p>另外，單件未稅 100 萬日圓以上的商品，海關可能要求出示保證書或鑑定書；通過確認的免稅品要馬上帶出日本，否則會被追繳消費稅並受罰。</p>
          <p>
            第一條真的超容易中招 ⚠️ 像是藥妝店的收據裡有一包零食，你回飯店就先拆來吃了（我懂，宵夜時間很難忍😂），那張收據的東西就全部不能退。所以想在日本吃的零食，最好另外結帳喔。
          </p>
        </ContentCard>

        <ContentCard title="退稅款怎麼拿？">
          <p>
            退款由購買的免稅店，或店家委託的退款業者處理。日本觀光廳列出的方式有：銀行轉帳、退回信用卡、App
            退款，以及在出境港完成海關確認後領取現金。各店提供的方式不同，購買時店家會說明怎麼登錄退款資料；退款時間原則上在海關確認之後，詳細時程要問購買的店家。
          </p>
          <p>
            如果你是刷卡，又選退回信用卡，要記得：先付的含稅金額已經被收過一次海外手續費囉。退款時手續費會不會退、匯率怎麼算，要看你的發卡銀行。不確定的話，可以先用
            <Link href="/japan-card-fee" className={linkClass}>
              海外刷卡手續費計算機
            </Link>
            估一下最多會多花多少 💳
          </p>
        </ContentCard>

        <ContentCard title="日本 8% 與 10% 消費稅差在哪？">
          <p>新制不會改變稅率，一樣是 8% 和 10% 兩種：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>衣服、包包、電器、藥妝、化妝品：10%</li>
            <li>食品、飲料、外帶：8%</li>
            <li>酒類、在店裡內用：10%</li>
          </ul>
          <p>
            所以同一間便利商店的御飯糰，外帶是 8%、在店裡吃是 10%。
          </p>
          <p>
            另外提一下，日本政府在 2026 年 9 月通過了一個方案：2027 年 4 月起的兩年，食品飲料的消費稅要降到
            1%。不過這還要等國會通過才會實施，細節我整理在
            <Link href="/japan-tax-8-vs-10" className={linkClass}>
              日本消費稅 8% 與 10% 差異整理
            </Link>
            。
          </p>
        </ContentCard>

        <ContentCard title="出發前的小清單">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <b className="text-[var(--jp-ink)]">預留信用卡額度</b>：新制要先付含稅價，大筆購物前先確認額度夠不夠。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">一家店一個袋子</b>：商品跟收據放在一起，出境當天整袋隨身帶。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">行程跨 11/1 的人</b>：10/31 以前和 11/1 以後買的東西分開收，比較不會搞混。
            </li>
            <li>
              <b className="text-[var(--jp-ink)]">早一點到機場</b>：比平常多抓 30～60 分鐘。
            </li>
          </ul>
          <p>總之，新制就是多了「機場確認」這一關，東西帶齊、托運前先辦，其實沒有想像中難啦 🙌</p>
        </ContentCard>

        <ContentCard title="FAQ 常見問題">
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
          <p>以上依 2026 年 10 月查到的官方公告整理。新制剛上路，細節如果有更新，我會再修改這篇。</p>
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-tax-2026" />
      <ArticleCards currentPath="/japan-tax-2026" />
    </Layout>
  );
}
