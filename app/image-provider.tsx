"use client"

import { useReducer, type ReactNode } from "react"
import { ImagesContext } from "app/context"
import { initialiseState, reducer } from "app/reducer"
import type { Image } from "lib/cloudinary"

export default function ImagesProvider({
  children,
  groups,
}: {
  children: ReactNode
  groups: { [group: string]: Image[] }
}) {
  const [imageState] = useReducer(reducer, groups, initialiseState)
  return (
    <ImagesContext.Provider value={imageState}>
      {children}
    </ImagesContext.Provider>
  )
}
