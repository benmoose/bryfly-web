import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Logo from '../components/Icons/Logo'
import Modal from '../components/Modal'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import { getResults } from '../utils/cachedImages'

export default function Home ({ images }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)
  const currentImage = images.find(img => img.public_id === photoId)

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <div className='flex flex-col justify-items-stretch h-dvh'>
      <Head>
        <title>BryFly</title>
        <meta
          property='og:image'
          content=''
        />
      </Head>
      <main className='mx-auto max-w-[1960px] p-4 flex-1'>
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(currentImage?.index)
            }}
          />
        )}
        <div className='columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4'>
          <div className='after:content relative mb-5 flex h-[419px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0'>
            <Logo width={306} />
            <h1 className='mt-0 mb-6 text-xl font-bold tracking-widest'>
              Browse me disco balls
            </h1>
            <div className='z-10 mt-6'>
              <a
                className='pointer mr-2 rounded-lg border border-white bg-transparent px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white md:mt-4'
                href='https://www.instagram.com/bryfly2000/'
                target='_blank'
                rel='noreferrer'
              >
                Instagram
              </a>
              <a
                className='pointer rounded-lg border border-white bg-gray-100 px-3 py-2 text-sm font-bold text-black transition hover:bg-white/10 hover:text-white md:mt-4'
                href='/contact'
              >
                Get in touch
              </a>
            </div>
          </div>
          {images.map(({ public_id, url, blurDataUrl, index }) => {
            return (
              <Link
                key={index}
                href={`/?photoId=${public_id}`}
                as={`/p/${public_id}`}
                ref={index === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className='after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'
              >
                <Image
                  alt='A BryFly image'
                  className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  placeholder='blur'
                  blurDataURL={blurDataUrl}
                  src={url}
                  width={720}
                  height={480}
                  sizes='(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw'
                />
              </Link>
            )
          })}
        </div>
      </main>
      <footer className='p-4 text-sm text-center text-white/35 sm:p-8 tracking-wide'>
        made by&nbsp;<a href='https://instagram.com/_benmoose' target='_blank' rel='noreferrer' className='font-bold text-white/40 hover:text-white/50'>Moose</a>
      </footer>
    </div>
  )
}

export const getStaticProps = (async (context) => {
  const results = await getResults()
  const blurUrls = await Promise.all(results.resources.map(async image => {
    return await getBase64ImageUrl(image)
  }))

  return {
    props: {
      images: results.resources.map((resource, index) => ({
        ...resource,
        index,
        url: resource.secure_url,
        blurDataUrl: blurUrls[index]
      }))
    }
  }
}) satisfies GetStaticProps<{
  images: ImageProps[]
}>
