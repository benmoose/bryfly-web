import classNames from "classnames"
import { type ReactNode } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import ImageGrid from "app/components/image-grid"
import { P, Gradient } from "app/components/text"
import ImagesProvider from "app/image-provider"
import { siteUrl } from "app/utils"
import { getImages } from "lib/cloudinary"

export const metadata: Metadata = {
  bookmarks: siteUrl.href,
}

export default async function Page() {
  const hero = await getImages("hero")

  return (
    <div className="container flex flex-col gap-9 mx-auto">
      <Gradient className="text-center text-[2.1rem] sm:text-4xl text-balance py-2">
        Bring Your Space to Life
      </Gradient>
      <div
        className="flex flex-col gap-3 px-3 md:px-6 pb-9
          items-center text-center max-w-xl mx-auto"
      >
        <P className="pb-5">
          Delight your audience with a unique BryFly creation. Hire an existing
          design or commission a bespoke piece, designed with you, perfectly
          tailored to bring magic to your event.
        </P>
        <HeroLinks />
      </div>
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
      <HeroLink href="/commissions">Commissions</HeroLink>
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
  const background = primary
    ? "bg-pink-900/15 hover:bg-pink-900/25"
    : "bg-slate-800/25 hover:bg-slate-800/30"
  const text = primary
    ? "font-bold text-transparent bg-clip-text bg-gradient-to-bl from-pink-600/90 to-pink-300 border-pink-400/80 group-hover:border-pink-300 group-hover:from-pink-500 group-hover:to-pink-100"
    : "font-medium text-stone-200/80 group-hover:text-stone-50"
  return (
    <Link
      prefetch
      href={href}
      className={classNames(
        "group px-5.5 py-2 rounded-lg transition duration-100ms",
        background,
      )}
    >
      <span
        className={classNames(
          "tracking-widest break-keep transition duration-100ms text-xl",
          text,
        )}
      >
        {children}
      </span>
    </Link>
  )
}
