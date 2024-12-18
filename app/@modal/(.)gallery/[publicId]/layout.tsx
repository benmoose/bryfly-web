'use client'

import react from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

export default function Layout ({ children }: { children: react.ReactElement }) {
  const router = useRouter()
  return (
    <Dialog static open transition onClose={() => router.push('/', {scroll: false})} className='relative z-50'>
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.21 } }}
        className='fixed inset-0 bg-black/85 backdrop-blur'
      />
      {children}
    </Dialog>
  )
}
