import ImageGrid from "app/ui/image-grid"
import { getGroupNames } from "lib/cloudinary"
import PageHeader, { About, SocialLinks } from "./ui/bryfly"

export default async function Page() {
  const groups = await getGroupNames()

  return (
    <main className="grid gap-3 md:gap-12 w-full max-w-[1920px] mx-auto p-4">
      <PageHeader />
      <ImageGrid group="hero" showTitle={false}>
        <div
          className="flex flex-col items-center justify-center gap-6
          rounded-xl px-8 pb-12 text-center"
        >
          <SocialLinks />
          <About />
        </div>
      </ImageGrid>
      {groups.map(group => (
        <ImageGrid key={group} group={group} />
      ))}
    </main>
  )
}
