import Image from "next/image"
import { CdnImage } from "app/ui/cdn-image"
import { getHeroImages, getImage } from "app/lib/cloudinary"
import { notFound } from "next/navigation"
import Modal from "app/@modal/ui/modal"

export const dynamicParams = false

export async function generateStaticParams(): Promise<
  Array<{ publicId: string }>
> {
  const images = await getHeroImages()
  return images.map(({ publicId }) => ({ publicId }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>
}) {
  const { publicId } = await params
  const image = await getImage(publicId)

  if (image === null) {
    return notFound()
  }

  return (
    <Modal>
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
          <CdnImage
            priority
            image={image}
            className="max-h-full object-contain"
            sizes="(max-width: 1536px) 100vw, 1536px"
            alt={`Photo ${image.key}`}
          />
        </div>
      </main>
    </Modal>
  )
}
