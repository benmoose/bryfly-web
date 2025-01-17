"use client"

import { use } from "react"
import { notFound, useParams } from "next/navigation"
import { ImagesContext } from "app/context"
import { CdnImage } from "app/ui/cdn-image"

type Params = { publicId: string }

export default function Page() {
  const { repo } = use(ImagesContext)
  const { publicId } = useParams<Params>()
  return repo[publicId] ? (
    <>
      <CdnImage
        priority
        key={publicId}
        image={repo[publicId]}
        className={`w-fit max-h-full rounded-xl shadow-2xl shadow-slate-950/80 outline-4 outline-stone-300/5
          outline-offset-3 aspect-${repo[publicId].aspectRatio.join("/")}`}
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      <div
        aria-hidden
        className="absolute inset-0 outline-offset-3 rounded-xl outline-2 outline-stone-300/10 animate-pulse -z-10"
      />
    </>
  ) : (
    notFound()
  )
}
