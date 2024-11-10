import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'BryFly',
  description: 'Browse the best disco balls...'
}
