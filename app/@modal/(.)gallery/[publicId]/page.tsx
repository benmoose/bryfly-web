"use client"

import { ImagesContext } from "app/context"
import { DialogTitle } from "@headlessui/react"
import { CdnImage } from "app/components/cdn-image"
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
        className="w-fit rounded-xl
        max-h-17/18 md:max-h-7/8 xl:max-h-5/6
        box-content border-2 border-slate-200/5 basis-2 self-center
        shadow-2xl shadow-black/35
        outline-2 outline-offset-4 outline-slate-100/90"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      <div className="relative">
        {image.displayName && (
          <DialogTitle className="flex-initial text-lg md:text-xl font-bold tracking-wide text-slate-50">
            {image.displayName}
          </DialogTitle>
        )}
      </div>
    </>
  )
}
