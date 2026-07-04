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
