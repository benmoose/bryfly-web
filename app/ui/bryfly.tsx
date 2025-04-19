import Image from "next/image"
import { display, subtitle } from "app/ui/font"
import BryFlyLogo from "public/bryfly-logo-1.png"

export default function PageHeader() {
  return (
    <div className="grid gap-1 pb-1.5 pt-4 md:pt-6 xl:pt-9">
      <Image
        loading="eager"
        src={BryFlyLogo}
        alt="BryFly logo"
        className="mx-auto w-[288px] md:w-[320px] xl:w-[404px]"
        sizes="(max-width: 768px) 288px,
        (max-width: 1280px) 320px,
        404px"
      />
      <h2
        className="text-center uppercase text-lg sm:text-xl xl:text-2xl tracking-wider text-pink-50/70"
        style={subtitle.style}
      >
        Where light takes flight
      </h2>
    </div>
  )
}

export function About() {
  return (
    <p className="text-lg md:text-2xl/8.5 text-white/90">
      Bring any space to life and delight your audience or guests with a unique
      BryFly creation. Hire an existing design or commission a bespoke piece,
      designed with you, perfectly tailored to bring joy to your event.
    </p>
  )
}

export function SocialLinks() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-2 text-3xl tracking-wider">
      <a
        className="px-4 py-1.5 lg:text-2xl text-stone-200/80 hover:text-stone-50
        border-2 border-transparent hover:border-stone-200/15
        transition rounded-lg hover:rounded-sm
        bg-stone-900/70 hover:bg-stone-900 hover:bg-stone/5"
        style={display.style}
        href="https://www.instagram.com/bryfly2000"
        target="_blank"
        rel="noreferrer"
      >
        Insta
      </a>
      <a
        style={display.style}
        className="break-keep px-5 py-1.5 rounded-md
        transition border-2 border-pink-400/40 hover:border-pink-300/90
        scale-95 hover:scale-100 duration-75
        text-transparent
        bg-clip-text bg-gradient-to-br from-pink-500 to-purple-300"
        href="/hire"
      >
        Hire me!
      </a>
    </div>
  )
}
