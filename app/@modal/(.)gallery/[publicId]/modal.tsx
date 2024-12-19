'use client'

import { DialogPanel } from '@headlessui/react'
import React, { useState, use } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import type { Images } from 'lib/cloudinary'

enum Direction { PREV, NEXT}

export default function Modal (
  { publicId, imagesPromise, children }: { publicId: string, imagesPromise: Promise<Images>, children: React.ReactNode }
) {
  const imageSet = use(imagesPromise)
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

  return (
    <>
      <DialogPanel
        as={motion.div}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.21 } }}
        className="relative flex items-center justify-center max-w-screen-xl max-h-full cursor-default"
      >
        {children}
      </DialogPanel>
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
    </>
  )
}
