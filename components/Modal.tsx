'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import useKeypress from 'react-use-keypress'
import type { Image } from 'services/cloudinary-client/resources'
import SharedModal from './SharedModal'

export default function Modal ({ images }: { images: Image[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeIndex = images
    .map(img => `${img.index}`)
    .indexOf(searchParams.get('i'))

  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(activeIndex)

  function setActiveIndex (i: number) {
    setDirection(i > activeIndex ? 1 : -1)
    setCurIndex(i)
    router.push(`/p/${i}`)
  }

  useKeypress('ArrowRight', () => {
    if (activeIndex + 1 < images.length) {
      setActiveIndex(activeIndex + 1)
    }
  })

  useKeypress('ArrowLeft', () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  })

  if (!searchParams.has('i')) {
    return null
  }

  function handleClose () {
    router.push('/')
  }

  return (
    <AnimatePresence initial={false} custom={direction}>
      <Dialog
        open
        static
        onClose={handleClose}
        className='relative inset-0 z-50 flex items-center justify-center'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/70'
        />
        {/* <DialogBackdrop transition className='fixed inset-0 z-30 bg-black/80 backdrop-blur-2xl' /> */}
        {/* <Dialog.Overlay */}
        {/*  ref={overlayRef} */}
        {/*  as={motion.div} */}
        {/*  key='backdrop' */}
        {/*  className='fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl' */}
        {/*  initial={{ opacity: 0 }} */}
        {/*  animate={{ opacity: 1 }} */}
        {/* /> */}
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className='max-w-lg space-y-4'
        >
          <SharedModal
            direction={direction}
            activeImage={images[curIndex]}
            images={images}
            changePhoto={setActiveIndex}
            closeModal={handleClose}
            navigation
          />
        </DialogPanel>
      </Dialog>
    </AnimatePresence>
  )
}
