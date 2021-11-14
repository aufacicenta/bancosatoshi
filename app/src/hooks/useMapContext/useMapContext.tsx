import React from "react";

type MapViewContextValue = any;

const MapViewContext = React.createContext(null as MapViewContextValue);

export const MapViewProvider = MapViewContext.Provider;

export const useMapContext: () => typeof MapViewContext = () => {
  const context = React.useContext(MapViewContext);

  if (!context) {
    throw new Error(`'MapViewContext' cannot be used outside the MapView component`);
  }

  return context;
};
