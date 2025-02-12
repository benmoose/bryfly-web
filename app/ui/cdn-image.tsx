"use client"

import { Cloudinary } from "@cloudinary/url-gen"
import { name } from "@cloudinary/url-gen/actions/namedTransformation"
import {
  default as NextImage,
  type ImageProps,
  type ImageLoaderProps,
} from "next/image"
import type { ImageResource } from "lib/cloudinary"

const client = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true },
})

function imageUrl(publicId: string, namedTransformation: string): string {
  return client
    .image(publicId)
    .namedTransformation(name(namedTransformation))
    .format("auto")
    .setDeliveryType("private")
    .toURL()
}

export function imageLoader({ src, width }: ImageLoaderProps): string {
  return imageUrl(src, `${width}w`)
}

function thumbnailLoader({ src }: Pick<ImageLoaderProps, "src">): string {
  return imageUrl(src, "64w_thumb")
}

interface Props extends Partial<ImageProps> {
  image: ImageResource
}

export function CdnImage({ image, alt, className, ...props }: Props) {
  return (
    <NextImage
      {...props}
      loader={imageLoader}
      src={image.publicId}
      width={image.width}
      height={image.height}
      blurDataURL={image.placeholderUrl}
      placeholder="blur"
      alt={alt ?? ""}
      className={`object-contain ${className ?? ""}`}
    />
  )
}

export function CdnThumbnail({ image, alt, className, ...props }: Props) {
  return (
    <NextImage
      {...props}
      width={image.width}
      height={image.height}
      loader={thumbnailLoader}
      src={image.publicId}
      placeholder={image.placeholderUrl}
      className={`object-cover ${className ?? ""}`}
      alt={alt ?? ""}
    />
  )
}
