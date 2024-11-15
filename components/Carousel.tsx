'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import useKeypress from 'react-use-keypress'
import type { ImageProps } from 'utils/types'
import { useLastViewedImage } from 'utils/useLastViewedImage'
import SharedModal from './SharedModal'

interface Props {
  index: number
  image: ImageProps
  images: ImageProps[]
}

export default function Carousel ({ index, image, images }: Props) {
  const [, setLastViewedImage] = useLastViewedImage()

  function closeModal () {
    setLastViewedImage(image.public_id)
    redirect('/')
  }

  function changePhotoId (newVal: number) {
    return newVal
  }

  useKeypress('Escape', () => {
    closeModal()
  })

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <button
        onClick={closeModal}
        className='absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl'
      >
        <Image
          src={image.blurDataUrl}
          alt=''
          className='pointer-events-none h-full w-full'
          fill
          priority
        />
      </button>
      <SharedModal
        activeIndex={index}
        images={images}
        currentPhoto={image}
        changePhotoId={changePhotoId}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}
