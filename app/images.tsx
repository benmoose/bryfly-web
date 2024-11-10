'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ImageProps } from 'utils/types'
import { fetchImages } from 'utils/cachedImages'

export default async function Images () {
  const images = await fetchImages()
  return (
    <>
      {images.map((image: ImageProps) => {
        return (
          <Link
            key={image.public_id}
            href={`/?id=${image.public_id}`}
            as={`/p/${image.public_id}`}
            shallow
            className='after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'
          >
            <Image
              alt='An image of a BryFly disco ball.'
              className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
              style={{ transform: 'translate3d(0, 0, 0)' }}
              placeholder='blur'
              blurDataURL={image.blurDataUrl}
              src={image.secure_url}
              width={image.width}
              height={image.height}
              sizes='(max-width: 640px) 100vw,
                      (max-width: 1280px) 50vw,
                      (max-width: 1536px) 33vw,
                      25vw'
            />
          </Link>
        )
      })}
    </>
  )
}
