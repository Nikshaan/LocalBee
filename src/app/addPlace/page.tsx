"use client";

import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { ToastContainer, toast, Bounce} from 'react-toastify';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [coor, setCoor] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [images, setImages] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const getCoordinates = () => {
    try {
      const coordinates = coor.split(",").map(coord => coord.trim()).filter(coord => coord !== '');
      const x = parseFloat(coordinates[0]);
      const y = parseFloat(coordinates[1]);

      if (coor.trim() === "" || isNaN(x) || isNaN(y)) {
        throw new Error("Invalid input!");
      }

      return [x, y];

    } catch (error) {
      console.error("Geocoding error:", error);
      if (error instanceof Error) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unknown error type:", error);
      }
    }
  };

  const addPlacetoDB = async() => {
    try{
      const nameStr = name.trim();
      const infoStr = info.trim();
      const coordiantes = getCoordinates();
      const ratingNum = parseInt(rating.trim());
      const imageArr = images.split(",").map(link => link.trim()).filter(link => link !== '').map(link => new URL(link));
      if(imageArr.length > 6){
        throw new Error("Cannot attach more than 5 images!")
      }
      const tagArr = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== '');
      const id = nanoid();
      const pass = password.trim();

      await axios.post("http://127.0.0.1:8000/info/place/add",
        {
          "newPlace": {
            "coord": coordiantes,
            "id": id,
            "info": infoStr,
            "name": nameStr,
            "photos": imageArr,
            "rating": ratingNum,
            "tags": tagArr
          },
          "req": {
            "password": pass
          }
        },
        {withCredentials: true});

        toast.success(`${nameStr} has been added to the map!`)
        router.push('/');

    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unknown error type:", error);
      }
    }
  }

  return (
    <div className="bg-gray-800 justify-center pb-16 flex items-center text-black h-[100svh]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className='flex flex-col gap-5 w-[50%] justify-center items-center'>
        <h1 className='text-center text-2xl text-white font-bold'>ADD A PLACE.</h1>
        <div className='w-full'>
          <input
            placeholder='latitude (comma) longitude: '
            onChange={(e) => setCoor(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border w-full"
            value={coor}
            type="text"
          />
        </div>
        <div className='w-full'>
          <input
            placeholder='Name:'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border w-full"
            type="text"
          />  
        </div>
        <div className='w-full'>
          <input
            placeholder='Info:'
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border w-full"
            type="text"
          />
        </div>
        <div className='w-full'>
          <input
            placeholder='Rating out of 10:'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border w-full"
            type="text"
          />
        </div>
        <div className='w-full'>
          <input
            placeholder='Image links (comma separated): '
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border w-full"
            type="text"
          />
        </div>
        <div className='w-full'>
          <input
            placeholder='Tags (comma separated): '
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border w-full"
            type="text"
          />
        </div>
        <div className='w-full'>
          <input
            placeholder='Enter password:'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border w-full"
            type="password"
          />
        </div>
        <button onClick={addPlacetoDB} type="submit" className="bg-white p-0.2 px-2 ml-1 cursor-pointer">
          Add place
        </button>
      </div>
    </div>
    
  );
};

export default Page;