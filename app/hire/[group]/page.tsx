import { getImageGroups, getImages } from "lib/cloudinary"
import ImageGrid from "app/components/image-grid"

type Params = { group: string }

export async function generateStaticParams(): Promise<Params[]> {
  const groups = await getImageGroups().then(Object.keys)
  return groups.map(group => ({ group }))
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { group } = await params
  const images = await getImages(group)

  return (
    <div className="container mx-auto">
      <pre className="text-stone-200">
        Info page for <strong>{group}</strong> <em>({images.length} images)</em>
        .
      </pre>

      <ImageGrid group={group} showTitle={false} />
    </div>
  )
}

// drop requests for groups that are not pre-generated at build time
export const dynamicParams = false

export const dynamic = "force-static"

export const fetchCache = "only-cache"
