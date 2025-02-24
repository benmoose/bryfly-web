"use client"

import { type ReactNode, useContext } from "react"
import Link from "next/link"
import { ImagesContext } from "app/context"
import { display } from "app/ui/font"
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
          scale: 0.93,
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
        className="group relative block w-full cursor-zoom-in rounded-lg
        overflow-x-hidden transition-[outline] outline-2 outline-offset-4
        outline-transparent scale-98
        focus:outline-slate-100/95"
      >
        <CdnImage
          image={image}
          className="transition transform brightness-85 will-change-auto
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
        <h1
          className={`${display.className} text-3xl md:text-5xl tracking-tight mb-3 text-slate-200`}
        >
          {group}
        </h1>
      )}
      <div className="columns-1 @md:columns-2 @2xl:columns-3 @6xl:columns-4 gap-3 mb-8 *:mb-3">
        {children}
        {grid}
      </div>
    </div>
  )
}
