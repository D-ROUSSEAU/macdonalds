import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useDispatch, useSelector } from "react-redux"
import { updateResults } from "../searchSlice"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
                key={coords[0]}
                center={coords}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%" }}
            >
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