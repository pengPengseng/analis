

export function Header() {
  const { ihsg, change, sentiment } = mockMarketBanner;
  const isUp = change >= 0;

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center px-6 justify-between sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs or Page Title can go here */}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-1.5 rounded-full text-sm shadow-sm">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-400">Live IHSG</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <span className="font-bold text-slate-100">{ihsg.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</span>
          <span className={`font-semibold ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isUp ? '+' : ''}{change}%
          </span>
          <div className="h-4 w-px bg-slate-800" />
          <span className={`text-xs uppercase font-bold tracking-wider ${isUp ? 'text-emerald-500/80' : 'text-rose-500/80'}`}>
            {sentiment}
          </span>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-emerald-500 shadow-inner">
          U
        </div>
      </div>
    </header>
  )
}
