"use client"

import React, { useContext } from "react"
import { useParams, notFound } from "next/navigation"
import { ImagesContext } from "app/_images/context"
import { Responsive } from "app/ui/remote-image"
import Carousel from "./carousel"

export default function Page() {
  const { publicId } = useParams<{ publicId: string }>()
  const images = useContext(ImagesContext)
  const image = images.repo[publicId]

  if (!image) {
    notFound()
  }

  const [ratioWidth, ratioHeight] = image.aspectRatio

  return (
    <Carousel publicId={publicId}>
      <Responsive
        priority
        image={image}
        className={`max-h-full w-fit rounded-lg aspect-[${ratioWidth}/${ratioHeight}]}`}
        sizes="(max-width: 1280px) 100vw, 1280px"
        alt={`Photo ${image.key}`}
      />
    </Carousel>
  )
}
