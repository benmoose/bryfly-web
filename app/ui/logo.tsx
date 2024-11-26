import Image from 'next/image'
import BryFlyLogo from 'public/logo-3.png'

export default function Logo () {
  return (
    <Image
      priority
      src={BryFlyLogo}
      alt='BryFly!'
      sizes='(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            (max-width: 1960px) 25vw,
            490px'
    />
  )
}
