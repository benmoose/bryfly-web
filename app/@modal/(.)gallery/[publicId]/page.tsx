import react, { Suspense } from "react"
import { Responsive } from "app/ui/remote-image"
import { getHeroImages } from "lib/cloudinary"
import Modal from "./modal"

export const dynamic = "force-dynamic"

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>
}): Promise<react.ReactElement> {
  const { publicId } = await params
  const heroImageSet = getHeroImages()

  return (
    <Suspense fallback={<Loading />}>
      <Modal publicId={publicId} imagesPromise={heroImageSet}>
        <BigImage publicId={publicId} />
      </Modal>
    </Suspense>
  )
}

async function BigImage({ publicId }: { publicId: string }) {
  const imageSet = await getHeroImages()
  const image = imageSet.find((img) => img.publicId === publicId)

  if (!image) {
    return null
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

function Loading() {
  return (
    <div
      className="relative flex items-center justify-center max-w-screen-lg
    max-h-full cursor-default animate-pulse w-full rounded-lg bg-gradient-to-tr
    from-slate-600/20 to-slate-300/5
    aspect-[3/2]"
    />
  )
}
