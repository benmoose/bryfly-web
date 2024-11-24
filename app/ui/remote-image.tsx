'use client'

import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { optimisedLoader, thumbnailLoader } from 'app/image-loader'

export function RemoteImage (props: ImageProps) {
  return <Image {...props} loader={optimisedLoader} />
}

export function Thumbnail (props: ImageProps) {
  return <Image {...props} loader={thumbnailLoader} />
}
