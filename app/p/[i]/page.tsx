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
    <>
      <Image
        fill
        priority
        src={images[index].placeholderUrl}
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
          <CloudinaryImage
            priority
            image={images[index]}
            className='max-h-full object-contain'
            sizes='(max-width: 1536px) 100vw, 1536px'
          />
        </div>

        <article>
          <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or
            web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to
            have scrambled parts of Cicero&apos;s De Finibus Bonorum et Malorum for use in a type specimen book. It
            usually begins with:
          </p>
          <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua.”
          </p>
          <p>The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page,
            etc.) that doesn&apos;t distract from the layout. A practice not without controversy, laying out pages with
            meaningless filler text can be very useful when the focus is meant to be on design, not content.
          </p>
        </article>
      </main>
    </>
  )
}
