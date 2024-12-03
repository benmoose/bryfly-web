import type { Metadata } from 'next'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { inter } from 'app/ui/font'
import './styles.css'

export const metadata: Metadata = {
  title: 'BryFly',
  description: 'Bespoke disco balls.'
}

export default function RootLayout ({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en' className={inter.className}>
      <body className='bg-black antialiased'>
        {modal}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
