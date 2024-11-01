/* eslint-disable no-unused-vars */
import {APIResource} from "./cloudinary";

export interface ImageProps extends APIResource {
  index?: number
  blurDataUrl?: string
  context?: object
}

export interface SharedModalProps {
  activeIndex: number
  images?: ImageProps[]
  currentPhoto?: ImageProps
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}
