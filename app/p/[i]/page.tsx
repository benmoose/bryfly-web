import React from 'react'
import Image from 'next/image'
import { CloudinaryImage } from 'app/ui/remote-image'
import { getImages } from 'services/cloudinary'

export async function generateStaticParams (): Promise<Array<{ i: string }>> {
  const images = await getImages()
  return images.map(image => ({
    i: `${image.index}`
  }))
}

export default async function Page ({
  params
}: {
  params: Promise<{ i: number }>
}): Promise<React.ReactElement> {
  const images = await getImages()
  const index = await params.then(params => params.i)

  return (
    <div className='absolute inset-0 h-auto max-h-dvh flex items-center justify-center'>
      <div className='absolute inset-0 z-30 cursor-default'>
        <Image
          fill
          priority
          src={images[index].placeholderUrl}
          className='object-fill'
          alt=''
        />
      </div>

      <div className='flex items-center z-50 w-full h-full p-2 md:p-4 lg:mx-8'>
        <div
          className='flex items-center justify-center max-h-full max-w-screen-2xl
            overflow-hidden rounded-lg bg-black/20 shadow-2xl'
        >
          <CloudinaryImage
            priority
            image={images[index]}
            className='object-contain'
            sizes='(max-width: 1536px) 100vw, 1536px'
          />
        </div>
      </div>
    </div>
  )
}
