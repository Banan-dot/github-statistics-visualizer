import React, { useEffect, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

type MapProps = {
  className: string;
  location: string | null;
};

type GeocoderResponse = {
  result: MapboxGeocoder.Result;
};

export default function Map({ className, location }: MapProps) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || !location) {
      return;
    }

    const mapboxMap = new mapboxgl.Map({
      container: mapContainer.current,
      accessToken: accessToken,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [56.84168, 60.614947],
      zoom: 9,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      mapboxgl: mapboxMap,
      marker: false,
      zoom: 9,
    });

    const setMarker = ({ result }: GeocoderResponse) => {
      new mapboxgl.Marker()
        .setLngLat([result.center[0], result.center[1]])
        .addTo(mapboxMap);
    };

    geocoder.on("result", setMarker);
    mapboxMap.addControl(geocoder);
    geocoder.query(location);

    return () => {
      mapboxMap.remove();
      geocoder.off("result", setMarker);
    };
  }, [location]);

  return (
    <div className={className}>
      <div ref={mapContainer} style={{ height: "50vh", width: "100%" }} />
    </div>
  );
}
