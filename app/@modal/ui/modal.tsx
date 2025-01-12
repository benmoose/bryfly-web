"use client"

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"
import { ImagesContext } from "app/context"
import { CdnThumbnail } from "app/ui/cdn-image"
import { motion } from "motion/react"
import { images } from "next/dist/build/webpack/config/blocks/images"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { useContext, useEffect, useState } from "react"

function ModalButton({
  children,
  action,
  className,
  disabled = false,
  background = true,
  ...props
}: {
  children: React.ReactNode
  action: () => void
  className?: string
  disabled?: boolean
  background?: boolean
}) {
  const backgroundClasses =
    "backdrop-blur-xs bg-slate-50/25 hover:bg-slate-50/30 disabled:bg-slate-300/25 p-2 rounded-full"

  return (
    <motion.button
      {...props}
      disabled={disabled}
      onClick={e => {
        e.stopPropagation()
        if (!disabled) {
          action()
        }
      }}
      whileTap={{
        scale: 0.9,
        opacity: 0.8,
        transition: { type: "spring", duration: 0.034 },
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.064 },
      }}
      className={`flex items-center opacity-90
        text-base text-white brightness-75 border-black/10
        cursor-pointer overflow-hidden transition transition-[border] duration-75
        hover:opacity-100 hover:brightness-110 hover:border-white/85
        data-selected:opacity-100 data-selected:text-white data-selected:brightness-125
        data-selected:border-white/85 data-selected:cursor-default
        ${background ? backgroundClasses : "rounded border-2"} ${className ?? ""}`}
    >
      {children}
    </motion.button>
  )
}

export default function Modal({
  children,
  group,
}: {
  group: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const publicId = useSelectedLayoutSegment()
  const imageStore = useContext(ImagesContext)
  const imageIds = imageStore.groups[group]
  const [index, setIndex] = useState<number>(imageIds.indexOf(publicId!))
  console.dir({ publicId, index, imageStore })

  function handleClose() {
    router.push("/", { scroll: true })
  }

  function navigateModalHandler(targetIndex: number) {
    const imagesIndex =
      targetIndex < 0 ? imageIds.length - 1 : targetIndex % imageIds.length
    const { publicId } = imageStore.repo[imageIds[imagesIndex]]
    setIndex(imagesIndex)
    router.push(`/gallery/${publicId}`, { scroll: false })
  }

  function keyboardHandler(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft": {
        navigateModalHandler(index - 1)
        break
      }
      case "ArrowRight": {
        navigateModalHandler(index + 1)
        break
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyboardHandler, true)
    return () => {
      window.removeEventListener("keydown", keyboardHandler, true)
    }
  }, [index])

  return (
    <Dialog open className="relative z-50" onClose={handleClose}>
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <div className="fixed inset-0 p-4 md:p-8 flex justify-center items-center">
        <DialogPanel className="relative pb-16 flex flex-col justify-between max-w-screen-lg h-[90dvh] mx-auto">
          <div className="pb-4 flex items-center grow justify-center flex-initial max-h-full">
            {children}
          </div>

          <div className="absolute w-full bottom-0 h-16 flex flex-none justify-center items-stretch gap-2">
            <ModalButton
              className="self-center"
              action={() => navigateModalHandler(index - 1)}
            >
              <ArrowLeftIcon className="size-8" />
            </ModalButton>

            {imageIds
              .map(publicId => imageStore.repo[publicId])
              .map(image => (
                <ModalButton
                  key={image.key}
                  background={false}
                  disabled={image.publicId === publicId}
                  action={() => navigateModalHandler(image.index)}
                  className="w-16 rounded-sm flex-none"
                  {...(image.publicId === publicId && {
                    ["data-selected"]: true,
                  })}
                >
                  <CdnThumbnail image={image} alt="Thumbnail" sizes="64px" />
                </ModalButton>
              ))}

            <ModalButton
              className="self-center"
              action={() => navigateModalHandler(index + 1)}
            >
              <ArrowRightIcon className="size-8" />
            </ModalButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
