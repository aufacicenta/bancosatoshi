import { ReactNode, CSSProperties } from "react";

export type MapViewProps = {
  children?: ReactNode;
  className?: string;
  options: google.maps.MapOptions;
};
