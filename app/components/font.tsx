import {
  Aladin,
  Rubik_Iso,
  Rubik_Mono_One,
  Rubik_Maps,
  Finger_Paint,
  Darumadrop_One,
} from "next/font/google"

export const rubik = Darumadrop_One({
  display: "swap",
  weight: "400",
})

export const chelsea = Aladin({
  display: "auto",
  weight: "400",
})

export const fingerPaint = Finger_Paint({
  display: "auto",
  weight: "400",
  subsets: ["latin"],
})

export const josefin = Darumadrop_One({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
})
