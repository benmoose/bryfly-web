import { cache } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fit, thumbnail } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { name } from '@cloudinary/url-gen/actions/namedTransformation'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'

const CloudinaryClient = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true }
})

export function url (publicId: string, width: number, height?: number) {
  return CloudinaryClient
    .image(publicId)
    .resize(fit(width, height))
    .delivery(quality('auto'))
    .delivery(format('auto'))
    .toURL()
}

export function thumbnailUrl (publicId: string, width?: number, height?: number) {
  return CloudinaryClient
    .image(publicId)
    .resize(
      thumbnail()
        .width(width || 200)
        .height(height || 200)
        .gravity(autoGravity()))
    .delivery(format('auto'))
    .delivery(quality('auto'))
    .toURL()
}

async function placeholderBase64Url ({ public_id }: { public_id: string }) {
  const placeholder = CloudinaryClient.image(public_id)
    .namedTransformation(name('placeholder_blur'))
    .delivery(quality('auto:eco'))
    .delivery(format('webp'))

  const res = await fetch(placeholder.toURL())
  const buffer = await res.arrayBuffer()
  const data = Buffer.from(buffer).toString('base64')
  return `data:image/webp;base64,${data}`
}

export const placeholderUrl = cache(placeholderBase64Url)
