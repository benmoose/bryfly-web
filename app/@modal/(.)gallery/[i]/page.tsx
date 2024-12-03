import React from 'react'
import { getHeroImageSet } from 'services/cloudinary'
import Modal from './modal'

export default async function Page ({
  params
}: {
  params: Promise<{ i: string }>
}): Promise<React.ReactElement> {
  const imageSet = await getHeroImageSet()
  const { i } = await params

  return <Modal index={Number(i)} images={imageSet.resources()} />
}
