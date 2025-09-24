import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ActivityCard } from '@/components/activities/activity-card'
import { getDemoAttempts, getDemoTrack } from '@/lib/data/tracks'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function ChecklistPage({ params }: { params: { checklistId: string } }) {
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
  const day = track.days.find((candidate) => candidate.lessons.some((lesson) => lesson.id === params.checklistId))
  const lesson = day?.lessons.find((item) => item.id === params.checklistId)

  if (!day || !lesson || lesson.kind !== 'checklist') {
    notFound()
  }

  const attempts = getDemoAttempts()
  const attempt = attempts.find((item) => item.lessonId === lesson.id)

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Фото-чек-лист</p>
        <h1 className="text-2xl font-semibold text-slate-900">{lesson.title}</h1>
        <p className="text-sm text-slate-600">{lesson.summary}</p>
      </header>
      <ActivityCard lesson={lesson} attempt={attempt} showOpenAction={false} />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Поради</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>Фото завантажуйте у вертикальній орієнтації, щоб наставнику було зручніше переглядати.</li>
          <li>Додавайте коментар, якщо щось не вдалося виконати — це допоможе отримати швидкий фідбек.</li>
          <li>Офлайн? Знімки та чек-лист збережемо й синхронізуємо, щойно з&apos;явиться мережа.</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            href={`/day/${day.id}`}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:border-primary-200 hover:text-primary-700"
          >
            Назад до дня
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
