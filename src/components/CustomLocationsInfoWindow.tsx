import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import { type Poi } from "./LocationMaps";

interface CustomLocationsInfoWindowProps {
  poi: Poi;
  getTempColor: (temp: number) => string;
}

const CustomLocationsInfoWindow = ({
  poi,
  getTempColor,
}: CustomLocationsInfoWindowProps) => {
  const [markerRef] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        position={{ lat: poi.location.lat, lng: poi.location.lng }}
        ref={markerRef}
      >
        <div
          className="info-window"
          style={{
            position: "absolute",
            left: 15,
            top: -16,
            background: "white",
          }}
        >
          <div className="info-window-location">{poi.key}</div>
          <div className="info-window-temp">
            <div className="info-window-temp-value">{Math.trunc(poi.temp)}</div>
            <div
              className="info-window-temp-color"
              style={{
                backgroundColor: getTempColor(Math.trunc(poi.temp)),
              }}
            />
          </div>
        </div>
      </AdvancedMarker>
    </>
  );
};

export default CustomLocationsInfoWindow;
