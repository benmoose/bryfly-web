import Image from "next/image"
import Link from "next/link"
import { H3 } from "app/ui/text"
import BryFlyLogo from "public/bryfly-logo-1.png"

export function Masthead({ tagline = false }: { tagline?: boolean }) {
  return (
    <Link href="/" className="block">
      <Image
        loading="eager"
        src={BryFlyLogo}
        alt="BryFly logo"
        className="max-w-md w-full"
        sizes="(max-width: 448px) 100w, 448px"
      />
      {tagline && (
        <H3
          className="pt-0 mx-3 text-center uppercase tracking-wider
            text-pink-50/70 text-[1.05rem] md:text-[1.6rem]"
        >
          Where light takes flight
        </H3>
      )}
    </Link>
  )
}

export function SocialLinks() {
  return (
    <div
      className="flex flex-row justify-center items-center gap-3 md:gap-4
      text-lg xl:text-xl text-center
      *:inline-block tracking-wide"
    >
      <Link
        className="text-stone-200/80 hover:text-stone-50 font-medium
        transition break-keep border-none tracking-wider
        underline underline-offset-9 decoration-2 hover:decoration-4
        decoration-stone-500 hover:decoration-stone-400"
        href="https://www.instagram.com/bryfly2000"
        target="_blank"
        rel="noreferrer"
      >
        Commissions
      </Link>
      <Link
        prefetch
        className="transition px-3 font-bold border-0
        underline underline-offset-9 tracking-wider hover:scale-105
        decoration-2 hover:decoration-4 decoration-pink-400/60 hover:decoration-pink-300
        text-transparent bg-clip-text bg-gradient-to-bl from-pink-600/90 to-pink-300
        border-pink-400/80 hover:border-pink-300 hover:from-pink-500 hover:to-pink-100"
        href="/hire"
      >
        Available to Hire
      </Link>
    </div>
  )
}
