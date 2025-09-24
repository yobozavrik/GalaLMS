import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SignInForm } from '@/components/auth/sign-in-form'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function SignInPage() {
  const supabase = createServerSupabaseClient()

  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      redirect('/dashboard')
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Галя Балувана Академія</p>
          <h1 className="text-2xl font-semibold text-slate-900">Вхід до навчальної платформи</h1>
          <p className="text-sm text-slate-600">
            Використайте робочу пошту, щоб отримати магічне посилання для входу. Якщо у вас ще немає акаунта — зверніться до
            наставника.
          </p>
        </div>
        <SignInForm />
        <p className="text-xs text-slate-500">
          Питання щодо доступу? Напишіть у чат підтримки або <Link href="mailto:onboarding@gala.ua" className="font-medium text-primary-600">onboarding@gala.ua</Link>.
        </p>
      </div>
    </div>
  )
}
