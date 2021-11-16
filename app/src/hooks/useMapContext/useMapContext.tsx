import React from "react";

import { MapContext } from "context/map/MapContext";

export const useMapContext = () => {
  const context = React.useContext(MapContext);

  if (!context) {
    throw new Error(`'MapViewContext' cannot be used outside the MapView component`);
  }

  return context;
};
