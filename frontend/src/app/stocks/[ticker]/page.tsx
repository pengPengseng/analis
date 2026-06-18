import { mockStocks } from '@/lib/mock-api';
import { notFound } from 'next/navigation';
import { BrainCircuit, Calculator, ShieldCheck, AlertTriangle } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

export default async function StockDetailPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const stock = mockStocks.find(s => s.ticker === ticker);
  
  if (!stock) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-bold text-slate-100">{stock.ticker}</h2>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-sm font-bold rounded-full">ACTIVE</span>
          </div>
          <p className="text-slate-400 text-lg">{stock.name}</p>
        </div>
        <div className="text-left md:text-right">
          <div className="text-3xl font-bold text-slate-100">{formatRupiah(stock.price)}</div>
          <div className={`text-lg font-semibold ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change}% (Hari ini)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Valuation Tab (DCF & Graham) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold text-slate-100">Valuation Engine</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-sm text-slate-400 mb-1">Graham Fair Value (Mock)</div>
                <div className="text-2xl font-bold text-emerald-400">{formatRupiah(stock.price * 1.3)}</div>
                <div className="text-xs text-emerald-500/80 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Undervalued (Margin: 30%)
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-sm text-slate-400 mb-1">DCF Value (Mock)</div>
                <div className="text-2xl font-bold text-slate-200">{formatRupiah(stock.price * 1.15)}</div>
                <div className="text-xs text-slate-500 mt-1">Fairly Valued (Margin: 15%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Research Report Tab */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-bold text-slate-100">AI Research Report</h3>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/20 transition-colors flex items-center gap-2 text-sm">
                <BrainCircuit className="w-4 h-4" />
                Generate Analysis
              </button>
            </div>
            
            {/* Mock Report Content */}
            <div className="prose prose-invert max-w-none text-slate-300">
              <p className="text-slate-400 italic mb-6">
                Laporan ini di-generate secara otomatis menggunakan model AI berdasarkan data historis dan laporan keuangan terakhir.
              </p>
              
              <h4 className="text-slate-200 font-bold">Business Summary</h4>
              <p>Perusahaan memiliki fundamental yang solid dengan pertumbuhan pendapatan konsisten. ROE di {stock.roe}% menunjukkan efisiensi modal yang luar biasa.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h5 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Strengths</h5>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-emerald-200/80">
                    <li>Market leader dengan pangsa pasar dominan.</li>
                    <li>Neraca keuangan sangat sehat (DER: {stock.der}).</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <h5 className="text-rose-400 font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Risks</h5>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-rose-200/80">
                    <li>Sensitif terhadap fluktuasi suku bunga.</li>
                    <li>Persaingan digitalisasi yang makin ketat.</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-slate-200 font-bold border-t border-slate-800 pt-6 mt-6">Investment Thesis</h4>
              <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center mt-4">
                <div className="text-4xl font-black text-emerald-500 tracking-widest mb-2">BUY</div>
                <p className="text-sm text-slate-400">Target Price: {formatRupiah(stock.price * 1.25)} (+25% Upside)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
