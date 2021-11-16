import { ReactNode } from "react";

export type MapViewProps = {
  children?: ReactNode;
  className?: string;
  mapOptions: google.maps.MapOptions;
};

export type MapViewContainerProps = Partial<MapViewProps>;
