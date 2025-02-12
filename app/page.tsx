import Image from "next/image"
import ImageGrid from "app/image-grid"
import BryFlyLogo from "public/bryfly-logo-1.png"
import { getGroupNames } from "lib/cloudinary"

function BryFlyCard() {
  return (
    <div
      className="after:content relative flex h-[380px] lg:h-[430px] 2xl:h-[392px]
        flex-col items-center justify-end gap-4 overflow-hidden rounded-xl bg-white/10
        px-6 pb-20 pt-64 text-center text-white shadow-highlight after:pointer-events-none a
        fter:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0"
    >
      <Image
        loading="eager"
        src={BryFlyLogo}
        alt="BryFly logo."
        sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        (max-width: 1960px) 25vw,
        490px"
      />
      <h1
        className="mt-0 mb-4 text-3xl sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl
          uppercase tracking-wider"
      >
        Browse me disco balls
      </h1>
      <div className="flex items-center z-10 text-base mt-3 gap-2">
        <a
          className="px-3 py-2 rounded font-semibold text-white/85 transition
          border border-white/15 hover:bg-white/5 hover:border-white/60 hover:text-white"
          href="https://www.instagram.com/bryfly2000"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          className="border border-white bg-cyan-100 px-5 py-2 rounded
          font-bold text-slate-900 hover:border-cyan-200 hover:bg-pink-50"
          href="https://github.com/benmoose/bryfly-web"
        >
          Contact me!
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
