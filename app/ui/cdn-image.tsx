"use client"

import { Cloudinary } from "@cloudinary/url-gen"
import { name } from "@cloudinary/url-gen/actions/namedTransformation"
import Image, { type ImageProps, type ImageLoaderProps } from "next/image"
import type { Image as ImageT } from "app/lib/cloudinary"

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

type Props = { image: ImageT } & Omit<
  ImageProps,
  "loader" | "src" | "width" | "height" | "placeholder" | "blurDataURL"
>

export function CdnImage({ image, alt, ...props }: Props) {
  return (
    <Image
      {...props}
      loader={imageLoader}
      src={image.publicId}
      width={image.width}
      height={image.height}
      blurDataURL={image.placeholderUrl}
      placeholder="blur"
      alt={alt}
    />
  )
}

export function CdnThumbnail({ image, alt, ...props }: Props) {
  return (
    <Image
      {...props}
      loader={thumbnailLoader}
      src={image.publicId}
      width={image.width}
      height={image.height}
      placeholder={image.placeholderUrl}
      className="object-cover w-[60px] h-[52px] bg-slate-200/20 rounded"
      overrideSrc={imageUrl(image.publicId, "64w_thumb")}
      alt={alt}
    />
  )
}
