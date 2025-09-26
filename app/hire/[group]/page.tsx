import type { Metadata } from "next"
import Nav from "app/components/nav"
import ImageGrid from "app/components/image-grid"
import { siteUrl } from "app/utils"
import { Gradient, P } from "app/components/text"
import { groupDisplayName, getGroups } from "lib/cloudinary"

type Params = { group: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { group } = await params
  const pageUrl = new URL(`/hire/${group}`, siteUrl)
  return {
    title: await groupDisplayName(group),
    bookmarks: pageUrl.href,
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { group } = await params
  const groupName = await groupDisplayName(group)
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mb-12">
        <Nav />
      </div>
      <div className="mb-12">
        <Gradient className="mb-12">
          <span className="text-4xl">{groupName}</span>
        </Gradient>
        <P>
          Info page full of{" "}
          <strong>
            <em>really</em> interesting
          </strong>{" "}
          information...
        </P>
      </div>

      <ImageGrid group={group} />
    </div>
  )
}

export async function generateStaticParams(): Promise<Params[]> {
  const groups = await getGroups()
  return groups.map(group => ({ group: group.path }))
}

export const dynamicParams = false
