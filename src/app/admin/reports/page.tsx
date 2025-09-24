import { getDemoAttempts, getDemoTrack } from '@/lib/data/tracks'

export default function AdminReportsPage() {
  const track = getDemoTrack()
  const attempts = getDemoAttempts()

  const lessonsMap = new Map(track.days.flatMap((day) => day.lessons.map((lesson) => [lesson.id, { lesson, day }])))

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Статистика спроб</h2>
        <p className="mt-2 text-sm text-slate-600">
          Ранні дані для демонстрації. У продукті ці дані надходитимуть через Supabase Functions та зберігатимуться в таблиці
          <code className="ml-1 rounded bg-slate-100 px-1 py-0.5">attempts</code>.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Активність</th>
                <th className="px-4 py-3">День</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Бали</th>
                <th className="px-4 py-3">Фідбек</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {attempts.map((attempt) => {
                const meta = lessonsMap.get(attempt.lessonId)
                if (!meta) return null
                const { lesson, day } = meta

                return (
                  <tr key={attempt.id} className={attempt.status === 'failed' ? 'bg-rose-50/60' : ''}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{lesson.title}</td>
                    <td className="px-4 py-3 text-slate-600">День {day.dayIndex}</td>
                    <td className="px-4 py-3 text-slate-600">{attempt.status}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {attempt.score !== undefined && attempt.maxScore !== undefined
                        ? `${attempt.score}/${attempt.maxScore}`
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{attempt.feedback ?? '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Що ще треба побудувати</h2>
        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-600">
          <li>Фільтри за кластерами та конкретними наставниками.</li>
          <li>Графік виконання днів треку у часі.</li>
          <li>Вигрузка CSV для BI систем і автоматична відправка на пошту менеджера.</li>
        </ul>
      </section>
    </div>
  )
}
