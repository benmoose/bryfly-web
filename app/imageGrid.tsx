import Link from 'next/link'
import { RemoteImage } from 'app/ui/remote-image'
import { getImages } from 'services/cloudinary/resources'

export default async function ImageGrid () {
  const images = await getImages()

  return images.map(({ id, index, ...image }) => (
    <Link
      key={id}
      id={`i${index}`}
      href={`/p/${index}`}
      className='after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'
    >
      <RemoteImage
        src={image.publicId}
        width={image.width}
        height={image.height}
        blurDataURL={image.placeholderUrl}
        alt='...'
        className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
        style={{ transform: 'translate3d(0, 0, 0)' }}
        sizes='(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw'
      />
    </Link>
  ))
}
