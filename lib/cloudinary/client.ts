import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  secure: true,
  urlAnalytics: false,
})

export default cloudinary
