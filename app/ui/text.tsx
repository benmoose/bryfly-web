import type { ReactNode } from "react"
import cn from "classnames"
import { fonts } from "./font"

const baseHeading = [
  "tracking-wider mb-3 text-stone-100",
  fonts.heading.className,
].join(" ")

export function H1({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h1
      {...props}
      className={cn(baseHeading, "text-4xl md:text-6xl", className)}
    >
      {children}
    </h1>
  )
}

export function H2({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      {...props}
      className={cn(baseHeading, "text-3xl md:text-5xl", className)}
    >
      {children}
    </h2>
  )
}

export function H3({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h3
      {...props}
      className={cn(baseHeading, "text-2xl md:text-4xl", className)}
    >
      {children}
    </h3>
  )
}

const baseP = "mb-3 tracking-wide font-medium text-stone-100"

export function P({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p {...props} className={cn(baseP, "text-lg xl:text-xl", className)}>
      {children}
    </p>
  )
}
