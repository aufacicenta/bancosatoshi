import { createContext } from "react";

import { MapContextType } from "./MapContext.types";

export const MapContext = createContext<MapContextType | undefined>(undefined);
