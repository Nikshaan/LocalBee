"use client"
import dynamic from 'next/dynamic'

export default function MyPage() {
  const Map = dynamic(() => import('./components/Map'),
    { 
      ssr: false
    }
  );

  return(
  <div className='h-[100svh] w-full'>
    <Map position={[51.505, -0.09]} zoom={10}/>
  </div>
  )
}