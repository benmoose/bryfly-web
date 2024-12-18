import react, {Suspense} from 'react'
import {Responsive} from 'app/ui/remote-image'
import { getHeroImageSet } from 'services/cloudinary'
import Modal from './modal'

export const dynamic = "force-dynamic"

export default async function Page ({
  params
}: {
  params: Promise<{ publicId: string }>
}): Promise<react.ReactElement> {
  const { publicId } = await params
  const heroImageSet = getHeroImageSet()

  return (
    <Suspense fallback={<Loading />}>
      <Modal publicId={publicId} imageSetStream={heroImageSet}>
        <BigImage publicId={publicId} />
      </Modal>
    </Suspense>
  )
}

async function BigImage ({ publicId }: { publicId: string }) {
  const imageSet = await getHeroImageSet()
  const image = imageSet.find(img => img.publicId === publicId)

  if (!image) {
    return null
  }

  const [ratioWidth, ratioHeight] = image.aspectRatio
  return (
    <Responsive
      priority
      image={image}
      className={`max-h-full w-fit rounded-lg aspect-[${ratioWidth}/${ratioHeight}]}`}
      sizes='(max-width: 1280px) 100vw, 1280px'
      alt={`Photo ${image.key}`}
    />
  )
}

function Loading () {
  return <div className='max-h-full min-h-1 animate-pulse w-fit rounded-lg bg-orange-300/90 aspect-[3/2]' />
}
