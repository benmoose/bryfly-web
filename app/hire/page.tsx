import HireLink from "./components/hire-link"
import { H1, P } from "app/ui/text"

export default function Page() {
  const pageText = `Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.`
  return (
    <div className="w-full max-w-[1920px] mx-auto p-4">
      <H1 className="text-center mb-6">Available for hire</H1>
      <div className="w-full max-w-2xl mx-auto mb-20 px-3">
        <P>{pageText}</P>
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
  )
}
