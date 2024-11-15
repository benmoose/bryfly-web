import { allImages } from 'services/cloudinary-client/resources'
import Carousel from 'components/Carousel'

export async function generateStaticParams () {
  const images = await allImages()
  return images.map(image => ({ id: image.public_id }))
}

export default async function Page ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const publicId = decodeURIComponent(id)
  const images = await allImages()
  const index = images.findIndex(image => image.public_id === publicId)
  return (
    <main className='mx-auto max-w-[1960px] p-4'>
      <Carousel images={images} image={images[index]} index={index} />
    </main>
  )
}
