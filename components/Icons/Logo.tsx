import Image from 'next/image'

export default function Logo ({ width }: { width: number }) {
  return (
    <Image
      priority
      src='/logo.png'
      alt='BryFly'
      width={width}
      height={100}
    />
  )
}
