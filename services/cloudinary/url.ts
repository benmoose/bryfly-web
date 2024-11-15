import type { ImageLoaderProps } from 'next/image'
import type { TransformationOptions } from 'cloudinary'
import type { Resource } from './cloudinary'
import cloudinary from './cloudinary'

const MAX_WIDTH_PX = 2000

export async function placeholderBase64Url (resource: Resource): Promise<string> {
  const loaderUrl = cloudinary.url(resource.public_id, {
    transformation: [
      { transformation: ['loading-placeholder'] },
      { fetch_format: 'webp' }
    ]
  })
  const res = await fetch(loaderUrl)
  const buffer = await res.arrayBuffer()
  const data = Buffer.from(buffer).toString('base64')
  return `data:image/webp;base64,${data}`
}

export function url ({ src, width }: ImageLoaderProps) {
  const transformation: TransformationOptions[] = [
    { crop: 'limit', width: Math.min(width, MAX_WIDTH_PX) },
    { quality: 'auto', dpr: 'auto' },
    { fetch_format: 'auto' }
  ]
  return cloudinary.url(src, { transformation })
}
