import { cache } from 'react'
import type { ResourceApiResponse } from 'cloudinary'
import cloudinary from './cloudinary'
import type { ImageProps } from "./types";
import getBase64Placeholder from "./generateBlurPlaceholder";

// let cachedResults: ResourceApiResponse

async function assets (): Promise<ResourceApiResponse> {
  return await cloudinary.api.resources_by_asset_folder(process.env.CLOUDINARY_FOLDER, {
    metadata: true,
    max_results: 250,
    direction: 'desc',
  })

  // if (!cachedResults) {
  //   cachedResults = await cloudinary.api.resources_by_asset_folder(process.env.CLOUDINARY_FOLDER, {
  //     metadata: true,
  //     max_results: 250,
  //     direction: 'desc',
  //   })
  // }
  //
  // return cachedResults
}

async function images (): Promise<ImageProps[]> {
  const { resources } = await assets()
  const blurUrls = await Promise.all(resources.map(getBase64Placeholder))
  return resources.filter(res => res.resource_type === "image").map((image, index): ImageProps => ({
    ...image,
    index,
    blurDataUrl: blurUrls[index],
  }))
}

export const getImages = cache(images)
