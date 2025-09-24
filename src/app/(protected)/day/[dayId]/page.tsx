import { notFound, redirect } from 'next/navigation'
import { ActivityCard } from '@/components/activities/activity-card'
import { calculateDayProgress, getDemoAttempts, getDemoTrack } from '@/lib/data/tracks'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function DayPage({ params }: { params: { dayId: string } }) {
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
  const day = track.days.find((item) => item.id === params.dayId)

  if (!day) {
    notFound()
  }

  const attempts = getDemoAttempts()
  const dayProgress = calculateDayProgress(day, attempts)

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">День {day.dayIndex}</p>
        <h1 className="text-2xl font-semibold text-slate-900">{day.title}</h1>
        <p className="text-sm text-slate-600">{day.focus}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary-700">
            {dayProgress.completedLessons}/{dayProgress.totalLessons} виконано
          </span>
          {dayProgress.failedLessons > 0 ? (
            <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
              {dayProgress.failedLessons} потребують повтору
            </span>
          ) : null}
          {dayProgress.nextLessonId ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
              Наступна активність: {day.lessons.find((lesson) => lesson.id === dayProgress.nextLessonId)?.title}
            </span>
          ) : null}
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        {day.lessons.map((lesson) => (
          <ActivityCard
            key={lesson.id}
            lesson={lesson}
            attempt={attempts.find((attempt) => attempt.lessonId === lesson.id)}
          />
        ))}
      </section>
    </div>
  )
}
