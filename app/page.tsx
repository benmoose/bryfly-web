import Image from "next/image"
import ImageGrid from "app/image-grid"
import BryFlyLogo from "public/bryfly-logo-1.png"
import { getGroupNames } from "lib/cloudinary"
import { display } from "app/ui/font"

function BryFlyCard() {
  return (
    <div
      className="relative aspect-[2/3] flex flex-col items-center justify-center
      gap-3 overflow-hidden rounded-xl bg-white/10 px-3 py-16 lg:pt-0
      text-center text-white shadow-highlight"
    >
      <Image
        loading="eager"
        src={BryFlyLogo}
        alt="BryFly logo"
        sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        (max-width: 1960px) 25vw,
        490px"
      />
      <h2
        className="mt-0 mb-4 text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl
        uppercase tracking-wide"
      >
        Browse me disco balls
      </h2>
      <div className="flex flex-wrap justify-center items-center z-10 text-lg mt-3 gap-2">
        <a
          style={display.style}
          className="px-3 py-1.5 rounded text-white/85 transition
          border border-white/15 hover:bg-white/5 hover:border-white/60 hover:text-white"
          href="https://www.instagram.com/bryfly2000"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          style={display.style}
          className="border border-white bg-cyan-100 px-5 py-1.5 rounded
          text-slate-900 hover:border-cyan-200 hover:bg-pink-50 break-keep"
          href="https://github.com/benmoose/bryfly-web"
        >
          Contact&nbsp;me!
        </a>
      </div>
    </div>
  )
}

export default async function Page() {
  const groups = await getGroupNames()
  return (
    <main className="w-full max-w-[1920px] mx-auto p-4">
      <ImageGrid showTitle={false} group="hero">
        <BryFlyCard />
      </ImageGrid>
      {groups.map(group => (
        <ImageGrid key={group} group={group} />
      ))}
    </main>
  )
}
