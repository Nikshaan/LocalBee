import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface MyMap {
    position: number[],
    zoom: number
}

export default function MyMap(props: MyMap) {
  const { position, zoom } = props

  return <MapContainer center={position} zoom={zoom}  className="h-[100svh] w-full">
    <TileLayer
    className="w-full h-[100svh]"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        You are here.
      </Popup>
    </Marker>
  </MapContainer>
}