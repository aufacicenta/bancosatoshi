import { useMapContext } from "hooks/useMapContext/useMapContext";
import React from "react";
import { MapMarkerProps } from "./MapMarker.types";

export const MapMarker: React.FC<MapMarkerProps> = ({ markerOptions }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const mapContext = useMapContext();

  React.useEffect(() => {
    if (!marker) {
      const marker = new google.maps.Marker();
      setMarker(marker);
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
  }, [marker, markerOptions]);

  //google maps takes care of the rest
  return null;
};
