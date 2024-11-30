import type { ImageLoaderProps } from 'next/image'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { name } from '@cloudinary/url-gen/actions/namedTransformation'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'

const client = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true }
})

export function optimisedLoader ({ src, width }: ImageLoaderProps): string {
  return client
    .image(src)
    .namedTransformation(
      name(`${width}w`))
    .format('auto')
    .setDeliveryType('private')
    .toURL()
}

export function thumbnailLoader ({ src }: ImageLoaderProps): string {
  return client
    .image(src)
    .resize(
      thumbnail()
        .width(128)
        .height(128)
        .gravity(autoGravity()))
    .format('auto')
    .quality('auto:eco')
    .setDeliveryType('private')
    .toURL()
}
