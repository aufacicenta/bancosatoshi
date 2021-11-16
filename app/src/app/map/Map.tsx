import { MapView } from "ui/map/map-view/MapView";

import { MapProps } from "./Map.types";

export const Map: React.FC<MapProps> = ({ mapOptions }) => <MapView mapOptions={mapOptions} />;
