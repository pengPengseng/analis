"use client";
import { useState } from 'react';
import { useFinanceStore, TransactionType } from '@/stores/financeStore';

export function TransactionForm() {
  const addTransaction = useFinanceStore(state => state.addTransaction);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('Pendapatan');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;
    
    addTransaction({
      name,
      amount: Number(amount),
      type,
      date: new Date().toISOString()
    });

    setName('');
    setAmount('');
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
      <h3 className="text-lg font-bold text-slate-100 mb-6">Tambah Transaksi</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">Tipe Transaksi</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="Pendapatan">Pendapatan</option>
            <option value="Pengeluaran">Pengeluaran</option>
            <option value="Beli Saham">Beli Saham</option>
            <option value="Jual Saham">Jual Saham</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">Nama / Keterangan</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Contoh: Gaji Bulanan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">Nominal (Rp)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="5000000"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-lg transition-colors mt-4 shadow-lg shadow-emerald-500/20"
        >
          Simpan Transaksi
        </button>
      </form>
    </div>
  )
}
