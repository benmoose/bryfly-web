import Image from 'next/image'

export default function Logo ({ width }: { width: number }) {
  return (
    <Image
      priority
      src='/logo.png'
      alt='BryFl logo'
      width={width}
      height={100}
    />
  )
}
