import { createContext } from "react"
import { initialiseState } from "app/reducer"

export const ImagesContext = createContext(initialiseState())
