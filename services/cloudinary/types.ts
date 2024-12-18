import type {
  ImageFormat as ApiImageFormat,
  ResourceApiResponse,
  ResourceType as ApiResourceType,
  VideoFormat as ApiVideoFormat
} from 'cloudinary'

export type IAPIResource = ResourceApiResponse["resources"][number] & {
  asset_id?: string;
};

interface IResourceCommon {
  readonly key: string
  readonly assetId: string
  readonly publicId: string
  readonly resourceType: ApiResourceType
  readonly format: string
  readonly secureUrl: string
  readonly createdAt: string
  readonly context?: object
  readonly tags?: string[]
  readonly version: number
}

interface ResourceType<Type extends ApiResourceType> extends IResourceCommon {
  readonly resourceType: Type
}

export type IResource = ResourceType<ApiResourceType>

export type Indexable<T extends IResourceCommon> = T & {
  readonly index: number
}

export interface IImage extends ResourceType<'image'> {
  placeholderUrl: string
  readonly width: number
  readonly height: number
  readonly format: ApiImageFormat
  readonly aspectRatio: [number, number]
}

export interface IVideo extends ResourceType<'video'> {
  readonly format: ApiVideoFormat
}
