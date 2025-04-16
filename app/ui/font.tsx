import { Montserrat_Alternates, DM_Serif_Text } from "next/font/google"

export const subtitle = Montserrat_Alternates({
  display: "auto",
  weight: "700",
  style: "italic",
  subsets: ["latin"],
})

export const display = DM_Serif_Text({
  display: "auto",
  weight: "400",
  subsets: ["latin"],
})
