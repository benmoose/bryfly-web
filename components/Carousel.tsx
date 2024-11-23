'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useKeypress from 'react-use-keypress'
import type { Image as ImageT } from 'services/cloudinary-client/resources'
// import { useLastViewedImage } from 'utils/useLastViewedImage'
import SharedModal from './SharedModal'

interface Props {
  image: ImageT
  images: ImageT[]
}

export default function Carousel ({ image, images }: Props) {
  const router = useRouter()
  // const [, setLastViewedImage] = useLastViewedImage()

  function closeModal () {
    // setLastViewedImage(image.index)
    router.push(`/#i${image.index}`)
  }

  function setActiveIndex (i: number) {
    return i
  }

  useKeypress('Escape', () => {
    closeModal()
  })

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <button
        className='absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl'
        onClick={closeModal}
      >
        <Image
          priority
          fill
          src={image.placeholderUrl}
          className='pointer-events-none h-full w-full'
          alt='Blurry background image.'
        />
      </button>
      <SharedModal
        navigation
        images={images}
        activeImage={image}
        changePhoto={setActiveIndex}
        closeModal={closeModal}
      />
    </div>
  )
}
