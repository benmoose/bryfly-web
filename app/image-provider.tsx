"use client"

import { useReducer } from "react"
import { ImagesContext } from "app/context"
import { reducer, type State } from "app/reducer"
import type { Image } from "app/lib/cloudinary"

function createInitialState(images: Image[]): State {
  return {
    repo: images.reduce(
      (acc, image) => ({ ...acc, [image.publicId]: image }),
      {},
    ),
    groups: {
      hero: images.map(image => image.publicId),
    },
    order: ["hero"],
  }
}

export default function ImageProvider({
  children,
  images,
}: {
  children: React.ReactNode
  images: Image[]
}) {
  const [imageState] = useReducer(reducer, images, createInitialState)
  return (
    <ImagesContext.Provider value={imageState}>
      {children}
    </ImagesContext.Provider>
  )
}
