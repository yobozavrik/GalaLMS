import Link from 'next/link'
import { HiOutlineArrowRight } from 'react-icons/hi'
import type { Course } from '@/lib/data/courses'

type CourseCardProps = {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="card flex h-full flex-col justify-between">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
          <span>{course.level}</span>
          <span className="h-1 w-1 rounded-full bg-primary-200" aria-hidden />
          <span>{course.focus}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{course.description}</p>
        </div>
        <ul className="space-y-2 text-sm text-slate-600">
          {course.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{course.duration}</span>
        <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700">
          Детальніше
          <HiOutlineArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
