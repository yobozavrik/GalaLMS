import Link from 'next/link'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white shadow-sm">
              ГБ
            </span>
            <span>Галя Балувана Академія</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Навчаємо продавців із любов&apos;ю до продуктів. Ділімося знаннями, щоб команди швидше виходили на план і зростали в
            сервісі.
          </p>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Зв&apos;язок</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <HiOutlineMail className="h-4 w-4 text-primary-600" />
                <a href="mailto:academy@baluvana.ua" className="hover:text-primary-600">
                  academy@baluvana.ua
                </a>
              </li>
              <li className="flex items-center gap-2">
                <HiOutlinePhone className="h-4 w-4 text-primary-600" />
                <a href="tel:+380441112233" className="hover:text-primary-600">
                  +380 (44) 111-22-33
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Посилання</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#catalog" className="hover:text-primary-600">
                  Каталог курсів
                </Link>
              </li>
              <li>
                <Link href="#resources" className="hover:text-primary-600">
                  Бібліотека ресурсів
                </Link>
              </li>
              <li>
                <Link href="#cta" className="hover:text-primary-600">
                  Записати новий потік
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-100 py-4">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} ТОВ «Галя Балувана». Усі права захищено.
        </p>
      </div>
    </footer>
  )
}
