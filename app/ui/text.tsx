import type { ReactNode, JSX } from "react"
import classnames from "classnames"
import font from "./font"

type HeadingLevel = 1 | 2 | 3

const headingClass: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-6xl",
  2: "text-3xl md:text-5xl",
  3: "text-2xl md:text-3xl",
}

type BaseProps = {
  children: ReactNode
  className?: string
}

function H({
  children,
  className,
  level,
  ...props
}: BaseProps & { level: HeadingLevel }) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <HeadingTag
      {...props}
      className={classnames(
        "tracking-wider mb-3 text-stone-200",
        font.heading.className,
        headingClass[level],
        className,
      )}
    >
      {children}
    </HeadingTag>
  )
}

function createHeading(level: HeadingLevel) {
  return function Heading(props: BaseProps) {
    return <H {...props} level={level} />
  }
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)

export function P({ children, className, ...props }: BaseProps) {
  return (
    <p
      {...props}
      className={classnames(
        "mb-3 tracking-wide font-medium text-stone-100",
        "text-lg xl:text-xl",
        className,
      )}
    >
      {children}
    </p>
  )
}

export function GradientText({ children, className }: BaseProps) {
  return (
    <P
      className="inline-block text-transparent tracking-wider text-pretty font-semibold
              text-[1.5rem] bg-clip-text bg-gradient-to-tr from-pink-500 to-purple-300"
    >
      {className?.trim() ? (
        <span className={className}>{children}</span>
      ) : (
        children
      )}
    </P>
  )
}
