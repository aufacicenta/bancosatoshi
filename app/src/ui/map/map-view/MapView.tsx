import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import clsx from "clsx";

import { MapContextController } from "context/map/MapContextController";

import styles from "./MapView.module.scss";
import { MapViewProps } from "./MapView.types";

const apiKey = `${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
const mapId = `${process.env.NEXT_PUBLIC_MAP_ID}`;

export const MapView: React.FC<MapViewProps> = ({ children, className, mapOptions: parentMapOptions }) => {
  const mapRootElementRef = React.useRef<HTMLDivElement>(null);
  const [currentMap, setCurrentMap] = React.useState<google.maps.Map>();

  const mapOptions = React.useMemo(
    () => ({
      ...parentMapOptions,
      disableDefaultUI: true,
      mapId,
    }),
    [parentMapOptions],
  );

  React.useEffect(() => {
    setTimeout(() => {
      if (mapRootElementRef.current && !currentMap) {
        setCurrentMap(new window.google.maps.Map(mapRootElementRef.current!, mapOptions));
      }
    }, 500);
  }, [mapRootElementRef, mapOptions, currentMap]);

  return (
    <MapContextController map={currentMap} mapOptions={mapOptions}>
      <Wrapper apiKey={apiKey}>
        <div ref={mapRootElementRef} className={clsx(styles["map-view"], className)} id="map">
          {children && children}
        </div>
      </Wrapper>
    </MapContextController>
  );
};
