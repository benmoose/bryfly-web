import Link from "next/link"
import { CdnImage } from "app/components/cdn-image"
import { H3, P, Gradient } from "app/ui/text"
import type { ImageResource } from "lib/cloudinary"

export default function HireLink({
  title,
  href,
  image,
  text,
}: {
  title: string
  href: string
  image: ImageResource
  text: string
}) {
  return (
    <Link
      href={href}
      className="@container flex group justify-start self-start items-stretch gap-x-4 md:gap-x-6
        border-2 border-transparent rounded-2xl p-y-2 p-x-3 box-border
      hover:bg-slate-800/50 hover:border-slate-700/30
      transition-colors duration-125 ease-in-out"
    >
      <div className="flex-initial w-1/2 @md:w-1/3 relative grow-0 overflow-hidden rounded-2xl">
        <CdnImage image={image} className="absolute h-fit w-fit" />
      </div>
      <div className="flex-auto w-1/2 @sm:w-2/3">
        <H3 className="mb-3 text-balance flex-1">{title}</H3>
        <P className="text-stone-300 text-pretty line-clamp-2">{text}</P>
        <Gradient className="brightness-100 group-hover:brightness-135 transition duration-75 flex-initial">
          <span className="whitespace-nowrap">
            More info&nbsp;
            <span className="inline-block pl-1.5 invisible @sm:visible">→</span>
          </span>
        </Gradient>
      </div>
    </Link>
  )
}
