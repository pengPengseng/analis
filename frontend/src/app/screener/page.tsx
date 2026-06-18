import { StockTable } from '@/components/features/screener/StockTable'
import { Watchlist } from '@/components/features/screener/Watchlist'

export default function ScreenerPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Market Screener</h2>
        <p className="text-slate-400 mt-1">Saring saham potensial berdasarkan matriks fundamental real-time.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">
        <div className="lg:col-span-3">
          <StockTable />
        </div>
        <div className="lg:col-span-1">
          <Watchlist />
        </div>
      </div>
    </div>
  )
}
