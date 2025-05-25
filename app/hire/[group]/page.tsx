import type { Metadata } from "next"
import { Masthead } from "app/components/bryfly"
import ImageGrid from "app/components/image-grid"
import { getImageGroups, getGroupDisplayName } from "lib/cloudinary"
import { siteUrl } from "app/utils"

type Params = { group: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { group } = await params
  const pageUrl = new URL(`/hire/${group}`, siteUrl())
  return {
    title: `Hire ${decodeURIComponent(group)}`,
    bookmarks: pageUrl.href,
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { group } = await params
  const groupName = await getGroupDisplayName(group)

  return (
    <>
      <Masthead />
      <div className="container mx-auto">
        <pre className="text-stone-200">
          Info page for <strong>{groupName}</strong>
        </pre>

        <ImageGrid group={group} />
      </div>
    </>
  )
}

export async function generateStaticParams(): Promise<Params[]> {
  const groups = await getImageGroups().then(Object.keys)
  return groups.map(group => ({ group }))
}

export const dynamicParams = false

export const dynamic = "force-static"

export const fetchCache = "only-cache"
