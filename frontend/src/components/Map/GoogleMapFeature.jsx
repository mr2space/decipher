import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Style for the container
const containerStyle = {
    width: "100%",
    height: "570px",
};

// Center location (base point)
const center = {
    lat: 25.508734,
    lng: 81.800701,
};

// Fixed coordinates for markers
const fixedLocations = [
    { lat: 25.508734, lng: 81.800701 }, // Point 1
    { lat: 25.511234, lng: 81.805012 }, // Point 2
    { lat: 25.506234, lng: 81.803452 }, // Point 3
    { lat: 25.509984, lng: 81.799134 }, // Point 4
    { lat: 25.507896, lng: 81.804345 }, // Point 5
];

const MyGoogleMap = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyAQI1u2JMmcusZaJZCq29mv7a4YT9wiLLY">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
            > 
                {/* Render fixed markers */}
                {fixedLocations.map((location, index) => (
                    <Marker
                        key={index}
                        position={location}  
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MyGoogleMap;
