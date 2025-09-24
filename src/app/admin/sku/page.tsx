import { getDemoTrack } from '@/lib/data/tracks'

const demoSkuCatalog = [
  {
    id: '4820000000017',
    title: 'Йогурт «Балуваний» 2%',
    usp: ['Натуральне молоко фермерів', 'Без доданого цукру', 'Підходить для ранкових сніданків'],
    promo: '2+1 до кінця тижня',
  },
  {
    id: '4820000000451',
    title: 'Хліб житній з насінням',
    usp: ['Випікаємо о 5:00 щодня', 'Поживні волокна', 'Смачний з крем-сиром «Галя»'],
    promo: '10% для картки лояльності',
  },
]

export default function AdminSkuPage() {
  const track = getDemoTrack()
  const skuLessons = track.days.flatMap((day) => day.lessons.filter((lesson) => lesson.kind === 'sku'))

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-slate-900">SKU у навчальних місіях</h2>
          <p className="text-sm text-slate-600">
            Підготовка місій зі сканером. Зв&apos;язок із навчальним треком допомагає автоматично підкидати товари у відповідні дні.
          </p>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {skuLessons.map((lesson) => (
            <li key={lesson.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{lesson.dayId}</p>
              <p className="mt-1 font-semibold text-slate-900">{lesson.title}</p>
              <p className="text-xs text-slate-500">{lesson.data.requiredSkuIds.length} SKU у місії</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Каталог SKU</h2>
            <p className="text-sm text-slate-600">Дані синхронізуються із Supabase Storage та картками товару.</p>
          </div>
          <button className="inline-flex items-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">
            Додати SKU
          </button>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          {demoSkuCatalog.map((sku) => (
            <li key={sku.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{sku.id}</p>
                  <h3 className="text-base font-semibold text-slate-900">{sku.title}</h3>
                </div>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">{sku.promo}</span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">
                {sku.usp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
