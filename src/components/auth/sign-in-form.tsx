'use client'

import { useState } from 'react'
import { HiOutlineArrowRightCircle } from 'react-icons/hi2'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      setStatusMessage('Авторизація тимчасово недоступна. Перевірте налаштування Supabase.')
      return
    }

    setIsSubmitting(true)
    setStatusMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      setStatusMessage('Не вдалося відправити лист. Спробуйте ще раз або зверніться до адміністратора.')
    } else {
      setStatusMessage('Перевірте пошту — ми надіслали лист із посиланням для входу.')
      setEmail('')
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Робоча пошта
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@store.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <p className="text-xs text-slate-500">
          Отримаєте магічне посилання на вхід. Авторизація працює через Supabase Auth.
        </p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-300"
      >
        <span>Надіслати посилання</span>
        <HiOutlineArrowRightCircle className="h-5 w-5" />
      </button>
      {statusMessage ? <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{statusMessage}</p> : null}
    </form>
  )
}
