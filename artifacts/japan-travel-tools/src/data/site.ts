export const SITE_NAME = "日本旅遊工具箱";
export const SITE_TAGLINE = "退稅・匯率・刷卡手續費，一站算清楚";

export interface ToolMeta {
  path: string;
  emoji: string;
  title: string;
  description: string;
}

export interface ArticleMeta {
  path: string;
  title: string;
  description: string;
  readTime: string;
  updated: string;
  category: string;
}

export const TOOLS: ToolMeta[] = [
  {
    path: "/",
    emoji: "🧾",
    title: "日本退稅計算機",
    description: "輸入商品金額與稅率，立即算出免稅價、百貨手續費與最終支付金額。",
  },
  {
    path: "/yen-to-twd",
    emoji: "💴",
    title: "日幣台幣換算",
    description: "日圓換台幣，支援自訂匯率，內建常見購物金額換算對照表。",
  },
  {
    path: "/japan-card-fee",
    emoji: "💳",
    title: "海外刷卡手續費計算機",
    description: "估算日本刷卡的海外交易手續費，換算實際入帳的台幣金額。",
  },
  {
    path: "/shopping-trip-estimator",
    emoji: "🧳",
    title: "購物清單試算器",
    description: "把整趟旅程的購物清單一次輸入，自動加總退稅、刷卡手續費與台幣預算。",
  },
];

export const ARTICLES: ArticleMeta[] = [
  {
    path: "/guide",
    title: "日本退稅完整教學｜2026 最新免稅規則、流程與計算方式",
    description: "從資格條件、退稅門檻到百貨手續費，一篇搞懂日本退稅所有細節。",
    readTime: "12 分鐘",
    updated: "2026年6月",
    category: "完整教學",
  },
  {
    path: "/japan-tax-2026",
    title: "2026 日本退稅新制｜先付後退制度整理",
    description: "日本預計 2026 年 11 月起改採先付後退，整理新舊制差異與機場退稅流程。",
    readTime: "8 分鐘",
    updated: "2026年6月",
    category: "新制解析",
  },
  {
    path: "/japan-tax-8-vs-10",
    title: "日本消費稅 8% 與 10% 差在哪？外帶內用、食品與藥妝整理",
    description: "輕減稅率制度完整說明，搞懂什麼商品適用 8%、什麼適用 10%。",
    readTime: "7 分鐘",
    updated: "2026年6月",
    category: "稅制知識",
  },
  {
    path: "/japan-duty-free-guide",
    title: "日本免稅店攻略｜Tax Free 與 Duty Free 差異一次看懂",
    description: "整理常見免稅商店、免稅門檻與如何辨認免稅標誌。",
    readTime: "6 分鐘",
    updated: "2026年6月",
    category: "購物攻略",
  },
  {
    path: "/japan-airport-tax-refund",
    title: "日本機場退稅流程｜成田、羽田、關西機場退稅教學",
    description: "整理機場退稅五大步驟，以及新舊制下退稅地點的差異。",
    readTime: "7 分鐘",
    updated: "2026年6月",
    category: "實用流程",
  },
];

export const NAV_LINKS = [
  { path: "/", label: "退稅計算機" },
  { path: "/yen-to-twd", label: "匯率換算" },
  { path: "/japan-card-fee", label: "刷卡手續費" },
  { path: "/shopping-trip-estimator", label: "購物清單試算" },
  { path: "/guide", label: "退稅教學" },
  { path: "/about", label: "關於我們" },
];

export const FOOTER_LINKS = [
  { path: "/", label: "日本退稅計算機" },
  { path: "/yen-to-twd", label: "日幣台幣換算" },
  { path: "/japan-card-fee", label: "海外刷卡手續費" },
  { path: "/shopping-trip-estimator", label: "購物清單試算器" },
  { path: "/guide", label: "退稅完整教學" },
  { path: "/japan-tax-2026", label: "2026 退稅新制" },
  { path: "/japan-tax-8-vs-10", label: "消費稅 8% vs 10%" },
  { path: "/japan-duty-free-guide", label: "免稅店攻略" },
  { path: "/japan-airport-tax-refund", label: "機場退稅流程" },
  { path: "/about", label: "關於我們" },
  { path: "/contact", label: "聯絡我們" },
  { path: "/privacy", label: "隱私政策" },
];
