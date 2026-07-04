import { Aladin, Darumadrop_One } from "next/font/google"

export const darumadrop = Darumadrop_One({
  preload: true,
  display: "swap",
  subsets: ["latin"],
  weight: "400",
})

export const aladin = Aladin({
  display: "auto",
  subsets: ["latin"],
  weight: "400",
})
