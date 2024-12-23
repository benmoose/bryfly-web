import React from "react"
import Image from "next/image"
import BryFlyLogo from "public/bryfly-logo.png"

export default function Logo(): React.ReactElement {
  return (
    <Image
      priority
      src={BryFlyLogo}
      alt="BryFly logo."
      sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            (max-width: 1960px) 25vw,
            490px"
    />
  )
}
