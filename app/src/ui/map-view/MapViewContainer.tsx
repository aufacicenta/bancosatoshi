import { MapView } from "./MapView";
import { Wrapper } from "@googlemaps/react-wrapper";
import { MapViewContainerProps } from "./MapView.types";

export const MapviewContainer: React.FC<MapViewContainerProps> = ({ children, mapOptions }) => {
  const apiKey = `${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
  const mapId = `${process.env.NEXT_PUBLIC_MAP_ID}`;

  const mapViewConfig = {
    ...mapOptions,
    disableDefaultUI: true,
    mapId,
  };

  return (
    <>
      <Wrapper apiKey={apiKey}>
        <MapView mapOptions={mapViewConfig}>{children}</MapView>
      </Wrapper>
    </>
  );
};
