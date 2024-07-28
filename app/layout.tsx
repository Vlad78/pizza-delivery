import type { Metadata } from 'next'
import './globals.css'

import { Nunito } from 'next/font/google'

import { Header } from '@/components/shared/header'

import prisma from '../prisma/prisma-client'


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
        <main className=' min-h-screen'>
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
