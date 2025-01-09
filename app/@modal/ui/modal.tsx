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
      <DialogBackdrop className="fixed inset-0 bg-linear-to-tr from-slate-950/90 to-slate-900/80 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 flex flex-col justify-between items-center z-10
        py-4 mx-4 max-h-full max-w-full cursor-zoom-out pointer-events-auto"
      >
        <div className="absolute flex justify-end w-full max-w-(--breakpoint-xl) mx-auto z-10 top-4">
          <ModalButton action={handleClose}>
            <XMarkIcon className="size-7" />
          </ModalButton>
        </div>
        <DialogPanel className="modal__image-wrapper relative flex flex-1 justify-center items-center cursor-default max-w-(--breakpoint-xl)">
          {children}
        </DialogPanel>
        <ModalNavigation />
      </motion.div>
    </Dialog>
  )
}
