import { cache } from 'react'
import type { ResourceApiResponse } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  urlAnalytics: false
})

type APIResource = ResourceApiResponse['resources'][number] & {
  asset_id?: string
}

async function getResources (): Promise<APIResource[]> {
  // assume no pagination, for now...
  return await cloudinary.api.resources_by_asset_folder(process.env.CLOUDINARY_HERO_FOLDER as string, {
    context: true,
    direction: 'desc',
    image_metadata: true,
    max_results: 250
  })
    .then(response => response.resources)
}

export interface DomainImage {
  id: string
  index: number
  publicId: string
  width: number
  height: number
  resourceType: 'image'
  placeholderUrl: string
  secureUrl: string
  format: string
  context?: object
}

async function _getImages (): Promise<DomainImage[]> {
  const images = (await getResources())

    .filter(resource => resource.resource_type === 'image')
  const blurDataUrls = await Promise.all(
    images.map(
      async ({ public_id }) => {
        const url = cloudinary.url(public_id, { transformation: ['placeholder_blur'], type: 'private' })
        return await fetch(url, { cache: 'force-cache', next: { revalidate: false } })
          .then(async res => await res.arrayBuffer())
          .then(buf => Buffer.from(buf).toString('base64'))
          .then(data => `data:image/webp;base64,${data}`)
      }
    )
  )

  return images
    .map(({ asset_id, public_id, secure_url, created_at, format, context, width, height }, i) => ({
      index: i,
      id: asset_id ?? public_id,
      publicId: public_id,
      secureUrl: secure_url,
      resourceType: 'image',
      placeholderUrl: blurDataUrls[i],
      createdAt: created_at,
      width,
      height,
      format,
      context
    }))
}

export const getImages = cache(_getImages)
export const prefetchImages = () => {
  void getImages()
}
