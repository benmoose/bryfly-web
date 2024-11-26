import type { DomainImage as ImageT } from 'services/cloudinary/resources'

function forceDownload (blobUrl: string, filename: string) {
  const a = document.createElement('a')
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function downloadImage ({ id, secureUrl }: ImageT) {
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
