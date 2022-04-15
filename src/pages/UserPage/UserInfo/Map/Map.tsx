import ReactMapboxGl from "react-mapbox-gl";
import React from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
const MapboxMap = ReactMapboxGl({
  accessToken,
});

type MapProps = {
  className: string;
  location: string | null;
};

export default function Map({ className, location }: MapProps) {
  const onMapLoad = (map: any) => {
    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      mapboxgl: map,
    });
    map.addControl(geocoder);
    if (location !== null) geocoder.query(location);
  };
  return (
    <>
      <MapboxMap
        className={className}
        onStyleLoad={onMapLoad}
        style="mapbox://styles/mapbox/streets-v9"
        zoom={[10]}
        center={[56.84168, 60.614947]}
        containerStyle={{
          height: "50vh",
          width: "100%",
        }}
      />
    </>
  );
}
