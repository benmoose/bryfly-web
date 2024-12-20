"use client"

import react from "react"
import { Dialog, DialogBackdrop } from "@headlessui/react"
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"

export default function Layout({ children }: { children: react.ReactElement }) {
  const router = useRouter()

  function copyShareUrl(): Promise<void> {
    const { origin, pathname } = location
    return navigator.clipboard.writeText(origin + pathname)
  }

  return (
    <Dialog
      static
      open
      transition
      onClose={() => router.push("/", { scroll: false })}
      className="relative z-50"
    >
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.21 } }}
        className="fixed inset-0 bg-black/85 backdrop-blur"
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
            onClick={(e) => {
              e.stopPropagation()
              void copyShareUrl().catch((err) =>
                console.error("error copying share url", err),
              )
            }}
          >
            <LinkIcon className="inline-block items-baseline size-6" />
          </button>
          <button
            className="opacity-60 hover:opacity-100 scale-95 hover:scale-100 duration-100 transition-opacity"
            onClick={close}
          >
            <XMarkIcon className="inline-block size-7" />
          </button>
        </div>
      </div>
    </Dialog>
  )
}
