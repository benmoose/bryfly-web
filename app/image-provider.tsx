"use client"

import { useReducer, type ReactNode } from "react"
import { ImagesContext } from "app/context"
import { createInitialState, reducer } from "app/reducer"
import type { Image } from "lib/cloudinary"

export default function ImageProvider({
  children,
  images,
}: {
  children: ReactNode
  images: Image[]
}) {
  const [imageState] = useReducer(reducer, images, createInitialState)
  return (
    <ImagesContext.Provider value={imageState}>
      {children}
    </ImagesContext.Provider>
  )
}
