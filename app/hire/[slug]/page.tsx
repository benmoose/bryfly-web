import { P } from "app/ui/text"

type Params = Promise<{ slug: string }>

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  return <P>Details for {slug}</P>
}
