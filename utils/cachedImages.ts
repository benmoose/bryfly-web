import cloudinary, {APIResource, APIResult} from './cloudinary'
import type {ImageProps} from "./types";
import getBase64ImageUrl from "./generateBlurPlaceholder";

let cachedResults: APIResult

export async function getResults (): Promise<APIResult> {
  if (!cachedResults) {
    cachedResults = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by('public_id', 'desc')
      .max_results(200)
      .execute()
  }

  return cachedResults
}

export async function fetchImages (): Promise<ImageProps[]> {
  const {resources} = await getResults()
  const blurUrls = await Promise.all(
      resources.map(image => getBase64ImageUrl(image))
  )
  return resources.map((resource: APIResource, index: number): ImageProps => ({
    ...resource,
    index,
    blurDataUrl: blurUrls[index],
  }))
}

export async function getResource (publicId: string): Promise<APIResult> {
  return await cloudinary.v2.api.resource(publicId)
}
