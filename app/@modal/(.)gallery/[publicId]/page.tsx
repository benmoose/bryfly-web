"use client"

import { useContext } from "react"
import { useParams, notFound } from "next/navigation"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cdn-image"

type Params = { publicId: string }

export default function Page() {
  const { publicId } = useParams<Params>()
  const imageStore = useContext(ImagesContext)
  const image = imageStore.repo[publicId]

  if (image === null) {
    return notFound()
  }

  return (
    <CdnImage
      priority
      image={image}
      className="flex object-contain rounded-xl shadow-2xl w-fit max-h-full"
      sizes="(max-width: 1280px) 100vw, 1280px"
    />
  )
}
