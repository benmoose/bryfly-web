"use client"

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import ModalNavigation, { ModalButton } from "./navigation"

export default function Modal({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const handleClose = () => {
    router.push("/", { scroll: true })
  }

  return (
    <Dialog open static onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gradient-to-tr from-slate-950/90 to-slate-900/80
          backdrop-blur z-10"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 flex flex-col flex-nowrap justify-center items-center z-20
        gap-1.5 py-3 mx-3 md:gap-2 md:py-4 md:mx-10 lg:gap-4 lg:py-8 h-dvh max-h-full max-w-full cursor-zoom-out pointer-events-auto"
      >
        <div className="flex-1" />
        <DialogPanel className="modal__image-wrapper basis-1/2 relative flex-1 justify-center items-center cursor-default max-w-screen-xl">
          <ModalButton action={handleClose} className="absolute top-3 right-3">
            <XMarkIcon className="size-7" />
          </ModalButton>
          {children}
        </DialogPanel>
        <ModalNavigation />
      </motion.div>
    </Dialog>
  )
}
