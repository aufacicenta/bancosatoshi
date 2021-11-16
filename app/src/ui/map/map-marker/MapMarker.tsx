import React from "react";

import { useMapContext } from "hooks/useMapContext/useMapContext";

import { MapMarkerProps } from "./MapMarker.types";

export const MapMarker: React.FC<MapMarkerProps> = ({ markerOptions }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const mapContext = useMapContext();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker && mapContext) {
      const {
        map,
        mapOptions: { center },
      } = mapContext;

      marker.setOptions({ ...markerOptions, position: center, map });
    }
  }, [mapContext, marker, markerOptions]);

  // google maps takes care of the rest
  return null;
};
