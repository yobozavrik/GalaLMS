'use client'

import Link from 'next/link'
import { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Програма', href: '#program' },
  { name: 'Каталог курсів', href: '#catalog' },
  { name: 'Ресурси', href: '#resources' },
  { name: 'Відгуки', href: '#testimonials' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white shadow-sm">
            ГБ
          </span>
          <span className="hidden sm:inline">Галя Балувана Академія</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="transition hover:text-primary-600">
              {item.name}
            </a>
          ))}
          <Link
            href="#cta"
            className="rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700"
          >
            Записати команду
          </Link>
        </nav>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={cn(
          'border-t border-slate-200 bg-white px-4 pb-4 pt-2 transition-all md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        )}
      >
        <div className="flex flex-col gap-3 text-sm text-slate-700">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="rounded-lg px-3 py-2 hover:bg-slate-100">
              {item.name}
            </a>
          ))}
          <Link
            href="#cta"
            className="rounded-lg bg-primary-600 px-3 py-2 text-center font-semibold text-white hover:bg-primary-700"
          >
            Записати команду
          </Link>
        </div>
      </div>
    </header>
  )
}
