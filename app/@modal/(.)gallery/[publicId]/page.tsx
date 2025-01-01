"use client"

import { useContext } from "react"
import { useParams, notFound } from "next/navigation"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cloudinary"
import Carousel from "./carousel"

export default function Page() {
  const { publicId } = useParams<{ publicId: string }>()
  const imageStore = useContext(ImagesContext)
  const image = imageStore.repo[publicId]

  if (!image) {
    notFound()
  }

  return (
    <Carousel publicId={publicId}>
      <pre className="fixed top-2 left-4 space-x-6 text-xs text-slate-100/90">
        <span>
          i=<b>{image.index}</b>/{imageStore.groups["hero"].length}
        </span>
        <span>
          pid=<b>{image.publicId}</b>
        </span>
        <span>
          ar=<b>{image.aspectRatio.join("/")}</b>
        </span>
      </pre>
      <CdnImage
        priority
        image={image}
        className={`object-contain max-h-full w-fit rounded-lg shadow-xl
          aspect-[${image.aspectRatio.join("/")}]}`}
        sizes="(max-width: 1280px) 100vw, 1280px"
        alt={`Photo ${image.key}`}
      />
    </Carousel>
  )
}
