import Link from "next/link"
import React from "react"
import { Responsive } from "app/ui/remote-image"
import Logo from "app/ui/logo.tsx"
import { concertOne } from "app/ui/font.ts"
import { getImages } from "app/images"
import { Image } from "lib/cloudinary"

export default async function Page() {
  const images = await getImages()
  return (
    <main className="mx-auto max-w-[1960px] p-4 w-full">
      <div className="gap-4 columns-1 sm:columns-2 xl:columns-3 2xl:columns-4">
        <BryFlyHeroBox />
        <ImageGrid images={images} />
      </div>
    </main>
  )
}

function BryFlyHeroBox() {
  return (
    <div
      className="after:content relative mb-5 flex h-[380px] lg:h-[430px] 2xl:h-[392px]
        flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10
        px-6 pb-20 pt-64 text-center text-white shadow-highlight after:pointer-events-none a
        fter:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0"
    >
      <Logo />
      <h1
        style={concertOne.style}
        className="mt-0 mb-4 text-3xl sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl
            uppercase tracking-wider"
      >
        Browse me disco balls
      </h1>
      <div className="flex items-center z-10 text-base mt-3 gap-2">
        <a
          className="pointer border border-white/15 bg-transparent px-3 py-2 rounded
           font-semibold text-white/85 transition hover:bg-white/5 hover:border-white/60
            hover:text-white"
          href="https://www.instagram.com/bryfly2000"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          className="pointer border border-white bg-cyan-50 px-5 py-2 rounded
            font-bold text-black transition hover:border-cyan-200 hover:bg-pink-50"
          href="https://github.com/benmoose/bryfly-web"
        >
          Contact!
        </a>
      </div>
    </div>
  )
}

function ImageGrid({ images }: { images: readonly Image[] }) {
  return images.map((image) => (
    <Link
      key={image.key}
      id={`i${image.index}`}
      href={`/gallery/${image.publicId}`}
      scroll={false}
      className="after:content group relative mb-5 block w-full cursor-zoom-in
                after:pointer-events-none after:absolute after:inset-0 after:rounded-xl"
    >
      <Responsive
        priority
        image={image}
        className="transform rounded-xl brightness-90 transition will-change-auto
                  group-hover:brightness-110"
        sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  (max-width: 1960px) 25vw,
                  490px"
        alt={`Image ${image.key}`}
      />
    </Link>
  ))
}
