"use client"

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useRouter } from "next/navigation"

export default function Modal2({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <Dialog
      open
      className="relative z-50"
      onClose={() => {
        router.push("/", { scroll: false })
      }}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <div className="fixed inset-0 p-4 md:p-8 flex justify-center items-center">
        <DialogPanel className="flex flex-col justify-between max-w-screen-lg h-[80dvh] mx-auto border border-amber-400/90 bg-white/10">
          <div className="flex items-center grow justify-center flex-initial max-h-full bg-green-400/20">
            {/*<div className="w-full aspect-video bg-orange-400/40" />*/}
            {children}
          </div>
          <div className="flex flex-none justify-center bg-purple-300/30 gap-2">
            <div className="h-16 w-16 border-2 shadow-sm rounded-sm border-purple-900/60 bg-purple-800/70" />
            <div className="h-16 w-16 border-2 shadow-sm rounded-sm border-purple-900/60 bg-purple-800/70" />
            <div className="h-16 w-16 border-2 shadow-sm rounded-sm border-purple-900/60 bg-purple-800/70" />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
