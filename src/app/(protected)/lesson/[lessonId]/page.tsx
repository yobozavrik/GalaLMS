import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ActivityCard } from '@/components/activities/activity-card'
import { getDemoAttempts, getDemoTrack } from '@/lib/data/tracks'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
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
  const day = track.days.find((item) => item.lessons.some((lesson) => lesson.id === params.lessonId))
  const lesson = day?.lessons.find((item) => item.id === params.lessonId)

  if (!day || !lesson) {
    notFound()
  }

  const attempts = getDemoAttempts()
  const attempt = attempts.find((item) => item.lessonId === lesson.id)

  return (
    <div className="space-y-6">
      <nav className="text-xs text-slate-500">
        <Link href="/dashboard" className="hover:text-primary-600">
          Дашборд
        </Link>
        <span className="mx-1">/</span>
        <Link href={`/day/${day.id}`} className="hover:text-primary-600">
          День {day.dayIndex}
        </Link>
        <span className="mx-1">/</span>
        <span className="font-semibold text-slate-700">{lesson.title}</span>
      </nav>
      <ActivityCard lesson={lesson} attempt={attempt} showOpenAction={false} />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Що робити далі</h2>
        <p className="mt-2 text-sm text-slate-600">
          Після завершення активності зафіксуйте результат. Якщо потрібна допомога — наставник бачить ваш прогрес у реальному
          часі та може залишити коментар.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            href={`/day/${day.id}`}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:border-primary-200 hover:text-primary-700"
          >
            Повернутись до дня
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-primary-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            На головну
          </Link>
        </div>
      </section>
    </div>
  )
}
