import Image from 'next/image'
import { useRouter } from 'next/router'
import useKeypress from 'react-use-keypress'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import SharedModal from './SharedModal'

export default function Carousel ({
  index,
  image,
  images
}: {
  index: number
  image: ImageProps
  images: ImageProps[]
}) {
  const router = useRouter()
  const [, setLastViewedPhoto] = useLastViewedPhoto()

  function closeModal () {
    setLastViewedPhoto(image.public_id)
    router.push('/', undefined, { shallow: true })
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
        className='absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl'
        onClick={closeModal}
      >
        <Image
          src={image.blurDataUrl}
          className='pointer-events-none h-full w-full'
          alt='blurred background'
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
