import React from "react";

import { Map } from "./Map";

export const MapContainer = () => {
  const countryCoordinates = { lat: 13.7747, lng: -88.8554 };

  return (
    <Map
      mapOptions={{
        zoom: 8.5,
        center: countryCoordinates,
      }}
    />
  );
};
