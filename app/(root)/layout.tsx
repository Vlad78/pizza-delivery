import type { Metadata } from 'next'

import { Header } from '@/shared/components/shared/header'

export const metadata: Metadata = {
  title: 'Pizza delivery | Main page',
  description: 'Vlad R pizza delivery pet project',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <main className=' min-h-screen'>
      <Header />
      {children}
      {modal}
    </main>
  )
}
