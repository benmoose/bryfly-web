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
  Suspense,
  type ReactNode,
} from "react"
import { useSwipeable } from "react-swipeable"
import type { ImageResource, Ordered } from "lib/cloudinary"

const enum Direction {
  PREV = "prev",
  NEXT = "next",
}

export default memo(function Modal({
  children,
  group,
}: {
  children: ReactNode
  group: string
}) {
  const router = useRouter()
  const publicId = useSelectedLayoutSegment()
  const { groups, repo } = use(ImagesContext)

  const ids = groups[group]
  const [index, setIndex] = useState<number>(ids.indexOf(publicId!))
  const [, setDirection] = useState<Direction>()

  useEffect(() => {
    const targetImage = repo[ids[index]]
    router.push(`/gallery/${targetImage.publicId}`, { scroll: false })
  }, [repo, ids, index, router])

  const closeModal = useCallback(
    function closeModal() {
      router.push("/", { scroll: false })
    },
    [router],
  )

  const toGroupIndex = useCallback(
    function toGroupIndex(targetIndex: number) {
      return targetIndex < 0 ? ids.length - 1 : targetIndex % ids.length
    },
    [ids],
  )

  const createNavigationHandler = useCallback(
    (targetIndex: number) => {
      const newIndex = toGroupIndex(targetIndex)
      return () => {
        setIndex(prevIndex => {
          setDirection(newIndex > prevIndex ? Direction.NEXT : Direction.PREV)
          return newIndex
        })
      }
    },
    [toGroupIndex],
  )

  const handleSwipes = useSwipeable({
    onSwipedRight: createNavigationHandler((index + 1) % groups[group].length),
    onSwipedLeft: createNavigationHandler(
      (index + groups[group].length - 1) % groups[group].length,
    ),
    onSwipedDown: closeModal,
  })

  const CloseButton = memo(function CloseButton() {
    return (
      <div key="modal-close" className="absolute top-0 z-50 self-end m-2">
        <IconButton action={closeModal}>
          <XMarkIcon className="size-7" />
        </IconButton>
      </div>
    )
  })

  useEffect(() => {
    const prev = createNavigationHandler(index - 1)
    const next = createNavigationHandler(index + 1)

    function keyboardHandler(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowLeft": {
          return prev()
        }
        case "ArrowRight": {
          return next()
        }
      }
    }

    window.addEventListener("keydown", keyboardHandler, true)
    return () => {
      window.removeEventListener("keydown", keyboardHandler, true)
    }
  }, [createNavigationHandler, index])

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
        className="fixed inset-0 backdrop-brightness-40 backdrop-blur-md backdrop-saturate-70
        z-10 pointer-events-none"
      />

      <div className="fixed inset-0 p-4 md:p-8 flex justify-center items-center z-20 cursor-zoom-out">
        <DialogPanel
          key="modal-panel"
          className="@container relative pb-16 flex flex-col justify-between w-full max-w-screen-lg
          h-[92dvh] mx-auto pointer-events-none"
        >
          <CloseButton />
          <Suspense
            key={publicId}
            fallback={
              <div className="bg-emerald-400 padding-4 text-lg">Loading...</div>
            }
          >
            <div className="flex flex-col items-center justify-center flex-initial max-h-full pb-4">
              <div
                {...handleSwipes}
                className="relative flex justify-center w-fit max-h-full pointer-events-auto cursor-default"
              >
                {children}
              </div>
            </div>
          </Suspense>
          <ModalNavigation
            key="modal-navigation"
            index={index}
            group={group}
            createHandler={createNavigationHandler}
          />
        </DialogPanel>
      </div>
    </Dialog>
  )
})

const ModalNavigation = memo(function ModalNavigation({
  createHandler,
  index,
  group,
}: {
  createHandler: (target: number) => () => void
  index: number
  group: string
}) {
  const { repo, groups } = use(ImagesContext)
  const PrevButton = memo(function PrevButton() {
    return (
      <IconButton action={createHandler(index - 1)} aria-label="Previous">
        <ArrowLeftIcon className="size-7" />
      </IconButton>
    )
  })
  const NextButton = memo(function NextButton() {
    return (
      <IconButton action={createHandler(index + 1)} aria-label="Next">
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
})

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
      whileHover={selected ? selectedVariant : hoverVariant}
      whileFocus={selected ? selectedVariant : hoverVariant}
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
        if (interactive) {
          handler()
        }
      }}
      className={`relative flex items-center opacity-100 box-border size-16 flex-none rounded-lg
        text-base text-white brightness-80 border-2 border-transparent overflow-hidden
        transition-all duration-75 pointer-events-auto outline outline-offset-2
        outline-transparent shadow-sm shadow-stone-950/20 cursor-pointer
        hover:brightness-110 hover:border-stone-100/80 hover:opacity-100
        hover:rounded-md hover:shadow-md
        focus:brightness-110 focus:border-stone-100/80 focus:opacity-100
        focus:outline-transparent focus:rounded-md focus:shadow-md
        disabled:text-slate-600 disabled:cursor-default
        aria-selected:border-3 aria-selected:border-white aria-selected:brightness-115
        aria-selected:outline-stone-300/90 aria-selected:shadow-md
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

// function surrounding<T>(list: T[], n: number, centre: number): T[] {
//   const lowerIndex = centre - n > 0 ? centre - n : list.length - (n - centre)
//   const upperIndex = (centre + n + 1) % list.length
//   return lowerIndex > upperIndex
//     ? [...list.slice(lowerIndex - list.length), ...list.slice(0, upperIndex)]
//     : list.slice(lowerIndex, upperIndex)
// }
