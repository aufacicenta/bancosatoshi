import React from "react";
interface IMapViewContextValue {
  map: google.maps.Map | undefined;
  mapOptions: google.maps.MapOptions;
}

const MapViewContext = React.createContext<IMapViewContextValue>({} as IMapViewContextValue);

export const MapViewProvider = MapViewContext.Provider;

export const useMapContext: () => IMapViewContextValue = () => {
  const context = React.useContext(MapViewContext);

  if (!context) {
    throw new Error(`'MapViewContext' cannot be used outside the MapView component`);
  }

  return context;
};
