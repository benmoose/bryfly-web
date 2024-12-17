import Link from 'next/link'
import React from 'react'
import BryFlyHero from 'app/ui/bryfly-hero'
import * as Cdn from 'app/ui/remote-image'
import { getHeroImageSet } from 'services/cloudinary'

export default async function Page (): Promise<React.ReactElement> {
  const imageSet = await getHeroImageSet()

  return (
    <main className='mx-auto max-w-[1960px] p-4 w-full'>
      <div className='gap-4 columns-1 sm:columns-2 xl:columns-3 2xl:columns-4'>
        <BryFlyHero />

        {imageSet.resources().map((image) => (
          <Link
            key={image.key}
            id={image.key}
            href={`/gallery/${image.index}`}
            scroll={false}
            className='after:content group relative mb-5 block w-full cursor-zoom-in
              after:pointer-events-none after:absolute after:inset-0 after:rounded-xl'
          >
            <Cdn.Responsive
              priority
              image={image}
              className='transform rounded-xl brightness-90 transition will-change-auto
                group-hover:brightness-110'
              sizes='(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                (max-width: 1960px) 25vw,
                490px'
              alt=''
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
