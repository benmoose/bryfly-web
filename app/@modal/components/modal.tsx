"use client"

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import { ImagesContext } from "app/context"
import {
  animationVariants,
  defaultTransition,
  hoverVariant,
  IconButton,
  notSelectedVariant,
  pressedVariant,
  selectedVariant,
} from "app/components/button"
import { CdnThumbnail } from "app/components/cdn-image"
import type { ImageResource, Ordered } from "lib/cloudinary"
import { motion } from "motion/react"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import {
  memo,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useSwipeable } from "react-swipeable"

const enum Direction {
  PREV = "prev",
  NEXT = "next",
}

function Modal({ children }: { children: ReactNode }) {
  const publicId = useSelectedLayoutSegment()
  const { groups, repo } = use(ImagesContext)
  const { group, index } = repo[publicId!]

  const [activeIndex, setActiveIndex] = useState<number>(index)
  const [, setDirection] = useState<Direction>()
  const router = useRouter()

  useEffect(() => {
    const targetImage = repo[groups[group][activeIndex]]
    router.push(`/gallery/${targetImage.publicId}`, { scroll: false })
  }, [repo, groups, group, router, activeIndex])

  const closeModal = useCallback(
    function closeModal() {
      router.push("/", { scroll: false })
    },
    [router],
  )

  const toGroupIndex = useCallback(
    function toGroupIndex(targetIndex: number) {
      return targetIndex < 0
        ? groups[group].length - 1
        : targetIndex % groups[group].length
    },
    [groups, group],
  )

  const createNavigationHandler = useCallback(
    (targetIndex: number) => {
      const newIndex = toGroupIndex(targetIndex)
      return () => {
        setActiveIndex(prevIndex => {
          setDirection(newIndex > prevIndex ? Direction.NEXT : Direction.PREV)
          return newIndex
        })
      }
    },
    [toGroupIndex],
  )

  const handleSwipes = useSwipeable({
    onSwipedLeft: createNavigationHandler(activeIndex - 1),
    onSwipedRight: createNavigationHandler(activeIndex + 1),
    onSwipedDown: closeModal,
  })

  useEffect(() => {
    function keyboardHandler(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowLeft": {
          return createNavigationHandler(activeIndex - 1)()
        }
        case "ArrowRight": {
          return createNavigationHandler(activeIndex + 1)()
        }
      }
    }
    window.addEventListener("keydown", keyboardHandler, true)
    return () => {
      window.removeEventListener("keydown", keyboardHandler, true)
    }
  }, [createNavigationHandler, activeIndex])

  const CloseButton = memo(function CloseButton() {
    return (
      <div key="modal-close" className="absolute top-0 right-0 z-50 self-end">
        <IconButton action={closeModal} label="Close">
          <XMarkIcon className="size-7" />
        </IconButton>
      </div>
    )
  })

  return (
    <Dialog
      key="modal-root"
      open
      transition
      className="relative z-50"
      onClose={closeModal}
      tabIndex={-1}
    >
      <DialogBackdrop
        key="modal-backdrop"
        className="fixed inset-0 backdrop-brightness-30 backdrop-blur-md backdrop-saturate-50
        z-10 pointer-events-none"
      />

      <div className="fixed inset-0 p-4 md:p-8 flex justify-center items-center z-20 cursor-zoom-out">
        <DialogPanel
          key="modal-panel"
          className="@container w-full h-full max-h-full relative mx-auto
          flex flex-col justify-start pointer-events-none max-w-screen-xl pb-20 pt-2"
        >
          <CloseButton />
          <div
            className="flex flex-1 flex-col items-center justify-center
            max-h-full pb-6 md:pb-12"
          >
            <div
              {...handleSwipes}
              className="relative flex flex-col gap-1.5 justify-center
              w-fit h-full max-h-full pointer-events-auto cursor-default"
            >
              {children}
            </div>
          </div>
          <ModalNavigation
            key={`modal-navigation/${group}`}
            group={group}
            index={activeIndex}
            createHandler={createNavigationHandler}
          />
        </DialogPanel>
      </div>
    </Dialog>
  )
}

