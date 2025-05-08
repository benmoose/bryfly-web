import Image from "next/image"
import font from "app/ui/font"
import Link from "next/link"
import BryFlyLogo from "public/bryfly-logo-1.png"

export function Masthead({
  className,
  tagline = false,
}: {
  className?: string
  tagline?: boolean
}) {
  const bryflyLogo = (
    <div className="flex flex-col">
      <Image
        loading="eager"
        src={BryFlyLogo}
        alt="BryFly logo"
        className="max-w-md w-full"
        sizes="(max-width: 768px) 288px,
        (max-width: 1280px) 320px,
        404px"
      />
      {tagline && (
        <h2
          className="pt-0.5 text-center uppercase text-lg sm:text-xl xl:text-2xl tracking-wider text-pink-50/70"
          style={font.handwritten.style}
        >
          Where light takes flight
        </h2>
      )}
    </div>
  )
  return className ? <div className={className}>{bryflyLogo}</div> : bryflyLogo
}

export function SocialLinks() {
  return (
    <div
      className="flex flex-row justify-center items-center gap-3 md:gap-4
      text-lg xl:text-xl text-center
      *:inline-block tracking-wide"
    >
      <Link
        className="text-stone-200/80 hover:text-stone-50 border-none
        transition break-keep underline underline-offset-6
        decoration-2 decoration-stone-500 hover:decoration-stone-400
        font-medium"
        href="https://www.instagram.com/bryfly2000"
        target="_blank"
        rel="noreferrer"
      >
        Commissions
      </Link>
      <Link
        prefetch
        className="transition px-3 font-bold border-0
        underline underline-offset-6
        decoration-2 hover:decoration-4 decoration-pink-400 hover:decoration-pink-300
        text-transparent bg-clip-text bg-gradient-to-bl from-pink-600/90 to-pink-300
        border-pink-400/80 hover:border-pink-300 hover:from-pink-500 hover:to-pink-100"
        href="/hire"
      >
        Hiring
      </Link>
    </div>
  )
}
