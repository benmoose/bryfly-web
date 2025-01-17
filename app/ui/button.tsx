import { motion, type HTMLMotionProps } from "motion/react"

export const notSelectedVariant = "not-selected" as const
export const selectedVariant = "selected" as const
export const hoverVariant = "hover" as const
export const pressedVariant = "pressed" as const
export const animationVariants = {
  [notSelectedVariant]: {
    scale: 1,
    opacity: 1,
  },
  [selectedVariant]: {
    scale: 1,
    opacity: 1,
  },
  [hoverVariant]: {
    transition: { duration: 0.16, type: "spring" },
    scale: 1.1,
    opacity: 1,
  },
  [pressedVariant]: {
    transition: { duration: 0.16, type: "spring" },
    scale: 0.86,
    opacity: 0.62,
  },
} as const

export const defaultTransition = {
  duration: 0.1,
  type: "spring",
  bounce: 0.45,
  damping: 7,
  weight: 0.5,
} as const

interface ButtonProps extends HTMLMotionProps<"button"> {
  action: () => void
}

export function IconButton({
  action,
  children,
  disabled = false,
  ...buttonProps
}: ButtonProps) {
  return (
    <motion.button
      {...buttonProps}
      {...(disabled && {
        tabIndex: 0,
        ["aria-disabled"]: true,
      })}
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
      whileTap={disabled ? notSelectedVariant : pressedVariant}
      transition={defaultTransition}
      className={`relative flex items-baseline opacity-90 p-2 rounded-full 
        box-border border-2 border-transparent text-base  cursor-pointer
        transition-[background] duration-75 pointer-events-auto self-center
        backdrop-blur-sm bg-slate-100/30 text-slate-100/60
        hover:bg-slate-50/20 hover:text-white hover:opacity-100 hover:backdrop-blur-xs
        disabled:bg-slate-500/30 disabled:cursor-default`}
    >
      {children}
    </motion.button>
  )
}
