import styles from "./Map.module.scss";

import { MapProps } from "./Map.types";

import { MapviewContainer } from "ui/mapview/MapviewContainer";

export const Map: React.FC<MapProps> = ({ children, className }) => {
  const countryCoordinates = { lat: 13.7747, lng: -88.8554 };
  const businessesMapConfig = {
    zoom: 8.5,
    center: countryCoordinates,
  };

  return (
    <div className={styles["map-container"]}>
      <div className={styles["map-container__panel"]}>
        <MapviewContainer mapOptions={businessesMapConfig} />
      </div>
    </div>
  );
};
