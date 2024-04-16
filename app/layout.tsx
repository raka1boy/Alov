import type { Metadata } from 'next'
import './globalStyles/normalize.css'
import './globalStyles/globals.css'
import './globalStyles/header.css'
import './globalStyles/menu.css'
import Layout from '@/components/layouts/Layout'

export const metadata: Metadata = {
  title: 'Alov — Магазин зажигалок',
  description: 'Самый крупный поставщик в России',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
