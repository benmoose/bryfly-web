'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogBackdrop, DialogTitle, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'motion/react'

export default function Modal ({ children, index }: { children: React.ReactNode, index: number }): React.ReactElement {
  const router = useRouter()

  function onClose (): void {
    router.push(`/#i${index}`)
  }

  return (
    <AnimatePresence>
      <Dialog open onClose={onClose} className='relative z-50'>
        <DialogBackdrop
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/30'
        />
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <DialogPanel
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className='max-w-lg space-y-4 bg-white p-12'
          >
            <DialogTitle>Hey Moose!</DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </AnimatePresence>
  )
}
