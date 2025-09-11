import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useContext } from 'react';
import { SearchContext } from "../context/SearchContext";

function Map() {

    const { zoom, coords, markers, updateResults } = useContext(SearchContext);

    const sendData= (data) => {
        updateResults(data)
    };

    return (
        <div id="map">
            <MapContainer key={coords[0]} center={coords} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers && markers.map(marker => (
                    <Marker key={marker.place_id} position={[marker.lat, marker.lon]}>
                        <Popup>
                            <p>{marker.name}</p>
                            {marker.address.road}, {marker.address.city}, {marker.address.country}
                            <button onClick={ () => sendData(marker) }>Choisir</button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map;