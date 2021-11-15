import React from "react";
import clsx from "clsx";
import styles from "./Mapview.module.scss";

import { MapViewProps } from "./Mapview.types";
import { MapViewProvider } from "hooks/useMapContext/useMapContext";

export const MapView: React.FC<MapViewProps> = ({ children, className, mapOptions }) => {
  const mapRootElementRef = React.useRef<HTMLDivElement>(null);
  const [currentMap, setCurrentMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (mapRootElementRef.current && !currentMap) {
      const newMap = new window.google.maps.Map(mapRootElementRef.current, { ...mapOptions });
      setCurrentMap(newMap);
    }
  }, [mapRootElementRef, currentMap, mapOptions]);

  return (
    <div ref={mapRootElementRef} className={clsx(styles["map-view"], className)}>
      <MapViewProvider
        value={{
          map: currentMap,
          mapOptions,
        }}
      >
        {children}
      </MapViewProvider>
    </div>
  );
};
