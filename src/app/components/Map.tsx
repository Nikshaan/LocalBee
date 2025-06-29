"use client"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import Link from "next/link"

type Coordinate = [number, number];
type CoordinatesArray = Coordinate[];
type NamesArray = string[];
type MarkerPosition = [CoordinatesArray, NamesArray];

interface MyMap {
    position: MarkerPosition
    zoom: number
}

export default function MyMap(props: MyMap) {
  const { position, zoom } = props
  const coordinates: CoordinatesArray = position[0];
  const names: NamesArray = position[1];
  const mapCenter: Coordinate = coordinates.length > 0 ? coordinates[coordinates.length-1] : [19.07283, 72.88261000];
  return <MapContainer zoom={zoom} center={mapCenter}  className="h-[100svh] w-full z-40">
    <TileLayer
    className="w-full h-[100svh]"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {coordinates.map((coordinate: Coordinate, index: number) => (
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