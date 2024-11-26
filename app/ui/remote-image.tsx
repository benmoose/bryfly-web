'use client'

import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { optimisedLoader, thumbnailLoader } from 'services/cloudinary/image-loader'

export function RemoteImage (props: ImageProps) {
  return <Image {...props} loader={optimisedLoader} alt='optimised image' />
}

export function Thumbnail (props: ImageProps) {
  return <Image {...props} loader={thumbnailLoader} sizes='128w' alt='thumbnail' />
}
