import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-16 flex justify-center gap-4 items-center bg-black'>
        <div className='cursor-pointer border-2 p-1'>
          <Link href="/">
            Map
          </Link>
        </div>
        <div className='cursor-pointer border-2 p-1'>
          <Link href="/addPlace">
            Add place
          </Link>
        </div>
        <div className='cursor-pointer border-2 p-1'>
          <Link href="/placeByTag">
            Places by Tag
          </Link>
        </div>
    </div>
  )
}

export default Navbar