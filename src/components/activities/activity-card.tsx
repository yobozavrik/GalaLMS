import Link from 'next/link'
import {
  HiOutlineCamera,
  HiOutlineClipboardDocumentCheck,
  HiOutlinePlayCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import type { Lesson, LessonAttempt } from '@/lib/types/training'
import { getSuggestedRetryDate } from '@/lib/data/tracks'

interface ActivityCardProps {
  lesson: Lesson
  attempt?: LessonAttempt
  showOpenAction?: boolean
}

const statusStyles: Record<string, string> = {
  passed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-rose-100 text-rose-700',
  in_progress: 'bg-amber-100 text-amber-700',
  not_started: 'bg-slate-100 text-slate-600',
}

export function ActivityCard({ lesson, attempt, showOpenAction = true }: ActivityCardProps) {
  const status = attempt?.status ?? 'not_started'
  const badgeClassName = statusStyles[status] ?? statusStyles.not_started
  const retryHint = getSuggestedRetryDate(attempt)

  return (
    <article className="card space-y-4 border border-slate-200">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{lesson.type}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{lesson.title}</h3>
          {lesson.summary ? <p className="mt-1 text-sm text-slate-600">{lesson.summary}</p> : null}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClassName}`}>{status}</span>
      </header>

      {lesson.kind === 'video' ? (
        <VideoLessonContent lesson={lesson} />
      ) : lesson.kind === 'quiz' ? (
        <QuizContent lesson={lesson} attempt={attempt} retryHint={retryHint} />
      ) : lesson.kind === 'roleplay' ? (
        <RoleplayContent lesson={lesson} />
      ) : lesson.kind === 'checklist' ? (
        <ChecklistContent lesson={lesson} />
      ) : (
        <SkuContent lesson={lesson} />
      )}

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
        <div className="text-xs text-slate-500">
          Тривалість: {lesson.durationMinutes} хв · Порядок: #{lesson.order}
        </div>
        {showOpenAction ? (
          <Link
            href={`/lesson/${lesson.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-100"
          >
            Відкрити урок
          </Link>
        ) : null}
      </footer>
    </article>
  )
}

function VideoLessonContent({ lesson }: { lesson: Lesson }) {
  if (lesson.kind !== 'video') return null

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-100 p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
        <HiOutlinePlayCircle className="h-6 w-6" />
      </div>
      <div className="text-sm text-slate-600">
        <p>Платформа: {lesson.data.platform}</p>
        <p className="text-xs text-slate-500">Лінк: {lesson.data.url}</p>
      </div>
    </div>
  )
}

function QuizContent({
  lesson,
  attempt,
  retryHint,
}: {
  lesson: Lesson
  attempt?: LessonAttempt
  retryHint: string | null
}) {
  if (lesson.kind !== 'quiz') return null
  const totalQuestions = lesson.data.questions.length

  return (
    <div className="space-y-3 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <HiOutlineQuestionMarkCircle className="h-6 w-6" />
        </div>
        <div>
          <p>{totalQuestions} запитань · Поріг {lesson.data.passingScore} правильних відповідей</p>
          <p className="text-xs text-slate-500">Макс. спроб: {lesson.data.maxAttempts}</p>
        </div>
      </div>
      {attempt?.score !== undefined && attempt?.maxScore ? (
        <p className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700">
          Результат: {attempt.score}/{attempt.maxScore}
        </p>
      ) : null}
      {retryHint ? <p className="text-xs text-slate-500">Повтор доступний: {retryHint}</p> : null}
    </div>
  )
}

function RoleplayContent({ lesson }: { lesson: Lesson }) {
  if (lesson.kind !== 'roleplay') return null

  return (
    <div className="space-y-3 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <HiOutlineSparkles className="h-6 w-6" />
        </div>
        <div>
          <p className="font-medium text-slate-800">Сценарій</p>
          <p>{lesson.data.scenario}</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Кроки діалогу</p>
        <ol className="mt-2 space-y-1 text-xs text-slate-500">
          {lesson.data.steps.map((step) => (
            <li key={step.id}>
              <span className="font-semibold text-slate-700">{step.actor === 'trainee' ? 'Стажер' : 'Клієнт'}:</span> {step.text}
              {step.hint ? <span className="text-primary-600"> · Підказка: {step.hint}</span> : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function ChecklistContent({ lesson }: { lesson: Lesson }) {
  if (lesson.kind !== 'checklist') return null

  return (
    <div className="space-y-3 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <HiOutlineClipboardDocumentCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="font-medium text-slate-800">{lesson.data.instructions}</p>
          {lesson.data.locationContext ? <p className="text-xs text-slate-500">Локація: {lesson.data.locationContext}</p> : null}
        </div>
      </div>
      <ul className="space-y-2 text-xs text-slate-500">
        {lesson.data.items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <HiOutlineCamera className={`h-4 w-4 ${item.requiresPhoto ? 'text-primary-500' : 'text-slate-400'}`} />
            <span>
              {item.label}
              {item.helperText ? <span className="text-slate-400"> · {item.helperText}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkuContent({ lesson }: { lesson: Lesson }) {
  if (lesson.kind !== 'sku') return null

  return (
    <div className="space-y-3 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
      <p className="font-medium text-slate-800">{lesson.data.instructions}</p>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">SKU для опрацювання</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-500">
          {lesson.data.requiredSkuIds.map((sku) => (
            <li key={sku} className="rounded-lg bg-white px-3 py-1 font-mono text-xs text-slate-700">
              {sku}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Критерії успіху</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-500">
          {lesson.data.successCriteria.map((criterion) => (
            <li key={criterion}>{criterion}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
