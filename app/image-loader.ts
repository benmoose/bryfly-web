'use client'

import type { ImageLoaderProps } from 'next/image'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale, thumbnail } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'

const client = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true }
})

export function optimisedLoader ({ src, width, ...rest }: ImageLoaderProps) {
  return client
    .image(src)
    .resize(
      scale()
        .width(width))
    .format('auto')
    .quality(rest.quality || 'auto')
    .toURL()
}

export function thumbnailLoader ({ src }: ImageLoaderProps) {
  return client
    .image(src)
    .resize(
      thumbnail()
        .width(200)
        .height(200)
        .gravity(autoGravity()))
    .format('auto')
    .quality('auto:eco')
    .toURL()
}
