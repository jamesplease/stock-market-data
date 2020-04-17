export interface MarketDataValue {
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

export interface MarketData {
  [Key: string]: MarketDataValue;
  [Key: number]: MarketDataValue;
}

declare const MarketData: MarketData;
export default MarketData;
