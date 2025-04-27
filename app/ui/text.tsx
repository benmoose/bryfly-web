import type { ReactNode, JSX } from "react"
import cn from "classnames"
import { fonts } from "./font"

type HeadingLevel = 1 | 2 | 3

const headingClass: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-6xl",
  2: "text-3xl md:text-5xl",
  3: "text-2xl md:text-4xl",
}

function H({
  children,
  className,
  level,
  ...props
}: {
  children: ReactNode
  className?: string
  level: HeadingLevel
}) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <HeadingTag
      {...props}
      className={cn(
        "tracking-wider mb-3 text-orange-200",
        fonts.heading.className,
        headingClass[level],
        className,
      )}
    >
      {children}
    </HeadingTag>
  )
}

function createHeading(level: HeadingLevel) {
  return function Heading(props: { children: ReactNode; className?: string }) {
    return <H {...props} level={level} />
  }
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)

export function P({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      {...props}
      className={cn(
        "mb-3 tracking-wide font-medium text-stone-100",
        "text-lg xl:text-xl",
        className,
      )}
    >
      {children}
    </p>
  )
}
