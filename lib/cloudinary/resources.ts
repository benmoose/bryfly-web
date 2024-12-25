import {
  type ImageFormat,
  type ResourceApiResponse,
  type ResourceType as _ResourceType,
  v2 as cloudinary,
  type VideoFormat,
} from "cloudinary"
import { cache } from "react"
import { aspectRatio, encodeB64ImageUrl } from "./util"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  urlAnalytics: false,
})

interface Resource {
  readonly key: string
  readonly index: number
  readonly assetId: string
  readonly publicId: string
  readonly resourceType: _ResourceType
  readonly format: ImageFormat | VideoFormat
  readonly secureUrl: string
  readonly createdAt: string
  readonly version: number
  readonly context?: object
  readonly tags?: string[]
}

interface ResourceType<Type extends _ResourceType> extends Resource {
  readonly resourceType: Type
}

type RawApiResource = ResourceApiResponse["resources"][number] & {
  asset_id?: string
}

async function resourcesByFolder(folder: string): Promise<Resource[]> {
  // TODO: assume no pagination, for now...
  const response = await cloudinary.api.resources_by_asset_folder(folder, {
    context: true,
    direction: "desc",
    image_metadata: true,
    max_results: 250,
  })
  return response.resources.map(
    (
      { format, context, version, ...rest }: RawApiResource,
      index,
    ): Resource => ({
      index,
      context,
      format,
      version,
      key: rest.asset_id ?? rest.public_id,
      publicId: rest.public_id,
      assetId: rest.asset_id as string,
      resourceType: rest.resource_type,
      secureUrl: rest.secure_url,
      createdAt: rest.created_at,
      ...rest,
    }),
  )
}

export type Image = ResourceType<"image"> & {
  readonly width: number
  readonly height: number
  readonly format: ImageFormat
  readonly aspectRatio: [number, number]
  placeholderUrl: string
}

export async function getHeroImages(): Promise<Image[]> {
  console.count("getHeroImages() call")
  const images = (
    await resourcesByFolder(`${process.env.CLOUDINARY_HERO_FOLDER}`)
  ).filter(isImageResource)
  const placeholderUrls = await Promise.all(
    images.map(
      async img =>
        await encodeB64ImageUrl(
          cloudinary.url(img.publicId, {
            transformation: ["placeholder_blur"],
            type: "private",
          }),
        ),
    ),
  )
  return images.map((image, index) => ({
    ...image,
    index,
    aspectRatio: aspectRatio(image),
    placeholderUrl: placeholderUrls[index],
  }))
}

async function _getImage(publicId: string): Promise<Image> {
  const image: RawApiResource = await cloudinary.api.resource(publicId, {
    context: true,
    resource_type: "image",
  })
  const placeholderUrl = await encodeB64ImageUrl(
    cloudinary.url(publicId, {
      transformation: ["placeholder_blur"],
      type: "private",
    }),
  )
  return {
    publicId,
    placeholderUrl,
    key: image.asset_id ?? image.public_id,
    secureUrl: image.secure_url,
    resourceType: "image" as const,
    createdAt: image.created_at,
    width: image.width,
    height: image.height,
    aspectRatio: aspectRatio(image),
    format: image.format,
    context: image.context,
  } as Image
}

export const getImage = cache(_getImage)

// export type ImageSet = ResourceSet<Image>
//
// class ResourceSet<T extends Resource> {
//   readonly order: string[];
//   readonly repo: { [pid: string]: T };
//
//   constructor(resources: T[]) {
//     this.order = resources.map((img) => img.publicId);
//     this.repo = resources.reduce(
//       (repo, res) => ({
//         ...repo,
//         [res.publicId]: res,
//       }),
//       {},
//     );
//   }
//
//   all(this: ResourceSet<T>): ReadonlyArray<T> {
//     return this.order.map((id) => this.repo[id]);
//   }
//
//   get(this: ResourceSet<T>, key: string | number): Readonly<T> {
//     return typeof key === 'string' ? this.repo[key] : this.repo[this.order[key]];
//   }
// }

function isImageResource(resource: Resource): resource is Image {
  return resource.resourceType === "image"
}
