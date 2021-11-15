import styles from "./Map.module.scss";

import { MapProps } from "./Map.types";
import { MapViewContainer } from "ui/map-view/MapViewContainer";

export const Map: React.FC<MapProps> = ({ children, className }) => {
  const countryCoordinates = { lat: 13.7747, lng: -88.8554 };
  const businessesMapConfig = {
    zoom: 8.5,
    center: countryCoordinates,
  };

  return (
    <div className={styles["map"]}>
      <div className={styles["map__panel"]}>
        <MapViewContainer mapOptions={businessesMapConfig} />
      </div>
    </div>
  );
};
