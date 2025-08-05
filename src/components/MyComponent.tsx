import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

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
export default MyComponent;
