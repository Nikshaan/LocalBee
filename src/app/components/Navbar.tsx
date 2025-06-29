import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-16 border-x-0 flex justify-center gap-4 items-center bg-[#213448] border-2 border-black'>
        <div className='p-1'>
          <Link className='hover:underline underline-offset-2 cursor-pointer text-lg' href="/">
            Map
          </Link>
        </div>
        <div className='p-1'>
          <Link className='hover:underline underline-offset-2 cursor-pointer text-lg' href="/addPlace">
            Add place
          </Link>
        </div>
        <div className='p-1'>
          <Link className='hover:underline underline-offset-2 cursor-pointer text-lg' href="/placeByTag">
            Place by tags
          </Link>
        </div>
    </div>
  )
}

export default Navbar