"use client"

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import { ImagesContext } from "app/context"
import {
  animationVariants,
  defaultTransition,
  hoverVariant,
  notSelectedVariant,
  selectedVariant,
  pressedVariant,
  IconButton,
} from "app/ui/button"
import { CdnThumbnail } from "app/ui/cdn-image"
import { motion } from "motion/react"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import {
  memo,
  use,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useSwipeable } from "react-swipeable"

const ThumbnailButton = memo(function ThumbnailButton({
  children,
  action,
  selected = false,
  disabled = false,
}: {
  children: ReactNode
  action: () => void
  selected?: boolean
  disabled?: boolean
}) {
  const interactive = !disabled && !selected
  return (
    <motion.button
      aria-current={selected}
      aria-selected={selected}
      aria-disabled={disabled}
      disabled={disabled}
      variants={animationVariants}
      whileHover={selected ? selectedVariant : hoverVariant}
      whileTap={
        interactive
          ? pressedVariant
          : selected
            ? selectedVariant
            : notSelectedVariant
      }
      transition={defaultTransition}
      onClick={e => {
        e.stopPropagation()
        if (!selected) {
          action()
        }
      }}
      className={`relative flex items-center opacity-100 box-border w-16 h-16 flex-none rounded-lg
        text-base text-white brightness-80 cursor-pointer overflow-hidden border-slate-950/20 border
        transition duration-75 pointer-events-auto outline-offset-0
        hover:brightness-110 hover:border-slate-50 hover:border-2 hover:opacity-100
        focus:brightness-110
        disabled:text-slate-600 disabled:cursor-default
        aria-selected:border-3 aria-selected:border-white aria-selected:brightness-115
        aria-selected:outline-2 aria-selected:outline-slate-100/70 aria-selected:outline-offset-2
        aria-selected:cursor-default aria-selected:rounded-sm
      `}
      tabIndex={interactive ? 0 : -1}
    >
      {children}
      {selected && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse z-50 opacity-10 pointer-events-none bg-white"
        />
      )}
    </motion.button>
  )
})

const enum Direction {
  PREV = "prev",
  NEXT = "next",
}

export default function Modal({
  children,
  group,
}: {
  children?: ReactNode
  group: string
}) {
  const router = useRouter()
  const publicId = useSelectedLayoutSegment()
  const { groups, repo } = use(ImagesContext)
  const ids = groups[group]

  const [index, setIndex] = useState<number>(ids.indexOf(publicId!))
  const [, setDirection] = useState<Direction>()

  function handleClose() {
    router.push("/", { scroll: true })
  }

  const handleNavigation = useCallback(
    function (targetIndex: number) {
      const newIndex =
        targetIndex < 0 ? ids.length - 1 : targetIndex % ids.length
      setIndex(prevIndex => {
        setDirection(newIndex > prevIndex ? Direction.NEXT : Direction.PREV)
        return newIndex
      })
      const newImage = repo[ids[newIndex]]
      router.push(`/gallery/${newImage.publicId}`, { scroll: false })
    },
    [ids],
  )

  const keyboardHandler = useCallback(
    function keyboardHandler(e: KeyboardEvent) {
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
    },
    [index, handleNavigation],
  )

  useEffect(() => {
    window.addEventListener("keydown", keyboardHandler, true)
    return () => {
      window.removeEventListener("keydown", keyboardHandler, true)
    }
  }, [index, keyboardHandler])

  const handleSwipes = useSwipeable({
    onSwipedRight: () => handleNavigation((index + 1) % groups[group].length),
    onSwipedLeft: () => {
      handleNavigation(
        (index + groups[group].length - 1) % groups[group].length,
      )
    },
    onSwipedDown: handleClose,
  })

  return (
    <Dialog open className="relative z-50" onClose={handleClose} tabIndex={-1}>
      <DialogBackdrop className="fixed inset-0 bg-stone-950/70 backdrop-blur-md z-10 pointer-events-none" />

      <motion.div
        layoutRoot
        className="fixed inset-0 p-4 md:p-8 flex justify-center items-center z-20 cursor-zoom-out"
      >
        <DialogPanel
          className="relative pb-16 flex flex-col justify-between w-full max-w-screen-lg
            h-[92dvh] mx-auto pointer-events-none"
        >
          <div
            {...handleSwipes}
            key={publicId}
            className="flex flex-col items-center justify-center flex-initial max-h-full pb-8"
          >
            <div className="absolute top-0 z-50 self-end m-2">
              <IconButton action={handleClose} aria-label="Close">
                <XMarkIcon aria-hidden={true} className="size-8" />
              </IconButton>
            </div>

            <div className="relative flex justify-center w-fit max-h-full pointer-events-auto cursor-default">
              {children}
            </div>
          </div>

          <ModalNavigation
            onNavigate={handleNavigation}
            index={index}
            group={group}
          />
        </DialogPanel>
      </motion.div>
    </Dialog>
  )
}

const ModalNavigation = function ModalNavigation({
  onNavigate,
  index,
  group,
}: {
  onNavigate: (target: number) => void
  index: number
  group: string
}) {
  const { repo, groups } = use(ImagesContext)
  return (
    <div className="absolute w-full bottom-0 h-16 flex justify-between items-center z-50 gap-4">
      <IconButton action={() => onNavigate(index - 1)} aria-label="Previous">
        <ArrowLeftIcon className="size-8" />
      </IconButton>

      <div className="sm:flex flex-initial justify-center items-center gap-3 hidden pointer-events-auto">
        {groups[group].map(publicId => {
          const image = repo[publicId]
          const selected = image.index === index
          return (
            <ThumbnailButton
              key={image.key}
              selected={selected}
              action={() => onNavigate(image.index)}
            >
              <CdnThumbnail key={image.key} image={image} sizes="64px" />
            </ThumbnailButton>
          )
        })}
      </div>

      <IconButton action={() => onNavigate(index + 1)} aria-label="Next">
        <ArrowRightIcon className="size-8" />
      </IconButton>
    </div>
  )
}

// function surrounding<T>(list: T[], n: number, centre: number): T[] {
//   const lowerIndex = centre - n > 0 ? centre - n : list.length - (n - centre)
//   const upperIndex = (centre + n + 1) % list.length
//   return lowerIndex > upperIndex
//     ? [...list.slice(lowerIndex - list.length), ...list.slice(0, upperIndex)]
//     : list.slice(lowerIndex, upperIndex)
// }
