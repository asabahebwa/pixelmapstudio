import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import CustomLocationsInfoWindow from "./CustomLocationsInfoWindow";
import { type Poi } from "./LocationMaps";

interface LocationsPoiMarkerProps {
  key?: number;
  poi: Poi;
  getTempColor: (temp: number) => string;
  visible?: boolean;
}
const LocationsPoiMarker = ({
  poi,
  getTempColor,
  visible,
}: LocationsPoiMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  let isVisible = visible;

  return isVisible ? (
    <>
      <AdvancedMarker
        position={{
          lat: poi.location.lat,
          lng: poi.location.lng,
        }}
        ref={markerRef}
      >
        <div
          style={{
            width: 10,
            height: 10,
            position: "absolute",
            top: 0,
            left: 0,
            background: "#ffffff",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </AdvancedMarker>
      {marker && (
        <CustomLocationsInfoWindow poi={poi} getTempColor={getTempColor} />
      )}
    </>
  ) : null;
};

export default LocationsPoiMarker;
