import { CdnThumbnail } from "app/ui/cdn-image"
import { useContext, useEffect, useState } from "react"
import { useSelectedLayoutSegment, useRouter } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { ImagesContext } from "app/context"
import { motion } from "motion/react"

export function ModalButton({
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
        text-base text-white brightness-75 border-2 border-black/10
        cursor-pointer overflow-hidden transition duration-75
        hover:opacity-100 hover:brightness-110 hover:border-white/90
        data-selected:opacity-100 data-selected:text-white data-selected:brightness-125
        data-selected:border-white/90 data-selected:cursor-default
        ${background ? backgroundClasses : "rounded"} ${className ?? ""}`}
    >
      {children}
    </motion.button>
  )
}

export default function ModalNavigation() {
  const publicId = useSelectedLayoutSegment()
  const imageStore = useContext(ImagesContext)
  const group = imageStore.groups["hero"]

  const [index, setIndex] = useState<number>(group.indexOf(publicId!))
  const router = useRouter()

  function navigateModalHandler(targetIndex: number) {
    const imagesIndex =
      targetIndex < 0 ? group.length - 1 : targetIndex % group.length
    const { publicId } = imageStore.repo[group[imagesIndex]]
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
    <div className="flex justify-between items-center space-x-3 w-full max-w-(--breakpoint-xl)">
      <ModalButton action={() => navigateModalHandler(index - 1)}>
        <ArrowLeftIcon className="size-8" />
      </ModalButton>

      <div className="space-x-1.5 md:space-x-2 hidden sm:flex flex-nowrap">
        {group
          .map(publicId => imageStore.repo[publicId])
          .map(image => (
            <ModalButton
              key={image.key}
              disabled={image.index === index}
              action={() => navigateModalHandler(image.index)}
              background={false}
              className="flex-none"
              {...(image.index === index && { ["data-selected"]: true })}
            >
              <CdnThumbnail image={image} alt="Thumbnail" />
            </ModalButton>
          ))}
      </div>

      <ModalButton action={() => navigateModalHandler(index + 1)}>
        <ArrowRightIcon className="size-8" />
      </ModalButton>
    </div>
  )
}
