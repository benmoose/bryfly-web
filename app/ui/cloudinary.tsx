"use client"

import Image, { type ImageProps } from "next/image"
import {
  optimisedLoader,
  thumbnailLoader,
} from "app/lib/cloudinary/image-loader"
import type { Image as ImageInfo } from "app/lib/cloudinary"

type Props = { image: ImageInfo } & Omit<
  ImageProps,
  "loader" | "src" | "width" | "height" | "placeholder" | "blurDataURL"
>

export function CdnImage({ image, alt, ...props }: Props) {
  return (
    <Image
      {...props}
      src={image.publicId}
      loader={optimisedLoader}
      width={image.width}
      height={image.height}
      blurDataURL={image.placeholderUrl}
      placeholder="blur"
      alt={alt ?? ""}
    />
  )
}

export function Thumbnail({ image, alt, ...props }: Props) {
  return (
    <Image
      {...props}
      fill
      src={image.publicId}
      loader={thumbnailLoader}
      width={128}
      height={128}
      sizes="128w"
      alt={alt ?? ""}
    />
  )
}
