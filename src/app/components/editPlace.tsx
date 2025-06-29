"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface data {
  coord: number[],
  id: string,
  name: string,
  info: string,
  photos: string[],
  rating: number,
  tags: string[]
}

interface info {
  data: data
}

const EditPlace: React.FC<info> = ( props: info ) => {
    const [update, setUpdate] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("");
    const [coor, setCoor] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [rating, setRating] = useState<string>("");
    const [images, setImages] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    console.log(props)
    const  id  = props.data.id;
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
  
  const updatePlace = async() => {
    try{
      const nameStr = name.trim();
      const infoStr = info.trim();
      const coordiantes = getCoordinates();
      const ratingNum = parseInt(rating.trim());
      const imageArr = images.split(",").map(link => link.trim()).filter(link => link !== '');
      if(imageArr.length > 6){
        throw new Error("Cannot attach more than 5 images!")
      }
      const tagArr = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== '');
      const pass = password.trim();
      
      await axios.patch(`http://127.0.0.1:8000/info/place/update/${id}`,
        {
          "placeUpdate": {
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

    useEffect(() => {
      setCoor(props.data.coord.join(", "));
      setName(props.data.name);
      setInfo(props.data.info);
      setImages(props.data.photos.join(", "));
      setRating(String(props.data.rating));
      setTags(props.data.tags.join(", "));
    }, [])

    const deletePlaceInfo = async () => {
      try{
      await axios.delete(`http://127.0.0.1:8000/info/place/delete/${id}`,
       {
      data: { 
        password: password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
      router.push('/');
      }catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unknown error type:", error);
      }
      }
  }

  const handlePassword = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='flex gap-3 text-white justify-end items-center'>
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
          <p className='text-lg font-thin'>Enter password:</p>
          <input value = {password} onChange={handlePassword} type='password' className='bg-white text-black border-2 border-[#213448] rounded-lg px-1'/>
          <p onClick={() => setUpdate(!update)} className='hover:underline underline-offset-2 cursor-pointer text-lg'>update</p>
          <p onClick={() => deletePlaceInfo()} className='hover:underline underline-offset-2 cursor-pointer text-lg'>delete</p>
        </div>
        <div className='w-full'>
          {
            update && <div className='w-full py-10'>
              <div className='flex flex-col gap-5 w-[50%] m-auto justify-center items-center'>
                <h1 className='text-center mt-5 text-3xl text-white font-bold'>UPDATE PLACE</h1>
                <div className='w-full'>
                <input
                  placeholder='latitude (comma) longitude: '
                  onChange={(e) => setCoor(e.target.value)}
                  className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full"
                  value={coor}
                  type="text"
                />
              </div>
              <div className='w-full'>
                <input
                  placeholder='Name:'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full"
                  type="text"
                />  
              </div>
              <div className='w-full'>
                <input
                  placeholder='Info:'
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full"
                  type="text"
                />
              </div>
              <div className='w-full'>
                <input
                  placeholder='Rating out of 10:'
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full"
                  type="text"
                />
              </div>
              <div className='w-full'>
                <input
                  placeholder='Image links (comma separated): '
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full"
                  type="text"
                />
              </div>
              <div className='w-full'>
                <input
                  placeholder='Tags (comma separated): '
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full"
                  type="text"
                />
              </div>
              <button onClick={updatePlace} type="submit" className="bg-[#213448] text-white border border-white p-1 px-2 font-bold hover:scale-105 transition-all rounded-2xl p-0.2 ml-1 cursor-pointer">
                Save changes
              </button>
            </div>
        </div>
      }
      </div>
    </div>
  )
}

export default EditPlace