"use client";
import { useFinanceStore } from '@/stores/financeStore'
import { formatRupiah } from '@/lib/utils'
import { Wallet, TrendingUp, TrendingDown, CircleDollarSign } from 'lucide-react'

export function KPICards() {
  const { cashBalance, getTotalIncome, getTotalExpense, getTotalAssets } = useFinanceStore();

  const cards = [
    { title: 'Total Aset', value: formatRupiah(getTotalAssets()), icon: Wallet, color: 'text-emerald-400' },
    { title: 'Pendapatan (Bulan Ini)', value: formatRupiah(getTotalIncome()), icon: TrendingUp, color: 'text-emerald-500' },
    { title: 'Pengeluaran (Bulan Ini)', value: formatRupiah(getTotalExpense()), icon: TrendingDown, color: 'text-rose-500' },
    { title: 'Sisa Saldo (Cash)', value: formatRupiah(cashBalance), icon: CircleDollarSign, color: 'text-slate-300' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, i) => (
        <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">{card.title}</h3>
            <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-50">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
