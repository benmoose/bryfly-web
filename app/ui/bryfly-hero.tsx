import React from 'react'
import Logo from 'app/ui/logo'
import { concertOne } from 'app/ui/font'

export default function BryFlyHeroBox (): React.ReactElement {
  return (
    <div
      className='after:content relative mb-5 flex h-[380px] lg:h-[430px] 2xl:h-[392px]
        flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10
        px-6 pb-20 pt-64 text-center text-white shadow-highlight after:pointer-events-none a
        fter:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0'
    >
      <Logo />
      <h1
        style={concertOne.style}
        className='mt-0 mb-4 text-3xl sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl
            uppercase tracking-wider'
      >
        Browse me disco balls
      </h1>
      <div className='flex items-center z-10 text-base mt-3 gap-2'>
        <a
          className='pointer border border-white/15 bg-transparent px-3 py-2 rounded
           font-semibold text-white/85 transition hover:bg-white/5 hover:border-white/60
            hover:text-white'
          href='https://www.instagram.com/bryfly2000'
          target='_blank'
          rel='noreferrer'
        >
          Instagram
        </a>
        <a
          className='pointer border border-white bg-cyan-50 px-5 py-2 rounded
            font-bold text-black transition hover:border-cyan-200 hover:bg-pink-50'
          href='https://github.com/benmoose/bryfly-web'
        >
          Contact!
        </a>
      </div>
    </div>
  )
}
