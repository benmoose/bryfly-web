"use client"

import { DialogPanel } from "@headlessui/react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { useContext, useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import ModalButton from "app/@modal/ui/modal-button"
import { ImagesContext } from "app/context"

const enum Direction {
  PREV,
  NEXT,
}

export default function Carousel({
  children,
  publicId,
}: {
  children: React.ReactNode
  publicId: string
}) {
  const router = useRouter()
  const imageStore = useContext(ImagesContext)
  const image = imageStore.repo[publicId]

  const [index, setIndex] = useState(image.index)
  const [, setDirection] = useState<Direction>()

  function handleNavigation(newIndex: number) {
    const groupSize = imageStore.groups["hero"].length
    const closedIndex = newIndex >= 0 ? newIndex % groupSize : groupSize - 1

    if (closedIndex > index) {
      setDirection(Direction.NEXT)
    } else if (closedIndex < index) {
      setDirection(Direction.PREV)
    } else {
      return
    }

    setIndex(closedIndex)
    const newPublicId = imageStore.groups["hero"][closedIndex]
    const { publicId } = imageStore.repo[newPublicId]
    router.push(`/gallery/${publicId}`, { scroll: false })
  }

  function handleCloseModal() {
    router.push("/", { scroll: false })
  }

  const keyboardNavListener = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft": {
        handleNavigation(index - 1)
        break
      }
      case "ArrowRight": {
        handleNavigation(index + 1)
        break
      }
    }
  }

  const swipeHandles = useSwipeable({
    onSwipedLeft: () => handleNavigation(index - 1),
    onSwipedRight: () => handleNavigation(index + 1),
    onSwipedDown: () => handleCloseModal(),
  })

  useEffect(() => {
    window.addEventListener("keydown", keyboardNavListener, true)
    return () => {
      window.removeEventListener("keydown", keyboardNavListener, true)
    }
  }, [])

  return (
    <>
      <DialogPanel
        as={motion.div}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
        className="max-w-screen-lg max-h-full
          cursor-default z-40"
        {...swipeHandles}
      >
        {children}
      </DialogPanel>

      <div
        className="fixed flex w-full left-0 top-1/2 bottom-1/2 justify-between
          items-center px-4 text-slate-200 z-50 pointer-events-none"
      >
        <ModalButton action={() => void handleNavigation(index - 1)}>
          <ArrowLeftIcon className="size-7" />
        </ModalButton>
        <ModalButton action={() => void handleNavigation(index + 1)}>
          <ArrowRightIcon className="size-7" />
        </ModalButton>
      </div>
    </>
  )
}
