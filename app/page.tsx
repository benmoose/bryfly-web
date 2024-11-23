import { allImages } from 'services/cloudinary-client/resources'
import Logo from 'components/Icons/Logo'
import Portfolio from './portfolio'

export default async function Page () {
  const images = await allImages()

  return (
    <>
      <main className='mx-auto max-w-[1960px] p-4 w-full'>
        <div className='columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4'>
          <BrandBlock />
          <Portfolio images={images} />
        </div>
      </main>
      <Footer />
    </>
  )
}

function BrandBlock () {
  return (
    <div
      className='after:content relative mb-5 flex h-[380px] lg:h-[430px] 2xl:h-[392px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-20 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0'
    >
      <Logo />
      <h1 className='mt-0 mb-6 text-xl lg:text-2xl font-bold tracking-wider'>
        browse me disco balls
      </h1>
      <nav role='navigation' className='z-10 mt-2 md:mt-6 text-base md:text-md'>
        <a
          className='pointer mr-2 rounded-lg border border-white/15 bg-transparent px-3 py-2 font-bold text-white/85 transition hover:bg-white/5 hover:border-white/60 hover:text-white md:mt-4'
          href='https://www.instagram.com/bryfly2000/'
          target='_blank'
          rel='noreferrer'
        >
          Instagram
        </a>
        <a
          className='pointer rounded-lg border border-white bg-gray-100 px-3 py-2 font-semibold text-black transition hover:border-cyan-200 hover:bg-cyan-50 md:mt-4'
          href='/contact'
        >
          Get in touch
        </a>
      </nav>
    </div>
  )
}

function Footer () {
  return (
    <footer className='p-4 text-sm text-center text-white/35 sm:p-8 tracking-wide'>
      made by&nbsp;<a
        href='https://instagram.com/_benmoose' target='_blank' rel='noreferrer'
        className='font-bold text-white/40 hover:text-white/50'
                   >Moose
      </a>
    </footer>
  )
}
