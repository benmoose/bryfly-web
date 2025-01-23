import { v2 as cloudinary } from "cloudinary"

let clientInstance: typeof cloudinary

export default function getClient() {
  if (!clientInstance) {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      secure: true,
      urlAnalytics: false,
    })
    clientInstance = cloudinary
  }

  return clientInstance
}
