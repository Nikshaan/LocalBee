import Link from 'next/link'
import React from 'react'
import { Raleway } from 'next/font/google';

const ralewayFont = Raleway({
  subsets: ["latin"],
  weight: "400"
})

const Navbar = () => {
  return (
    <div className={`h-16 ${ralewayFont.className} flex text-white bg-gradient-to-t from-black lg:text-lg justify-center gap-4 items-center to-[#213448] border-b-2 border-black`}>
        <div className='p-1'>
          <Link className='hover:underline underline-offset-2 cursor-pointer' href="/">
            Map
          </Link>
        </div>
        <div className='p-1'>
          <Link className='hover:underline underline-offset-2 cursor-pointer' href="/addPlace">
            Add place
          </Link>
        </div>
        <div className='p-1'>
          <Link className='hover:underline underline-offset-2 cursor-pointer' href="/placeByTag">
            Place by tags
          </Link>
        </div>
    </div>
  )
}

export default Navbar