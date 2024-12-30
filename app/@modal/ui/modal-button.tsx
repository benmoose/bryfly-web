export default function ModalButton({
  children,
  action,
  className,
  ...props
}: {
  children: React.ReactNode
  action: () => void
  className?: string
}) {
  return (
    <button
      onClick={e => {
        e.stopPropagation()
        action()
      }}
      className={`inline-block opacity-60 hover:opacity-100 scale-100 hover:scale-105 text-lg
        text-slate-200 rounded-lg px-2 py-1.5 bg-slate-200/10 hover:bg-slate-50/10
        transition-opacity duration-100 cursor-pointer pointer-events-auto ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
