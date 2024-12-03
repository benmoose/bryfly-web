'use client'

import { ReactElement, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { concertOne } from 'app/ui/font'

export default function Page (): ReactElement {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const intervalRef = setInterval(() => {
      setOn(!on)
    }, 360)
    return () => {
      clearInterval(intervalRef)
    }
  }, [on])

  return (
    <div className='fixed inset-0 flex flex-col justify-center items-center space-y-3'>
      <Switch
        aria-hidden
        disabled
        checked={on}
        onChange={setOn}
        className='group relative flex h-13 w-24 rounded-full bg-white/10 p-3
          transition-colors duration-150 ease-in-out focus:outline-none data-[focus]:outline-1
          data-[focus]:outline-white data-[checked]:bg-white/10'
      >
        <span
          aria-hidden='true'
          className='pointer-events-none inline-block size-9 translate-x-0 rounded-full bg-slate-50
            ring-0 shadow-lg transition duration-150 ease-in-out group-data-[checked]:translate-x-9
            group-data-[checked]:bg-cyan-100'
        />
      </Switch>
      <h3
        style={concertOne.style}
        className='text-white/80 font-bold text-2xl uppercase'
      >
        Loading...
      </h3>
    </div>
  )
}
