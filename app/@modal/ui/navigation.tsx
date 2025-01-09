import { Thumbnail } from "app/ui/cloudinary"
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
    "backdrop-blur-sm bg-slate-100/5 hover:bg-slate-100/15 disabled:bg-slate-100/20 p-1.5"

  return (
    <motion.button
      {...props}
      disabled={disabled}
      onClick={e => {
        e.stopPropagation()
        action()
      }}
      whileTap={{
        scale: 0.94,
        opacity: 0.8,
        transition: { type: "spring", duration: 0.034 },
      }}
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.064 },
      }}
      className={`flex items-center opacity-90 hover:opacity-100
        text-base text-slate-200 hover:text-slate-50
        brightness-75 hover:brightness-110 disabled:brightness-110
        rounded-full transition duration-75 pointer-events-auto cursor-pointer
        disabled:cursor-default disabled:opacity-100
        ${background ? backgroundClasses : ""} ${className ?? ""}`}
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

  function navigateModalHandler(newIndex: number) {
    const targetIndex =
      newIndex < 0 ? group.length - 1 : newIndex % group.length
    const { publicId } = imageStore.repo[group[targetIndex]]
    setIndex(targetIndex)
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
    <div className="flex justify-between items-center space-x-3 z-50 pointer-events-none w-full max-w-screen-xl">
      <ModalButton action={() => navigateModalHandler(index - 1)}>
        <ArrowLeftIcon className="size-8" />
      </ModalButton>

      <div className="space-x-1.5 md:space-x-2 hidden sm:flex flex-nowrap overflow-x-hidden">
        {group
          .map(publicId => imageStore.repo[publicId])
          .map(image => (
            <ModalButton
              key={image.key}
              disabled={image.index === index}
              action={() => navigateModalHandler(image.index)}
              background={false}
              className="flex-none"
            >
              <Thumbnail key={image.key} image={image} alt="Thumbnail" />
            </ModalButton>
          ))}
      </div>

      <ModalButton action={() => navigateModalHandler(index + 1)}>
        <ArrowRightIcon className="size-7" />
      </ModalButton>
    </div>
  )
}
