import type { ReactNode } from "react"
import { motion } from "motion/react"

export const notSelectedVariant = "not-selected" as const
export const selectedVariant = "selected" as const
export const hoverVariant = "hover" as const
export const pressedVariant = "pressed" as const

export const defaultTransition = {
  type: "spring",
  bounce: 0.38,
  damping: 5,
  duration: 0.28,
  mass: 0.5,
} as const

export const animationVariants = {
  [notSelectedVariant]: {
    scale: 1,
    opacity: 0.8,
  } as const,
  [selectedVariant]: {
    transition: { duration: 0.1 },
    scale: 1,
    opacity: 1,
  } as const,
  [hoverVariant]: {
    transition: { type: "spring", duration: 0.1 },
    scale: 1.06,
    opacity: 1,
  } as const,
  [pressedVariant]: {
    transition: { duration: 0.06 },
    scale: 0.88,
    opacity: 0.51,
  } as const,
}

export function IconButton({
  action,
  children,
  label,
  disabled = false,
  ...props
}: {
  action: () => void
  children: ReactNode
  label?: string
  disabled?: boolean
}) {
  return (
    <motion.button
      {...props}
      {...(label && { ["aria-label"]: label })}
      {...(disabled && { ["aria-disabled"]: true })}
      disabled={disabled}
      onClick={e => {
        e.stopPropagation()
        if (!disabled) {
          action()
        }
      }}
      variants={animationVariants}
      initial={notSelectedVariant}
      whileHover={disabled ? notSelectedVariant : hoverVariant}
      whileFocus={disabled ? notSelectedVariant : hoverVariant}
      whileTap={disabled ? notSelectedVariant : pressedVariant}
      transition={defaultTransition}
      className={`relative flex items-center p-2 rounded-full group overflow-hidden
        box-border outline-2 outline-transparent outline-offset-1 text-base
        transition duration-50 pointer-events-auto backdrop-blur-xs cursor-pointer
        bg-slate-600/15 text-slate-100/60
        hover:bg-slate-400/40 hover:text-white hover:opacity-100 hover:backdrop-blur-sm
        hover:outline-slate-200/85
        focus:bg-slate-400/40 focus:outline-slate-200/85 focus:opacity-100 focus:backdrop-blur-sm
        disabled:bg-neutral-600/60 disabled:cursor-default disabled:text-neutral-500`}
      tabIndex={disabled ? -1 : 0}
    >
      {label && (
        <span
          className="text-lg mr-1 ml-2 text-inherit tracking-wide
          opacity-80 group-hover:opacity-100"
        >
          {label}
        </span>
      )}
      {children}
    </motion.button>
  )
}
