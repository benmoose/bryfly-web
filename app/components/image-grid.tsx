"use client"

import { type ReactNode, useContext } from "react"
import classNames from "classnames"
import Link from "next/link"
import { motion } from "motion/react"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/components/cdn-image"
import { H2 } from "app/ui/text"

const MotionLink = motion.create(Link)

export default function ImageGrid({
  children,
  title,
  group,
}: {
  children?: ReactNode
  title?: string
  group: string
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
        className={classNames(
          `group relative w-full cursor-zoom-in rounded-lg
          overflow-x-hidden transition-[outline] outline-2 outline-offset-4
          outline-transparent scale-98 focus:outline-slate-100/95`,
          { "order-1": image.index === 2 },
        )}
      >
        <CdnImage
          image={image}
          className="transition transform brightness-85 will-change-auto
          group-hover:brightness-115 group-focus:brightness-115"
          sizes="(max-width: 448px) 100vw,
          (max-width: 672px) 50vw,
          640px"
          alt={`Photo ${image.key}`}
        />
      </MotionLink>
    ))

  return (
    <>
      {title && <H2 className="mb-3 text-stone-100">{title}</H2>}
      {children}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
        {grid}
      </div>
    </>
  )
}
