"use client"

import { ImagesContext } from "app/context"
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
    <CdnImage
      priority
      key={image.key}
      image={image}
      className="w-fit max-h-full rounded-xl shadow-2xl shadow-black/35
        border-2 border-slate-200/5 box-content"
      sizes="(max-width: 1280px) 100vw, 1280px"
    />
  )
}
