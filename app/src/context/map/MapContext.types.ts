import { ReactNode } from "react";

export type MapContextControllerProps = {
  children: ReactNode;
} & MapContextType;

export type MapContextType = {
  map: google.maps.Map | undefined;
  mapOptions: google.maps.MapOptions;
};
