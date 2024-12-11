import { Analytics } from '@vercel/analytics/react'
import { inter } from 'app/ui/font'
import './styles.css'
import type { Metadata } from 'next'
import React from 'react'
import { prefetchHeroImageSet } from 'services/cloudinary'

export const metadata: Metadata = {
  title: 'BryFly',
  description: 'Bespoke disco balls.'
}

export default function RootLayout ({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}): React.ReactElement {
  void prefetchHeroImageSet()

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
