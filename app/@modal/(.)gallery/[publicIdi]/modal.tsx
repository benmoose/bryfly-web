import React, { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'motion/react'
import * as Cdn from 'app/ui/remote-image'
import { getHeroImageSet } from 'services/cloudinary'

enum Direction {
  NEXT,
  PREV,
}

export default function Modal ({ publicId }: { publicId: string }) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(image.index)
  const [, setDirection] = useState<Direction>()

  const imageSet = await getHeroImageSet()
  const image = imageSet.byPublicId(publicId)

  if (!image) {
    return null
  }

  function onClose (): void {
    router.push('/', { scroll: false })
  }

  function navigate (newIndex: number): void {
    if (newIndex > activeIndex) {
      setDirection(Direction.NEXT)
    } else if (newIndex < activeIndex) {
      setDirection(Direction.PREV)
    }
    setActiveIndex(newIndex)
    router.push(`/gallery/${newIndex}`, { scroll: false })
  }

  function copyShareUrl (): Promise<void> {
    const { origin, pathname } = location
    const shareUrl = new URL(origin + pathname)
    return navigator.clipboard.writeText(shareUrl.href)
  }

  const [ratioWidth, ratioHeight] = image.aspectRatio
  const ratioOk = ratioWidth <= 16 && ratioWidth > 0 && ratioHeight <= 16 && ratioHeight > 0
  const ratioClassName = ratioOk ? `aspect-[${ratioWidth}/${ratioHeight}]` : ''

  return (
    <Dialog static open transition onClose={onClose} className='relative z-50'>
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.21 } }}
        className='fixed inset-0 bg-black/85 backdrop-blur'
      />
      <div
        className='fixed flex flex-col justify-center items-center inset-0 w-full cursor-zoom-out
        p-2 sm:p-4 md:px-16 md:py-8'
      >
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.21 } }}
          className='relative flex items-center justify-center max-w-screen-xl max-h-full cursor-default'
        >
          <Suspense fallback={<Loading ratioClassName={ratioClassName} />}>
            <Cdn.Responsive
              priority
              image={image}
              className={`max-h-full w-fit rounded-lg ${ratioClassName}`}
              sizes='(max-width: 1280px) 100vw, 1280px'
              alt=''
            />
          </Suspense>
        </DialogPanel>
        <div className='absolute top-4 right-4 flex gap-3 text-slate-200'>
          <button
            className='opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-lg duration-100 transition-opacity'
            onClick={(e) => {
              e.stopPropagation()
              void copyShareUrl()
                .catch(err => console.error('error copying share url', err))
            }}
          >
            <LinkIcon className='inline-block size-6' />
          </button>
          <button
            className='opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-lg duration-100 transition-opacity'
            onClick={onClose}
          >
            <XMarkIcon className='inline-block size-7' />
          </button>
        </div>
        <div className='fixed flex justify-between items-center w-full px-6 sm:px-8 md:px-4 xl:px-10 text-slate-200'>
          <button
            className='opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity'
            onClick={(e) => {
              e.stopPropagation()
              navigate(activeIndex - 1)
            }}
            type='button'
          >
            <ArrowLeftIcon className='size-9' />
          </button>
          <button
            className='opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity'
            onClick={(e) => {
              e.stopPropagation()
              navigate(activeIndex + 1)
            }}
            type='button'
          >
            <ArrowRightIcon className='size-9' />
          </button>
        </div>
      </div>
    </Dialog>
  )
}

function Loading ({ ratioClassName }: { ratioClassName: string }) {
  return <div className={`max-h-full w-fit rounded-lg bg-white/50 ${ratioClassName}`}/>
}
