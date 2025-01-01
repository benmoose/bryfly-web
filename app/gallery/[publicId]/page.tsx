import * as Cdn from "app/ui/cloudinary"
import React from "react"
import Image from "next/image"
import { getHeroImages } from "app/lib/cloudinary"
import { notFound } from "next/navigation"

// Only params from generateStaticParams() are pre-rendered.
// Requesting a path that has not been generated are served 404.
// export const dynamicParams = false

export const dynamic = "force-static"

export async function generateStaticParams(): Promise<
  Array<{ publicId: string }>
> {
  const imageSet = await getHeroImages()
  return imageSet.map(img => ({ publicId: img.publicId }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>
}): Promise<React.ReactElement> {
  const { publicId } = await params
  const imageSet = await getHeroImages()
  const image = imageSet.find(img => img.publicId === publicId)

  if (image == null) {
    return notFound()
  }

  return (
    <>
      <Image
        fill
        priority
        src={image.placeholderUrl}
        className="fixed inset-0 z-0 object-fill"
        alt=""
      />

      <main
        className="relative flex flex-col items-center mt-8 px-8 z-10 w-full max-w-screen-lg mx-auto
          space-y-4 xl:items-start xl:flex-row xl:space-x-6 xl:space-y-0"
      >
        <div
          className="flex items-center justify-center max-h-full max-w-screen-2xl
            overflow-hidden rounded-2xl shadow-2xl"
        >
          <Cdn.CdnImage
            priority
            image={image}
            className="max-h-full object-contain"
            sizes="(max-width: 1536px) 100vw, 1536px"
            alt=""
          />
        </div>
      </main>
    </>
  )
}
