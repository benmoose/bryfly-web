"use client"

import { ImagesContext } from "app/context"
import { DialogTitle } from "@headlessui/react"
import { CdnImage } from "app/ui/cdn-image"
import { notFound, useParams } from "next/navigation"
import { use } from "react"

type Params = { publicId: string }

export default function Page() {
  const { repo } = use(ImagesContext)
  const { publicId } = useParams<Params>()
  const image = repo[publicId]

  if (!image) {
    return notFound()
  }

  return (
    <>
      <CdnImage
        priority
        loading="eager"
        key={image.key}
        image={image}
        className="w-fit max-h-full rounded-xl shadow-2xl shadow-black/35
          border-2 border-slate-200/5 box-content basis-2 self-center"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      <div>
        {image.displayName && (
          <DialogTitle
            className="flex-initial basis-1 w-full
            text-center font-semibold text-base text-slate-50 tracking-wide"
          >
            {image.displayName}
          </DialogTitle>
        )}
      </div>
    </>
  )
}
