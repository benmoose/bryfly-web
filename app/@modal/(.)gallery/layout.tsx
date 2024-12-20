import React from "react"
import Modal from "app/ui/modal"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Modal open>{children}</Modal>
}
