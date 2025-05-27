import { Gradient, P } from "app/ui/text"

export default async function Page() {
  return (
    <div className="container mx-auto">
      <Gradient>
        <span className="text-4xl">Servin&apos; Commissions</span>
      </Gradient>
      <P>Get &apos;em while they&apos;re hot</P>
    </div>
  )
}
