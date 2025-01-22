import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cache, type ReactNode, type ReactElement } from "react"
import type { Metadata, Viewport } from "next"
import { getHeroImages } from "lib/cloudinary"
import ImageProvider from "app/image-provider"

import "./styles.css"

const getImages = cache(getHeroImages)

export const metadata: Metadata = {
  title: "BryFly",
  description: "Bespoke disco balls.",
  keywords: ["disco", "balls", "sculpture", "portfolio", "artist", "london"],
  openGraph: {
    title: "BryFly: Bespoke Disco Balls",
    siteName: "BryFly: Bespoke Disco Balls",
    description: "Bespoke disco balls.",
  },
  creator: "Ben Hadfield",
}

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1.0,
}

export default async function RootLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  const images = await getImages()
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        <ImageProvider images={images}>
          {children}
          {modal}
        </ImageProvider>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

function Footer(): ReactElement {
  return (
    <footer className="p-4 text-sm text-center text-white/35 sm:p-8 tracking-wide">
      made by{" "}
      <a
        href="https://instagram.com/_benmoose"
        target="_blank"
        rel="noreferrer"
        className="font-bold text-white/40 hover:text-white/50"
      >
        Moose
      </a>
    </footer>
  )
}
