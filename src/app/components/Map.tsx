import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface marker {
    position: number[],
    id: number
}

interface MyMap {
    position: marker[]
    zoom: number
}

export default function MyMap(props: MyMap) {
  const { position, zoom } = props

  const handleMarker = (po: number[]) => {
    console.log(po)
  }

  return <MapContainer zoom={zoom} center={[51.505, -0.09]}  className="h-[80svh] w-full">
    <TileLayer
    className="w-full h-[80svh]"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {position.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            <div className="cursor-pointer" onClick={() => handleMarker(marker.position)}>  
                {marker.id}
            </div>
        </Popup>
        </Marker>
      ))}
  </MapContainer>
}