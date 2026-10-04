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
    q: "日本現在消費稅是幾%？",
    a: "有 8% 和 10% 兩種。食品、飲料（不含酒類和外食）是 8%，其他大多數商品和服務是 10%。",
  },
  { q: "日本餐廳內用是幾%？", a: "在店裡用餐屬於外食，適用 10%。" },
  { q: "日本外帶為什麼比較便宜？", a: "外帶屬於購買食品，適用 8% 的輕減稅率；內用是 10%。" },
  { q: "日本藥妝是 8% 還是 10%？", a: "藥品、醫藥部外品、化妝品、保養品都是 10%；藥妝店裡的零食、飲料才是 8%。" },
  { q: "日本買酒是幾%？", a: "酒類不適用輕減稅率，不管外帶或內用都是 10%。" },
];

const SOURCES = [
  { href: "https://www.nta.go.jp/english/taxes/consumption_tax/01.htm", label: "日本國稅廳：Consumption Tax（稅率與輕減稅率對象）" },
  {
    href: "https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/index.htm",
    label: "日本國稅廳：消費税の軽減税率制度",
  },
  {
    href: "https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/zeiritsuhikisage.htm",
    label: "日本國稅廳：消費税率引下げ特設サイト（飲食料品 2 年間 1%，法案審議中）",
  },
  {
    href: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html",
    label: "日本觀光廳：What is the Refund Method?",
  },
];

