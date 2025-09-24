import Link from 'next/link'
import { notFound } from 'next/navigation'
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlineAcademicCap } from 'react-icons/hi'
import { courses, getCourseBySlug } from '@/lib/data/courses'

interface CoursePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }))
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
        <HiOutlineArrowLeft className="h-4 w-4" />
        Назад до каталогу
      </Link>
      <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
              {course.level}
              <span className="h-1 w-1 rounded-full bg-primary-200" aria-hidden />
              {course.focus}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{course.title}</h1>
            <p className="text-lg text-slate-700">{course.description}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-primary-100 bg-primary-50/60 p-6 text-sm text-slate-700">
            <div className="flex items-center gap-2 font-semibold text-primary-700">
              <HiOutlineClock className="h-5 w-5" />
              Тривалість: {course.duration}
            </div>
            <div className="flex items-center gap-2 font-semibold text-primary-700">
              <HiOutlineAcademicCap className="h-5 w-5" />
              Формат: {course.format}
            </div>
            <ul className="space-y-2 text-slate-600">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <Link
              href="mailto:academy@baluvana.ua"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700"
            >
              Запросити демо запуску
            </Link>
          </div>
        </div>
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Структура модулів</h2>
          <div className="space-y-6">
            {course.modules.map((module) => (
              <article key={module.title} className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{module.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {module.practices.map((practice) => (
                    <li key={practice} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
