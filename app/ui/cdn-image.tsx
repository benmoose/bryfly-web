"use client"

import { Cloudinary } from "@cloudinary/url-gen"
import { name } from "@cloudinary/url-gen/actions/namedTransformation"
import Image, { type ImageProps, type ImageLoaderProps } from "next/image"
import type { Image as ImageT } from "lib/cloudinary"

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

type Props = { image: ImageT } & Partial<ImageProps>

export function CdnImage({ image, alt, className, ...props }: Props) {
  return (
    <Image
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
    <Image
      {...props}
      width={image.width}
      height={image.height}
      loader={thumbnailLoader}
      src={image.publicId}
      placeholder={image.placeholderUrl}
      className={`object-cover ${className ?? ""}`}
      alt={alt ?? ""}
      sizes="64px"
    />
  )
}
