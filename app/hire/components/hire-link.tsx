import { use } from "react"
import Link from "next/link"
import { CdnImage } from "app/components/cdn-image"
import type { ImageResource } from "lib/cloudinary"

export default function HireLink({
  title,
  href,
  image,
}: {
  title: string
  href: string
  image: Promise<ImageResource[]>
  text: string
}) {
  const images = use(image)
  return (
    <Link
      href={href}
      className="@container group flex flex-col justify-start gap-2"
    >
      <CdnImage
        image={images[0]}
        className="relative object-cover object-center aspect-square transition duration-150
          rounded-4xl group-hover:rounded-2xl rounded-bl-xl group-hover:rounded-bl-sm 
          scale-100 group-hover:scale-105 brightness-100 group-hover:brightness-120"
      />
      <p
        className="mt-2 text-center text-stone-300 group-hover:font-semibold
        group-hover:text-stone-50 transition-colors duration-150"
      >
        {title}
      </p>
    </Link>
  )
}
