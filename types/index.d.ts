interface YearMarketData {
  year: number;
  month: number;
  date: number;
  comp: number;
  dividend: number;
  earnings: number;
  cpi: number;
  dateFractionDecimal: number;
  dateFraction: number;
  lir: number;
  realPrice: number;
  realDividend: number;
  realTotalReturnPrice: number;
  realEarnings: number;
  realTotalReturnScaledEarnings: number;
  cape: number | null;
}

interface MarketData {
  [Key: string]: YearMarketData;
  [Key: number]: YearMarketData;
}

declare const MarketData: MarketData;
export default MarketData;
