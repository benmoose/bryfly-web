import { getImages } from 'services/cloudinary/resources'
import ImageCarousel from 'app/ui/image-carousel'
import Modal from 'app/ui/modal'

export default async function Page ({ params }: { params: Promise<{ i: number }> }) {
  const index = (await params).i
  const images = await getImages()

  return (
    <Modal index={index}>
      <ImageCarousel images={images} index={index} />
    </Modal>
  )
}
