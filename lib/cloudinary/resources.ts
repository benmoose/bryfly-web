"use server"

import {
  type ImageFormat,
  type ResourceApiResponse,
  type ResourceType,
  type VideoFormat,
} from "cloudinary"
import { isDev } from "lib/utils"
import getClient from "./client"
import { fixture } from "./mock"

type DataUrl = `data:image/${string}`

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
  displayName?: string
  tags?: string[]
}

interface Resource<T extends ResourceType> extends ResourceCommon {
  readonly resourceType: T
}

export type Ordered<Type> = Type & { index: number }

export interface ImageResource extends Resource<"image"> {
  format: ImageFormat
  placeholderUrl: DataUrl
}

const client = getClient()

export async function getGroupNames(): Promise<string[]> {
  const rootFolders = await getRootFolders()
  return rootFolders
    .map(folder => folder.name)
    .filter(name => name.match(/^[A-Z].*/) !== null)
}

type RootFolder = {
  name: string
  path: string
  external_id: string
}

async function getRootFolders(): Promise<RootFolder[]> {
  if (isDev()) {
    return fixture("root-folders.json").folders
  }
  const response: { folders: RootFolder[]; total_count: number } =
    await client.api.root_folders()
  return response.folders
}

export async function getImages(
  group: string,
): Promise<Ordered<ImageResource>[]> {
  if (!group || group.trim() === "") {
    return []
  }
  const images = (await getResources(group)).filter(isImageResource)
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

type ApiResource = ResourceApiResponse["resources"][number] & {
  asset_id?: string
}

async function getResources(group: string): Promise<ResourceCommon[]> {
  if (isDev()) {
    return fixture(`resources-${group}.json`).resources.map(apiToInternal)
  }

  // TODO: implement pagination
  const response = await client.api.resources_by_asset_folder(group, {
    context: true,
    direction: "desc",
    image_metadata: true,
    max_results: 250,
  })
  return response.resources.map(apiToInternal)
}

export async function getImage(publicId: string): Promise<ImageResource> {
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

function isImageResource(resource: ResourceCommon): resource is ImageResource {
  return resource.resourceType === "image"
}

const encodeB64ImageUrl = async function (url: string): Promise<DataUrl> {
  const res = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: false },
  })
  const buf = await res.arrayBuffer()
  const data = Buffer.from(buf).toString("base64")
  return `data:image/webp;base64,${data}`
}

function apiToInternal(resource: ApiResource): ResourceCommon {
  const key = [resource.asset_folder, resource.asset_id ?? resource.public_id]
    .filter(c => c.trim().length > 0)
    .join(":")
  return {
    key,
    publicId: resource.public_id,
    assetId: resource.asset_id,
    secureUrl: resource.secure_url,
    resourceType: resource.resource_type,
    createdAt: resource.created_at,
    context: resource.context,
    group: resource.asset_folder,
    format: resource.format,
    width: resource.width,
    height: resource.height,
    aspectRatio: aspectRatio(resource),
    version: resource.version,
    displayName: resource.display_name,
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
