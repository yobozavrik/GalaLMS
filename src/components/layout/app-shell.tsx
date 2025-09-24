'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  HiOutlineAcademicCap,
  HiOutlineClipboardDocumentCheck,
  HiOutlineHome,
  HiOutlinePresentationChartLine,
  HiOutlineQrCode,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { getDemoTrack } from '@/lib/data/tracks'

const demoTrack = getDemoTrack()
const defaultDayId = demoTrack.days[0]?.id ?? 'day-1'
const defaultLessonId = demoTrack.days[0]?.lessons[0]?.id ?? 'lesson-1'
const defaultChecklistId =
  demoTrack.days.flatMap((day) => day.lessons.filter((lesson) => lesson.kind === 'checklist'))[0]?.id ?? 'checklist-1'

const navigation = [
  { label: 'Головна', href: '/dashboard', icon: HiOutlineHome },
  { label: 'День', href: '/day', icon: HiOutlineAcademicCap },
  { label: 'Уроки', href: '/lesson', icon: HiOutlinePresentationChartLine },
  { label: 'Чек-листи', href: '/checklist', icon: HiOutlineClipboardDocumentCheck },
  { label: 'SKU', href: '/sku', icon: HiOutlineQrCode },
  { label: 'Лідерборд', href: '/leaderboard', icon: HiOutlineUserGroup },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      return
    }

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900/5">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Навчальний трек</p>
            <h1 className="text-2xl font-semibold text-slate-900">6-денний онбординг</h1>
            <p className="text-sm text-slate-600">
              Практичні місії, симуляції та SKU, що допоможуть вийти на зміну без супроводу.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Стажер</p>
            <p className="text-sm font-semibold text-slate-900">{userEmail ?? 'demo@gala.lms'}</p>
            <p className="text-xs text-slate-500">Магазин №204 · Кластер Схід</p>
          </div>
        </header>
        <nav className="flex flex-wrap gap-2">
          {navigation.map((item) => {
            const isActive =
              item.href === '/day'
                ? pathname.startsWith('/day')
                : item.href === '/lesson'
                  ? pathname.startsWith('/lesson')
                  : item.href === '/checklist'
                    ? pathname.startsWith('/checklist')
                    : pathname === item.href

            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href=
                  {item.href === '/day'
                    ? `/day/${defaultDayId}`
                    : item.href === '/lesson'
                      ? `/lesson/${defaultLessonId}`
                      : item.href === '/checklist'
                        ? `/checklist/${defaultChecklistId}`
                        : item.href}
                className={`flex flex-1 min-w-[140px] items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition ${
                  isActive
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
