import { KPICards } from '@/components/features/dashboard/KPICards'
import { TransactionForm } from '@/components/features/dashboard/TransactionForm'
import { Charts } from '@/components/features/dashboard/Charts'
import { TransactionHistory } from '@/components/features/dashboard/TransactionHistory'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Personal Finance</h2>
        <p className="text-slate-400 mt-1">Pantau dan kelola aset serta arus kas Anda.</p>
      </div>
      
      <KPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm />
        </div>
        <div className="lg:col-span-2">
          <TransactionHistory />
        </div>
      </div>
      
      <Charts />
    </div>
  )
}
