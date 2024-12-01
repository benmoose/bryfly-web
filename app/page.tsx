import Link from 'next/link'
import React from 'react'
import Logo from 'app/ui/logo'
import { CloudinaryImage } from 'app/ui/remote-image'
import { prefetchHeroImages, getImages } from 'services/cloudinary'

function BryFlyTitle (): React.ReactElement {
  return (
    <div
      className='after:content relative mb-5 flex h-[380px] lg:h-[430px] 2xl:h-[392px]
        flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10
        px-6 pb-20 pt-64 text-center text-white shadow-highlight after:pointer-events-none a
        fter:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0'
    >
      <Logo />
      <h1 className='mt-0 mb-6 text-xl lg:text-2xl font-bold tracking-wider'>
        browse me disco balls
      </h1>
      <div className='z-10 mt-2 md:mt-6 text-base md:text-md'>
        <a
          className='pointer mr-2 rounded-lg border border-white/15 bg-transparent px-3 py-2
           font-bold text-white/85 transition hover:bg-white/5 hover:border-white/60
            hover:text-white md:mt-4'
          href='https://www.instagram.com/bryfly2000'
          target='_blank'
          rel='noreferrer'
        >
          Instagram
        </a>
        <a
          className='pointer rounded-lg border border-white bg-gray-100 px-3 py-2
            font-semibold text-black transition hover:border-cyan-200 hover:bg-cyan-50
            md:mt-4'
          href='https://github.com/benmoose/bryfly-web'
        >
          Get in touch!
        </a>
      </div>
    </div>
  )
}

export default async function Page (): Promise<React.ReactElement> {
  void prefetchHeroImages()

  return (
    <>
      <main className='mx-auto max-w-[1960px] p-4 w-full'>
        <section className='columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4'>
          <BryFlyTitle />

          {(await getImages()).map(({ id, index, ...image }) => (
            <Link
              key={id} id={`i${index}`} href={`/p/${index}`} scroll={false}
              className='after:content group relative mb-5 block w-full cursor-zoom-in
                    after:pointer-events-none after:absolute after:inset-0 after:rounded-lg
                    after:shadow-highlight'
            >
              <CloudinaryImage
                image={image}
                className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
                style={{ transform: 'translate3d(0, 0, 0)' }}
                sizes='(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  (max-width: 1960px) 25vw,
                  490px'
              />
            </Link>
          ))}
        </section>
      </main>

      <footer className='p-4 text-sm text-center text-white/35 sm:p-8 tracking-wide'>
        made by{' '}
        <a
          href='https://instagram.com/_benmoose' target='_blank' rel='noreferrer'
          className='font-bold text-white/40 hover:text-white/50'
        >
          Moose
        </a>
      </footer>
    </>
  )
}
