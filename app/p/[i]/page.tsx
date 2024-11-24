import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getImages } from 'services/cloudinary/resources'
// import ImageCarousel from "app/ui/image-carousel"
// import SharedModal from "components/SharedModal"
// import Carousel from 'components/Carousel'
import { RemoteImage } from 'app/ui/remote-image'

export async function generateStaticParams () {
  const images = await getImages()
  return images.map(image => ({
    i: `${image.index}`
  }))
}

export default async function Page ({ params }: { params: Promise<{ i: number }> }) {
  const [index, images] = await Promise.all([params.then(({ i }) => i), getImages()])

  if (!images[index]) {
    return notFound()
  }

  const { publicId, width, height, placeholderUrl } = images[index]

  return (
    <div className='absolute inset-0 h-auto max-h-dvh flex items-center justify-center'>
      <div className='absolute inset-0 z-30 cursor-default'>
        <Image
          fill
          priority
          sizes='100vw'
          src={placeholderUrl}
          className='object-fill'
          alt=''
        />
      </div>

      <div className='flex items-center z-50 w-full h-full p-2 md:p-4 lg:mx-8'>
        <div
          className='flex items-center justify-center mx-auto max-h-full max-w-full lg:max-w-screen-lg 2xl:max-w-screen-xl overflow-hidden rounded-lg bg-black/20 shadow-2xl'
        >
          <RemoteImage
            priority
            alt='...'
            src={publicId}
            width={width}
            height={height}
            placeholder='blur'
            blurDataURL={placeholderUrl}
            className='object-contain'
            sizes='(max-width: 1024px) 100vw, (max-width: 1560px) 1200px, 1024px'
          />
          {/*  style={{maxInlineSize: "100%", blockSize: "auto"}} */}
        </div>
      </div>

      {/* <div className="flex flex-wrap mt-8 bg-amber-50 max-w-screen-md"> */}
      {/*  { */}
      {/*    images.map(({id, publicId, ...image}) => ( */}
      {/*      <div key={id} className="w-40 h-40 m-1 inline-block box-content border border-yellow-300"> */}
      {/*        <Thumbnail */}
      {/*          key={id} */}
      {/*          alt='Lil thumbnail' */}
      {/*          src={publicId} */}
      {/*          width={image.width} */}
      {/*          height={image.height} */}
      {/*          blurDataURL={image.placeholderUrl} */}
      {/*          placeholder='blur' */}
      {/*          sizes="200px" */}
      {/*          className="object-contain" */}
      {/*        /> */}
      {/*      </div> */}
      {/*    )) */}
      {/*  } */}
      {/* </div> */}
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
