import { cache } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fit, thumbnail } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { name } from '@cloudinary/url-gen/actions/namedTransformation'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'

const client = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true }
})

export function url (publicId: string, width: number, height?: number) {
  return client
    .image(publicId)
    .resize(height
      ? fit().width(width).height(height)
      : fit().width(width))
    .format('auto')
    .quality('auto')
    .toURL()
}

export function thumbnailUrl (publicId: string, width?: number, height?: number) {
  return client
    .image(publicId)
    .resize(
      thumbnail()
        .width(width ?? 200)
        .height(height ?? 200)
        .gravity(autoGravity()))
    .format('auto')
    .quality('auto:eco')
    .toURL()
}

export const placeholderUrl = cache((publicId: string) => {
  return client
    .image(publicId)
    .namedTransformation(name('placeholder_blur'))
    .delivery(format('webp'))
    .delivery(quality('auto:eco'))
    .toURL()
})
