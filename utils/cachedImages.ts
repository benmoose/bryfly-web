import cloudinary, {APIResource, APIResult} from './cloudinary'

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

export async function getByPublicId(publicId: string): Promise<APIResource> {
  return await cloudinary.v2.api.resource(publicId)
}
