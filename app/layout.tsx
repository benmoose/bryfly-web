import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './styles.css'

export const metadata: Metadata = {
  title: 'BryFly',
  description: 'Browse the best disco balls...'
}

export default function RootLayout ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
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
