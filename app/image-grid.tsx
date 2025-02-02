"use client"

import { type ReactNode, useContext } from "react"
import Link from "next/link"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cdn-image"
import { motion } from "motion/react"

const MotionLink = motion.create(Link)

export default function ImageGrid({
  children,
  group,
  showTitle = true,
}: {
  children?: ReactNode
  group: string
  showTitle?: boolean
}) {
  const { repo, groups } = useContext(ImagesContext)
  const groupImages = groups[group]

  if (!groupImages) {
    return null
  }

  const grid = groupImages
    .map(publicId => repo[publicId])
    .map(image => (
      <MotionLink
        key={image.key}
        tabIndex={0}
        initial={false}
        whileTap={{
          scale: 0.96,
          opacity: 0.61,
          transition: { duration: 0.08 },
        }}
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "spring",
          bounce: 0.38,
          duration: 0.2,
          mass: 0.5,
          damping: 5,
        }}
        href={`/gallery/${image.publicId}`}
        className="after:content group relative mb-5 block w-full cursor-zoom-in
          after:pointer-events-none after:absolute after:inset-0 rounded-lg overflow-x-hidden
          transition-[outline] outline-2 outline-offset-4 outline-transparent
          focus:outline-slate-100"
      >
        <CdnImage
          image={image}
          className="transition transform brightness-90 will-change-auto
                  group-hover:brightness-115 group-focus:brightness-115"
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  (max-width: 1960px) 25vw,
                  490px"
          alt={`Photo ${image.key}`}
        />
      </MotionLink>
    ))

  return (
    <>
      {showTitle && (
        <h1 className="text-4xl font-bold tracking-wide mb-2">{group}</h1>
      )}
      <div className="gap-4 columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 mb-8">
        {children}
        {grid}
      </div>
    </>
  )
}
