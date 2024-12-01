'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { motion } from 'motion/react'
import { DomainImageIterable } from 'services/cloudinary/types'
import PrimaryImage from 'app/ui/primary-image'

enum Direction {
  NEXT, PREV
}

export default function Modal ({ images, index }: {
  images: DomainImageIterable[]
  index: number
}): React.ReactElement {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(index)
  const [direction, setDirection] = useState<Direction>()

  function onClose (): void {
    router.push(`/?i=${activeIndex}`, { scroll: false })
  }

  function navigate (newIndex: number): void {
    if (newIndex > activeIndex) {
      setDirection(Direction.NEXT)
    } else if (newIndex < activeIndex) {
      setDirection(Direction.PREV)
    }
    setActiveIndex(newIndex)
    router.push(`/p/${newIndex}`, { scroll: false })
  }

  return (
    <Dialog static open onClose={onClose} className='relative z-50'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='fixed inset-0 bg-black/60 backdrop-blur-sm'
      />
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='max-w-screen-xl mx-6 space-y-4 bg-white/10 rounded-lg
              overflow-hidden shadow-2xl'
        >
          <PrimaryImage
            requestClose={() => {
            }}
            index={activeIndex}
            images={images}
            setActiveIndex={navigate}
            direction={direction}
          />
          <button onClick={() => navigate(activeIndex + 1)} type='button'>Next</button>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
