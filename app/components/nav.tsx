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
    <nav className="flex w-full py-3 bg-white/7 mb-12">
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
        {tagline && (
          <H3
            className="relative inline-block w-full text-center uppercase
              tracking-wide text-pink-100 text-[0.84rem] sm:text-base -top-1"
          >
            Where light takes flight
          </H3>
        )}
      </Link>
    </nav>
  )
}
