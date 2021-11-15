import React from "react";

import { MapContext } from "./MapContext";
import { MapContextControllerProps } from "./MapContext.types";

export const MapContextController = ({ children, ...props }: MapContextControllerProps) => (
  <MapContext.Provider value={props}>{children}</MapContext.Provider>
);
