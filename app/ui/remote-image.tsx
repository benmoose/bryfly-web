"use client"

import type { ImageProps } from "next/image"
import Image from "next/image"
import React from "react"
import { optimisedLoader, thumbnailLoader } from "lib/cloudinary/image-loader"
import type { Image as IImage } from "lib/cloudinary"

interface CdnProps
  extends Omit<
    ImageProps,
    "loader" | "src" | "width" | "height" | "placeholder" | "blurDataURL"
  > {
  image: IImage
}

export function Responsive({
  image,
  alt,
  ...props
}: CdnProps): React.ReactElement {
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

export function Thumbnail({
  image,
  alt,
  ...props
}: CdnProps): React.ReactElement {
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
