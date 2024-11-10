import imagemin from 'imagemin'
import type {ImageProps} from './types'
import {APIResource} from "./cloudinary";

const cache = new Map<string, string>()

export default async function getBase64ImageUrl (
  image: ImageProps | APIResource
): Promise<string> {
  let url = cache.get(image.public_id)
  if (url) {
    return url
  }
  const response = await fetch(image.secure_url)
  const buffer = await response.arrayBuffer()
  const minified = await imagemin.buffer(Buffer.from(buffer))

  url = `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`
  cache.set(image.public_id, url)

  return url
}
