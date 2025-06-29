"use client"
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyPage() {
  const [markers, setMarkers] = useState(null);
  const getMapPings = async() => {
    const res = await axios.get(
    "https://localbee.onrender.com/info/places/coordinates",
    { withCredentials: true}
    );
    setMarkers(res.data);
  }

  useEffect(() => {
    getMapPings()
  }, [])

  const Map = dynamic(() => import('./components/Map'),
    { 
      ssr: false
    }
  );
  if(markers == null){
    return <p>Loading...</p>
  }
  
  return(
  <div>
    <div className='h-[100svh] w-full'>
      <Map position={markers} zoom={10}/>
    </div>
  </div>
  )
}