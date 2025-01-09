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

function imageLoader({ src, width }: ImageLoaderProps): string {
  return imageUrl(src, `${width}w`)
}

function thumbnailLoader({ src }: Pick<ImageLoaderProps, "src">): string {
  return imageUrl(src, "64w_thumb")
}

type Props = { image: ImageT } & Partial<ImageProps>

export function CdnImage({ image, alt, ...props }: Props) {
  return (
    <Image
      {...props}
      src={image.publicId}
      loader={imageLoader}
      width={image.width}
      height={image.height}
      blurDataURL={image.placeholderUrl}
      placeholder="blur"
      alt={alt ?? `Photo ${image.key}`}
    />
  )
}

export function CdnThumbnail({ image, alt, className, ...props }: Props) {
  return (
    <Image
      {...props}
      src={image.publicId}
      loader={thumbnailLoader}
      width={image.width}
      height={image.height}
      placeholder={image.placeholderUrl}
      className={`object-cover w-[60px] h-[52px] bg-slate-200/20 ${className ?? ""}`}
      overrideSrc={imageUrl(image.publicId, "64w_thumb")}
      sizes="64px"
      alt={alt ?? `Thumbnail ${image.key}`}
    />
  )
}
