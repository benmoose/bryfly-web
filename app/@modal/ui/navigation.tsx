import { Thumbnail } from "app/ui/cloudinary"
import { useContext, useEffect, useState } from "react"
import { useSelectedLayoutSegment, useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import { ImagesContext } from "app/context"

export default function ModalNavigation() {
  const publicId = useSelectedLayoutSegment()
  const imageStore = useContext(ImagesContext)
  const group = imageStore.groups["hero"]

  const [index, setIndex] = useState<number>(group.indexOf(publicId!))
  const router = useRouter()

  function closeModalHandler() {
    router.push("/", { scroll: false })
  }

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
    <>
      <div
        className="fixed top-0 right-0 m-4 flex flex-row justify-end
            gap-4 text-lg items-center text-slate-200"
      >
        <ModalButton action={closeModalHandler}>
          <XMarkIcon className="size-7" />
        </ModalButton>
      </div>

      <div
        className="fixed flex w-full left-0 top-1/2 bottom-1/2 justify-between items-center px-4
            text-slate-200 z-50 pointer-events-none"
      ></div>

      <div className="fixed bottom-4 flex justify-center items-center space-x-3 z-50 pointer-events-none">
        <ModalButton action={() => navigateModalHandler(index - 1)}>
          <ArrowLeftIcon className="size-7" />
        </ModalButton>
        {group
          .map(publicId => imageStore.repo[publicId])
          .map(image => (
            <ModalButton
              key={image.key}
              disabled={image.index === index}
              action={() => navigateModalHandler(image.index)}
              background={false}
            >
              <Thumbnail key={image.key} image={image} alt="Thumbnail" />
            </ModalButton>
          ))}
        <ModalButton action={() => navigateModalHandler(index + 1)}>
          <ArrowRightIcon className="size-7" />
        </ModalButton>
      </div>
    </>
  )
}

function ModalButton({
  children,
  action,
  disabled = false,
  background = true,
}: {
  children: React.ReactNode
  action: () => void
  disabled?: boolean
  background?: boolean
}) {
  const backgroundClasses =
    "backdrop-blur-sm bg-slate-100/5 hover:bg-slate-100/15 disabled:bg-slate-100/20 p-1.5"

  return (
    <button
      disabled={disabled}
      onClick={e => {
        e.stopPropagation()
        action()
      }}
      className={`flex items-center opacity-90 hover:opacity-100 scale-100
        hover:scale-105 text-base text-slate-200 hover:text-slate-50
        rounded transition duration-75 pointer-events-auto cursor-pointer
        disabled:cursor-default disabled:opacity-100
        disabled:scale-110 ${background ? backgroundClasses : ""}`}
    >
      {children}
    </button>
  )
}
