import classNames from "classnames"
import { type ReactNode } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import ImageGrid from "app/components/image-grid"
import { Gradient } from "app/components/text"
import ImagesProvider from "app/image-provider"
import { siteUrl } from "app/utils"
import { getImages } from "lib/cloudinary"

export const metadata: Metadata = {
  bookmarks: siteUrl.href,
}

export default async function Page() {
  const hero = await getImages("hero")

  return (
    <div className="container flex flex-col mx-auto">
      <main className="flex flex-col gap-6 mb-18 items-center text-center mx-auto">
        <h1 className="text-4xl sm:text-5xl">
          <Gradient bold className="text-center">
            Disco Balls Like No Other
          </Gradient>
        </h1>

        <p className="text-lg/8 sm:text-xl/8 font-medium mx-auto max-w-2xl mb-3">
          Delight your audience with a unique BryFly creation! Hire an existing
          design or commission a bespoke piece, designed with you, perfectly
          tailored to bring magic to your event.
        </p>
        <HeroLinks />
      </main>

      <ImagesProvider groups={{ hero }}>
        <ImageGrid group="hero" />
      </ImagesProvider>
    </div>
  )
}

function HeroLinks() {
  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      <HeroLink href="/hire" primary>
        Hire
      </HeroLink>
      <HeroLink href="/commissions">Commission</HeroLink>
    </div>
  )
}

function HeroLink({
  children,
  href,
  primary = false,
}: {
  children: ReactNode
  href: string
  primary?: boolean
}) {
  return (
    <Link prefetch href={href} className="group">
      <div
        className={classNames(
          "relative transition px-4.5 sm:px-7.5 py-2 rounded-xl",
          {
            "bg-pink-400/5 group-hover:bg-pink-600/15": primary,
            "bg-slate-800/25 hover:bg-slate-700/30": !primary,
          },
        )}
      >
        <span
          className={classNames(
            "relative inline-block tracking-wider transition text-[1rem] sm:text-[1.28rem] font-semibold break-keep",
            "scale-100 group-hover:scale-105",
            {
              "text-transparent bg-clip-text bg-gradient-to-bl from-pink-600 to-pink-300 group-hover:from-pink-200 group-hover:to-pink-50":
                primary,
              "text-stone-200/80 group-hover:text-stone-50": !primary,
            },
          )}
        >
          {children}
        </span>
      </div>
    </Link>
  )
}
