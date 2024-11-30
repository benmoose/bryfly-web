import type { DomainImage } from 'services/cloudinary/types'

function forceDownload (blobUrl: string, filename: string) {
  const a = document.createElement('a')
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function downloadImage({id, secureUrl}: DomainImage) {
  fetch(secureUrl, {
    headers: new Headers({
      Origin: location.origin
    }),
    mode: 'cors'
  })
    .then(async (response) => await response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob)
      forceDownload(blobUrl, id)
    })
    .catch(console.error)
}
