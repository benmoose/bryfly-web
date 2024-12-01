import React from 'react'
import { getImages } from 'services/cloudinary'
import Modal from './modal'

export default async function Page ({
  params
}: {
  params: Promise<{ i: string }>
}): Promise<React.ReactElement> {
  const { i } = await params
  const images = await getImages()

  return (
    <Modal index={Number(i)} images={images} />
  )
}
