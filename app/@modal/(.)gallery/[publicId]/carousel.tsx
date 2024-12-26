"use client"

import { ImagesContext } from "app/_images/context"
import { useContext } from "react"
import { DialogPanel } from "@headlessui/react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import React, { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

const enum Direction {
  PREV,
  NEXT,
}

function ModalNavigation({
  index,
  onSetIndex,
}: {
  index: number
  onSetIndex: (i: number) => void
}) {
  return (
    <div
      className="flex-row flex flex-initial justify-between items-center w-full max-w-screen-xl
          text-slate-200 z-50 h-16"
    >
      <button
        className="opacity-60 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity"
        onClick={e => {
          e.stopPropagation()
          onSetIndex(index - 1)
        }}
      >
        <ArrowLeftIcon className="size-8" />
      </button>
      <button
        className="opacity-60 hover:opacity-100 scale-95 hover:scale-100 text-xl duration-100 transition-opacity"
        onClick={e => {
          e.stopPropagation()
          onSetIndex(index + 1)
        }}
      >
        <ArrowRightIcon className="size-8" />
      </button>
    </div>
  )
}

export default function Carousel({
  children,
  publicId,
}: {
  children: React.ReactNode
  publicId: string
}) {
  const router = useRouter()
  const images = useContext(ImagesContext)
  const image = images.repo[publicId]
  const [index, setIndex] = useState(image.index)
  const [, setDirection] = useState<Direction>()

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft": {
          e.preventDefault()
          handleNavigation(index - 1)
          break
        }
        case "ArrowRight": {
          e.preventDefault()
          handleNavigation(index + 1)
          break
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function handleCloseModal(): void {
    router.push("/", { scroll: false })
  }

  function handleNavigation(newIndex: number) {
    const closedIndex =
      newIndex >= 0 ? newIndex % images.order.length : images.order.length - 1
    if (closedIndex > index) {
      setDirection(Direction.NEXT)
    } else if (closedIndex < index) {
      setDirection(Direction.PREV)
    } else {
      return
    }
    setIndex(closedIndex)
    const { publicId } = images.repo[images.order[closedIndex]]
    router.push(`/gallery/${publicId}`, { scroll: false })
  }

  const swipeHandles = useSwipeable({
    onSwipedLeft: () => handleNavigation(index - 1),
    onSwipedRight: () => handleNavigation(index + 1),
    onSwipedDown: () => handleCloseModal(),
  })

  return (
    <>
      <DialogPanel
        as={motion.div}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.21 } }}
        className="flex-1 items-center justify-center max-w-screen-xl max-h-fit cursor-default"
        {...swipeHandles}
      >
        {children}
      </DialogPanel>
      <ModalNavigation index={index} onSetIndex={handleNavigation} />
    </>
  )
}
