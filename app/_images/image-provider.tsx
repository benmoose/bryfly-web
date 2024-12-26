"use client"

import React, { use, useReducer } from "react"
import type { Image } from "lib/cloudinary"
import { initialState, reducer, addImages, addGroup } from "app/_images/reducer"
import { ImagesContext } from "./context"

export default function ImageProvider({
  children,
  imagesStream,
}: {
  children: React.ReactNode
  imagesStream: Promise<Image[]>
}) {
  const _images = use(imagesStream)
  const [images, dispatch] = useReducer(reducer, initialState)

  function handleAddImages(images: Image[]) {
    dispatch(addImages(images))
  }

  function handleAddGroup(name: string, members: string[]) {
    dispatch(addGroup(name, members))
  }

  handleAddImages(_images)
  handleAddGroup(
    "hero",
    _images.map(image => image.publicId),
  )

  return (
    <ImagesContext.Provider value={images}>
      {/*<ImagesDispatchContext.Provider value={dispatch}>*/}
      {children}
      {/*</ImagesDispatchContext.Provider>*/}
    </ImagesContext.Provider>
  )
}
