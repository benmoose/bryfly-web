"use client"

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import ModalNavigation from "./navigation"

export default function Modal({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const handleClose = () => {
    router.push("/", { scroll: true })
  }

  return (
    <Dialog open static onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.21 } }}
        className="fixed inset-0 bg-gradient-to-tr from-slate-950/95 to-slate-900/80
          backdrop-blur-sm z-10"
      />
      <div
        className="fixed inset-0 flex flex-col justify-center items-center z-20
        max-h-full max-w-full cursor-zoom-out p-4 pb-20 sm:px-8 sm:pt-8"
      >
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
          className="flex flex-col items-center max-w-screen-lg max-h-full cursor-default z-40"
        >
          <ModalNavigation />
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
