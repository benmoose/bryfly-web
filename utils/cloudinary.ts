import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export default cloudinary

export interface APIResource {
  public_id: string
  secure_url: string
  format: string
  width: number
  height: number
  resource_type: string
}

export interface APIResult {
  total_count: number
  resources: APIResource[]
  rate_limit_allowed: number
  rate_limit_remaining: number
  rate_limit_reset_at: string
}
