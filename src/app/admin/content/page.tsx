import Link from 'next/link'
import { getDemoTrack } from '@/lib/data/tracks'

export default function AdminContentPage() {
  const track = getDemoTrack()

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Треки навчання</h2>
            <p className="text-sm text-slate-600">Активні програми та їхні дні.</p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Створити трек
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Трек</th>
                <th className="px-4 py-3">Цільові ролі</th>
                <th className="px-4 py-3">Кількість днів</th>
                <th className="px-4 py-3">Активності</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-900">{track.title}</td>
                <td className="px-4 py-3 text-slate-600">{track.targetRoles.join(', ')}</td>
                <td className="px-4 py-3 text-slate-600">{track.days.length}</td>
                <td className="px-4 py-3 text-slate-600">{track.days.reduce((acc, day) => acc + day.lessons.length, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Дні програми</h2>
        {track.days.map((day) => (
          <article key={day.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">День {day.dayIndex}</p>
                <h3 className="text-base font-semibold text-slate-900">{day.title}</h3>
              </div>
              <Link href={`/admin/content?day=${day.id}`} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                Редагувати уроки
              </Link>
            </div>
            <p className="mt-2 text-sm text-slate-600">{day.focus}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {day.lessons.map((lesson) => (
                <li key={lesson.id} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700">
                  {lesson.title} · <span className="uppercase text-slate-500">{lesson.type}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  )
}
