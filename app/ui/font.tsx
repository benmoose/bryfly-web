import { Bangers, Finger_Paint } from "next/font/google"

const handwritten = Finger_Paint({
  display: "auto",
  weight: "400",
  subsets: ["latin"],
})

const comic = Bangers({
  display: "auto",
  weight: "400",
  subsets: ["latin"],
})

export const fonts = {
  heading: comic,
  handwritten: handwritten,
}
