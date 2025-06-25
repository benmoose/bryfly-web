import classnames from "classnames"
import type { ReactElement, ReactNode, JSX } from "react"
import { fingerPaint, mansalva } from "app/components/font"

interface BaseProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

type HeadingLevel = 1 | 2 | 3

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
        "mb-3 font-medium/9 text-stone-100 tracking-wide text-pretty",
        "text-base",
        className,
      )}
    >
      {children}
    </p>
  )
}

function Gradient({ children, className }: BaseProps) {
  return (
    <span
      className={classnames(
        "text-transparent text-pretty",
        "bg-clip-text bg-gradient-to-tr from-pink-500 to-purple-300",
        mansalva.className,
        className,
      )}
    >
      {children}
    </span>
  )
}

export { H1, H2, H3, P, Gradient }
