import { getHeroImages } from "lib/cloudinary"
import { cache } from "react"

export const getImages = cache(getHeroImages)
