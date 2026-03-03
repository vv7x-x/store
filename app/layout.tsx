import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic, Scheherazade_New } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-arabic',
})

const scheherazade = Scheherazade_New({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-scheherazade',
})

export const metadata: Metadata = {
  title: 'مكتبة النجوم — روايات عربية',
  description: 'مكتبة روايات عربية فاخرة في فضاء الخيال والأدب الراقي',
  generator: 'v0.app',
}

export const viewport = {
  themeColor: '#05071a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexArabic.variable} ${scheherazade.variable}`}>
      <body className="font-arabic-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
