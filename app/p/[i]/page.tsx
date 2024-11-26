import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RemoteImage } from 'app/ui/remote-image'
import { getImages } from 'services/cloudinary'

export async function generateStaticParams () {
  const images = await getImages()
  return images.map(image => ({
    i: `${image.index}`
  }))
}

export default async function Page ({ params }: { params: Promise<{ i: number }> }) {
  const images = await getImages()
  const index = await params.then(params => params.i)

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
          src={placeholderUrl}
          className='object-fill'
          alt=''
        />
      </div>

      <div className='flex items-center z-50 w-full h-full p-2 md:p-4 lg:mx-8'>
        <div
          className='flex items-center justify-center max-h-full max-w-screen-2xl overflow-hidden rounded-lg bg-black/20 shadow-2xl'
        >
          <RemoteImage
            priority
            alt=''
            src={publicId}
            width={width}
            height={height}
            placeholder='blur'
            blurDataURL={placeholderUrl}
            className='object-contain'
            sizes='(max-width: 1536px) 100vw, 1536px'
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