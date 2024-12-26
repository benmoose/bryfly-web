"use client"

import { Dialog, DialogBackdrop } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import React from "react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

function ModalControls({ handleClose }: { handleClose: () => void }) {
  return (
    <div
      className="flex flex-row h-16 max-w-screen-xl w-full justify-end
            items-center gap-4 text-lg text-slate-200"
    >
      <button
        className="opacity-60 hover:opacity-100 scale-95 hover:scale-100 text-xl
              duration-100 transition-opacity"
        onClick={handleClose}
      >
        <XMarkIcon className="size-8" />
      </button>
    </div>
  )
}

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
        className="fixed inset-0 bg-gradient-to-tr from-black/90 to-black/80 backdrop-blur"
      />
      <div
        className="fixed inset-0 flex flex-initial flex-col justify-stretch items-stretch
          cursor-zoom-out px-4 sm:px-6 md:px-16"
      >
        <ModalControls handleClose={handleClose} />
        {children}
      </div>
    </Dialog>
  )
}
