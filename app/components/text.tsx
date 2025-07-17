import classnames from "classnames"
import type { ReactElement, ReactNode, JSX } from "react"
import { darumadrop } from "app/components/font"

type HeadingLevel = 1 | 2 | 3

interface BaseProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
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
        "tracking-wider text-stone-200",
        darumadrop.className,
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

function Gradient({
  children,
  className,
  bold = false,
}: BaseProps & { bold?: boolean }) {
  return (
    <span
      className={classnames(
        "text-transparent",
        "bg-clip-text bg-gradient-to-tr from-pink-500 to-purple-200",
        { [darumadrop.className]: bold },
        className,
      )}
    >
      {children}
    </span>
  )
}

export { H1, H2, H3, Gradient }
