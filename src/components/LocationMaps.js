import React, { useEffect, useState } from "react";
import "../styles/LocationMaps.css";

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (map) {
      // Use the map instance (e.g., map.panTo(), map.setZoom())

      map.setZoom(3);
    }
  }, [map]);

  return null;
};

const CustomLocationsInfoWindow = ({ poi, getTempColor }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

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
            left: 15 /* Position to the right */,
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

const Maps = () => {
  const [zoom, setZoom] = useState(3);

  const locations = [
    {
      key: "San Francisco",
      temp: 13,
      location: {
        lat: 37.775,
        lng: -122.418,
      },
    },
    {
      key: "Nairobi",
      temp: 22,
      location: {
        lat: -1.283,
        lng: 36.817,
      },
    },
    {
      key: "Doha",
      temp: 33,
      location: {
        lat: 25.287,
        lng: 51.533,
      },
    },
    {
      key: "Moscow",
      temp: 6,
      location: {
        lat: 55.752,
        lng: 37.616,
      },
    },
    {
      key: "New York",
      temp: 24,
      location: {
        lat: 40.712776,
        lng: -74.005974,
      },
    },
    {
      key: "San Paulo",
      temp: 25,
      location: {
        lat: -23.533,
        lng: -46.617,
      },
    },
    {
      key: "Rome",
      temp: 23,
      location: {
        lat: 41.9,
        lng: 12.483,
      },
    },
    {
      key: "Madrid",
      temp: 19,
      location: {
        lat: 40.4,
        lng: -3.683,
      },
    },
    {
      key: "Kyiv",
      temp: 13,
      location: {
        lat: 50.433,
        lng: 30.517,
      },
    },
    {
      key: "Berlin",
      temp: 15,
      location: {
        lat: 52.517,
        lng: 13.4,
      },
    },
    {
      key: "Cairo",
      temp: 40,
      location: {
        lat: 30.05,
        lng: 31.25,
      },
    },
    {
      key: "Lagos",
      temp: 30,
      location: {
        lat: 6.453,
        lng: 3.396,
      },
    },
    {
      key: "Rabat",
      temp: 20,
      location: {
        lat: 34.025,
        lng: -6.836,
      },
    },
    {
      key: "Beijing",
      temp: 30,
      location: {
        lat: 39.929,
        lng: 116.388,
      },
    },
    {
      key: "New Delhi",
      temp: 40,
      location: {
        lat: 28.6,
        lng: 77.2,
      },
    },
    {
      key: "Seoul",
      temp: 21,
      location: {
        lat: 37.566,
        lng: 127,
      },
    },
    {
      key: "Cape Town",
      temp: 16,
      location: {
        lat: -33.917,
        lng: 18.417,
      },
    },
    {
      key: "Miami",
      temp: 27,
      location: {
        lat: 25.774,
        lng: -80.194,
      },
    },
    {
      key: "Vancouver",
      temp: 14,
      location: {
        lat: 49.25,
        lng: -123.133,
      },
    },
    {
      key: "Anchorage",
      temp: 8,
      location: {
        lat: 61.218,
        lng: -149.9,
      },
    },
    {
      key: "Yellowknife",
      temp: 0,
      location: {
        lat: 62.45,
        lng: -114.35,
      },
    },
    {
      key: "Nuuk",
      temp: -5,
      location: {
        lat: 64.183,
        lng: -51.75,
      },
    },
    {
      key: "Qaarsut",
      temp: -10,
      location: {
        lat: 70.733,
        lng: -52.65,
      },
    },
    {
      key: "Bogota",
      temp: 17,
      location: {
        lat: 4.6,
        lng: -74.083,
      },
    },
    {
      key: "Sydney",
      temp: 20,
      location: {
        lat: -33.883,
        lng: 151.217,
      },
    },
    {
      key: "Darwin",
      temp: 30,
      location: {
        lat: -12.467,
        lng: 130.833,
      },
    },
    {
      key: "Auckland",
      temp: 18,
      location: {
        lat: -36.867,
        lng: 174.767,
      },
    },
    {
      key: "Manila",
      temp: 33,
      location: {
        lat: 14.604,
        lng: 120.982,
      },
    },
    {
      key: "Murmansk",
      temp: 6,
      location: {
        lat: 68.967,
        lng: 33.083,
      },
    },
  ];

  const getZoomThreshold = (customId) => {
    let zoomThreshold;
    switch (customId) {
      case "Berlin":
      case "Kyiv":
      case "Madrid":
      case "Seoul":
        zoomThreshold = 4; // visible at zoom level 4+
        break;
      default:
        zoomThreshold = 3; // All other cities only visible at closer zoom levels (7+)
    }
    return zoomThreshold;
  };

  let filteredLocationsWithThreshold = locations.map((poi) => {
    const customId = poi.key;

    return {
      ...poi,
      visible: zoom >= getZoomThreshold(customId),
    };
  });

  const handleZoomChange = (zoom) => {
    setZoom(zoom.detail.zoom);
  };

  const getTempColor = (temp) => {
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

  return (
    <div className="maps-container">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "auto", height: "900px" }}
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
          defaultOptions={{
            zoomControl: false,
            scrollwheel: false,
          }}
          options={{
            minZoom: 2, // Set minimum zoom level (prevents zooming out beyond this)
            maxZoom: 20, // Optional: Set maximum zoom level (prevents zooming in beyond this)
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

// Create a separate component for each marker
const LocationsPoiMarker = ({ poi, getTempColor, visible }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  let isVisible = visible;

  return (
    isVisible && (
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
    )
  );
};

const PoiMarkers = ({ locations, getTempColor }) => {
  return (
    <>
      {locations.map((poi, index) => {
        // Create a new marker reference for each location
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

export default Maps;
