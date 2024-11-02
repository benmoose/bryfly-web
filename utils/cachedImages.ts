import cloudinary, {APIResult} from './cloudinary'

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
