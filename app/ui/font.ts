import { Concert_One, Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

const concertOne = Concert_One({
  subsets: ['latin'],
  display: 'block',
  weight: '400'
})

export { concertOne, inter }
