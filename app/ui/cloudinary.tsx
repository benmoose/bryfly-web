"use client"

import Image, { type ImageProps } from "next/image"
import {
  cloudinaryImageLoader,
  cloudinaryThumbnailLoader,
} from "app/lib/cloudinary/loader"
import type { Image as ImageT } from "app/lib/cloudinary"

type Props = { image: ImageT } & Omit<
  ImageProps,
  "loader" | "src" | "width" | "height" | "placeholder" | "blurDataURL"
>

export function CdnImage({ image, alt, ...props }: Props) {
  return (
    <Image
      {...props}
      loader={cloudinaryImageLoader}
      src={image.publicId}
      width={image.width}
      height={image.height}
      blurDataURL={image.placeholderUrl}
      placeholder="blur"
      alt={alt}
    />
  )
}

export function Thumbnail({ image, alt, className, ...props }: Props) {
  return (
    <Image
      {...props}
      loader={cloudinaryThumbnailLoader}
      src={image.publicId}
      width={image.width}
      height={image.height}
      sizes="64w"
      alt={alt}
      className={`object-cover w-[60px] h-[50px] bg-slate-200/20 rounded ${className ?? ""}`}
    />
  )
}
