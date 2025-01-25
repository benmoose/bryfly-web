"use client"

import { useContext } from "react"
import Link from "next/link"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cdn-image"
import { motion } from "motion/react"

const MotionLink = motion.create(Link)

export default function ImageGrid({ group }: { group: string }) {
  const { repo, groups } = useContext(ImagesContext)
  const images = groups[group].map(publicId => repo[publicId])

  return images.map(image => (
    <MotionLink
      key={image.key}
      tabIndex={0}
      initial={false}
      whileTap={{
        scale: 0.94,
        transition: {
          type: "spring",
          weight: 2,
          duration: 0.1,
        },
      }}
      whileFocus={{ scale: 1.02 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.14 }}
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
}
