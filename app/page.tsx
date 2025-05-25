import type { Metadata } from "next"
import ImageGrid from "app/components/image-grid"
import { Masthead, SocialLinks } from "./components/bryfly"
import { P, Gradient } from "app/ui/text"
import { getImages } from "lib/cloudinary"
import ImagesProvider from "app/image-provider"
import { siteUrl } from "app/utils"

export const metadata: Metadata = {
  bookmarks: siteUrl().href,
}

export default async function Page() {
  const hero = await getImages("hero")

  return (
    <div className="container grid gap-9 lg:gap-12 mx-auto pt-6">
      <div className="inline-block mx-auto">
        <Masthead tagline />
      </div>
      <ImagesProvider groups={{ hero }}>
        <div
          className="flex flex-col gap-3 px-3 md:px-6 pb-9 items-center
            text-center max-w-xl mx-auto"
        >
          <Gradient className="">
            <span className="text-[2rem] tracking-wider text-balance">
              Bring any space to life
            </span>
          </Gradient>
          <P>
            Delight your audience with a unique BryFly creation. Hire an
            existing design or commission a bespoke piece, designed with you,
            perfectly tailored to bring joy to your event.
          </P>
          <SocialLinks />
        </div>
        <ImageGrid group="hero" showTitle={false} />
      </ImagesProvider>
    </div>
  )
}
