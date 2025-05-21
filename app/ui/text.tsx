import type { ReactElement, ReactNode, JSX } from "react"
import classnames from "classnames"
import { fingerPaint } from "./font"

interface BaseProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

type HeadingLevel = 1 | 2 | 3

const headingClass: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-6xl",
  2: "text-3xl md:text-5xl",
  3: "text-2xl md:text-3xl",
}

function H({
  children,
  className,
  level,
  ...props
}: BaseProps & { level: HeadingLevel }): ReactElement {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <HeadingTag
      {...props}
      className={classnames(
        "tracking-wider mb-3 text-stone-200",
        fingerPaint.className,
        headingClass[level],
        className,
      )}
    >
      {children}
    </HeadingTag>
  )
}

function createHeading(level: HeadingLevel) {
  return function Heading(props: BaseProps): JSX.Element {
    return <H {...props} level={level} />
  }
}

const H1 = createHeading(1)
const H2 = createHeading(2)
const H3 = createHeading(3)

function P({ children, className, ...props }: BaseProps) {
  return (
    <p
      {...props}
      className={classnames(
        "mb-3 font-medium text-stone-100 tracking-wide text-pretty",
        "text-base xl:text-lg",
        className,
      )}
    >
      {children}
    </p>
  )
}

function Gradient({ children, className }: BaseProps) {
  return (
    <P
      className={classnames(
        "text-transparent tracking-wider text-pretty font-semibold",
        "bg-clip-text bg-gradient-to-tr from-pink-500 to-purple-300",
        className,
      )}
    >
      {children}
    </P>
  )
}

export { H1, H2, H3, P, Gradient }
