import { notFound } from "next/navigation"
import { getImages } from "app/images.tsx"
import { Responsive } from "app/ui/remote-image"

export default async function PrimaryImage({ publicId }: { publicId: string }) {
  const imageSet = await getImages()
  const image = imageSet.find(image => image.publicId === publicId)

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
