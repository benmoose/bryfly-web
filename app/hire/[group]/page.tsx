import { Masthead } from "app/components/bryfly"
import ImageGrid from "app/components/image-grid"
import { getImageGroups, getImages } from "lib/cloudinary"

type Params = { group: string }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { group } = await params
  const groupDecoded = decodeURIComponent(group)
  const images = await getImages(groupDecoded)

  return (
    <>
      <Masthead />
      <div className="container mx-auto">
        <pre className="text-stone-200">
          Info page for <strong>{groupDecoded}</strong>{" "}
          <em>({images.length} image(s))</em>.
        </pre>

        <ImageGrid group={groupDecoded} />
      </div>
    </>
  )
}

export async function generateStaticParams(): Promise<Params[]> {
  const groups = await getImageGroups().then(Object.keys)
  return groups.map(group => ({
    group: encodeURIComponent(group),
  }))
}

export const dynamicParams = false

export const dynamic = "force-static"

export const fetchCache = "only-cache"
