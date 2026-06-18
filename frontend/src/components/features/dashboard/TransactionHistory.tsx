"use client";
import { useFinanceStore } from '@/stores/financeStore';
import { formatRupiah } from '@/lib/utils';

export function TransactionHistory() {
  const { transactions } = useFinanceStore();

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg h-full">
      <h3 className="text-lg font-bold text-slate-100 mb-6">Riwayat Transaksi Terakhir</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 font-semibold">Tanggal</th>
              <th className="py-3 px-4 font-semibold">Keterangan</th>
              <th className="py-3 px-4 font-semibold">Kategori</th>
              <th className="py-3 px-4 font-semibold text-right">Nominal</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.slice(0, 5).map((tx) => (
              <tr key={tx.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 text-slate-400">{new Date(tx.date).toLocaleDateString('id-ID')}</td>
                <td className="py-3 px-4 font-medium text-slate-200">{tx.name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    tx.type === 'Pendapatan' ? 'bg-emerald-500/10 text-emerald-500' :
                    tx.type === 'Pengeluaran' ? 'bg-rose-500/10 text-rose-500' :
                    tx.type === 'Beli Saham' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`py-3 px-4 text-right font-bold tracking-wide ${
                  (tx.type === 'Pendapatan' || tx.type === 'Jual Saham') ? 'text-emerald-500' : 'text-slate-200'
                }`}>
                  {(tx.type === 'Pendapatan' || tx.type === 'Jual Saham') ? '+' : '-'}{formatRupiah(tx.amount)}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500 italic">
                  Belum ada transaksi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
