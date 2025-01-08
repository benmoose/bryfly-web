import { Cloudinary } from "@cloudinary/url-gen"
import { name } from "@cloudinary/url-gen/actions/namedTransformation"
import type { ImageLoaderProps } from "next/image"

const client = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true },
})

export function optimisedLoader({ src, width }: ImageLoaderProps): string {
  return client
    .image(src)
    .namedTransformation(name(`${width}w`))
    .format("auto")
    .setDeliveryType("private")
    .toURL()
}

export function thumbnailLoader({ src }: ImageLoaderProps): string {
  return client
    .image(src)
    .namedTransformation(name("64w_thumb"))
    .format("auto")
    .setDeliveryType("private")
    .toURL()
}
