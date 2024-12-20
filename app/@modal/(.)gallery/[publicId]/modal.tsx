"use client"

import { DialogPanel } from "@headlessui/react"
import React, { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import type { Image } from "lib/cloudinary"

const enum Direction {
  PREV,
  NEXT,
}

// const animations = {
//   enter: (direction: number) => {
//     return {
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }
//   },
//   center: {
//     x: 0,
//     opacity: 1,
//   },
//   exit: (direction: number) => {
//     return {
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     }
//   },
// }

export default function Modal({
  image,
  images,
  children,
}: {
  image: Image
  images: Image[]
  children: React.ReactNode
}) {
  const [activeIndex, _setActiveIndex] = useState(image.index)
  const [, setDirection] = useState<Direction>()
  const router = useRouter()

  function close(): void {
    router.push("/", { scroll: false })
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

  const swipeHandles = useSwipeable({
    onSwipedLeft: () => setActiveIndex(activeIndex! - 1),
    onSwipedRight: () => setActiveIndex(activeIndex! + 1),
    onSwipedDown: () => close(),
  })

  return (
    <>
      <DialogPanel
        as={motion.div}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.21 } }}
        className="relative flex items-center justify-center max-w-screen-xl max-h-full cursor-default"
        {...swipeHandles}
      >
        {children}
      </DialogPanel>
      <div
        className="absolute flex h-16 justify-between items-center bottom-0 w-full max-w-screen-xl
          px-4 xl:px-0 text-slate-200 z-50"
      >
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
