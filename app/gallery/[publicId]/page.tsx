import { CdnImage } from "app/ui/cdn-image"
import { getImages, getImage } from "lib/cloudinary"
import { notFound } from "next/navigation"

type Params = { publicId: string }

export async function generateStaticParams(): Promise<Params[]> {
  const images = await getImages("hero")
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
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </main>
  )
}

// dynamicParams sets the behaviour when requesting pages that were not pre-generated
export const dynamicParams = false

export const dynamic = "force-static"
