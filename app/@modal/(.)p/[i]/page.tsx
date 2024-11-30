import React from 'react'
import ImageCarousel from 'app/ui/image-carousel'
import Modal from 'app/ui/modal'
// import { getImages } from 'services/cloudinary'

export default async function Page ({ params }: { params: Promise<{ i: number }> }): Promise<React.ReactElement> {
  const index = (await params).i

  return (
    <Modal index={index}>
      <ImageCarousel index={index} />
    </Modal>
  )
}
