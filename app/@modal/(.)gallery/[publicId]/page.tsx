import React from "react"
import { notFound } from "next/navigation"
import { Responsive } from "app/ui/remote-image"
import Modal from "./modal"
import { getImages } from "app/images"

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>
}) {
  const { publicId } = await params
  const heroImages = await getImages()
  const image = heroImages.find((image) => image.publicId === publicId)

  if (!image) {
    notFound()
  }

  return (
    <Modal image={image} images={heroImages}>
      <ActiveImage publicId={publicId} />
    </Modal>
  )
}

async function ActiveImage({ publicId }: { publicId: string }) {
  const imageSet = await getImages()
  const image = imageSet.find((image) => image.publicId === publicId)

  if (!image) {
    notFound()
  }

  const [ratioWidth, ratioHeight] = image.aspectRatio
  return (
    <Responsive
      priority
      image={image}
      className={`max-h-full w-fit rounded-lg aspect-[${ratioWidth}/${ratioHeight}]}`}
      sizes="(max-width: 1280px) 100vw, 1280px"
      alt={`Photo ${image.key}`}
    />
  )
}
