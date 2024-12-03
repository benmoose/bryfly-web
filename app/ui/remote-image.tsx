'use client'

import type { ImageProps } from 'next/image'
import Image from 'next/image'
import React from 'react'
import {
  optimisedLoader,
  thumbnailLoader
} from 'services/cloudinary/image-loader'
import type { IImage } from 'services/cloudinary/types'

interface CdnProps
  extends Omit<
  ImageProps,
  'loader' | 'src' | 'width' | 'height' | 'placeholder' | 'blurDataURL'
  > {
  image: IImage
}

export function Responsive ({ image, ...props }: CdnProps): React.ReactElement {
  return (
    <Image
      {...props}
      src={image.publicId}
      loader={optimisedLoader}
      width={image.width}
      height={image.height}
      blurDataURL={image.placeholderUrl}
      placeholder='blur'
    />
  )
}

export function Thumbnail ({ image, ...props }: CdnProps): React.ReactElement {
  return (
    <Image
      {...props}
      fill
      src={image.publicId}
      loader={thumbnailLoader}
      width={128}
      height={128}
      sizes='128w'
    />
  )
}
