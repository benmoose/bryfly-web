"use client"

import { CdnImage } from "app/ui/cdn-image"
import { use } from "react"
import { notFound, useParams } from "next/navigation"
import { ImagesContext } from "app/context"

export default function Page() {
  const { repo } = use(ImagesContext)
  const { publicId } = useParams<{ publicId: string }>()
  const image = repo[publicId]

  if (!image) {
    return notFound()
  }

  return (
    <CdnImage
      priority
      key={publicId}
      image={image}
      className="w-fit max-h-full rounded-xl shadow-2xl shadow-black/35
        border-2 border-slate-200/5"
      sizes="(max-width: 1280px) 100vw, 1280px"
    />
  )
}
