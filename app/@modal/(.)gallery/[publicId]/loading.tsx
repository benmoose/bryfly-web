import { DialogPanel } from "@headlessui/react"

export default function Loading() {
  return (
    <DialogPanel
      className="relative flex items-center justify-center max-w-screen-md max-h-full
        cursor-default animate-pulse w-full rounded-lg bg-gradient-to-tr
        from-slate-900/85 to-slate-600/25 aspect-[3/2]"
    />
  )
}
