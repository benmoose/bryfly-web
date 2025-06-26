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
        <h1 className="text-6xl">
          <Gradient className="text-center text-balance">
            Disco Balls that Dazzle
          </Gradient>
        </h1>

        <p className="text-xl/8 font-medium text-pretty mx-auto max-w-2xl mb-3">
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
        For Hire
      </HeroLink>
      <HeroLink href="/commissions">Custom Commissions</HeroLink>
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
    <Link prefetch href={href} className="group transition">
      <div
        className={classNames("relative transition px-5.5 py-2 rounded-lg", {
          "bg-pink-400/5 group-hover:bg-pink-500/15": primary,
          "bg-slate-800/25 hover:bg-slate-800/30": !primary,
        })}
      >
        <span
          className={classNames(
            "tracking-wider break-keep transition text-[1.4rem] scale-100 group-hover:scale-125",
            {
              "font-bold text-transparent bg-clip-text bg-gradient-to-bl from-pink-600 to-pink-200 group-hover:from-pink-200 group-hover:to-pink-50":
                primary,
              "font-medium text-stone-200/80 group-hover:text-stone-50":
                !primary,
            },
          )}
        >
          {children}
        </span>
      </div>
    </Link>
  )
}
