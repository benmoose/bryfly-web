import { createContext } from "react"
import { initialState } from "./reducer"

export const ImagesContext = createContext(initialState)
export const ImagesDispatchContext = createContext(null)
