import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient()

  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect('/signin')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900/5">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Адмін-панель</p>
          <h1 className="text-2xl font-semibold text-slate-900">Редактор контенту та звіти</h1>
          <p className="text-sm text-slate-600">
            Створюйте треки, керуйте уроками, відстежуйте прогрес по магазинах і виділяйте теми, що потребують підсилення.
          </p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}
