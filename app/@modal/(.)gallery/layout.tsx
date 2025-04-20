import type { ReactNode } from "react"
import Modal from "../components/modal"

export default async function Layout({ children }: { children: ReactNode }) {
  return <Modal key="modal">{children}</Modal>
}
