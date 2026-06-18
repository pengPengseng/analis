// src/lib/mock-api.ts

// TODO: Replace with FastAPI / GoAPI.io / yfinance endpoints
export const mockStocks = [
  { ticker: "BBCA.JK", name: "Bank Central Asia Tbk", price: 9800, change: 1.2, per: 24.5, pbv: 5.1, roe: 21.3, der: 0.1, divYield: 2.5 },
  { ticker: "BBRI.JK", name: "Bank Rakyat Indonesia Tbk", price: 5600, change: -0.5, per: 13.2, pbv: 2.4, roe: 18.5, der: 0.2, divYield: 5.1 },
  { ticker: "BMRI.JK", name: "Bank Mandiri Tbk", price: 6500, change: 0.8, per: 11.5, pbv: 2.1, roe: 19.2, der: 0.1, divYield: 4.8 },
  { ticker: "TLKM.JK", name: "Telkom Indonesia Tbk", price: 3200, change: -1.5, per: 14.8, pbv: 2.8, roe: 18.0, der: 0.8, divYield: 4.5 },
  { ticker: "ASII.JK", name: "Astra International Tbk", price: 5100, change: 0.2, per: 7.5, pbv: 1.1, roe: 15.2, der: 0.9, divYield: 6.5 },
  { ticker: "GOTO.JK", name: "GoTo Gojek Tokopedia Tbk", price: 65, change: 4.5, per: -5.2, pbv: 0.8, roe: -25.4, der: 0.1, divYield: 0.0 },
];

export const mockMarketBanner = {
  ihsg: 7250.45,
  change: 0.45,
  sentiment: "Bullish",
};
