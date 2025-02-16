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

  if (!groups[group]) {
    return null
  }

  const grid = groups[group]
    .map(id => repo[id])
    .map(image => (
      <MotionLink
        key={image.key}
        tabIndex={0}
        initial={false}
        whileTap={{
          scale: 0.94,
          opacity: 0.55,
          transition: { duration: 0.06 },
        }}
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "spring",
          stiffness: 900,
          mass: 1.4,
          damping: 10,
        }}
        href={`/gallery/${image.publicId}`}
        className="after:content group relative block w-full cursor-zoom-in
          after:pointer-events-none after:absolute after:inset-0 rounded-lg overflow-x-hidden
          transition-[outline] outline-2 outline-offset-4 outline-transparent
          focus:outline-slate-100"
      >
        <CdnImage
          image={image}
          className="transition transform brightness-90 will-change-auto
                  group-hover:brightness-115 group-focus:brightness-115"
          sizes="(max-width: 448px) 100vw,
                  (max-width: 672px) 50vw,
                  (max-width: 1152px) 33vw,
                  (max-width: 1920px) 25vw,
                  480px"
          alt={`Photo ${image.key}`}
        />
      </MotionLink>
    ))
  return (
    <div className="@container">
      {showTitle && (
        <h1 className="text-4xl font-bold tracking-wide mb-2">{group}</h1>
      )}
      <div className="columns-1 @md:columns-2 @2xl:columns-3 @6xl:columns-4 gap-3 mb-8 *:mb-3">
        {children}
        {grid}
      </div>
    </div>
  )
}
