import { ReactNode } from "react";

export type MapProps = {
  children?: ReactNode;
  className?: string;
  mapOptions: google.maps.MapOptions;
};
