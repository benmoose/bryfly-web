'use client'

import Image from 'next/image'
import type { ImageLoaderProps } from 'next/image'
import type { ImageProps } from 'utils/types'

function cloudinaryLoader ({ src, width }: ImageLoaderProps) {
  return `https://res.cloudinary.com/benmoose/image/upload/f_auto,q_auto,w_${width},c_auto/${src}`
  // return cloudinary.url(src, {
  //   transformation: [
  //     {width, gravity: "auto", crop: "auto"},
  //     {quality: "auto"},
  //     {fetch_format: "auto"},
  //   ]
  // })
}

export default function CloudinaryImage ({
  public_id,
  width,
  height,
  blurDataUrl
}: Pick<ImageProps, 'public_id' | 'width' | 'height' | 'blurDataUrl'>) {
  return (
    <Image
      src={public_id}
      width={width}
      height={height}
      alt={public_id}
      blurDataURL={blurDataUrl}
      placeholder='blur'
      loader={cloudinaryLoader}
      className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
      style={{ transform: 'translate3d(0, 0, 0)' }}
      sizes='(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw'
    />
  )
}
