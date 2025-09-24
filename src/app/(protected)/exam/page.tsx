import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ActivityCard } from '@/components/activities/activity-card'
import { getDemoAttempts, getDemoTrack } from '@/lib/data/tracks'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function ExamPage() {
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
  const examDay = track.days.find((day) => day.dayIndex === 6)

  if (!examDay) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Іспитовий день поки не налаштований. Перевірте конфігурацію треку.</p>
      </div>
    )
  }

  const attempts = getDemoAttempts()

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Фінальний день</p>
        <h1 className="text-2xl font-semibold text-slate-900">Екзамен «{track.title}»</h1>
        <p className="text-sm text-slate-600">
          Закріплюємо ключові компетенції: квіз, рольова гра та чек-лист підтвердження. Після успішного складання наставник
          видає сертифікат.
        </p>
      </header>
      <section className="grid gap-4 lg:grid-cols-2">
        {examDay.lessons.map((lesson) => (
          <ActivityCard
            key={lesson.id}
            lesson={lesson}
            attempt={attempts.find((attempt) => attempt.lessonId === lesson.id)}
          />
        ))}
      </section>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Після екзамену</h2>
        <p className="mt-2 text-sm text-slate-600">
          Наставник перевіряє завантажені матеріали, залишає оцінку й підтверджує сертифікат. Дані про успішність потрапляють
          до аналітики магазину і на лідерборд кластера.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/leaderboard"
            className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-100"
          >
            Переглянути рейтинги
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Повернутись на дашборд
          </Link>
        </div>
      </div>
    </div>
  )
}
