import { create } from 'zustand'

export type TransactionType = 'Pendapatan' | 'Pengeluaran' | 'Beli Saham' | 'Jual Saham';

export interface Transaction {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  date: string; // ISO string
}

interface FinanceState {
  cashBalance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getTotalAssets: () => number;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  cashBalance: 50000000, // Initial mock balance Rp 50.000.000
  transactions: [
    { id: '1', name: 'Gaji Bulan Ini', type: 'Pendapatan', amount: 15000000, date: new Date().toISOString() },
    { id: '2', name: 'Beli BBCA', type: 'Beli Saham', amount: 5000000, date: new Date().toISOString() }
  ],
  addTransaction: (transaction) => set((state) => {
    const newTx = { ...transaction, id: Math.random().toString(36).substring(7) };
    let newBalance = state.cashBalance;
    if (transaction.type === 'Pendapatan' || transaction.type === 'Jual Saham') {
      newBalance += transaction.amount;
    } else if (transaction.type === 'Pengeluaran' || transaction.type === 'Beli Saham') {
      newBalance -= transaction.amount;
    }
    return {
      transactions: [newTx, ...state.transactions],
      cashBalance: newBalance,
    };
  }),
  getTotalIncome: () => {
    const { transactions } = get();
    return transactions.filter(t => t.type === 'Pendapatan').reduce((acc, t) => acc + t.amount, 0);
  },
  getTotalExpense: () => {
    const { transactions } = get();
    return transactions.filter(t => t.type === 'Pengeluaran').reduce((acc, t) => acc + t.amount, 0);
  },
  getTotalAssets: () => {
    // For simplicity: Cash + Fixed mock amount in stocks
    return get().cashBalance + 120000000; 
  }
}));
