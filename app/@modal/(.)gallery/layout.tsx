import type { ReactNode } from "react"
import Modal from "../ui/modal"

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Modal key="modal" group="hero">
      {children}
    </Modal>
  )
}
