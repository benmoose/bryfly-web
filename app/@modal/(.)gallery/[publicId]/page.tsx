"use client"

import type { Image, Ordered } from "app/lib/cloudinary"
import { useContext } from "react"
import { useParams, notFound } from "next/navigation"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cloudinary"

export default function Page() {
  const { publicId } = useParams<{ publicId: string }>()
  const imageStore = useContext(ImagesContext)
  const image = imageStore.repo[publicId]

  if (!image) {
    notFound()
  }

  return (
    <>
      <DebugInfo image={image} groupSize={imageStore.groups["hero"].length} />
      <CdnImage
        priority
        image={image}
        className={`object-contain max-h-full w-fit rounded-xl shadow-xl
          aspect-[${image.aspectRatio.join("/")}]}`}
        sizes="(max-width: 1280px) 100vw, 1280px"
        alt={`Photo ${image.key}`}
      />
    </>
  )
}

function DebugInfo({
  image,
  groupSize,
}: {
  image: Ordered<Image>
  groupSize: number
}) {
  return (
    <pre className="fixed top-2 left-4 space-x-6 text-xs text-slate-100/90">
      <span>
        i=<b>{image.index}</b>/{groupSize}
      </span>
      <span>
        pid=<b>{image.publicId}</b>
      </span>
      <span>
        ar=<b>{image.aspectRatio.join("/")}</b>
      </span>
    </pre>
  )
}
