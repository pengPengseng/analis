"use client";
import { useFinanceStore } from '@/stores/financeStore';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function Charts() {
  const { cashBalance } = useFinanceStore();

  const assetData = [
    { name: 'Cash', value: cashBalance },
    { name: 'Saham BBCA', value: 50000000 },
    { name: 'Saham BBRI', value: 70000000 },
  ];
  
  const COLORS = ['#10b981', '#3b82f6', '#f43f5e'];

  const cashflowData = [
    { name: 'Jan', Pendapatan: 15000000, Pengeluaran: 8000000 },
    { name: 'Feb', Pendapatan: 15000000, Pengeluaran: 12000000 },
    { name: 'Mar', Pendapatan: 25000000, Pengeluaran: 9000000 },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
        <h3 className="text-lg font-bold text-slate-100 mb-6">Alokasi Aset Portfolio</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetData}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {assetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
        <h3 className="text-lg font-bold text-slate-100 mb-6">Arus Kas Bulanan</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(val) => `${val / 1000000}M`} />
              <Tooltip 
                cursor={{ fill: '#1e293b' }}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
              />
              <Bar dataKey="Pendapatan" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pengeluaran" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
