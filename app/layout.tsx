import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  title: 'BryFly',
  description: 'Browse the best disco balls...'
}

export default function RootLayout ({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en'>
      <body className='bg-black antialiased'>
        {modal}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
