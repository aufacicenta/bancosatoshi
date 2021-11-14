import { MapView } from "./Mapview";
import { Wrapper } from "@googlemaps/react-wrapper";

export const MapviewContainer = () => {
  const apiKey = `${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
  const mapId = `${process.env.NEXT_PUBLIC_MAP_ID}`;

  // Should come from env variables or any other source?
  const defaultLat = 13.7747;
  const defaultLng = -88.8554;

  const mapViewConfig = {
    zoom: 8.45,
    center: { lat: defaultLat, lng: defaultLng },
    disableDefaultUI: true,
    mapId,
  };

  return (
    <>
      <Wrapper apiKey={apiKey}>
        <MapView options={mapViewConfig} />
      </Wrapper>
    </>
  );
};
