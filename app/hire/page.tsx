import Link from "next/link"
import { Gradient } from "app/components/text"
import { getGroups, getImages } from "lib/cloudinary"
import HireLink from "./components/hire-link"

export default async function Page() {
  const groups = await getGroups()
  const pageTitle = "Event Hire"

  return (
    <>
      <div className="container max-w-2xl mx-auto mb-12 px-6">
        <h1 className="text-center">
          <Gradient bold className="text-center text-balance">
            {pageTitle}
          </Gradient>
        </h1>
        <p>
          Hire unique reflective artwork to delight audiences at your event.
          some of the UK&apos;s best festivals and events, including Noisily,
          Homobloc and Wildwood Disco. My pieces have also featured in music
          videos and in the Disney series&nbsp;
          <Link href="https://en.wikipedia.org/wiki/Extraordinary_(TV_series)">
            Extraordinary
          </Link>
          .
        </p>
        <p>
          Hiring costs depend on the individual requirements of the event or
          production, so please email for more information. All pieces will be
          packaged securely for transportation. Transportation arrangements are
          not included.
        </p>
      </div>

      <div
        className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 px-6
        gap-6 md:gap-9 lg:gap-12"
      >
        {groups.map(group => (
          <HireLink
            key={group.path}
            href={`/hire/${group.path}`}
            title={group.name}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            image={getImages(group.path)}
          />
        ))}
      </div>
    </>
  )
}
