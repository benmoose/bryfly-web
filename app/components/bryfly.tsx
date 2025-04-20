import Image from "next/image"
import Link from "next/link"
import { fonts } from "app/ui/font"
import { P } from "app/ui/text"
import BryFlyLogo from "public/bryfly-logo-1.png"

export default function PageHeader() {
  return (
    <div className="grid gap-1 pb-1.5 pt-4 md:pt-6 xl:pt-9">
      <Image
        loading="eager"
        src={BryFlyLogo}
        alt="BryFly logo"
        className="mx-auto w-[288px] sm:w-[334px] xl:w-[424px]"
        sizes="(max-width: 768px) 288px,
        (max-width: 1280px) 320px,
        404px"
      />
      <h2
        className="text-center uppercase text-lg sm:text-xl xl:text-2xl tracking-wider text-pink-50/70"
        style={fonts.handwritten.style}
      >
        Where light takes flight
      </h2>
    </div>
  )
}

export function About() {
  return (
    <div className="text-center sm:text-left antialiased">
      <P
        className="font-bold text-transparent text-pretty
        bg-clip-text bg-gradient-to-tr from-pink-500 to-purple-300"
      >
        <span className="text-[1.5rem]">Bring any space to life</span>
      </P>
      <P>
        Delight your audience with a unique BryFly creation. Hire an existing
        design or commission a bespoke piece, designed with you, perfectly
        tailored to bring joy to your event.
      </P>
    </div>
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
        className="text-stone-200/80 hover:text-stone-50 border-none
        transition break-keep underline underline-offset-6
        decoration-2 decoration-stone-500 hover:decoration-stone-400
        font-medium"
        href="https://www.instagram.com/bryfly2000"
        target="_blank"
        rel="noreferrer"
      >
        Contact
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
        Disco ball hire
      </Link>
    </div>
  )
}
