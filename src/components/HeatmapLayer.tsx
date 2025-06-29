import { useEffect, useState, useRef } from "react";
import { Map } from "react-map-gl/maplibre";
import { DeckGL } from "@deck.gl/react";
import type { MapViewState } from "@deck.gl/core";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import "../styles/HeatmapLayer.css";

const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json"; // eslint-disable-line

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

type DataPoint = [longitude: number, latitude: number, count: number];

function HeatmapLayerMap({
  data = DATA_URL,
  intensity = 1,
  threshold = 0.03,
  radiusPixels = 30,
  mapStyle = MAP_STYLE,
}: {
  data?: string | DataPoint[];
  intensity?: number;
  threshold?: number;
  radiusPixels?: number;
  mapStyle?: string;
}) {
  // Add state to track whether Ctrl key is pressed
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const deckRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCtrlPressed(false);
      }
    };

    // Add listeners to the window
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up listeners on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Configuration for the controller
  const controllerProps: any = {
    scrollZoom: isCtrlPressed, // Only enable scroll zoom when Ctrl is pressed
    dragPan: {
      touchAction: "none",
      enableMultiTouch: true,
      fingerIds: [0, 1], // Require at least two fingers (index 0 and 1)
      required: 2, // Minimum number of fingers required
    },
    dragRotate: {
      enableMultiTouch: true,
      fingerIds: [0, 1],
      required: 2,
    },
    doubleClickZoom: false,
    touchZoom: {
      enableMultitouch: true,
    },
  };

  const layers = [
    new HeatmapLayer<DataPoint>({
      data,
      id: "heatmap-layer",
      pickable: false,
      getPosition: (d) => [d[0], d[1]],
      getWeight: (d) => d[2],
      radiusPixels,
      intensity,
      threshold,
    }),
  ];

  return (
    <div className="map-wrapper">
      <DeckGL
        ref={deckRef}
        initialViewState={INITIAL_VIEW_STATE}
        controller={controllerProps}
        // controller={true} // Enable default controller
        layers={layers}
      >
        <Map reuseMaps mapStyle={mapStyle} />
      </DeckGL>
    </div>
  );
}

// Container component that handles data fetching
function HeatmapLayerApp() {
  //  const [points, setPoints] = useState(null);
  const [points, setPoints] = useState<DataPoint[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPoints(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          // Handle the case where the caught value is not an Error object
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="heatmap-layer-loading">
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

  if (error) {
    return (
      <div className="heatmap-layer-error">
        Error loading data. Please try again.
      </div>
    );
  }

  return (
    <div className="heatmap-layer-container">
      <HeatmapLayerMap data={points} />
    </div>
  );
}

export default HeatmapLayerApp;
