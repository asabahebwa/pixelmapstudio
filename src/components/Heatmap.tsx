import { useEffect, useState, useMemo } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { FeatureCollection, Point, GeoJsonProperties } from "geojson";
import {
  EarthquakesGeojson,
  loadEarthquakeGeojson,
} from "../services/earthquakes";
import "../styles/Heatmap.css";

// Define dark map style
const darkMapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#0F1114",
      },
    ],
  },
  // Add this to hide most labels
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        lightness: -80,
      },
    ],
  },
  // Specifically reduce country labels
  {
    featureType: "administrative.country",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  // Hide cities
  {
    featureType: "administrative.locality",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  // Hide states/provinces
  {
    featureType: "administrative.province",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const mapOptions = {
  styles: darkMapStyles,
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const radius: number = 25;
  const opacity: number = 0.8;

  const [earthquakesGeojson, setEarthquakesGeojson] =
    useState<EarthquakesGeojson>();

  useEffect(() => {
    loadEarthquakeGeojson().then((data) => setEarthquakesGeojson(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="heatmap-loading">
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
      {/* @ts-ignore-next-line */}
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
        <Map
          defaultCenter={{ lat: 40.7749, lng: -130.4194 }}
          defaultZoom={3}
          disableDefaultUI={false}
          mapTypeControl={false}
          streetViewControl={false}
          rotateControl={false}
          keyboardShortcuts={false}
          cameraControl={false}
          styles={mapOptions.styles}
          minZoom={2}
          maxZoom={20}
          // defaultOptions={{
          //   zoomControl: false,
          //   scrollwheel: false,
          // }}
          // options={{
          //   styles: mapOptions.styles,
          //   minZoom: 2, // Set minimum zoom level (prevents zooming out beyond this)
          //   maxZoom: 20, // Optional: Set maximum zoom level (prevents zooming in beyond this)
          // }}
        />

        {earthquakesGeojson && (
          <Heatmap
            geojson={earthquakesGeojson}
            radius={radius}
            opacity={opacity}
          />
        )}
      </APIProvider>
    </div>
  );
};

type HeatmapProps = {
  geojson: FeatureCollection<Point, GeoJsonProperties>;
  radius: number;
  opacity: number;
};

export const Heatmap = ({ geojson, radius, opacity }: HeatmapProps) => {
  const map = useMap();
  const visualization = useMapsLibrary("visualization");

  const heatmap = useMemo(() => {
    if (!visualization) return null;

    return new window.google.maps.visualization.HeatmapLayer({
      radius: radius,
      opacity: opacity,
    });
  }, [visualization, radius, opacity]);

  useEffect(() => {
    if (!heatmap) return;

    heatmap.setData(
      geojson.features.map((point) => {
        const [lng, lat] = point.geometry.coordinates;

        return {
          location: new window.google.maps.LatLng(lat, lng),
          weight: point.properties?.mag,
        };
      })
    );
  }, [heatmap, geojson, radius, opacity]);

  useEffect(() => {
    if (!heatmap) return;

    heatmap.setMap(map);

    return () => {
      heatmap.setMap(null);
    };
  }, [heatmap, map]);

  return null;
};

export default App;
