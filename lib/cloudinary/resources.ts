"use server"

import {
  type ImageFormat,
  type ResourceApiResponse,
  type ResourceType,
  type VideoFormat,
} from "cloudinary"
import { cache } from "react"
import client from "./client"

type DataUrl = `data:image/${string}`

type ApiResource = ResourceApiResponse["resources"][number] & {
  asset_id?: string
}

interface ResourceCommon {
  key: string
  assetId?: string
  publicId: string
  group: string
  resourceType: ResourceType
  format: ImageFormat | VideoFormat
  width: number
  height: number
  aspectRatio: [number, number]
  secureUrl: string
  createdAt: string
  version: number
  context?: object
  tags?: string[]
}

interface Resource<T extends ResourceType> extends ResourceCommon {
  readonly resourceType: T
}

export type Ordered<R extends ResourceCommon> = R & { index: number }

export type Image = Resource<"image"> & {
  format: ImageFormat
  placeholderUrl: DataUrl
}

async function getResources(group: string): Promise<ResourceCommon[]> {
  // TODO: implement pagination
  const response = await client.api.resources_by_asset_folder(group, {
    context: true,
    image_metadata: true,
    direction: "desc",
    max_results: 250,
  })

  return response.resources.map(apiToInternal)
}

export async function getHeroImages(): Promise<Readonly<Ordered<Image>>[]> {
  const images = (
    await getResources(`${process.env.CLOUDINARY_HERO_FOLDER}`)
  ).filter(isImageResource)

  const placeholderUrls = await Promise.all(
    images.map(({ publicId }) =>
      encodeB64ImageUrl(
        client.url(publicId, {
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

export async function getImage(publicId: string): Promise<Readonly<Image>> {
  const imagePromise: Promise<ApiResource> = client.api.resource(publicId, {
    context: true,
    resource_type: "image",
    type: "private",
  })
  const placeholderPromise: Promise<DataUrl> = encodeB64ImageUrl(
    client.url(publicId, {
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

const encodeB64ImageUrl = cache(async function (url: string): Promise<DataUrl> {
  const res = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: false },
  })
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
