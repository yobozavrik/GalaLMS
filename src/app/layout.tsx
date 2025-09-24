import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Галя Балувана Академія — платформа навчання продавців',
  description:
    'Веб-платформа для навчання та онбордингу продавців і стажерів продуктової компанії «Галя Балувана».',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" className={roboto.variable}>
      <body className="min-h-screen bg-slate-50 font-roboto">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
