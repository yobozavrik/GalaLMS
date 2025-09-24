import Link from 'next/link'
import { HiOutlineAcademicCap, HiOutlineSparkles } from 'react-icons/hi'
import { CourseCard } from '@/components/course/course-card'
import { SectionHeading } from '@/components/common/section-heading'
import { courses } from '@/lib/data/courses'
import { journeySteps, resources, stats, testimonials } from '@/lib/data/highlights'

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-slate-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(252,211,77,0.25),_transparent_55%)]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:px-8 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary-700 shadow">
              <HiOutlineSparkles className="h-4 w-4" />
              Академія продавців «Галя Балувана»
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Запускаємо команду продажів у продуктивність за два тижні
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              Платформа для навчання та онбордингу, що поєднує відео-курси, практичні місії на торгових точках і аналітику прогресу.
              Наставники бачать сильні та слабкі сторони кожного стажера, а менеджери — як навчання впливає на виручку.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                id="cta"
                href="#catalog"
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700"
              >
                Переглянути курси
              </Link>
              <Link
                href="#program"
                className="inline-flex items-center justify-center rounded-full border border-primary-200 px-6 py-3 text-base font-semibold text-primary-700 hover:border-primary-300 hover:text-primary-800"
              >
                Як проходить онбординг
              </Link>
            </div>
            <dl className="grid gap-6 pt-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/60 bg-white/70 p-4 text-sm shadow">
                  <dt className="font-semibold text-slate-700">{item.label}</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-900">{item.value}</dd>
                  <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex-1">
            <div className="relative mx-auto max-w-md rounded-3xl border border-primary-100 bg-white p-6 shadow-2xl">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">Що бачить наставник</h2>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary-500" aria-hidden />
                    <span>Готові сценарії адаптації й завдання по змінах</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary-500" aria-hidden />
                    <span>Статус прогресу кожного стажера в реальному часі</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary-500" aria-hidden />
                    <span>Рекомендації щодо коучингу на основі помилок у завданнях</span>
                  </li>
                </ul>
                <div className="rounded-2xl bg-slate-900 p-4 text-white">
                  <p className="text-sm uppercase tracking-wide text-white/70">Live-аналітика</p>
                  <p className="mt-2 text-3xl font-semibold">92% виконання місій</p>
                  <p className="mt-1 text-sm text-white/70">Команда стажерів хвилі серпня</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8" id="program">
        <SectionHeading
          eyebrow="Програма онбордингу"
          title="Із заявки на стажування до перших рекордних змін"
          description="Послідовність із чотирьох етапів допомагає швидко занурити новачків у стандарти бренду й одразу перевірити навички в реальних умовах."
        />
        <ol className="grid gap-6 lg:grid-cols-4">
          {journeySteps.map((step, index) => (
            <li key={step.title} className="card relative">
              <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-lg font-semibold text-white shadow-lg">
                {index + 1}
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary-600">{step.duration}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8" id="catalog">
        <SectionHeading
          eyebrow="Каталог програм"
          title="Навчання для кожної ролі в торговій точці"
          description="Курси поєднують мікро-уроки, симуляції, практичні місії та фінальні атестації. Оберіть програму відповідно до досвіду співробітника."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8" id="resources">
        <SectionHeading
          eyebrow="Ресурси для наставників"
          title="Усе необхідне для підтримки стажерів"
          description="Інтерактивні гайди, скрипти, шаблони оцінок і дашборди допомагають командам бути на зв&apos;язку навіть у пікові зміни."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.title} className="card h-full">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{resource.type}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{resource.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
              <Link href={resource.link} className="mt-6 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
                Відкрити ресурс
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8" id="testimonials">
        <SectionHeading
          eyebrow="Відгуки"
          title="Команди вже відчули ефект"
          description="Лідери точок, HR та наставники діляться результатами після запуску академії."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="card h-full bg-white">
              <HiOutlineAcademicCap className="h-8 w-8 text-primary-600" />
              <blockquote className="mt-4 text-sm leading-relaxed text-slate-700">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                {testimonial.author}
                <span className="block text-xs font-normal text-slate-500">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-6 py-16 text-white sm:px-10">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Готові запустити наступний потік стажерів?</h2>
          <p className="text-lg text-white/80">
            Ми допоможемо перенести ваш контент, налаштувати Supabase і підготувати наставників до роботи в платформі. Перший потік стартує за 10 днів.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="mailto:academy@baluvana.ua"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
            >
              Запросити демо
            </Link>
            <Link
              href="tel:+380441112233"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white hover:border-white/60"
            >
              Поставити питання
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
