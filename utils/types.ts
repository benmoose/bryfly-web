/* eslint-disable no-unused-vars */
export interface ImageProps extends CloudinaryResource {
  index?: number
  blurDataUrl?: string
}

interface CloudinaryResource extends CloudinaryId{
  format: string
  width: number
  height: number
  resource_type: string
  secure_url: string
  display_name?: string
}

export interface CloudinaryId {
  public_id: string
  asset_id?: string
}
