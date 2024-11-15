import { cache } from 'react'
import type { ImageLoaderProps } from 'next/image'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { name } from '@cloudinary/url-gen/actions/namedTransformation'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'

const MAX_WIDTH_PX = 2_100
const Client = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true }
})

export function url ({ src, width }: ImageLoaderProps) {
  const safeWidth = Math.min(width, MAX_WIDTH_PX)
  const image = Client.image(src)
    .resize(scale().width(safeWidth))
    .quality('auto')
    .format('auto')

  return image.toURL()
}

async function placeholderBase64Url ({ public_id }: { public_id: string }) {
  const placeholder = Client.image(public_id)
    .namedTransformation(name('placeholder_blur'))
    .delivery(quality('auto:eco'))
    .delivery(format('webp'))
  const res = await fetch(placeholder.toURL())
  const buffer = await res.arrayBuffer()
  const data = Buffer.from(buffer).toString('base64')
  return `data:image/webp;base64,${data}`
}

export const placeholderUrl = cache(placeholderBase64Url)
