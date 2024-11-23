import { cache } from 'react'
import { v2 as cloudinary } from 'cloudinary'
import { placeholderUrl } from './deliver'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

const allResources = async () => {
  return await cloudinary.api.resources_by_asset_folder(process.env.CLOUDINARY_FOLDER, {
    context: true,
    direction: 'desc',
    image_metadata: true,
    max_results: 250
  })
}

export interface Image {
  id: string
  index: number
  publicId: string
  width: number
  height: number
  resourceType: string
  placeholderUrl: string
  secureUrl: string
}

export const allImages = cache(async () => {
  const res = await allResources()
  const placeholders = await Promise.all(res.resources.map(placeholderUrl))
  return res.resources
    .filter(resource => resource.resource_type === 'image')
    .map(({ asset_id, public_id, secure_url, resource_type, ...image }, i): Image => ({
      ...image,
      index: i,
      id: asset_id,
      publicId: public_id,
      secureUrl: secure_url,
      resourceType: resource_type,
      placeholderUrl: placeholders[i]
    }))
})
