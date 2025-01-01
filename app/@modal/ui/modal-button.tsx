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
      className={`flex items-center opacity-90 hover:opacity-100 scale-100 hover:scale-110
        backdrop-blur-sm text-base text-slate-200 hover:text-slate-50 rounded p-1.5 gap-3 
        bg-slate-100/5 hover:bg-slate-100/15 transition duration-75
        pointer-events-auto cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
