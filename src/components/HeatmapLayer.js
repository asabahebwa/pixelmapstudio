import { useEffect, useState, useRef } from "react";
import { Map } from "react-map-gl/maplibre";
import { DeckGL } from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import "../styles/HeatmapLayer.css";

const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json"; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

function HeatmapLayerMap({
  data = DATA_URL,
  intensity = 1,
  threshold = 0.03,
  radiusPixels = 30,
  mapStyle = MAP_STYLE,
}) {
  // Add state to track whether Ctrl key is pressed
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const deckRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e) => {
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
  const controllerProps = {
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
    new HeatmapLayer({
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
        layers={layers}
      >
        <Map reuseMaps mapStyle={mapStyle} />
      </DeckGL>
    </div>
  );
}

// Container component that handles data fetching
function HeatmapLayerApp() {
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPoints(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="heatmap-layer-loading">Loading data...</div>;
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
