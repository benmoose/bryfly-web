"use client"

import { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, type MotionNodeOptions } from "motion/react"
import { ImagesContext } from "app/context"
import { imageLoader } from "app/components/cdn-image"

const bounceAnimation: Partial<MotionNodeOptions> = {
  transition: {
    type: "spring",
    stiffness: 900,
    mass: 1.4,
    damping: 10,
  },
  whileTap: {
    scale: 0.93,
    opacity: 0.55,
    transition: { duration: 0.06 },
  },
  whileFocus: { scale: 1.02 },
  whileHover: { scale: 1.02 },
}

const MotionLink = motion.create(Link)

export default function ImageGrid({ group }: { group: string }) {
  const { repo, groups } = useContext(ImagesContext)

  if (!groups[group]) {
    return null
  }

  return (
    <ul className="@container flex flex-wrap items-start">
      {groups[group]
        .map(id => repo[id])
        .map(image => (
          <li
            key={image.key}
            className="relative flex-auto portrait:h-[30vh] landscape:h-[40vh] basis-1/2 sm:basis-1/3"
          >
            <MotionLink
              {...bounceAnimation}
              initial={false}
              href={`/gallery/${image.publicId}`}
              className="w-full h-full max-h-full min-w-full p-0.5 inline-block scale-95"
            >
              <Image
                alt={image.key}
                loader={imageLoader}
                src={image.publicId}
                placeholder="blur"
                blurDataURL={image.placeholderUrl}
                height={image.height}
                width={image.width}
                className="w-full h-full object-cover align-bottom rounded-xl"
              />
            </MotionLink>
          </li>
        ))}
    </ul>
  )
}
