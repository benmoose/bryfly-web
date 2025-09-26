import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { getImageGroups } from "lib/cloudinary"
import ImagesProvider from "app/image-provider"
import { siteUrl } from "app/utils"
import Nav from "app/components/nav"

import "./global.css"

export const metadata: Metadata = {
  title: {
    default: "Disco Balls | BryFly",
    template: "%s | BryFly",
  },
  description: "Unique disco ball sculptures available to commission or hire.",
  keywords: ["disco", "balls", "sculpture", "portfolio", "artist", "london"],
  metadataBase: siteUrl,
  applicationName: "BryFly",
  openGraph: {
    title: "Disco Balls | BryFly",
    siteName: "BryFly",
    description:
      "Unique disco ball sculptures available to commission or hire.",
  },
  twitter: {
    title: "BryFly",
    description:
      "Unique disco ball sculptures available to commission or hire.",
  },
  alternates: { canonical: "/" },
  authors: [
    { name: "Ben Hadfield", url: "https://github.com/benmoose" },
    { name: "Bryony Conroy", url: "https://instagram.com/bryfly2000" },
  ],
  creator: "Ben Hadfield",
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
      <body className="antialiased bg-stone-950 text-stone-50 selection:bg-pink-300 selection:text-purple-950">
        <Nav />
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
