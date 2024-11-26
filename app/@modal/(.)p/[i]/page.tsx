import { getImages } from 'services/cloudinary'
import ImageCarousel from 'app/ui/image-carousel'
import Modal from 'app/ui/modal'

export default async function Page ({ params }: { params: Promise<{ i: number }> }) {
  const index = (await params).i
  getImages().then(ii => console.log(ii.length))

  return (
    <Modal index={index}>
      <ImageCarousel index={index} />
    </Modal>
  )
}
