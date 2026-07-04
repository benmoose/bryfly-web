import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import Logo from "public/bryfly-logo-1.png"
import { H3 } from "app/components/text"

export default function Nav({ tagline = false }: { tagline?: boolean }) {
  const logoSize = {
    small: tagline ? 240 : 140,
    big: tagline ? 280 : 170,
  }

  return (
    <nav className="flex justify-between items-center w-full px-6 py-3 mt-3 mb-12 gap-4">
      <Link
        href="/"
        className={`flex flex-col flex-initial items-center gap-6
          max-w-[${logoSize.small}px] sm:max-w-[${logoSize.big}px]`}
      >
        <Image
          priority
          src={Logo}
          alt="The BryFly logo"
          className="w-full"
          sizes={`(max-width: 640px) ${logoSize.small}px, ${logoSize.big}px`}
        />
        {tagline && (
          <H3 className="relative w-full text-center text-[0.9rem] -top-2 m-0">
            Where Light Takes Flight
          </H3>
        )}
      </Link>
      <div className="flex justify-end gap-3 sm:gap-6 text-right flex-initial">
        <HeroLink href="/hire" primary>
          Hire
        </HeroLink>
        <HeroLink href="/commissions">Commission</HeroLink>
      </div>
    </nav>
  )
}

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
    <Link prefetch href={href} className="group">
      <span
        className={classNames(
          "scale-100 group-hover:scale-105",
          "font-medium text-[0.98rem] sm:text-[1.18rem] tracking-wider break-keep transition",
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
