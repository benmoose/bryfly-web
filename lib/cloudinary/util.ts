import { cache } from "react"

export const encodeB64ImageUrl = cache(async (url: string): Promise<string> => {
  console.count(`encodeB64ImageUrl(${url})`)
  const res = await fetch(url, { cache: "force-cache" })
  const buf = await res.arrayBuffer()
  const data = Buffer.from(buf).toString("base64")
  return `data:image/webp;base64,${data}`
})

export function aspectRatio({
  width,
  height,
}: {
  width: number
  height: number
}): [number, number] {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const factor = gcd(width, height)
  return [width / factor, height / factor]
}
