import cloudinary from "./cloudinary"
import { CloudinaryId } from "./types";

// const cache = new Map<string, string>()

// export default async function getBase64ImageUrl (
//   image: CloudinaryResource
// ): Promise<string> {
//   let deliver = cache.get(image.public_id)
//   if (deliver) {
//     return deliver
//   }
//   const response = await fetch(image.secure_url)
//   const buffer = await response.arrayBuffer()
//   const minified = await imagemin.buffer(Buffer.from(buffer))
//
//   deliver = `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`
//   cache.set(image.public_id, deliver)
//
//   return deliver
// }

export default async function getBase64Placeholder (image: CloudinaryId): Promise<string> {
  const loaderUrl = cloudinary.url(image.public_id, {
    transformation: [
      {transformation: ["loading-placeholder"]},
      {fetch_format: "webp"},
    ]
  })
  const res = await fetch(loaderUrl)
  const buffer = await res.arrayBuffer()
  const data = Buffer.from(buffer).toString('base64')
  return `data:image/webp;base64,${data}`
}
