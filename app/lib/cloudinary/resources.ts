import {
  type ImageFormat,
  type ResourceApiResponse,
  type ResourceType,
  v2 as cloudinary,
  type VideoFormat,
} from "cloudinary"
import { cache } from "react"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  urlAnalytics: false,
})

type ApiResource = ResourceApiResponse["resources"][number] & {
  asset_id?: string
}

interface ResourceCommon {
  readonly key: string
  readonly assetId?: string
  readonly publicId: string
  readonly resourceType: ResourceType
  readonly group: string
  readonly format: ImageFormat | VideoFormat
  readonly width: number
  readonly height: number
  readonly aspectRatio: [number, number]
  readonly secureUrl: string
  readonly createdAt: string
  readonly version: number
  readonly context?: object
  readonly tags?: string[]
}

interface Resource<T extends ResourceType> extends ResourceCommon {
  readonly resourceType: T
}

export type Ordered<R extends ResourceCommon> = R & { index: number }

export type Image = Resource<"image"> & {
  readonly format: ImageFormat
  placeholderUrl: string
}

async function resourcesByGroup(group: string): Promise<ResourceCommon[]> {
  // TODO: implement pagination
  const response = await cloudinary.api.resources_by_asset_folder(group, {
    context: true,
    image_metadata: true,
    direction: "desc",
    max_results: 250,
  })

  return response.resources.map(apiToInternal)
}

export async function getHeroImages(): Promise<Ordered<Image>[]> {
  const images = (
    await resourcesByGroup(`${process.env.CLOUDINARY_HERO_FOLDER}`)
  ).filter(isImageResource)

  const placeholderUrls = await Promise.all(
    images.map(({ publicId }) =>
      encodeB64ImageUrl(
        cloudinary.url(publicId, {
          transformation: ["placeholder_blur"],
          type: "private",
        }),
      ),
    ),
  )

  return images.map((image, index) => ({
    ...image,
    placeholderUrl: placeholderUrls[index],
    resourceType: "image" as const,
    index,
  }))
}

export async function getImage(publicId: string): Promise<Image> {
  const imagePromise: Promise<ApiResource> = cloudinary.api.resource(publicId, {
    context: true,
    resource_type: "image",
    type: "private",
  })
  const placeholderPromise: Promise<string> = encodeB64ImageUrl(
    cloudinary.url(publicId, {
      transformation: ["placeholder_blur"],
      type: "private",
    }),
  )
  const [image, placeholderUrl] = await Promise.all([
    imagePromise,
    placeholderPromise,
  ])

  return {
    ...apiToInternal(image),
    placeholderUrl,
    resourceType: "image" as const,
  }
}

const encodeB64ImageUrl = cache(async function (url: string): Promise<string> {
  const res = await fetch(url, { cache: "force-cache" })
  const buf = await res.arrayBuffer()
  const data = Buffer.from(buf).toString("base64")
  return `data:image/webp;base64,${data}`
})

function isImageResource(resource: ResourceCommon): resource is Image {
  return resource.resourceType === "image"
}

function apiToInternal(resource: ApiResource): ResourceCommon {
  return {
    key: resource.asset_id ?? resource.public_id,
    publicId: resource.public_id,
    assetId: resource.asset_id,
    secureUrl: resource.secure_url,
    resourceType: resource.resource_type,
    createdAt: resource.created_at,
    group: resource.asset_folder,
    format: resource.format,
    width: resource.width,
    height: resource.height,
    aspectRatio: aspectRatio(resource),
    context: resource.context,
    version: resource.version,
  }
}

function aspectRatio({
  width,
  height,
}: {
  width: number
  height: number
}): [number, number] {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const factor = gcd(width, height)
  return [width / factor, height / factor]
}
