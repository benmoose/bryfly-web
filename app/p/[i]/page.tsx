import { notFound } from 'next/navigation'
import Image from 'next/image'
import { allImages } from 'services/cloudinary-client/resources'
// import ImageCarousel from "app/ui/image-carousel"
import CloudinaryImage from 'components/CloudinaryImage'
// import SharedModal from "components/SharedModal"
// import Carousel from 'components/Carousel'

export async function generateStaticParams () {
  return (await allImages())
    .map(({ index }) => ({ i: index.toString() }))
}

export default async function Page ({ params }: { params: Promise<{ i: number }> }) {
  const [index, images] = await Promise.all([params.then(({ i }) => i), allImages()])

  if (!images[index]) {
    return notFound()
  }

  const { publicId, width, height, placeholderUrl } = images[index]

  return (
    <div className='fixed inset-0 h-auto max-h-dvh flex items-center justify-center'>
      <div className='absolute inset-0 z-30 cursor-default bg-black backdrop-blur-xl'>
        <Image
          fill
          src={placeholderUrl}
          className='pointer-events-none h-full w-full'
          alt='Blurry background image'
        />
      </div>

      <div className="absolute mx-auto inset-0 z-50 flex p-4 md:p-6 w-full max-w-7xl items-center max-h-dvh">
        <div className="overflow-hidden mx-auto rounded-xl box-border bg-black/40 backdrop-blur-sm shadow-2xl max-h-full h-fit">
          <CloudinaryImage
            priority
            publicId={publicId}
            width={width}
            height={height}
            placeholderUrl={placeholderUrl}
            alt='A biiig bryFly image.'
            className="relative w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
)

  // return <ImageCarousel images={images} index={index} />

  // const image = images[+index]
  //
  // return (
  //   <main className='mx-auto max-w-[1960px] p-4'>
  //     <Carousel images={images} image={image}/>
  //   </main>
  // )
}
