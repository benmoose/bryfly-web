import Image from 'next/image'
import BryFlyLogo from 'public/logo-3.png'

export default function Logo () {
  return (
    <Image
      priority
      src={BryFlyLogo}
      alt='BryFly logo'
    />
  )
}
