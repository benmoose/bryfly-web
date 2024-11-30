'use client'

import React from 'react'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { optimisedLoader, thumbnailLoader } from 'services/cloudinary/image-loader'
import type { DomainImage } from 'services/cloudinary/types'

type FetchableImage = Pick<DomainImage, 'publicId' | 'width' | 'height' | 'placeholderUrl'>
type RemoteImageProps = { image: FetchableImage } & Partial<ImageProps>

export function CloudinaryImage ({ image, ...props }: RemoteImageProps): React.ReactElement {
  return (
    <Image
      {...props} src={image.publicId} width={image.width} height={image.height}
      blurDataURL={image.placeholderUrl} placeholder='blur' loader={optimisedLoader} alt='optimised image'
    />
  )
}

export function Thumbnail (props: ImageProps): React.ReactElement {
  return <Image {...props} loader={thumbnailLoader} sizes='128w' alt='thumbnail' />
}
