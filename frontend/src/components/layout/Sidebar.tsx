import Link from 'next/link'
import { LayoutDashboard, LineChart, Cpu } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 h-screen flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <h1 className="text-xl font-bold text-slate-100">
          Analis<span className="text-emerald-500">.</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          Personal Finance
        </Link>
        <Link href="/screener" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
          <LineChart className="w-5 h-5" />
          Market Screener
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-500 cursor-not-allowed">
          <Cpu className="w-5 h-5" />
          AI Valuation <span className="text-[10px] uppercase tracking-wider bg-slate-800 px-1.5 py-0.5 rounded font-bold text-slate-400 ml-auto">Soon</span>
        </div>
      </nav>
      <div className="p-4 border-t border-slate-800 shrink-0 text-sm text-slate-500">
        &copy; 2026 Analis Platform
      </div>
    </aside>
  )
}
