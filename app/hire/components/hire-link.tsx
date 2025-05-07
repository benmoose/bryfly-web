"use client"

import { useContext } from "react"
import Link from "next/link"
import { CdnImage } from "app/components/cdn-image"
import { H3 } from "app/ui/text"
import { ImagesContext } from "app/context"

export default function HireLink({
  title,
  href,
  text,
}: {
  title: string
  href: string
  image?: string
  text: string
}) {
  const { repo } = useContext(ImagesContext)
  const images = Object.values(repo)
  const r = Math.floor(Math.random() * images.length)
  return (
    <div className="flex flex-col items-start">
      <H3 className="mb-3">{title}</H3>
      <div className="relative w-full px-3 py-6">
        <div className="-z-50 absolute inset-0 bg-amber-50 overflow-hidden rounded-md">
          <CdnImage image={images[r]} />
        </div>
        <p className="text-stone-200 text-lg font-medium">{text}</p>
        <Link href={href} className="text-pink-500 font-bold">
          More info ▶︎
        </Link>
      </div>
    </div>
  )
}
