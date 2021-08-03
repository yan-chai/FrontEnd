import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "50vh"
}
const center = {
    lat: 36.4122,
    lng: -121.4741,
}
export default function app() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCwpZV-mNPsUMesQrLa6fHT-eGqCAu8AH8',
        libraries,
    });

    const [lat, setLat] = React.useState(36.4122);
    const [lng, setLng] = React.useState(-121.4741);
    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";

    return(
        <div>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={6}
            center={center}
            onClick={(e) => {
                setLat(e.latLng.lat());
                setLng(e.latLng.lng());
            }}>
                <Marker
                    position={{lat: lat, lng: lng}}
                />
            </GoogleMap>
        </div>
    )
}