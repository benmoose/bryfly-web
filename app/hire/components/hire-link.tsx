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
    <div className="@container flex items-start break-inside-avoid">
      <CdnImage
        image={image}
        className="flex-2/5 overflow-hidden bg-slate-800 mr-6 @xs:flex-1/3 @sm:flex-1/3
          box-border object-cover object-center aspect-square rounded-full
          border-2 ring-2  border-black/80 ring-slate-500/35 max-w-[200px]"
      />
      <div className="flex-1/2">
        <H3 className="mb-3 text-balance">{title}</H3>
        <P className="text-stone-200 text-pretty line-clamp-3">{text}</P>

        <Gradient className="group brightness-100 hover:brightness-135 transition duration-75">
          <Link href={href} className="static">
            More info{" "}
            <span className="inline-block pl-3 group-hover:scale-115">→</span>
          </Link>
        </Gradient>
      </div>
    </div>
  )
}
