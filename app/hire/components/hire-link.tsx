import Link from "next/link"
import { H3 } from "app/ui/text"

export default function HireLink({
  title,
  href,
  text,
}: {
  title: string
  href: string
  image?: string
  text: string
}) {
  return (
    <div className="flex flex-col items-center">
      <H3 className="mb-3">{title}</H3>
      <p className="text-stone-200 text-lg font-medium">{text}</p>
      <Link href={href} className="text-pink-500 font-bold">
        More info ▶︎
      </Link>
    </div>
  )
}
