import { allImages } from 'services/cloudinary-client/resources'
import ImageCarousel from 'app/ui/image-carousel'
import Modal from 'app/ui/modal'

export default async function Page ({ params }: { params: Promise<{ i: number }> }) {
  const [index, images] = await Promise.all([params.then(p => p.i), allImages()])

  return (
    <Modal index={index}>
      <ImageCarousel images={images} index={index} />
    </Modal>
  )
}
