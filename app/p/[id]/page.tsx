import Carousel from 'components/Carousel'
import { getResults, fetchImages } from 'utils/cachedImages'

export async function generateStaticParams () {
  const { resources } = await getResults()
  return resources.map(res => ({ id: res.public_id }))
}

export default async function Page ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const images = await fetchImages()
  const index = images.findIndex(image => image.public_id === id)
  return (
    <main className='mx-auto max-w-[1960px] p-4'>
      <Carousel images={images} image={images[index]} index={index} />
    </main>
  )
}
