import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Carousel from '../../components/Carousel'
import { getResults } from '../../utils/cachedImages'
import getBase64ImageUrl from '../../utils/generateBlurPlaceholder'
import type { ImageProps } from '../../utils/types'

export default function Home ({ image, images }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>BryFly</title>
        <meta property='og:image' content={image.url} />
        <meta name='twitter:image' content={image.url} />
      </Head>
      <main className='mx-auto max-w-[1960px] p-4'>
        <Carousel images={images} image={image} index={image.index} />
      </main>
    </>
  )
}

export const getStaticProps = (async (context) => {
  const results = await getResults()
  const blurUrls = await Promise.all(results.resources.map(async image => {
    return await getBase64ImageUrl(image)
  }))
  const images = results.resources.map((resource, index) => ({
    ...resource,
    index,
    url: resource.secure_url,
    blurDataUrl: blurUrls[index]
  }))
  const paramId = context.params.id as string
  const index = results.resources.findIndex(resource => resource.public_id === paramId)

  return { props: { images, image: images[index] } }
}) satisfies GetStaticProps<{
  image: ImageProps
  images: ImageProps[]
}>

export const getStaticPaths = (async () => {
  const results = await getResults()

  return {
    paths: results.resources.map(res => ({
      params: { id: res.public_id }
    })),
    fallback: false
  }
}) satisfies GetStaticPaths
