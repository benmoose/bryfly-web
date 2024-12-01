import { cache } from 'react'
import type { ResourceApiResponse } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import { DomainImage, DomainImageIterable } from './types'

const HERO_FOLDER = process.env.CLOUDINARY_HERO_FOLDER as string

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

async function resourcesByFolder (folder: string): Promise<APIResource[]> {
  // assume no pagination, for now...
  return await cloudinary.api.resources_by_asset_folder(folder, {
    context: true,
    direction: 'desc',
    image_metadata: true,
    max_results: 250
  })
    .then(response => response.resources)
}

async function getHeroImages (): Promise<DomainImageIterable[]> {
  const images = (await resourcesByFolder(HERO_FOLDER))
    .filter(resource => resource.resource_type === 'image')

  const blurDataUrls = await Promise.all(
    images.map(async image => await blurDataUrl(image.public_id))
  )

  return images
    .map(({ format, context, width, height, ...image }, i) => ({
      index: i,
      id: `h-${image.asset_id ?? image.public_id}`,
      publicId: image.public_id,
      secureUrl: image.secure_url,
      resourceType: 'image',
      placeholderUrl: blurDataUrls[i],
      createdAt: image.created_at,
      width,
      height,
      format,
      context
    }))
}

export const getImages = cache(getHeroImages)

export const prefetchHeroImages: () => void = () => {
  void getImages()
}

async function _getImage (publicId: string): Promise<DomainImage> {
  const image: APIResource = await cloudinary.api.resource(publicId, { context: true, resource_type: 'image' })
  const placeholderUrl = await blurDataUrl(publicId)
  return {
    id: `h-${image.asset_id ?? image.public_id}`,
    publicId: image.public_id,
    secureUrl: image.secure_url,
    resourceType: 'image',
    createdAt: image.created_at,
    width: image.width,
    height: image.height,
    format: image.format,
    context: image.context,
    placeholderUrl
  }
}

export const getImage = cache(_getImage)

async function blurDataUrl (publicId: string): Promise<string> {
  const url = cloudinary.url(publicId, { transformation: ['placeholder_blur'], type: 'private' })
  return await fetch(url, { cache: 'force-cache', next: { revalidate: false } })
    .then(async res => await res.arrayBuffer())
    .then(buf => Buffer.from(buf).toString('base64'))
    .then(data => `data:image/webp;base64,${data}`)
}
