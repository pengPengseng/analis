"use client";
import { useState } from 'react';
import { mockStocks } from '@/lib/mock-api';
import { Search, Plus } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import Link from 'next/link';

export function StockTable() {
  const [search, setSearch] = useState('');

  const filteredStocks = mockStocks.filter(s => 
    s.ticker.toLowerCase().includes(search.toLowerCase()) || 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-slate-100">Fundamental Screener</h3>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm placeholder-slate-500 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Cari Ticker (ex: BBCA.JK)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 font-semibold">Ticker</th>
              <th className="py-3 px-4 font-semibold">Harga</th>
              <th className="py-3 px-4 font-semibold text-right">PER (x)</th>
              <th className="py-3 px-4 font-semibold text-right">PBV (x)</th>
              <th className="py-3 px-4 font-semibold text-right">ROE (%)</th>
              <th className="py-3 px-4 font-semibold text-right">DER (x)</th>
              <th className="py-3 px-4 font-semibold text-right">Yield (%)</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredStocks.map((stock) => (
              <tr key={stock.ticker} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                <td className="py-4 px-4">
                  <Link href={`/stocks/${stock.ticker}`} className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors block">
                    {stock.ticker}
                  </Link>
                  <div className="text-xs text-slate-500">{stock.name}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-semibold text-slate-100">{formatRupiah(stock.price)}</div>
                  <div className={`text-xs font-bold ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </div>
                </td>
                {/* Highlight PER < 15 */}
                <td className={`py-4 px-4 text-right font-medium ${stock.per > 0 && stock.per < 15 ? 'text-emerald-400 font-bold bg-emerald-500/5 rounded' : stock.per <= 0 ? 'text-rose-500' : 'text-slate-300'}`}>
                  {stock.per}
                </td>
                <td className="py-4 px-4 text-right font-medium text-slate-300">{stock.pbv}</td>
                {/* Highlight ROE > 15% */}
                <td className={`py-4 px-4 text-right font-medium ${stock.roe > 15 ? 'text-emerald-400 font-bold bg-emerald-500/5 rounded' : stock.roe < 0 ? 'text-rose-500' : 'text-slate-300'}`}>
                  {stock.roe}%
                </td>
                <td className="py-4 px-4 text-right font-medium text-slate-300">{stock.der}</td>
                <td className="py-4 px-4 text-right font-medium text-slate-300">{stock.divYield}%</td>
                <td className="py-4 px-4 text-center">
                  <button className="p-2 rounded-md bg-slate-800 text-slate-400 hover:text-white hover:bg-emerald-600 transition-all shadow hover:shadow-emerald-500/20" title="Add to Watchlist">
                    <Plus className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredStocks.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                  Ticker tidak ditemukan. Pastikan format benar (contoh: BBCA.JK).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
