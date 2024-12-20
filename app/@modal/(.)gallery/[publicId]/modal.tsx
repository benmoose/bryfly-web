"use client"

import { DialogPanel } from "@headlessui/react"
import React, { useState, use } from "react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import type { Images } from "lib/cloudinary"

const enum Direction {
  PREV,
  NEXT,
}

export default function Modal({
  publicId,
  imagesPromise,
  children,
}: {
  publicId: string
  imagesPromise: Promise<Images>
  children: React.ReactNode
}) {
  const images = use(imagesPromise)
  const image = images.find((img) => img.publicId === publicId)

  const [activeIndex, _setActiveIndex] = useState(image?.index)
  const [direction, setDirection] = useState<Direction>()
  const router = useRouter()
  console.log("d", direction)

  function close(): void {
    router.push("/", { scroll: false })
  }

  if (image === null) {
    close()
  }

  function setActiveIndex(index: number): void {
    const closedIndex = index >= 0 ? index % images.length : images.length - 1
    if (closedIndex > activeIndex!) {
      setDirection(Direction.NEXT)
    } else if (closedIndex < activeIndex!) {
      setDirection(Direction.PREV)
    } else {
      return
    }
    _setActiveIndex(closedIndex)
    const { publicId } = images[closedIndex]
    router.push(`/gallery/${publicId}`, { scroll: false })
  }

  return (
    <>
      <DialogPanel
        as={motion.div}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.21 } }}
        className="relative flex items-center justify-center max-w-screen-xl max-h-full cursor-default"
      >
        {children}
      </DialogPanel>
      <div className="absolute flex h-16 justify-between items-center bottom-0 w-full max-w-screen-xl px-4 xl:px-0 text-slate-200 z-50">
        <button
          className="opacity-60 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            setActiveIndex(activeIndex! - 1)
          }}
        >
          <ArrowLeftIcon className="size-8" />
        </button>
        <button
          className="opacity-60 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            setActiveIndex(activeIndex! + 1)
          }}
        >
          <ArrowRightIcon className="size-8" />
        </button>
      </div>
    </>
  )
}
