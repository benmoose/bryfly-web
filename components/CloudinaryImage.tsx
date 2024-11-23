'use client'

import Image from 'next/image'
import type { ImageLoaderProps } from 'next/image'
import type { Image as ImageT } from 'services/cloudinary-client/resources'
import { url, thumbnailUrl } from 'services/cloudinary-client/deliver'

function cloudinaryLoader ({ src, width }: ImageLoaderProps) {
  return url(src, width)
}

function cloudinaryThumbnailLoader ({ src }: ImageLoaderProps) {
  return thumbnailUrl(src)
}

type ImageProps = Pick<ImageT, 'publicId' | 'width' | 'height' | 'placeholderUrl'> & {
  alt: string
  thumbnail?: boolean
  priority?: boolean
  fill?: boolean
  className?: string
  style?: object
  sizes?: string
  onLoad?: () => void
}

export default function CloudinaryImage ({ publicId, placeholderUrl, thumbnail, width, height, ...props }: ImageProps) {
  return (
    <Image
      fill={!!props.fill}
      priority={!!props.priority}
      src={publicId}
      width={width}
      height={height}
      loader={thumbnail ? cloudinaryThumbnailLoader : cloudinaryLoader}
      blurDataURL={placeholderUrl}
      placeholder='blur'
      style={props.style}
      className={props.className}
      sizes={props.sizes}
      alt={props.alt}
    />
  )
}
