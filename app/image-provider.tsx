"use client"

import { type ReactNode, useReducer } from "react"
import { ImagesContext } from "app/context"
import { initialiseState, reducer } from "app/reducer"
import type { ImageResource } from "lib/cloudinary"

export default function ImagesProvider({
  children,
  groups,
}: {
  children: ReactNode
  groups: { [group: string]: ImageResource[] }
}) {
  const [imageState] = useReducer(reducer, groups, initialiseState)
  return (
    <ImagesContext.Provider value={imageState}>
      {children}
    </ImagesContext.Provider>
  )
}
