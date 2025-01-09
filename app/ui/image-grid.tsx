"use client"

import { useContext } from "react"
import Link from "next/link"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cdn-image"

export default function ImageGrid({ group }: { group: string }) {
  const imageStore = useContext(ImagesContext)
  const images = imageStore.groups[group].map(
    publicId => imageStore.repo[publicId],
  )

  return images.map(image => (
    <Link
      key={image.key}
      scroll={false}
      href={`/gallery/${image.publicId}`}
      className="after:content group relative mb-5 block w-full cursor-zoom-in
              after:pointer-events-none after:absolute after:inset-0 after:rounded-xl"
    >
      <CdnImage
        image={image}
        className="transform rounded-xl brightness-90 transition will-change-auto
                group-hover:brightness-110"
        sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                (max-width: 1960px) 25vw,
                490px"
        alt={`Photo ${image.key}`}
      />
    </Link>
  ))
}
