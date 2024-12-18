import * as Cdn from 'app/ui/remote-image'
import React from 'react'
import Image from 'next/image'
import { getHeroImageSet } from 'services/cloudinary'
import { notFound } from 'next/navigation'

// Only params from generateStaticParams() are pre-rendered.
// Requesting a path that has not been generated are served 404.
export const dynamicParams = false

export async function generateStaticParams (): Promise<Array<{ publicId: string }>> {
  const imageSet = await getHeroImageSet()
  return imageSet.order.map(publicId => ({ publicId }))
}

export default async function Page ({
  params
}: {
  params: Promise<{ publicId: string }>
}): Promise<React.ReactElement> {
  const imageSet = await getHeroImageSet()
  const pid = (await params).publicId
  const image = imageSet.byPublicId(pid)

  if (image == null) {
    return notFound()
  }

  return (
    <>
      <Image
        fill
        priority
        src={image.placeholderUrl}
        className='fixed inset-0 z-0 object-fill'
        alt=''
      />

      <main
        className='relative flex flex-col items-center mt-8 px-8 z-10 w-full max-w-screen-lg mx-auto
          space-y-4 xl:items-start xl:flex-row xl:space-x-6 xl:space-y-0'
      >
        <div
          className='flex items-center justify-center max-h-full max-w-screen-2xl
            overflow-hidden rounded-2xl shadow-2xl'
        >
          <Cdn.Responsive
            priority
            image={image}
            className='max-h-full object-contain'
            sizes='(max-width: 1536px) 100vw, 1536px'
            alt=''
          />
        </div>
      </main>
    </>
  )
}