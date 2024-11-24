import { cache } from 'react'
import type { ResourceApiResponse } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import { placeholderUrl } from './deliver'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

type APIResource = ResourceApiResponse['resources'][number] & {
  asset_id?: string
}

const getResources = async (): Promise<APIResource[]> => {
  // assume no pagination, for now...
  return await cloudinary.api.resources_by_asset_folder(process.env.CLOUDINARY_FOLDER as string, {
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
}

export const getImages = cache(async () => {
  const images = (await getResources())
    .filter(resource => resource.resource_type === 'image')

  const blurDataUrls = await Promise.all(
    images
      .map(async ({ public_id }) => {
        const res = await fetch(placeholderUrl(public_id))
        const buffer = await res.arrayBuffer()
        const data = Buffer.from(buffer).toString('base64')
        return `data:image/webp;base64,${data}`
      })
  )

  return images
    .map(({ asset_id, public_id, secure_url, ...image }, i): DomainImage => ({
      ...image,
      index: i,
      id: asset_id ?? public_id,
      publicId: public_id,
      secureUrl: secure_url,
      resourceType: 'image',
      placeholderUrl: blurDataUrls[i]
    }))
})
