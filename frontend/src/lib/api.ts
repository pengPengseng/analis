// src/lib/api.ts
export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export async function fetchStock(symbol: string): Promise<StockData> {
  const res = await fetch(`/api/stocks?symbol=${encodeURIComponent(symbol)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch stock data');
  }
  return res.json();
}
