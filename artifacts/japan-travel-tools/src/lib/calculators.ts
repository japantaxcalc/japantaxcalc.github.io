export function formatNumber(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("zh-TW", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export interface TaxRefundInput {
  price: number;
  taxRateDivisor: number; // 1.1 for 10%, 1.08 for 8%
  isTaxIncluded: boolean;
  shopFeePercent: number;
  cardFeePercent: number;
  exchangeRate: number;
}

export interface TaxRefundResult {
  original: number;
  noTax: number;
  savedAmount: number;
  shopFeeCost: number;
  cardFeeCost: number;
  finalYen: number;
  finalTwd: number;
}

export function calcTaxRefund(input: TaxRefundInput): TaxRefundResult {
  const { price, taxRateDivisor, isTaxIncluded, shopFeePercent, cardFeePercent, exchangeRate } =
    input;
  const noTax = isTaxIncluded ? price / taxRateDivisor : price;
  const shopFeeCost = noTax * (shopFeePercent / 100);
  const base = noTax + shopFeeCost;
  const cardFeeCost = base * (cardFeePercent / 100);
  const finalYen = base + cardFeeCost;
  const savedAmount = (isTaxIncluded ? price : noTax * taxRateDivisor) - noTax;
  const finalTwd = finalYen * exchangeRate;
  return { original: price, noTax, savedAmount, shopFeeCost, cardFeeCost, finalYen, finalTwd };
}

// 2026-11-01 起買的免稅品改成「先付後退」：結帳先付含稅價，出境時海關確認後才退稅
export const NEW_SYSTEM_START = "2026-11-01";
// 同一天、同一家店，未稅合計 5,000 日圓以上才能免稅（新制門檻不變）
export const TAX_FREE_MIN = 5000;

export type RefundSystem = "old" | "new";

// 依日本時間的今天決定預設制度（預渲染在 UTC 的主機上執行，所以要指定時區）
export function defaultRefundSystem(now = new Date()): RefundSystem {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(now);
  return today >= NEW_SYSTEM_START ? "new" : "old";
}

export function splitPrice(price: number, taxRateDivisor: number, isTaxIncluded: boolean) {
  const noTax = isTaxIncluded ? price / taxRateDivisor : price;
  const taxIncluded = isTaxIncluded ? price : price * taxRateDivisor;
  return { noTax, taxIncluded };
}

// 未稅金額還差多少才到門檻；0 表示已達門檻（先四捨五入到小數 2 位，避免 5500 ÷ 1.1 算出 4999.999…）
export function taxFreeShortfall(noTax: number): number {
  const rounded = Math.round(noTax * 100) / 100;
  return Math.max(0, Math.ceil(TAX_FREE_MIN - rounded));
}

export interface NewSystemRefundResult {
  original: number;
  noTax: number;
  taxIncluded: number;
  taxAmount: number;
  refundFeeCost: number;
  refundYen: number;
  cardFeeCost: number;
  paidYen: number;
  paidTwd: number;
  finalYen: number;
  finalTwd: number;
  cardFeeOnTax: number;
}

// 新制：先付含稅價（海外手續費用含稅金額算），出境後拿回「稅額 − 退稅手續費」
export function calcTaxRefundNew(input: TaxRefundInput): NewSystemRefundResult {
  const { price, taxRateDivisor, isTaxIncluded, shopFeePercent, cardFeePercent, exchangeRate } =
    input;
  const { noTax, taxIncluded } = splitPrice(price, taxRateDivisor, isTaxIncluded);
  const taxAmount = taxIncluded - noTax;
  const refundFeeCost = noTax * (shopFeePercent / 100);
  const refundYen = taxAmount - refundFeeCost;
  const cardFeeCost = taxIncluded * (cardFeePercent / 100);
  const paidYen = taxIncluded + cardFeeCost;
  const finalYen = paidYen - refundYen;
  return {
    original: price,
    noTax,
    taxIncluded,
    taxAmount,
    refundFeeCost,
    refundYen,
    cardFeeCost,
    paidYen,
    paidTwd: paidYen * exchangeRate,
    finalYen,
    finalTwd: finalYen * exchangeRate,
    cardFeeOnTax: taxAmount * (cardFeePercent / 100),
  };
}

export interface CardFeeResult {
  original: number;
  feeCost: number;
  finalYen: number;
  finalTwd: number;
}

export function calcCardFee(yen: number, feePercent: number, rate: number): CardFeeResult {
  const feeCost = yen * (feePercent / 100);
  const finalYen = yen + feeCost;
  const finalTwd = finalYen * rate;
  return { original: yen, feeCost, finalYen, finalTwd };
}

export function calcYenToTwd(yen: number, rate: number): number {
  return yen * rate;
}

export const CARD_FEE_TABLE = [10000, 22000, 30000, 50000, 100000];

export const YEN_TWD_TABLE = [
  1000, 3000, 3990, 5000, 5990, 10000, 10780, 17400, 20000, 22000, 24200, 24750, 30000, 34100,
  42500, 50000, 50600, 100000,
];
