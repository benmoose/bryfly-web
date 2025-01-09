import { CdnImage } from "app/ui/cdn-image"
import { getHeroImages, getImage } from "lib/cloudinary"
import { notFound } from "next/navigation"

export const dynamicParams = false

type Params = { publicId: string }

export async function generateStaticParams(): Promise<Params[]> {
  const images = await getHeroImages()
  return images.map(({ publicId }) => ({ publicId }))
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { publicId } = await params
  const image = await getImage(publicId)

  if (image === null) {
    return notFound()
  }

  return (
    <main className="relative mt-8 px-8 w-full max-w-(--breakpoint-xl) mx-auto">
      <div className="flex items-center justify-center max-h-full rounded-xl">
        <CdnImage
          priority
          image={image}
          className="max-h-full object-contain"
          sizes="(max-width: 1536px) 100vw, 1536px"
        />
      </div>
    </main>
  )
}
