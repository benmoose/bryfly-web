import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { getImageGroups } from "lib/cloudinary"
import ImagesProvider from "app/image-provider"

import "./global.css"

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
  applicationName: "BryFly: Bespoke Disco Balls",
  authors: [
    { name: "Ben Hadfield", url: "https://github.com/benmoose" },
    { name: "Bryony Conroy", url: "https://instagram.com/bryfly2000" },
  ],
  robots: "index, follow",
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
  const groups = await getImageGroups()
  return (
    <html lang="en">
      <body className="bg-stone-950 antialiased selection:bg-pink-300 selection:text-pink-950">
        <ImagesProvider groups={groups}>
          {modal}
          {children}
        </ImagesProvider>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

function Footer() {
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
