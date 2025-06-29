import React from 'react'
import axios from 'axios'
import Image from 'next/image';
import EditPlace from '@/app/components/editPlace';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';

const ralewayFont = Raleway({
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata= {
  title: 'View Place Information',
  description: 'This is a detailed description and photos of the place.',
  keywords: ['information', 'place', 'photos', 'rating'],
}

interface info {
  coord: number[],
  id: string,
  name: string,
  info: string,
  photos: string[],
  rating: number,
  tags: string[]
}

interface ViewPlacePageProps {
  params: {
    latitude: string;
    longitude: string;
  };
}

const Page = async ({ params }: ViewPlacePageProps) => {
  const parameters = await params;
  const { latitude, longitude } = parameters;
  
  const getPlaceInfo = async () => {
    const res = await axios.get(
      `https://localbee.onrender.com/info/place/${latitude}/${longitude}`,
      { withCredentials: true }
    );
    return res.data;
  };

  const info: info[] = await getPlaceInfo();
  
  return (
    <div className='pt-14 text-white pb-10 w-[85%] lg:w-[50%] 2xl:w-[40%] mt-10 m-auto flex flex-col justify-start items-center gap-5'>
      <p className={`text-left w-full font-extrabold text-4xl ${ralewayFont.className}`}>{info[0].name}</p>
      <p className='text-left w-full'><span className='font-bold'>coordinates:</span> {info[0].coord[0]}, {info[0].coord[1]}</p>
      <p className={`text-left w-full ${ralewayFont.className}`}>{info[0].info}</p>
      <p className='text-left w-full'><span className='font-bold'>Rating:</span> {info[0].rating} / 10</p>
      <div className='flex flex-wrap gap-2'>
        {
          info[0].tags.map((tag: string, index: number) => (
              <div key={index} className='border-2 p-1 px-4 bg-[#94B4C1] text-[#213448]'>
                {tag}
              </div>
          ))
        }
      </div>
      <div className='flex flex-wrap gap-5 justify-center items-center'>
        {
          info[0].photos.map((photo: string, index: number) => (
              <Image className='border-2 border-white' style={{ width: 'auto', height: 'auto' }} key={index} alt={`Image of ${info[0].name}`} width={400} height={400} src={`${photo}`} />
          ))
        }
      </div>
      <div className='w-full justify-center items-center'>
        <EditPlace data = {info[0]} />
      </div>
    </div>
  );
};

export default Page