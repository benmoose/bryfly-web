"use client"

import { useContext } from "react"
import Link from "next/link"
import { CdnImage } from "app/components/cdn-image"
import { H3, P, GradientText } from "app/ui/text"
import { ImagesContext } from "app/context"
import type { ImageResource } from "lib/cloudinary"

export default function HireLinks() {
  const { repo, groups } = useContext(ImagesContext)
  const groupNames = Object.keys(groups)
  return (
    <div className="@container columns-1 @xl:columns-2 @4xl:columns-3">
      <div className="columns-1 @xl:columns-2 @4xl:columns-3 *:mb-3">
        {groupNames.map(name => (
          <HireLink
            key={`${name}-${groups[name].length}`}
            title={name}
            image={repo[groups[name][0]]}
            href=""
            text={`Placeholder text for ${name}...`}
          />
        ))}
      </div>
    </div>
  )
}

function HireLink({
  title,
  href,
  image,
  text,
}: {
  title: string
  href: string
  image?: ImageResource
  text: string
}) {
  return (
    <div className="flex flex-col items-start">
      <H3 className="mb-3">{title}</H3>
      <div className="relative w-full px-3 py-6">
        {image && (
          <div className="absolute -z-50 bg-gradient-to-br from-sky-950/85 to-slate-900/70 inset-0 overflow-hidden rounded-md">
            <CdnImage image={image} />
          </div>
        )}
        <P className="text-stone-200 text-lg font-medium">{text}</P>
        <GradientText>
          <Link href={href}>More info</Link>
        </GradientText>
      </div>
    </div>
  )
}
