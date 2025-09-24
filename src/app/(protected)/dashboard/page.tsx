import Link from 'next/link'
import { redirect } from 'next/navigation'
import { calculateDayProgress, calculateTrackProgress, getDemoAttempts, getDemoTrack } from '@/lib/data/tracks'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect('/signin')
    }
  }

  const track = getDemoTrack()
  const attempts = getDemoAttempts()
  const trackProgress = calculateTrackProgress(track, attempts)

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-primary-100 bg-gradient-to-br from-white via-primary-50 to-white p-6 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Прогрес треку</p>
          <p className="mt-3 text-4xl font-bold text-primary-700">{trackProgress.completionRate}%</p>
          <p className="mt-2 text-sm text-primary-700/80">
            {trackProgress.completedLessons} із {trackProgress.totalLessons} активностей пройдено
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Активний день</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">
            {track.days.find((day) => day.id === trackProgress.activeDayId)?.title ?? 'Очікує на старт'}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Завдання адаптуються під прогрес. Якщо квіз провалений, повтор подамо через 48 годин.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Невирішені моменти</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{trackProgress.failedLessons}</p>
          <p className="mt-2 text-sm text-slate-600">
            Наставник бачить ці спроби у дашборді й може залишити фідбек.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Дорожня карта на 6 днів</h2>
            <p className="text-sm text-slate-600">Мікро-уроки, симуляції та чек-листи до кожної зміни.</p>
          </div>
          <Link
            href={`/day/${trackProgress.activeDayId ?? track.days[0].id}`}
            className="inline-flex items-center rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            Продовжити навчання
          </Link>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {track.days.map((day) => {
            const dayProgress = calculateDayProgress(day, attempts)
            const completionRate = Math.round((dayProgress.completedLessons / dayProgress.totalLessons) * 100)
            const isActive = day.id === trackProgress.activeDayId

            return (
              <article key={day.id} className={`card relative overflow-hidden ${isActive ? 'border-primary-200 ring-2 ring-primary-100' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">День {day.dayIndex}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{day.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{day.focus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary-600">{completionRate}%</p>
                    <p className="text-xs text-slate-500">
                      {dayProgress.completedLessons}/{dayProgress.totalLessons} виконано
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {day.lessons.map((lesson) => {
                    const attempt = attempts.find((item) => item.lessonId === lesson.id)
                    const statusBadge = attempt?.status ?? 'not_started'
                    const badgeStyles =
                      statusBadge === 'passed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : statusBadge === 'failed'
                          ? 'bg-rose-100 text-rose-700'
                          : statusBadge === 'in_progress'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'

                    return (
                      <li key={lesson.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2">
                        <span>
                          <span className="font-medium text-slate-800">{lesson.title}</span>
                          <span className="block text-xs text-slate-500">{lesson.type.toUpperCase()}</span>
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles}`}>{statusBadge}</span>
                      </li>
                    )
                  })}
                </ul>
                <Link
                  href={`/day/${day.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-100"
                >
                  Переглянути день
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
