'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import useKeypress from 'react-use-keypress'
import type { ImageProps } from 'utils/types'
import SharedModal from './SharedModal'

export default function Modal ({ images }: { images: ImageProps[] }) {
  const overlayRef = useRef()
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const index = images.map(img => img?.public_id).indexOf(id)

  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(index)

  function handleClose () {
    router.push('/')
  }

  function changePhotoId (newVal: number) {
    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    const newImageId = images[newVal]?.public_id
    setCurIndex(newVal)
    router.push(`/?id=${newImageId}`)
  }

  useKeypress('ArrowRight', () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1)
    }
  })

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      changePhotoId(index - 1)
    }
  })

  return (
    <Dialog
      static
      open
      onClose={handleClose}
      initialFocus={overlayRef}
      className='fixed inset-0 z-10 flex items-center justify-center'
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key='backdrop'
        className='fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SharedModal
        activeIndex={curIndex}
        direction={direction}
        images={images}
        currentPhoto={images[index]}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation
      />
    </Dialog>
  )
}
