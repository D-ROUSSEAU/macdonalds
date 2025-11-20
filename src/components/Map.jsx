import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useDispatch, useSelector } from "react-redux"
import { updateResults, setCoords, setZoom } from "../searchSlice"
import { useEffect, useMemo } from "react"
import { useGeolocation } from "../hooks/useGeolocation"
import L from "leaflet"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
})

const ChangeView = ({ coords, zoom }) => {
  const map = useMap()

  useEffect(() => {
    if (!coords) return
    map.flyTo(coords, zoom, { animate: true, duration: 1 })
  }, [coords, zoom])

  return null
}

const FitBounds = ({ markers, lockView }) => {
  const map = useMap()

  useEffect(() => {
    if (!markers?.length || lockView) return

    const bounds = markers.map(m => [m.lat, m.lon])
    map.fitBounds(bounds, { padding: [60, 60] })

  }, [markers, lockView])

  return null
}

function Map() {
    const dispatch = useDispatch()
    const zoom = useSelector(state => state.search.zoom)
    const coords = useSelector(state => state.search.coords)
    const markers = useSelector(state => state.search.markers)
    const search = useSelector(state => state.search.search)
    const { locationInfos } = useGeolocation()
    const sendData = (data) => { dispatch(updateResults(data)) }
    const memoizedMarkers = useMemo(() => markers || [], [markers])

    useEffect(() => {
      if (!locationInfos) return

      const shouldSetDefaultCenter =
        !markers?.length && search === ""

      if (shouldSetDefaultCenter) {
        dispatch(setCoords([locationInfos.latitude, locationInfos.longitude]))
        dispatch(setZoom(13))
      }
    }, [locationInfos])

    return (
        <div id="map">
            <MapContainer
                center={coords}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%" }}
            >
                <ChangeView coords={coords} zoom={zoom} />
                <FitBounds markers={memoizedMarkers} lockView={!!coords} />
                <TileLayer attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {memoizedMarkers && memoizedMarkers.map((marker) => (
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