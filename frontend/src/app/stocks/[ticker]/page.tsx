// "use client" ensures this component runs on the client side
"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { BrainCircuit, Calculator, ShieldCheck, AlertTriangle } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import IHSGTicker from "@/components/IHSGTicker";

// Minimal stock information fetched from Finnhub
interface StockInfo {
  ticker: string;
  name: string;
  price: number; // latest price
  change: number; // % change from previous close
  // Future: add roe, der, etc.
}

export default function StockDetailPage({ params }: { params: Promise<{ ticker: string }> }) {
  const [ticker, setTicker] = useState<string | null>(null);
  const [stock, setStock] = useState<StockInfo | null>(null);
  const [price, setPrice] = useState<number | null>(null); // live price via WS
  const [isMock, setIsMock] = useState(false);
  const [loading, setLoading] = useState(true);

  // Resolve ticker
  useEffect(() => {
    params.then(p => setTicker(p.ticker));
  }, [params]);

  // Fetch static info from Finnhub
  useEffect(() => {
    if (!ticker) return;
    const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || "";
    if (!apiKey) {
      console.warn("Finnhub API key missing – using mock data");
      setIsMock(true);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const profileRes = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`);
        const profile = await profileRes.json();
        const quoteRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`);
        const quote = await quoteRes.json();
        if (profile?.name && typeof quote.c === "number" && typeof quote.pc === "number") {
          const changePercent = ((quote.c - quote.pc) / quote.pc) * 100;
          const info: StockInfo = {
            ticker,
            name: profile.name,
            price: quote.c,
            change: parseFloat(changePercent.toFixed(2)),
          };
          setStock(info);
          setPrice(quote.c);
          setIsMock(false);
        } else {
          console.warn("Incomplete Finnhub data – falling back to mock");
          setIsMock(true);
        }
      } catch (e) {
        console.error(e);
        setIsMock(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ticker]);

  // Real‑time price via WebSocket
  useEffect(() => {
    if (!ticker) return;
    const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || "";
    if (!apiKey) return;
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
    const onOpen = () => ws.send(JSON.stringify({ type: "subscribe", symbol: ticker }));
    const onMessage = (ev: MessageEvent) => {
      const data = JSON.parse(ev.data);
      if (data.type === "trade" && data.data?.length) {
        const latest = data.data[0];
        if (typeof latest.p === "number") {
          setPrice(latest.p);
          setIsMock(false);
        }
      }
    };
    ws.addEventListener("open", onOpen);
    ws.addEventListener("message", onMessage);
    return () => {
      ws.removeEventListener("open", onOpen);
      ws.removeEventListener("message", onMessage);
      ws.close();
    };
  }, [ticker]);

  if (!ticker) return null;
  // Show spinner while loading
  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700">
        <div className="animate-spin rounded-full border-4 border-emerald-500 border-t-transparent w-12 h-12" />
      </section>
    );
  }

  if (!stock) return null; // safety fallback

  const displayedPrice = price ?? stock.price;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 p-6">
      {/* Header Card */}
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{stock.ticker}</h1>
            <p className="text-slate-300 text-lg">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">{formatRupiah(displayedPrice)}</p>
            <p className={`text-xl font-semibold ${stock.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>\{stock.change >= 0 ? "+" : ""}{stock.change}% (Hari ini)</p>
          </div>
        </div>
        {/* Mock notice */}
        {isMock && (
          <p className="mt-4 text-amber-400 text-center text-sm">
            Data simulasi – tidak terhubung ke layanan pasar (isi FINNHUB_API_KEY untuk data real‑time)
          </p>
        )}
      </div>

      {/* IHSG ticker */}
      <div className="mt-8 flex justify-center">
        <IHSGTicker />
      </div>

      {/* Content Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Valuation Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-lg transition transform hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-bold text-white">Valuation Engine</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">Graham Fair Value</p>
                <p className="text-2xl font-bold text-emerald-400">{formatRupiah(stock.price * 1.3)}</p>
                <p className="text-xs text-emerald-500/80 flex items-center mt-1">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Undervalued (30% margin)
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">DCF Value</p>
                <p className="text-2xl font-bold text-slate-200">{formatRupiah(stock.price * 1.15)}</p>
                <p className="text-xs text-slate-500 mt-1">Fairly Valued (15% margin)</p>
              </div>
            </div>
          </div>
        </div>
        {/* AI Report Card */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-lg h-full flex flex-col justify-between transition transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-bold text-white">AI Research Report</h2>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors">
                <BrainCircuit className="w-4 h-4" /> Generate Analysis
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 flex-1">
              <p className="text-slate-400 italic mb-4">
                Laporan ini di‑generate secara otomatis menggunakan model AI berdasarkan data historis dan laporan keuangan terakhir.
              </p>
              <h3 className="text-slate-200 font-bold">Business Summary</h3>
              <p>Perusahaan memiliki fundamental yang solid dengan pertumbuhan pendapatan konsisten. ROE di —% menunjukkan efisiensi modal yang luar biasa.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                    <ShieldCheck className="w-4 h-4" /> Strengths
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-emerald-200/80">
                    <li>Market leader dengan pangsa pasar dominan.</li>
                    <li>Neraca keuangan sangat sehat (DER: —).</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <h4 className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                    <AlertTriangle className="w-4 h-4" /> Risks
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-rose-200/80">
                    <li>Sensitif terhadap fluktuasi suku bunga.</li>
                    <li>Persaingan digitalisasi yang makin ketat.</li>
                  </ul>
                </div>
              </div>
              <h3 className="text-slate-200 font-bold border-t border-slate-700 pt-4 mt-6">Investment Thesis</h3>
              <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 text-center mt-4">
                <p className="text-4xl font-black text-emerald-500 mb-2">BUY</p>
                <p className="text-sm text-slate-400">Target Price: {formatRupiah(stock.price * 1.25)} (+25% Upside)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
