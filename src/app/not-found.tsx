import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Сторінку не знайдено</h1>
      <p className="text-base text-slate-600">
        Можливо, курс було оновлено або перенесено. Поверніться до каталогу, щоб обрати актуальну програму навчання.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700"
      >
        Повернутися на головну
      </Link>
    </div>
  )
}
