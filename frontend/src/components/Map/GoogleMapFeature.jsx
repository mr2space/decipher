import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const GoogleMap = (props) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Map
        google={props.google}
        style={{ width: "100%", height: "100%" }}
        zoom={10}
        initialCenter={{
          lat: 28.439714,
          lng: 77.056608,
        }}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQI1u2JMmcusZaJZCq29mv7a4YT9wiLLY"
})(GoogleMap);