function ModalNavigation({
  createHandler,
  index,
  group,
}: {
  createHandler: (target: number) => () => void
  index: number
  group: string
}) {
  const { repo, groups } = use(ImagesContext)
  const disableNav = groups[group].length < 2
  const PrevButton = memo(function PrevButton() {
    return (
      <IconButton
        action={createHandler(index - 1)}
        aria-label="Previous"
        disabled={disableNav}
      >
        <ArrowLeftIcon className="size-7" />
      </IconButton>
    )
  })
  const NextButton = memo(function NextButton() {
    return (
      <IconButton
        action={createHandler(index + 1)}
        aria-label="Next"
        disabled={disableNav}
      >
        <ArrowRightIcon className="size-7" />
      </IconButton>
    )
  })
  return (
    <div
      className="absolute w-full bottom-0 h-16 flex justify-between items-center
      z-50 gap-4"
    >
      <PrevButton />
      <div
        key="modal-thumbnails"
        className="@md:flex hidden flex-initial justify-center items-center gap-2
        pointer-events-auto cursor-default"
      >
        {groups[group].map(publicId => {
          const image = repo[publicId]
          const selected = image.index === index
          return (
            <ThumbnailButton
              key={image.key}
              image={image}
              selected={selected}
              createActionHandler={createHandler}
            />
          )
        })}
      </div>
      <NextButton />
    </div>
  )
}

const ThumbnailButton = memo(function ThumbnailButton({
  image,
  createActionHandler,
  selected = false,
  disabled = false,
}: {
  createActionHandler: (i: number) => () => void
  image: Ordered<ImageResource>
  selected?: boolean
  disabled?: boolean
}) {
  const interactive = !disabled && !selected
  const handler = createActionHandler(image.index)
  return (
    <motion.button
      aria-current={selected}
      aria-selected={selected}
      aria-disabled={disabled}
      disabled={disabled}
      variants={animationVariants}
      transition={defaultTransition}
      whileHover={selected ? selectedVariant : hoverVariant}
      whileFocus={selected ? selectedVariant : hoverVariant}
      whileTap={
        interactive
          ? pressedVariant
          : selected
            ? selectedVariant
            : notSelectedVariant
      }
      onClick={e => {
        e.stopPropagation()
        if (interactive) {
          handler()
        }
      }}
      className={`relative flex items-center opacity-100 box-border size-16 flex-none rounded-2xl
      text-base text-white brightness-85 grayscale-15 overflow-hidden
      transition-all duration-50 pointer-events-auto cursor-pointer
      shadow-sm shadow-stone-950/20
      border-2 border-slate-200/6 outline -outline-offset-3 outline-slate-200/10
      hover:brightness-110 hover:border-slate-50/95 hover:opacity-100 hover:grayscale-0
      hover:rounded-md hover:shadow-md hover:border-2 
      focus:brightness-110 focus:border-2 focus:border-slate-50/95 focus:grayscale-0
      focus:opacity-100 focus:rounded-md focus:shadow-md
      disabled:text-slate-600 disabled:cursor-default disabled:grayscale-100
      aria-selected:border-2 aria-selected:border-blue-900/40 aria-selected:brightness-110
      aria-selected:outline-blue-400/95 aria-selected:shadow-md aria-selected:grayscale-0
      aria-selected:outline-2 aria-selected:outline-offset-1
      aria-selected:cursor-default aria-selected:animate-bulge aria-selected:rounded-sm`}
      tabIndex={interactive ? 0 : -1}
    >
      <CdnThumbnail loading="eager" image={image} />
      {selected && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse z-50 pointer-events-none bg-stone-200/20"
        />
      )}
    </motion.button>
  )
})

export default memo(Modal)

// function surrounding<T>(list: T[], n: number, centre: number): T[] {
//   const lowerIndex = centre - n > 0 ? centre - n : list.length - (n - centre)
//   const upperIndex = (centre + n + 1) % list.length
//   return lowerIndex > upperIndex
//     ? [...list.slice(lowerIndex - list.length), ...list.slice(0, upperIndex)]
//     : list.slice(lowerIndex, upperIndex)
// }
