import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import Link from "next/link"

import { Metadata } from 'next';

export const metadata: Metadata= {
  title: 'Map',
  description: 'This is the map with pinged places.',
  keywords: ['map', 'places', 'ping', 'localbee'],
}

interface marker {
    coor: number[][],
    names: string[]
}

interface MyMap {
    position: marker[]
    zoom: number
}

interface coor {
  coor: number[][]
}

interface names {
  names: string[]
}

export default function MyMap(props: MyMap) {
  const { position, zoom } = props
  const coordinates: coor = position[0];
  const names: names = position[1];

  return <MapContainer zoom={zoom} center={[28.65195,77.23149]}  className="h-[100svh] w-full z-40">
    <TileLayer
    className="w-full h-[100svh]"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {coordinates.map((coordinate: number[], index: number) => (
        <Marker key={index} position={coordinate}>
          <Popup>
            <div className="cursor-pointer">
              <Link href={`/viewPlace/${coordinate[0]}/${coordinate[1]}`}>  
                { names[index] }
              </Link>  
            </div>
        </Popup>
        </Marker>
      ))}
  </MapContainer>
}