import Image from "next/image"
import { display, subtitle } from "app/ui/font"
import BryFlyLogo from "public/bryfly-logo-1.png"

export default function BrandHeader() {
  return (
    <div className="grid gap-3 pt-3 pb-1.5">
      <Image
        loading="eager"
        src={BryFlyLogo}
        alt="BryFly logo"
        className="mx-auto w-[398px]"
        sizes="398px"
      />
      <h2
        className="text-center text-3xl tracking-wider text-pink-100"
        style={subtitle.style}
      >
        where light takes flight
      </h2>
    </div>
  )
}

export function BrandAbout() {
  return (
    <p className="text-xl text-pink-50">
      Bring any space to life and delight your audience or guests with a unique
      BryFly creation. Hire an existing design or commission a bespoke piece,
      designed with you, perfectly tailored to bring joy to your event.
    </p>
  )
}

export function BrandSocialLinks() {
  return (
    <div className="flex justify-center items-center gap-2 text-xl tracking-wide">
      <a
        className="px-4 pt-1 pb-1.5 text-stone-100
        transition rounded-lg hover:rounded-md
        bg-stone-900/70 hover:bg-stone-900 hover:bg-stone/5  hover:text-stone-50"
        style={display.style}
        href="https://www.instagram.com/bryfly2000"
        target="_blank"
        rel="noreferrer"
      >
        Insta
      </a>
      <a
        style={display.style}
        className="border-2 border-pink-300/5 px-5 py-1.5 rounded-lg hover:rounded-md transition
          text-pink-300 hover:text-pink-300 hover:border-pink-200 break-keep"
        href="https://github.com/benmoose/bryfly-web"
      >
        Hire me!
      </a>
    </div>
  )
}
