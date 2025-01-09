"use client"

import { Cloudinary } from "@cloudinary/url-gen"
import { name } from "@cloudinary/url-gen/actions/namedTransformation"
import type { ImageLoaderProps } from "next/image"
import { cache } from "react"

const client = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true },
})

const enum ThumbSize {
  small = "64w_thumb",
  large = "128w_thumb",
}

function imageLoader({ src, width }: ImageLoaderProps): string {
  return client
    .image(src)
    .namedTransformation(name(`${width}w`))
    .format("auto")
    .setDeliveryType("private")
    .toURL()
}

function thumbnailLoader({ src }: ImageLoaderProps): string {
  return client
    .image(src)
    .namedTransformation(name(ThumbSize.small))
    .format("auto")
    .setDeliveryType("private")
    .toURL()
}

export const cloudinaryImageLoader = cache(imageLoader)
export const cloudinaryThumbnailLoader = cache(thumbnailLoader)
