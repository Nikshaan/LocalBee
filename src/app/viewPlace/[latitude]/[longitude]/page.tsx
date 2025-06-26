import React from 'react'
import axios from 'axios'
import Image from 'next/image';

interface coords {
  params: {
    latitude: string;
    longitude: string;
  };
}

const Page: React.FC<coords> = async ({ params }) => {
  const parameters = await params;
  const { latitude, longitude } = parameters;
  
  const getPlaceInfo = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/info/place/${latitude}/${longitude}`,
      { withCredentials: true }
    );
    return res.data;
  };

  const info = await getPlaceInfo();
  
  return (
    <div className='pt-20 w-[80%] m-auto flex flex-col justify-center items-center gap-5'>
      <p>name: {info[0].name}</p>
      <p>coordinates: {info[0].coord[0]}, {info[0].coord[1]}</p>
      <p>information: {info[0].info}</p>
      <p>rating: {info[0].rating}</p>
      <p>photos:</p>
      <div className='flex flex-wrap gap-5'>
        {
          info[0].photos.map((photo: string, index: number) => (
              <Image style={{ width: 'auto', height: 'auto' }} key={index} alt={`Image of ${info[0].name}`} width={400} height={400} src={`${photo}`} />
          ))
        }
      </div>
      <p>tags:</p>
      <div className='flex gap-2'>
        {
          info[0].tags.map((tag: string, index: number) => (
              <div key={index} className='border-2 p-1 px-4 bg-amber-200 text-black'>
                {tag}
              </div>
          ))
        }
      </div>
    </div>
  );
};

export default Page