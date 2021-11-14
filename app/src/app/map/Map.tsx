import clsx from "clsx";
import styles from "./Map.module.scss";

import { MapProps } from "./Map.types";
import { MapviewContainer } from "ui/mapview/MapviewContainer";

export const Map: React.FC<MapProps> = ({ children, className }) => {
  return (
    <div className={clsx(styles["map"], className)}>
      <div className={styles.map__panel}>
        <MapviewContainer />
      </div>
      <div className={styles.map__panel}>{/* @TODO Business Map Grid */}</div>
    </div>
  );
};
