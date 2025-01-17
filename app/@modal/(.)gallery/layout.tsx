import type { ReactNode } from "react"
import Modal from "app/@modal/ui/modal"

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Modal key="hero-modal" group="hero">
      {children}
    </Modal>
  )
}
