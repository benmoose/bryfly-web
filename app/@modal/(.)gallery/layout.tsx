import Modal from "app/@modal/ui/modal"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Modal group="hero">{children}</Modal>
}