export default function JapanTax8Vs10() {
  useSeo({
    title: "日本消費稅 8% 與 10% 差在哪？外帶內用、食品與藥妝完整整理",
    description:
      "日本消費稅 8% 與 10% 怎麼分：食品飲料 8%、酒類與內用 10%、藥品醫藥部外品化妝品 10%，外帶內用差異、含稅標價怎麼看、退稅怎麼算，以及 2027 年起食品可能降到 1% 的最新方案。",
    jsonLd: [
      articleJsonLd({
        path: "/japan-tax-8-vs-10",
        headline: "日本消費稅 8% 與 10% 差在哪？",
        description: "外帶內用、食品、酒類與藥妝的稅率整理，含稅標價怎麼看、退稅怎麼算，以及 2027 年起食品可能降到 1% 的方案。",
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
        eyebrow="稅制知識"
        title="日本消費稅 8% 與 10% 差在哪？"
        description="同一家店的收據上為什麼有兩種稅率？外帶內用、食品、酒類、藥妝怎麼分，還有 2027 年食品可能降到 1% 的最新消息，一次整理給你 🍙"
        author="Miff"
        updated="2026年10月"
      />

      <Section>
        <ContentCard>
          <p>
            在日本便利商店結帳，你可能會發現收據上同時有 8% 跟 10%，店員還會問你要不要在店裡吃。這不是你看錯喔，日本的消費稅本來就有兩種稅率 😂
          </p>
          <p>
            這篇把哪些東西是 8%、哪些是 10% 整理成一張表，也順便講一下跟退稅的關係。稅率的規定都是照日本國稅廳的說明寫的，來源附在最下面。
          </p>
        </ContentCard>

        <ContentCard title="日本 8% 與 10% 消費稅比較">
          <DataTable
            headers={["商品或情境", "稅率"]}
            rows={[
              ["衣服、鞋子、包包", "10%"],
              ["電器、3C 商品", "10%"],
              ["藥品、醫藥部外品、化妝品、保養品", "10%"],
              ["零食、泡麵、水果、瓶裝飲料", "8%"],
              ["便利商店、速食、咖啡店外帶", "8%"],
              ["餐廳、便利商店內用", "10%"],
              ["啤酒、清酒、梅酒等酒類", "10%"],
            ]}
          />
        </ContentCard>

        <ContentCard title="為什麼日本會有 8% 與 10%？">
          <p>
            日本在 2019 年 10 月 1 日把消費稅從 8% 調到 10%，同時實施「輕減稅率制度」，讓部分民生必需品維持 8%。適用 8% 的對象是：
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>酒類和外食以外的飲食料品</li>
            <li>每週發行 2 次以上、有訂閱契約的報紙</li>
          </ul>
          <p>對旅客來說，記住「吃的喝的 8%，但酒跟內用是 10%」就差不多了啦。</p>
        </ContentCard>

        <ContentCard title="日本外帶與內用稅率差異">
          <p>判斷的關鍵是「在哪裡吃」。同一杯咖啡、同一個便當：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>帶走：屬於購買食品，8%</li>
            <li>在店裡的座位吃：屬於外食，10%</li>
          </ul>
          <p>
            所以在便利商店、速食店結帳時，店員常會問「店内でお召し上がりですか？」，就是在問你要不要內用喔。外帶跟內用的價格可能不一樣，看到兩種標價不用太驚訝。
          </p>
        </ContentCard>

        <ContentCard title="日本藥妝是 8% 還是 10%？">
          <p>
            很多人以為藥妝店的東西都是 8%，其實<b className={strong}>藥品、醫藥部外品、化妝品、保養品都是 10%</b>
            ，因為它們不屬於「飲食料品」。藥妝店裡只有零食、飲料這些食品類才是 8%。
          </p>
          <p>
            這邊有個蠻容易搞混的地方：包裝上寫「指定医薬部外品」的提神飲料，雖然是用喝的，但算醫藥部外品，所以是 10% 喔 💊
          </p>
        </ContentCard>

        <ContentCard title="怎麼看日本的標價？">
          <p>
            日本從 2021 年 4 月起規定以「含稅總額」標價，所以大部分標價都已經含稅。看到「税込」就是含稅價；看到「税抜」或「本体価格」才是未稅價。
          </p>
          <p>
            用
            <Link href="/" className={linkClass}>
              日本退稅計算機
            </Link>
            的時候，記得選對「含稅」或「未稅」，算出來才會準。
          </p>
        </ContentCard>

        <ContentCard title="日本退稅與消費稅關係">
          <p>退稅就是把你付的消費稅拿回來，所以 8% 的商品退 8%、10% 的商品退 10%。含稅價換算未稅價的公式是：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>10%：含稅價 ÷ 1.1</li>
            <li>8%：含稅價 ÷ 1.08</li>
          </ul>
          <p>
            例如 1,080 日圓的零食（8%），未稅價 1,000 日圓、稅金 80 日圓；1,100 日圓的保養品（10%），未稅價 1,000 日圓、稅金 100 日圓。
          </p>
          <p>
            免稅門檻看的是同一天、同一家店的<b className={strong}>未稅合計</b>是否滿 5,000 日圓，不分 8% 或 10%。另外，部分百貨公司會收 1.1%
            到 1.55% 的退稅手續費，所以實際拿回來不一定剛好是 10%。
          </p>
          <p>2026 年 11 月 1 日起的退稅新制，改變的是退稅的流程，8% 和 10% 的稅率本身沒有變。</p>
        </ContentCard>

        <ContentCard title="2027 年起食品可能降到 1%（法案審議中）">
          <p>
            日本政府在 2026 年 9 月 15 日的內閣會議決定了一個方案：<b className={strong}>2027 年 4 月 1 日到 2029 年 3 月 31 日</b>
            這兩年，飲食料品的消費稅率降到 <b className={strong}>1%</b>
            。適用範圍和現在 8% 的對象相同，也就是不含酒類和外食。目前這個方案還要等法案在國會審議通過，才會正式實施。
          </p>
          <p>
            如果真的通過，2027 年 4 月之後在日本買零食、伴手禮，稅本來就只剩 1%，退稅能拿回來的也就很少了。衣服、電器、藥妝這些 10%
            的東西則不受影響。我會持續追蹤，法案通過之後再更新這篇 🙌
          </p>
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
          <p>以上依 2026 年 10 月查到的官方資料整理。</p>
        </ContentCard>
      </Section>

      <ToolCards currentPath="/japan-tax-8-vs-10" />
      <ArticleCards currentPath="/japan-tax-8-vs-10" />
    </Layout>
  );
}
