import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { H3 } from "app/components/text"
import Logo from "public/bryfly-logo-1.png"

export default function Nav({ tagline = false }: { tagline?: boolean }) {
  const logoSize = {
    small: tagline ? 240 : 140,
    big: tagline ? 280 : 170,
  }

  return (
    <nav className="flex justify-between w-full px-6 py-9 mb-12">
      <HeroLink href="/hire" primary>
        Hire
      </HeroLink>
      <Link
        href="/"
        className={`inline-flex flex-col items-stretch mx-auto
        max-w-[${logoSize.small}px] sm:max-w-[${logoSize.big}px]`}
      >
        <Image
          priority
          src={Logo}
          alt="The BryFly logo"
          className="w-full"
          sizes={`(max-width: 640px) ${logoSize.small}px, ${logoSize.big}px`}
        />
      </Link>
      <HeroLink href="/commissions">Commissions</HeroLink>
    </nav>
  )
}

/**
 * 
 * {tagline && (
          <H3
            className="relative inline-block w-full text-center uppercase
              tracking-wide text-pink-100 text-[0.84rem] sm:text-base -top-1"
          >
            Where light takes flight
          </H3>
        )}
 */

function HeroLink({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode
  href: string
  primary?: boolean
}) {
  return (
    <Link prefetch href={href} className="group transition">
      <span
        className={classNames(
          "px-3 font-semibold text-[1.4rem] tracking-wider break-keep transition",
          {
            "text-transparent bg-clip-text bg-gradient-to-bl from-pink-600 to-pink-200 group-hover:from-pink-200 group-hover:to-pink-50":
              primary,
            "text-stone-100/80 group-hover:text-stone-50": !primary,
          },
        )}
      >
        {children}
      </span>
    </Link>
  )
}
