'use client'

import { DialogPanel } from '@headlessui/react'
import React, { useState, use } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { IImageSet } from 'services/cloudinary'

enum Direction {
  NEXT,
  PREV,
}

export default function Modal (
  { publicId, imageSetStream, children }: { publicId: string, imageSetStream: Promise<IImageSet>, children: React.ReactNode }
) {
  const imageSet = use(imageSetStream)
  const image = imageSet.find(img => img.publicId === publicId)

  const [activeIndex, _setActiveIndex] = useState(image?.index)
  const [direction, setDirection] = useState<Direction>()
  const router = useRouter()

  console.count(`direction-${direction}`)

  function close (): void {
    router.push('/', { scroll: false })
  }

  if (image === null) {
    close()
  }

  function setActiveIndex (newIndex: number): void {
    if (newIndex > activeIndex!) {
      setDirection(Direction.NEXT)
    } else if (newIndex < activeIndex!) {
      setDirection(Direction.PREV)
    } else {
      return
    }
    _setActiveIndex(newIndex)
    const { publicId } = imageSet[newIndex]
    router.push(`/gallery/${publicId}`, { scroll: false })
  }

  function copyShareUrl (): Promise<void> {
    const { origin, pathname } = location
    return navigator.clipboard.writeText(origin + pathname)
  }

  return (
      <div
        className="fixed flex flex-col justify-center items-center inset-0 w-full cursor-zoom-out
        p-2 sm:p-4 md:px-16 md:py-8"
      >
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.21 } }}
          className="relative flex items-center justify-center max-w-screen-xl max-h-full cursor-default"
        >
          {children}
        </DialogPanel>
        <div className="absolute top-4 right-4 flex gap-3 text-slate-200 z-50">
          <button
            className="opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-lg duration-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              void copyShareUrl()
                .catch(err => console.error('error copying share url', err))
            }}
          >
            <LinkIcon className="inline-block size-6"/>
          </button>
          <button
            className="opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-lg duration-100 transition-opacity"
            onClick={close}
          >
            <XMarkIcon className="inline-block size-7"/>
          </button>
        </div>
        <div
          className="fixed flex justify-between items-center w-full px-6 sm:px-8 md:px-4 xl:px-10 text-slate-200 z-50">
          <button
            className="opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex(activeIndex! - 1)
            }}
          >
            <ArrowLeftIcon className="size-9"/>
          </button>
          <button
            className="opacity-40 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex(activeIndex! + 1)
            }}
          >
            <ArrowRightIcon className="size-9"/>
          </button>
        </div>
      </div>
  )
}
