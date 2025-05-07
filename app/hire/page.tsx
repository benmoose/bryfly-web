import Link from "next/link"
import HireLink from "./components/hire-link"
import { Masthead } from "app/components/bryfly"
import { GradientText, P } from "app/ui/text"

export default function Page() {
  return (
    <>
      <div className="mb-12">
        <Masthead />
      </div>
      <div className="w-full max-w-[1920px] mx-auto p-4">
        <div className="w-full max-w-2xl mx-auto mb-20 px-3">
          <GradientText className="text-[1.5rem]">Disco Ball Hire</GradientText>
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
            packaged securely for transportation. Transportation arrangements
            are not included.
          </P>
        </div>

        <main className="@container grid gap-3 columns-1 @xl:columns-2 @4xl:columns-3">
          <div className="columns-1 @xl:columns-2 @4xl:columns-3 *:mb-3">
            <HireLink
              href="/hire/flange"
              image=""
              text="Foo bar fas"
              title="Flange"
            />
            <HireLink
              href="/hire/disco-dick"
              image=""
              text="Foo bar fas"
              title="The Disco Dick"
            />
          </div>
        </main>
      </div>
    </>
  )
}
