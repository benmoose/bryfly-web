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
  index?: number
  public_id: string
  width: number
  height: number
  resource_type: string
  placeholder_url: string
  secure_url: string
  format: string
}

export const allImages = cache(async () => {
  const res = await allResources()
  const placeholders = await Promise.all(res.resources.map(placeholderUrl))
  return res.resources
    .filter(resource => resource.resource_type === 'image')
    .map((image, i): Image => ({
      ...image,
      index: i,
      placeholder_url: placeholders[i]
    }))
})
