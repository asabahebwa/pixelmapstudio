import { useEffect, useState } from "react";
import MyComponent from "./MyComponent";
import PoiMarkers from "./PoiMarkers";
import { locations } from "../data/locations";
import "../styles/LocationMaps.css";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

export interface Poi {
  key: string;
  temp: number;
  rainfall: number;
  location: {
    lat: number;
    lng: number;
  };
  visible?: boolean;
}

const Maps = () => {
  const [zoom, setZoom] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);

  const getZoomThreshold = (customId: string) => {
    let zoomThreshold;
    switch (customId) {
      case "Berlin":
      case "Kyiv":
      case "Madrid":
      case "Seoul":
        zoomThreshold = 4; // visible at zoom level 4+
        break;
      case "Rome":
      case "Cairo":
      case "Manila":
      case "Miami":
      case "Vancouver":
      case "Yellowknife":
      case "Nuuk":
      case "Sydney":
      case "New Delhi":
      case "Nairobi":
      case "San Francisco":
        zoomThreshold = 3; // visible at zoom level 3+
        break;
      default:
        zoomThreshold = 2; // All other cities only visible at closer zoom levels ()
    }
    return zoomThreshold;
  };

  let filteredLocationsWithThreshold = locations.map((poi: Poi) => {
    const customId = poi.key;

    return {
      ...poi,
      visible: zoom >= getZoomThreshold(customId),
    };
  });

  const handleZoomChange = (zoom: any) => {
    setZoom(zoom.detail.zoom);
  };

  const getTempColor = (temp: number) => {
    switch (true) {
      case temp < -30:
        return "#241967";
      case temp < -28:
        return "#272579";
      case temp < -26:
        return "#20348D";
      case temp < -24:
        return "#214295";
      case temp < -22:
        return "#3054A2";
      case temp < -20:
        return "#3E65AF";
      case temp < -18:
        return "#4976BA";
      case temp < -16:
        return "#5784C2";
      case temp < -14:
        return "#688FCA";
      case temp < -12:
        return "#759FD3";
      case temp < -10:
        return "#89ADDC";
      case temp < -8:
        return "#9AB9E3";
      case temp < -6:
        return "#9BC3DA";
      case temp < -4:
        return "#9ACDCF";
      case temp < -2:
        return "#9CD2C1";
      case temp < 0:
        return "#9ED0AA";
      case temp < 2:
        return "#D7DE7E";
      case temp < 4:
        return "#EADA6F";
      case temp < 6:
        return "#F4D862";
      case temp < 8:
        return "#FCCC4E";
      case temp < 10:
        return "#F7B42D";
      case temp < 12:
        return "#F29C00";
      case temp < 14:
        return "#F29400";
      case temp < 16:
        return "#F3840D";
      case temp < 18:
        return "#EE730E";
      case temp < 20:
        return "#ED6517";
      case temp < 22:
        return "#EB561E";
      case temp < 24:
        return "#E84B1A";
      case temp < 26:
        return "#E04016";
      case temp < 28:
        return "#D83412";
      case temp < 30:
        return "#D2270F";
      case temp < 32:
        return "#C30507";
      case temp < 34:
        return "#B6070D";
      case temp < 36:
        return "#A90914";
      case temp < 38:
        return "#89061A";
      case temp < 40:
        return "#6F0317";
      case temp >= 40:
        return "#4D0014";

      default:
        return "black";
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="location-maps-loading">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 mb-4 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="maps-container">
      <APIProvider
        // @ts-ignore-next-line
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
        libraries={["visualization"]}
      >
        <Map
          mapId="DEMO_MAP_ID"
          disableDefaultUI={false}
          mapTypeControl={false}
          streetViewControl={false}
          rotateControl={false}
          keyboardShortcuts={false}
          cameraControl={false}
          onZoomChanged={handleZoomChange}
          mapTypeId={"satellite"}
          defaultZoom={3}
          defaultCenter={{ lat: 20, lng: 0 }} // Add a default center
          minZoom={2}
          maxZoom={20}
          // @ts-ignore-next-line
          defaultOptions={{
            zoomControl: false,
            scrollwheel: false,
          }}
          options={{
            minZoom: 2,
            maxZoom: 20,
          }}
        >
          <MyComponent />

          {locations && (
            <PoiMarkers
              locations={filteredLocationsWithThreshold}
              getTempColor={getTempColor}
            />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default Maps;
