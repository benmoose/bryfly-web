export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto grid gap-9 lg:gap-12 pt-6">
      {children}
    </div>
  )
}
