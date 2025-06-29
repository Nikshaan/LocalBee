"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react'

const normal_col = 'bg-gray-200';
const clicked_col = 'bg-green-500';

interface TagStates {
  [tag: string]: boolean;
}

interface Action {
  type: 'TOGGLE_TAG_COLOR';
  payload: {
    tag: string;
  };
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
        
    const [tags, setTags] = useState<string[]>([]);
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    
    const getMapPings = async() => {
    const res = await axios.get(
    "http://127.0.0.1:8000/info/places",
    { withCredentials: true}
    );
    setPlaces(res.data);
    setFilteredPlaces(res.data);
    }

    useEffect(() => {
        getMapPings()
    }, [])

    const initialColorsState: TagStates = tagsList.reduce((acc, tag) => {
    acc[tag] = false;
    return acc;
    }, {} as TagStates);

    const [tagStates, dispatch] = useReducer(colorReducer, initialColorsState);

    useEffect(() => {
        if(tags.length == 0){
            setFilteredPlaces(places);
            return;
        } 
        const newFilteredPlaces = places.filter((place: info) => {
            return tags.every(tag => place.tags.includes(tag));
        });
        setFilteredPlaces(newFilteredPlaces);
  }, [tags])

    useEffect(() => {
    const currentTags: string[] = [];
    for (const tag in tagStates) {
        if (tagStates[tag]) {
        currentTags.push(tag);
        }
    }
    setTags(currentTags);
    }, [tagStates]);

    if(filteredPlaces.length == 0){
        return (
            <div className='text-black pt-20 w-[90%] m-auto min-h-[100hsv] bg-[#547792]'>
                <div className='w-full rounded-xl p-5 flex flex-wrap gap-2 bg-[#94B4C1] border-2 border-[#213448] justify-center items-center'>
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
                <div className='text-red-900 font-bold text-center mt-10'>
                    NO PLACES!
                </div>
            </div>
        )
    }

    return (
    <div className='text-black pt-20 w-[90%] m-auto min-h-[100hsv] bg-[#547792]'>
        <div className='w-full rounded-xl p-5 flex flex-wrap gap-2 bg-[#94B4C1] border-2 border-[#213448] justify-center items-center'>
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
          <div className='p-5 w-[70%] m-auto gap-4 pb-10 text-black flex flex-col justify-center items-center mt-5'>
          <p className='font-extrabold'>Places:</p>
          {
            filteredPlaces.map((place: info, index) => (
                <Link className='w-full m-auto' key={index} href={`/viewPlace/${place.coord[0]}/${place.coord[1]}`}> 
                    <div className='flex bg-[#213448] text-white p-1 justify-between items-center border-2 w-full' key={index}>
                        { place.photos[0] && <Image className='p-1 border-2 border-white' alt='photo' src={place.photos[0]} width={300} height={300} /> }
                        <div className='flex-1 mx-2 ml-3 text-white h-48 p-2 overflow-auto'>
                          <p className='font-bold'>{place.name}</p>
                          <p>{place.info}</p>
                          <p>Rating: {place.rating}</p>
                        </div>
                    </div>
                </Link>
            ))
          }
        </div>
    </div>
  )
}

export default Page