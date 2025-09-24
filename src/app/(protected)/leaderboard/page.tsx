import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const demoLeaderboard = [
  { store: 'Магазин №204', cluster: 'Схід', score: 92, trend: '+4' },
  { store: 'Магазин №118', cluster: 'Центр', score: 88, trend: '+3' },
  { store: 'Магазин №077', cluster: 'Захід', score: 84, trend: '+6' },
  { store: 'Магазин №305', cluster: 'Південь', score: 79, trend: '-2' },
]

export default async function LeaderboardPage() {
  const supabase = createServerSupabaseClient()

  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect('/signin')
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Командні результати</p>
        <h1 className="text-2xl font-semibold text-slate-900">Лідерборд кластерів</h1>
        <p className="text-sm text-slate-600">
          Рахуємо завершення днів, середній бал симуляцій та чек-листи з фото. Дані оновлюються щодня о 05:00.
        </p>
      </header>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Магазин</th>
              <th className="px-4 py-3">Кластер</th>
              <th className="px-4 py-3">Індекс готовності</th>
              <th className="px-4 py-3">Динаміка 7 днів</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {demoLeaderboard.map((row, index) => (
              <tr key={row.store} className={index === 0 ? 'bg-primary-50/60' : ''}>
                <td className="px-4 py-3 font-semibold text-slate-900">
                  #{index + 1} · {row.store}
                </td>
                <td className="px-4 py-3 text-slate-600">{row.cluster}</td>
                <td className="px-4 py-3 text-slate-900">{row.score}%</td>
                <td className={`px-4 py-3 font-medium ${row.trend.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {row.trend}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        Дані синхронізуються з Supabase Functions, де підраховуємо завершення днів, бал симуляцій та якість фото-звітів.
      </p>
    </div>
  )
}
