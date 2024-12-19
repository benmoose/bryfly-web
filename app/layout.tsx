import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import type { Metadata, Viewport } from 'next'
import { inter } from 'app/ui/font'
import './styles.css'

export const metadata: Metadata = {
  title: 'BryFly',
  description: 'Bespoke disco balls.',
  keywords: ['disco', 'balls', 'sculpture', 'portfolio', 'projects', 'gallery', 'artist', 'london'],
  creator: 'Ben Hadfield',
  openGraph: {
    title: 'BryFly: Bespoke Disco Balls',
    siteName: 'BryFly: Bespoke Disco Balls',
    description: "Official BryFly portfolio site showcasing previous work."
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout ({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en' className={inter.className}>
      <body className='bg-black antialiased'>
        {modal}
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

function Footer (): React.ReactElement {
  return (
    <footer className='p-4 text-sm text-center text-white/35 sm:p-8 tracking-wide'>
      made by{' '}
      <a
        href='https://instagram.com/_benmoose'
        target='_blank'
        rel='noreferrer'
        className='font-bold text-white/40 hover:text-white/50'
      >
        Moose
      </a>
    </footer>
  )
}
