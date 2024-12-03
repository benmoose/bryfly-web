'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='fixed inset-0 bg-black/70 backdrop-blur'
      />
      <div className='fixed flex inset-0 w-screen justify-center'>
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='mx-0 flex flex-col pointer-events-none'
        >
          <div className='relative flex flex-col my-0 max-h-full justify-center max-w-screen-lg'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={images[index].key}
                variants={animations}
                initial='enter'
                animate='center'
                exit='exit'
                custom={direction}
                className='flex flex-col max-h-full items-center'
              >
                <Cdn.Responsive
                  priority
                  decoding='sync'
                  image={images[index]}
                  className='object-contain rounded-xl w-auto max-h-full pointer-events-auto'
                  style={{ flex: 0 }}
                  sizes='(max-width: 1024px) 100vw, 1024px'
                  alt=''
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className='flex pointer-events-auto'>
            <button
              className='text-white text-2xl font-bold'
              onClick={() => navigate(activeIndex + 1)}
              type='button'
            >
              Next
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
