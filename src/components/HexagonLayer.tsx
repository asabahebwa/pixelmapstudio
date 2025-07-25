import { useEffect, useState, useRef } from "react";
import { Map } from "react-map-gl/maplibre";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { DeckGL } from "@deck.gl/react";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import type { Color, PickingInfo, MapViewState } from "@deck.gl/core";
import "../styles/HexagonLayer.css";

// Source data CSV
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -1.415727,
  latitude: 52.232395,
  zoom: 6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export const colorRange: Color[] = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

function getTooltip({ object }: PickingInfo) {
  if (!object) {
    return null;
  }
  const lat = object.position[1];
  const lng = object.position[0];
  const count = object.count;

  return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
    ${count} Accidents`;
}

type DataPoint = [longitude: number, latitude: number];

interface CSVDataRow {
  lng: number;
  lat: number;
}

function HexagonLayerMap({
  data,
  mapStyle = MAP_STYLE,
  radius = 1000,
  upperPercentile = 100,
  coverage = 1,
}: {
  data?: DataPoint[] | null;
  mapStyle?: string;
  radius?: number;
  upperPercentile?: number;
  coverage?: number;
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
    new HexagonLayer<DataPoint>({
      id: "heatmap",
      gpuAggregation: true,
      colorRange,
      coverage,
      data,
      elevationRange: [0, 3000],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: (d) => d,
      pickable: true,
      radius,
      upperPercentile,
      material: {
        ambient: 0.64,
        diffuse: 0.6,
        shininess: 32,
        specularColor: [51, 51, 51],
      },
      transitions: {
        elevationScale: 3000,
      },
    }),
  ];

  return (
    <div className="map-wrapper">
      <DeckGL
        ref={deckRef}
        layers={layers}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={controllerProps}
        // controller={true} // Enable default controller
        getTooltip={getTooltip}
      >
        <Map reuseMaps mapStyle={mapStyle} />
      </DeckGL>
    </div>
  );
}

// Container component that handles data fetching
function HexagonLayerApp() {
  //  const [points, setPoints] = useState(null);
  const [points, setPoints] = useState<DataPoint[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await load(DATA_URL, CSVLoader);

        const csvData = result.data as CSVDataRow[];

        const extractedPoints: DataPoint[] = csvData
          .map((d) =>
            Number.isFinite(d.lng) && Number.isFinite(d.lat)
              ? ([d.lng, d.lat] as DataPoint)
              : null
          )
          .filter((point): point is DataPoint => point !== null);

        setPoints(extractedPoints);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          // Handle the case where the caught value is not an Error object
          setError("An unknown error occurred");
        }

        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="hexagon-layer-loading">
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
      <div className="hexagon-layer-error">
        Error loading data. Please try again.
      </div>
    );
  }

  return (
    <div className="hexagon-layer-container">
      <HexagonLayerMap data={points} />
    </div>
  );
}

export default HexagonLayerApp;
