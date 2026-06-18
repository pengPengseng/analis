"use client";
import { mockStocks } from '@/lib/mock-api';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

export function Watchlist() {
  const watchlist = mockStocks.slice(0, 3);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-100">Watchlist</h3>
        <span className="text-xs font-medium bg-slate-800 text-slate-400 px-2 py-1 rounded">Real-time</span>
      </div>
      
      <div className="flex-1 space-y-3">
        {watchlist.map((stock) => (
          <div key={stock.ticker} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/50 hover:border-slate-700 transition-colors cursor-pointer group">
            <div>
              <div className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{stock.ticker}</div>
              <div className="text-xs text-slate-500 truncate w-24">{stock.name.split(' ')[0]}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-slate-100">{formatRupiah(stock.price)}</div>
              <div className={`flex items-center justify-end gap-1 text-xs font-bold ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </div>
            </div>
          </div>
        ))}
        {watchlist.length === 0 && (
          <div className="text-center text-slate-500 italic py-4 text-sm">
            Watchlist kosong. Tambahkan saham dari Screener.
          </div>
        )}
      </div>
    </div>
  )
}
