"use client"

import { useContext } from "react"
import Link from "next/link"
import { Masthead } from "app/components/bryfly"
import { ImagesContext } from "app/context"
import { Gradient, P } from "app/ui/text"
import HireLink from "./components/hire-link"

export default function Page() {
  const { repo, groups } = useContext(ImagesContext)

  return (
    <div className="w-full max-w-[1920px] mx-auto p-4 md:px-9 lg:px-12">
      <div className="flex flex-row justify-center mb-12 mt-6">
        <Masthead />
      </div>
      <div className="w-full max-w-2xl mx-auto mb-20 px-3">
        <Gradient className="text-[1.5rem]">Disco Ball Hire</Gradient>
        <P>
          BryFly&apos;s unique reflective artwork has delighted audiences at
          some of the UK&apos;s best festivals and events, including Noisily,
          Homobloc and Wildwood Disco. Her designs have also featured in music
          videos and in the Disney series&nbsp;
          <Link href="https://en.wikipedia.org/wiki/Extraordinary_(TV_series)">
            Extraordinary
          </Link>
          .
        </P>
        <P>
          Hiring costs depend on the individual requirements of the event or
          production, so please email for more information. All pieces will be
          packaged securely for transportation. Transportation arrangements are
          not included.
        </P>
      </div>

      <div
        className="grid grid-flow-row grid-cols-1 sm:grid-cols-2
          gap-3 sm:gap-6 md:gap-9 lg:gap-12"
      >
        {Object.keys(groups)
          .sort()
          .map(name => (
            <HireLink
              key={`${name}-${groups[name].length}`}
              href={`/hire/${name}`}
              title={name}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              image={repo[groups[name][0]]}
            />
          ))}
      </div>
    </div>
  )
}
