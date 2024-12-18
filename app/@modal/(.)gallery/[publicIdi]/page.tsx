import React from 'react'
import Modal from './modal'

export default async function Page ({
  params
}: {
  params: Promise<{ publicId: string }>
}): Promise<React.ReactElement> {
  const { publicId } = await params

  return <Modal publicId={publicId} />
}
