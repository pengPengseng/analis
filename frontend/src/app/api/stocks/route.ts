// src/app/api/stocks/route.ts
import { NextResponse } from 'next/server';

/**
 * Secure proxy that fetches real‑time stock quote from a free tier API.
 * It expects a `symbol` query parameter (e.g., BBCA.JK, TLKM.JK, JKSE).
 * The external API key is read from the server‑only environment variable
 * `STOCK_API_KEY`. No secret is ever sent to the client.
 * Responses are cached for 15 seconds via Next.js ISR (`next: { revalidate: 15 }`).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  if (!symbol) {
    return NextResponse.json({ error: 'Missing symbol query param' }, { status: 400 });
  }

  const apiKey = process.env.STOCK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Server mis‑configuration: STOCK_API_KEY missing' }, { status: 500 });
  }

  const externalUrl = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`;
  try {
    const res = await fetch(externalUrl, {
      // Next.js ISR cache control – keep data for 15 s
      next: { revalidate: 15 },
    });
    if (!res.ok) {
      throw new Error('Upstream service error');
    }
    const data = await res.json();
    // Finnhub returns: c (current price), d (change), dp (change %)
    const result = {
      symbol,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
    };
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error('Stock proxy error:', e);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 502 });
  }
}
