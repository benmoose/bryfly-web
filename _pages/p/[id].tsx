import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Carousel from 'components/Carousel'
import { getImages } from 'utils/cachedImages'
import type { ImageProps } from 'utils/types'

export default function Home ({ image, images }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>BryFly</title>
        <meta property='og:image' content={image.secure_url} />
        <meta name='twitter:image' content={image.secure_url} />
      </Head>
      <main className='mx-auto max-w-[1960px] p-4'>
        <Carousel images={images} image={image} index={image.index} />
      </main>
    </>
  )
}

export const getStaticProps = (async (context) => {
  const images = await getImages()
  const paramId = context.params.id as string
  const index = images.findIndex(image => image.public_id === paramId)
  return {
    props: {
      images,
      image: images[index]
    }
  }
}) satisfies GetStaticProps<{
  image: ImageProps
  images: ImageProps[]
}>

export const getStaticPaths = (async () => {
  const images = await getImages()

  return {
    paths: images.map(image => ({
      params: { id: image.public_id }
    })),
    fallback: false
  }
}) satisfies GetStaticPaths
