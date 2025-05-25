import type { ReactNode } from "react"
import { motion } from "motion/react"

export const notSelectedVariant = "not-selected" as const
export const selectedVariant = "selected" as const
export const hoverVariant = "hover" as const
export const pressedVariant = "pressed" as const
export const defaultTransition = {
  opacity: { type: "linear" },
  default: {
    type: "spring",
    stiffness: 900,
    mass: 1.4,
    damping: 10,
  },
} as const
export const animationVariants = {
  [notSelectedVariant]: {
    scale: 1,
  } as const,
  [selectedVariant]: {
    scale: 1,
  } as const,
  [hoverVariant]: {
    scale: 1.06,
  } as const,
  [pressedVariant]: {
    scale: 0.94,
    opacity: 0.55,
    transition: { duration: 0.06 },
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
        bg-slate-600/15 text-slate-100/90
        hover:bg-slate-400/40 hover:text-white hover:opacity-100 hover:backdrop-blur-sm
        hover:outline-slate-200/85
        focus:bg-slate-400/40 focus:outline-slate-200/85 focus:opacity-100 focus:backdrop-blur-sm
        disabled:outline-0 disabled:bg-neutral-600/60 disabled:cursor-default disabled:text-neutral-600/85`}
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
