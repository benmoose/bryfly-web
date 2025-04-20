import ImageGrid from "app/components/image-grid"
import { getGroupNames } from "lib/cloudinary"
import PageHeader, { About, SocialLinks } from "./components/bryfly"

export default async function Page() {
  const groups = await getGroupNames()
  return (
    <main className="grid gap-3 md:gap-12 w-full max-w-[1920px] mx-auto p-4">
      <PageHeader />
      <SocialLinks />
      <ImageGrid group="hero" showTitle={false}>
        <div
          className="flex flex-col items-center justify-center gap-6
          rounded-xl px-8 pb-12 text-center"
        >
          <About />
        </div>
      </ImageGrid>
      {groups.map(group => (
        <ImageGrid key={group} group={group} />
      ))}
    </main>
  )
}
