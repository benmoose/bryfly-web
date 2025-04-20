import ImageGrid from "app/components/image-grid"
import { getGroupNames } from "lib/cloudinary"
import PageHeader, { About, SocialLinks } from "./components/bryfly"

export default async function Page() {
  const groups = await getGroupNames()
  return (
    <main className="w-full max-w-[1920px] mx-auto p-4">
      <div className="grid gap-2 xl:gap-3 mb-12">
        <PageHeader />
      </div>
      <ImageGrid group="hero" showTitle={false}>
        <div className="flex flex-col gap-3 px-3 md:px-6 pb-9 items-center sm:items-start">
          <About />
          <SocialLinks />
        </div>
      </ImageGrid>
      {groups.map(group => (
        <ImageGrid key={group} group={group} />
      ))}
    </main>
  )
}
