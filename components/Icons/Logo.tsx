import Image from 'next/image'

export default function Logo () {
  return (
    <Image
      priority
      src='/logo.png'
      alt='BryFly logo'
      width={230}
      height={50}
    />
  )
}
