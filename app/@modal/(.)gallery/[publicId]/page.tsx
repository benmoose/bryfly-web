import React from "react"
import { notFound } from "next/navigation"
import { getImages } from "app/images"
import Carousel from "./carousel.tsx"
import PrimaryImage from "./primaryImage.tsx"

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>
}) {
  const { publicId } = await params
  const heroImages = await getImages()
  const image = heroImages.find(image => image.publicId === publicId)

  if (!image) {
    notFound()
  }

  return (
    <Carousel image={image} images={heroImages}>
      <PrimaryImage publicId={publicId} />
    </Carousel>
  )
}
