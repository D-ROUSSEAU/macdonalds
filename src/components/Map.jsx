import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useDispatch, useSelector } from "react-redux"
import { updateResults } from "../searchSlice"
import { useEffect } from "react"

function ChangeView({ coords, zoom }) {
  const map = useMap()

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, zoom, {
        animate: true,
        duration: 1.5
      })
    }
  }, [coords, zoom, map])

  return null
}

function FitBounds({ markers, selectedCoords }) {
  const map = useMap()

  useEffect(() => {
    if (markers && markers.length > 0) {
      if (!selectedCoords) {
        const bounds = markers.map(marker => [Number(marker.lat), Number(marker.lon)])
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    }
  }, [markers, selectedCoords, map])

  return null
}

function Map() {
    const dispatch = useDispatch()
    const zoom = useSelector(state => state.search.zoom)
    const coords = useSelector(state => state.search.coords)
    const markers = useSelector(state => state.search.markers)

    const sendData = (data) => {
        dispatch(updateResults(data))
    }

    return (
        <div id="map">
            <MapContainer
                center={coords}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%" }}
            >
                <ChangeView coords={coords} zoom={zoom} />
                <FitBounds markers={markers} selectedCoords={coords} />
                <TileLayer attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {markers && markers.map((marker) => (
                    <Marker
                        key={marker.place_id}
                        position={[Number(marker.lat), Number(marker.lon)]}
                    >
                        <Popup>
                            <p className="title">{marker.name}</p>
                            <p className="content">
                                {marker.display_name
                                ? marker.display_name
                                : "Adresse non disponible"}
                            </p>
                            <button onClick={() => sendData(marker)}>Choisir</button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map