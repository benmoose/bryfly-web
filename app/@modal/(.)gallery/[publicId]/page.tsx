"use client"

import { useContext } from "react"
import { useParams, notFound } from "next/navigation"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cloudinary"
import Carousel from "../../ui/carousel"

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
      <CdnImage
        priority
        image={image}
        className={`object-contain max-h-full w-fit rounded-lg shadow-xl
          aspect-[${ratioWidth}/${ratioHeight}]}`}
        sizes="(max-width: 1280px) 100vw, 1280px"
        alt={`Photo ${image.key}`}
      />
    </Carousel>
  )
}
