import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const inter = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Pizza delivery | Main page',
  description: 'Vlad R pizza delivery pet project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex min-h-screen flex-col items-center '>
          {children}
        </main>
      </body>
    </html>
  )
}
