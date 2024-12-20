"use client"

import { Dialog, DialogBackdrop } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import React from "react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

export default function Modal({
  open,
  children,
}: {
  children: React.ReactNode
  open: boolean
}) {
  const router = useRouter()
  const handleClose = () => void router.push("/", { scroll: false })

  return (
    <Dialog static open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.21 } }}
        className="fixed inset-0  bg-gradient-to-tr from-black/90 to-black/80 backdrop-blur"
      />
      <div
        className="fixed flex flex-col justify-center items-center inset-0 w-full cursor-zoom-out
          px-4 py-16 sm:px-6 md:px-16"
      >
        {children}
        <div
          className="absolute flex top-0 h-16 max-w-screen-xl w-full justify-end items-center gap-4 text-lg text-slate-200
            z-50 pr-6"
        >
          <button
            className="opacity-60 hover:opacity-100 scale-95 hover:scale-100 duration-100 transition-opacity"
            onClick={handleClose}
          >
            <XMarkIcon className="inline-block size-8" />
          </button>
        </div>
      </div>
    </Dialog>
  )
}
