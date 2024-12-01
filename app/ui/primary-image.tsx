'use client'

import Image from 'next/image'
import React from 'react'
import { CloudinaryImage } from 'app/ui/remote-image'
import { DomainImageIterable } from 'services/cloudinary/types'
import { useSwipeable } from 'react-swipeable'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'

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

export default function PrimaryImage ({
  index,
  images,
  setActiveIndex,
  direction
}: {
  index: number
  images: DomainImageIterable[]
  setActiveIndex: (i: number) => void
  requestClose: () => void
  direction: number | undefined
}): React.ReactElement {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      if (index < images.length - 1) {
        setActiveIndex(index + 1)
      }
    },
    onSwipedLeft: () => {
      if (index > 0) {
        setActiveIndex(index - 1)
      }
    },
    trackMouse: true
  })

  return (
    <MotionConfig transition={{
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.19 }
    }}
    >
      <div
        className='absolute inset-0 h-auto max-h-dvh flex items-center justify-center'
        {...handlers}
      >
        <div className='absolute inset-0 z-30 cursor-default'>
          <Image
            fill
            priority
            src={images[index].placeholderUrl}
            className='object-fill'
            alt=''
          />
        </div>

        <div className='flex items-center z-50 w-full h-full p-2 md:p-4 lg:mx-8'>
          <div className='relative flex items-center justify-center w-full h-full max-h-full max-w-screen-2xl'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={images[index].id}
                variants={animations}
                initial='enter'
                animate='center'
                exit='exit'
                custom={direction}
                className='absolute overflow-hidden rounded-lg  shadow-2xl'
              >
                <CloudinaryImage
                  priority
                  image={images[index]}
                  className='object-contain'
                  sizes='(max-width: 1536px) 100vw, 1536px'
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
