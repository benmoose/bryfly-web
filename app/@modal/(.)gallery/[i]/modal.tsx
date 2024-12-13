'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'motion/react'
import * as Cdn from 'app/ui/remote-image'
import type { IImage, Indexable } from 'services/cloudinary/types'

enum Direction {
  NEXT,
  PREV,
}

export default function Modal ({
  images,
  index
}: {
  images: ReadonlyArray<Indexable<IImage>>
  index: number
}): React.ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(index)
  const [, setDirection] = useState<Direction>()
  const [shareUrlLoading, setShareUrlLoading] = useState(false)

  function onClose (): void {
    router.push('/', { scroll: false })
  }

  async function copyShareUrl (): Promise<void> {
    const shareUrl = new URL(`${location.origin}/${pathname}`)
    return await navigator.clipboard.writeText(shareUrl.href)
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

  const [ratioWidth, ratioHeight] = images[index].aspectRatio
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
          <Cdn.Responsive
            priority
            image={images[index]}
            className={`max-h-full w-fit rounded-lg ${ratioClassName}`}
            sizes='(max-width: 1280px) 100vw, 1280px'
            alt=''
          />
        </DialogPanel>
        <div className='absolute top-4 right-4 flex gap-3 text-slate-200'>
          <button
            className='opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-lg duration-100 transition-opacity'
            onClick={() => {
              setShareUrlLoading(true)
              void copyShareUrl()
                .catch(err => console.error('error copying share url', err))
                .finally(() => setShareUrlLoading(false))
            }}
            aria-busy={shareUrlLoading}
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
            onClick={() => navigate(activeIndex - 1)}
            type='button'
          >
            <ArrowLeftIcon className='size-9' />
          </button>
          <button
            className='opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity'
            onClick={() => navigate(activeIndex + 1)}
            type='button'
          >
            <ArrowRightIcon className='size-9' />
          </button>
        </div>
      </div>
    </Dialog>
  )
}
