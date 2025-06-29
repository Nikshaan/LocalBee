"use client";
import { AxiosError } from 'axios' 
import React, { useEffect, useReducer, useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { ToastContainer, toast, Bounce} from 'react-toastify';
import { useRouter } from 'next/navigation';

const normal_col = 'bg-gray-100';
const clicked_col = 'bg-green-600';

interface TagStates {
  [tag: string]: boolean;
}

interface Action {
  type: 'TOGGLE_TAG_COLOR';
  payload: {
    tag: string;
  };
}

const colorReducer = (state: TagStates, action: Action): TagStates => {
  switch (action.type) {
    case 'TOGGLE_TAG_COLOR':
      const { tag } = action.payload; 
      return {
        ...state,
        [tag]: !state[tag],
      };
    default:
      return state;
  }
};

const Page = () => {
  
  const tagsList = ["Solo", "Family Trip", "Friends Trip", "Work Trip", "Backpacking", "Road Trip", "Cruise", "Day Trip",
    "Long-Term Stay", "Weekend Trip", "Relaxation", "Adventure", "Cultural Immersion", "Foodie", "Nature", "History", "Art & Museums", "Shopping",
    "Beach", "Mountains", "City Break", "Wildlife", "Photography", "Volunteering", "Study Abroad", "Pilgrimage", "Music/Festival", "Spa/Wellness",
    "Skiing/Snowboarding", "Diving/Snorkeling", "Hiking", "Surfing", "Theme Park", "First Time Visit", "Revisited", "Favorite", "Memorable", "Challenging",
    "Relaxing", "Exciting", "Unexpected", "Must-Do", "Hidden Gem", "Hotel", "Hostel", "Airbnb/Vacation Rental", "Camping", "Glamping", "Resort", "Homestay",
    "Boutique", "Luxury", "Budget", "Summer", "Winter", "Spring", "Autumn/Fall", "Tropical", "Desert", "Cold", "Warm", "Coastal", "Rural", "Urban",
    "Island", "Forest", "Lakeside", "Riverside", "Volcanic", "Dream Destination", "Bucket List", "Future Return", "Recommended", "New Cuisine", "Museum",
    "Historical Site", "National Park", "Market", "Restaurant", "Cafe", "Waterfall", "Castle", "Temple/Church", "Art Gallery", "Zoo/Aquarium",
    "Bridge", "Viewpoint", "Flight", "Train", "Bus", "Car Rental", "Ferry"];

  const [coor, setCoor] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [images, setImages] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
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
        toast.error("Invalid coordinates!");
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
        throw new Error("Cannot attach more than 6 images!")
      }
      const tagArr = tags;
      const id = nanoid();
      const pass = password.trim();

      await axios.post("https://localbee.onrender.com/info/place/add",
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
      if(error  instanceof TypeError){
          toast.error("Invalid image URL!");
      } else if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.detail);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unknown error type: ", error);
      }
    }
  }

 const initialColorsState: TagStates = tagsList.reduce((acc, tag) => {
    acc[tag] = false;
    return acc;
  }, {} as TagStates);

 const [tagStates, dispatch] = useReducer(colorReducer, initialColorsState);

 useEffect(() => {
    const currentTags: string[] = [];
    for (const tag in tagStates) {
      if (tagStates[tag]) {
        currentTags.push(tag);
      }
    }
    setTags(currentTags);
    
  }, [tagStates]);

  return (
    <div className="bg-[#213448] pt-20 justify-center pb-16 flex items-center text-black min-h-[100svh]">
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
      <div className='flex flex-col gap-5 w-[85%] lg:w-[50%] 2xl:w-[40%] justify-center items-center'>
        <h1 className='text-center text-4xl mt-5 font-bold text-white'>ADD A PLACE</h1>
        <div className='w-full flex justify-center'>
          <input
            placeholder='latitude (comma) longitude: '
            onChange={(e) => setCoor(e.target.value)}
            className="bg-white w-full 2xl:w-[70%] text-black border-2 px-2 rounded-lg border-[#213448]"
            value={coor}
            type="text"
          />
        </div>
        <div className='w-full flex justify-center'>
          <input
            placeholder='Name:'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white text-black px-2 border-2 border-[#213448] rounded-lg w-full 2xl:w-[70%]"
            type="text"
          />  
        </div>
        <div className='w-full flex justify-center'>
          <textarea rows={10}
            placeholder='Information:'
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full 2xl:w-[70%]"
          />
        </div>
        <div className='w-full flex justify-center'>
          <input
            placeholder='Rating out of 10:'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full 2xl:w-[70%]"
            type="text"
          />
        </div>
        <div className='w-full flex justify-center'>
          <textarea
          rows={6}
            placeholder='Image links (comma separated, max: 6): '
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full 2xl:w-[70%]"
          />
        </div>
        <div className='w-full rounded-xl p-3 flex flex-wrap gap-2 bg-[#94B4C1] border-2 border-[#213448] justify-center items-center'>
          <p className='font-extrabold'>Tags: </p> 
          {
            tagsList.map((tag, index) => {
              const currentBgClass: string = tagStates[tag] ? clicked_col : normal_col;
              return(
              <div onClick={() => dispatch({ type: 'TOGGLE_TAG_COLOR', payload: { tag } })} key={index} className={`border-2 p-1 cursor-pointer ${currentBgClass}`}> 
                    <p className=''>{tag}</p>
              </div>
            )}
            )
          }
        </div>
        <div className='w-full flex justify-center'>
          <input
            placeholder='Enter password:'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black px-2 rounded-lg border-2 border-[#213448] w-full 2xl:w-[30%]"
            type="password"
          />
        </div>
        <button onClick={addPlacetoDB} type="submit" className="bg-[#94B4C1] border border-white p-1 px-2 font-bold hover:scale-105 transition-all rounded-2xl p-0.2 ml-1 cursor-pointer">
          Add place
        </button>
      </div>
    </div>
    
  );
};

export default Page;