import LocationsPoiMarker from "./LocationsPoiMarker";
import { type Poi } from "./LocationMaps";

interface PoiMarkersProps {
  locations: Poi[];
  getTempColor: (temp: number) => string;
}

const PoiMarkers = ({ locations, getTempColor }: PoiMarkersProps) => {
  return (
    <>
      {locations.map((poi, index) => {
        return (
          <LocationsPoiMarker
            key={index}
            poi={poi}
            getTempColor={getTempColor}
            visible={poi.visible}
          />
        );
      })}
    </>
  );
};

export default PoiMarkers;
