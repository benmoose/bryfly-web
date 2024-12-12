'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { AnimatePresence, motion } from 'motion/react'
import * as Cdn from 'app/ui/remote-image'
import type { IImage, Indexable } from 'services/cloudinary/types'

const animations = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    }
  }
}

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
  const [activeIndex, setActiveIndex] = useState(index)
  const [direction, setDirection] = useState<Direction>()

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

  return (
    <Dialog static open transition onClose={onClose} className='relative z-50'>
      <DialogBackdrop as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='fixed inset-0 bg-black/80' />
      <div className='fixed flex flex-col items-center justify-center inset-0 w-full p-4'>
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='flex items-center justify-center max-h-full max-w-screen-xl pointer-events-none'
        >
          <Cdn.Responsive
            priority
            image={images[index]}
            className='max-h-full w-fit h-fit object-contain rounded-lg pointer-events-auto'
            sizes='(max-width: 1280px) 100vw, 1280px'
            alt=''
          />
        </DialogPanel>
        <div className='absolute shrink-0 bottom-4 flex gap-4'>
          <button
            className='text-white text-xl pointer-events-auto'
            onClick={() => navigate(activeIndex - 1)}
            type='button'
          >
            Prev
          </button>
          <button
            className='text-white text-xl pointer-events-auto'
            onClick={() => navigate(activeIndex + 1)}
            type='button'
          >
            Next
          </button>
        </div>
      </div>
    </Dialog>
  )
}
