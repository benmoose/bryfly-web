'use client'

import { useState } from 'react'
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useSwipeable } from 'react-swipeable'
import downloadImage from 'utils/downloadPhoto'
import { Image as ImageT } from 'services/cloudinary-client/resources'
import { url } from 'services/cloudinary-client/deliver'
import CloudinaryImage from 'components/CloudinaryImage'

const NAV_THUMBNAILS = 20

interface Props {
  images?: ImageT[]
  activeImage?: ImageT
  changePhoto: (newIndex: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}

export default function SharedModal ({
  images,
  changePhoto,
  closeModal,
  navigation,
  activeImage,
  direction
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const activeIndex = activeImage.index
  const adjacentImages = images.slice(
    Math.max(activeIndex - NAV_THUMBNAILS / 2, 0),
    Math.min(activeIndex + NAV_THUMBNAILS / 2, images.length)
  )

  const swipeHandlers = {
    onSwipedLeft: () => {
      if (activeIndex < images?.length - 1) {
        changePhoto(activeIndex + 1)
      }
    },
    onSwipedRight: () => {
      if (activeIndex > 0) {
        changePhoto(activeIndex - 1)
      }
    },
    trackMouse: true
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      }
    }
  }

  return (
    <MotionConfig transition={{
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }}
    >
      <div
        className='relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto'
        {...useSwipeable(swipeHandlers)}
      >
        {/* Main image */}
        <div className='w-full overflow-hidden rounded-lg'>
          <div className='relative flex aspect-[3/2] items-center justify-center'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                animate='center'
                initial='enter'
                exit='exit'
                className='absolute'
              >
                <CloudinaryImage
                  {...activeImage}
                  priority
                  width={navigation ? 1280 : 1920}
                  height={navigation ? 853 : 1280}
                  onLoad={() => setLoaded(true)}
                  className='relative'
                  alt="Image of one of BryFly's balls."
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className='absolute inset-0 mx-auto flex max-w-7xl items-center justify-center'>
          {/* Buttons */}
          {loaded && (
            <div className='relative aspect-[3/2] max-h-full w-full'>
              {navigation && (
                <>
                  {activeIndex > 0 && (
                    <button
                      className='absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                      onClick={() => changePhoto(activeIndex - 1)}
                    >
                      <ChevronLeftIcon className='h-6 w-6' />
                    </button>
                  )}
                  {activeIndex + 1 < images.length && (
                    <button
                      onClick={() => changePhoto(activeIndex + 1)}
                      className='absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                    >
                      <ChevronRightIcon className='h-6 w-6' />
                    </button>
                  )}
                </>
              )}
              <div className='absolute top-0 right-0 flex items-center gap-2 p-3 text-white'>
                {navigation && (
                  <a
                    href={url(activeImage.publicId, activeImage.width, activeImage.height)}
                    className='rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white'
                    target='_blank'
                    title='Open fullsize version'
                    rel='noreferrer'
                  >
                    <ArrowTopRightOnSquareIcon className='h-5 w-5' />
                  </a>
                )}
                <button
                  title='Download fullsize version'
                  className='rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white'
                  onClick={() => downloadImage(activeImage)}
                >
                  <ArrowDownTrayIcon className='h-5 w-5' />
                </button>
              </div>
              <div className='absolute top-0 left-0 flex items-center gap-2 p-3 text-white'>
                <button
                  onClick={() => closeModal()}
                  className='rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white'
                >
                  <XMarkIcon className='h-5 w-5' />
                  {/* {navigation */}
                  {/*  ? <XMarkIcon className='h-5 w-5' /> */}
                  {/*  : <ArrowUturnLeftIcon className='h-5 w-5' />} */}
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          {navigation && (
            <div className='fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60'>
              <motion.div
                initial={false}
                className='mx-auto mt-6 mb-6 flex aspect-square h-14'
              >
                <AnimatePresence initial={false}>
                  {adjacentImages.map(thumbnail => (
                    <motion.button
                      initial={{
                        width: '0%',
                        x: `${Math.max((activeIndex - 1) * -100, 15 * -100)}%`
                      }}
                      animate={{
                        scale: thumbnail.id === activeImage.id ? 1.25 : 1,
                        width: '100%',
                        x: `${Math.max(activeIndex * -100, 15 * -100)}%`
                      }}
                      key={thumbnail.id}
                      exit={{ width: '0%' }}
                      onClick={() => changePhoto(thumbnail.index)}
                      className={`relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none ${
                        thumbnail.id === activeImage.id
                          ? 'z-20 rounded-md shadow shadow-black/50'
                          : 'z-10'
                      } ${thumbnail.index === 0 ? 'rounded-l-md' : ''} ${thumbnail.index === images.length - 1 ? 'rounded-r-md' : ''}`}
                    >
                      <CloudinaryImage
                        {...thumbnail}
                        thumbnail
                        width={180}
                        height={120}
                        alt='Navigation thumbnail.'
                        className={`${
                          thumbnail.id === activeImage.id
                            ? 'brightness-110 hover:brightness-110'
                            : 'brightness-50 contrast-125 hover:brightness-75'
                        } h-full transform object-cover transition`}
                      />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  )
}
