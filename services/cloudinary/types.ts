import type {
  ImageFormat as ApiImageFormat,
  ResourceType as ApiResourceType,
  VideoFormat as ApiVideoFormat
} from 'cloudinary'

export type PublicId = string & { __brand: 'cloudinary.public_id' }

interface IResourceCommon {
  readonly key: string
  readonly assetId?: string
  readonly publicId: PublicId
  readonly resourceType: ApiResourceType
  readonly format: string
  readonly secureUrl: string
  readonly createdAt: string
  readonly context?: object
}

interface IResource<Type extends ApiResourceType> extends IResourceCommon {
  readonly resourceType: Type
}

export interface IImage extends IResource<'image'> {
  placeholderUrl: string
  readonly width: number
  readonly height: number
  readonly format: ApiImageFormat
}

export interface IVideo extends IResource<'video'> {
  readonly format: ApiVideoFormat
}

export type Resource = IImage | IVideo | IResource<ApiResourceType>

export type Indexable<T extends IResourceCommon> = T & {
  readonly index: number
}
