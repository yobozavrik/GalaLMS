import { redirect } from 'next/navigation'
import { ActivityCard } from '@/components/activities/activity-card'
import { getDemoAttempts, getDemoTrack } from '@/lib/data/tracks'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function SkuPage() {
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
  const skuLessons = track.days.flatMap((day) =>
    day.lessons.filter((lesson) => lesson.kind === 'sku').map((lesson) => ({ lesson, day }))
  )
  const attempts = getDemoAttempts()

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Каталог SKU</p>
        <h1 className="text-2xl font-semibold text-slate-900">Товари тижня для практики</h1>
        <p className="text-sm text-slate-600">
          Скануйте штрихкоди або вводьте вручну, щоб потренувати аргументи продажу та фото-викладку. Дані автоматично
          синхронізуються з адмінкою.
        </p>
      </header>
      <section className="grid gap-4 lg:grid-cols-2">
        {skuLessons.map(({ lesson, day }) => (
          <div key={lesson.id} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">День {day.dayIndex}</p>
            <ActivityCard
              lesson={lesson}
              attempt={attempts.find((attempt) => attempt.lessonId === lesson.id)}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
