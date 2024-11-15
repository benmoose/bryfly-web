import { cache } from 'react'
import type { AdminApiPaginationResponse, ImageFormat, ResourceType } from 'cloudinary'
import cloudinary from './service'
import { placeholderBase64Url } from './url'

export interface APIResponse extends AdminApiPaginationResponse {
  resources: Resource[]
}

export interface Resource {
  readonly asset_id?: string
  readonly public_id: string
  readonly resource_type: ResourceType
  readonly width: number
  readonly height: number
}

export interface Image extends Resource {
  index?: number
  readonly format: ImageFormat
  readonly placeholder_base64_url?: string
}

async function resources (): Promise<APIResponse> {
  return await cloudinary.api.resources_by_asset_folder(process.env.CLOUDINARY_FOLDER, {
    context: true,
    direction: 'desc',
    image_metadata: true,
    max_results: 250
  })
}

const resourcesCached = cache(resources)

async function images (): Promise<Image[]> {
  const { resources } = await resourcesCached()
  const placeholders = await Promise.all(resources.map(placeholderBase64Url))
  return resources
    .filter(resource => resource.resource_type === 'image')
    .map((image, index): Image => ({
      ...image,
      index,
      placeholder_base64_url: placeholders[index]
    }))
}

export const getImages = cache(images)
