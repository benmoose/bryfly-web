"use client"

import { Dialog, DialogBackdrop } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { motion } from "motion/react"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import ModalButton from "./modal-button"

export default function Modal({
  children,
}: {
  children?: React.ReactNode
  open?: boolean
}) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const handleClose = () => {
    router.push("/", { scroll: false })
  }

  return (
    <Dialog
      open={!!segment}
      static
      onClose={handleClose}
      className="relative z-50"
    >
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.21 } }}
        className="fixed inset-0 bg-gradient-to-tr from-black/90 to-slate-900/80
          backdrop-blur z-10"
      />
      <div
        className="fixed inset-0 flex flex-col justify-center items-center
        max-h-full max-w-full cursor-zoom-out p-4 md:p-8 lg:p-10 z-20 bg-transparent"
      >
        <div
          className="fixed top-0 right-0 m-4 flex flex-row max-w-screen-xl justify-end
            gap-4 text-lg items-center text-slate-200 z-50"
        >
          <ModalButton action={handleClose}>
            <XMarkIcon className="size-7" />
          </ModalButton>
        </div>
        {children}
      </div>
    </Dialog>
  )
}
