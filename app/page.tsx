import ImageGrid from "app/components/image-grid"
import { Masthead, SocialLinks } from "./components/bryfly"
import { P, GradientText } from "app/ui/text"
import { getImages } from "lib/cloudinary"
import ImagesProvider from "app/image-provider"

export default async function Page() {
  const hero = { hero: await getImages("hero") }

  return (
    <main className="w-full max-w-[1920px] mx-auto p-4">
      <div
        className="flex flex-row justify-center
          pb-6 pt-4 sm:pb-12 xl:pt-6 xl:mb-12"
      >
        <Masthead tagline />
      </div>
      <ImagesProvider groups={hero}>
        <ImageGrid group="hero" showTitle={false}>
          <div
            className="flex flex-col gap-3 px-3 md:px-6 pb-9 items-center sm:items-start
            text-center sm:text-left"
          >
            <GradientText>
              <span className="text-[1.5rem]">Bring any space to life</span>
            </GradientText>
            <P>
              Delight your audience with a unique BryFly creation. Hire an
              existing design or commission a bespoke piece, designed with you,
              perfectly tailored to bring joy to your event.
            </P>
            <SocialLinks />
          </div>
        </ImageGrid>
      </ImagesProvider>
    </main>
  )
}
