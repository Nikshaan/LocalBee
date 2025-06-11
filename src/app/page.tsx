"use client"
import dynamic from 'next/dynamic'
import { useRef } from 'react'
//import { useState } from 'react';

export default function MyPage() {

  const markers = [
    { id: 1, position: [51.505, -0.09] },
    { id: 2, position: [48.8566, 2.3522] },
    { id: 3, position: [52.52, 13.405] },
    { id: 4, position: [41.9028, 12.4964] }
  ]
  const coor = useRef("");

  const getCoordinates = (e: string) => {
    try {
    const coordinates = e.split(",");
    const x: number = parseFloat(coordinates[0]);
    const y: number = parseFloat(coordinates[1]);
    if(e.trim() === "" || Number.isNaN(x) || Number.isNaN(y)){
      throw new Error("Invalid input");
    }
    console.log(x, y);
    } catch(error) {
       console.error('Geocoding error:', error);
       alert(error);
    }
  }
  const Map = dynamic(() => import('./components/Map'),
    { 
      ssr: false
    }
  );

  return(
  <div>
    <div className='h-[80svh] w-full'>
      <Map position={markers} zoom={10}/>
    </div>
    <div className='h-[20svh] bg-gray-800 flex justify-center items-center'>
      <input onChange={(e) => {coor.current = e.target.value}} className='bg-white text-black px-2 rounded-lg border-2' type='text' placeholder='enter co-ordinates: x,y' />
      <button onClick={() => getCoordinates(coor.current)} type='submit' className='bg-white p-0.2 px-2 ml-1 cursor-pointer text-black border-2 rounded-xl'>submit</button>
    </div>
  </div>
  )
}