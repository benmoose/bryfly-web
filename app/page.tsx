import ImageGrid from "app/components/image-grid"
import { Masthead, SocialLinks } from "./components/bryfly"
import { P, GradientText } from "app/ui/text"

export default async function Page() {
  return (
    <main className="w-full max-w-[1920px] mx-auto p-4">
      <div className="mb-12">
        <Masthead large tagline />
      </div>
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
    </main>
  )
}
