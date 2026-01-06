// LoadMap.js
import React from "react";
import L from "leaflet";

const LoadMap = ({ setMarkers, mapInstance }) => {
  const handleLoad = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.click();

      input.onchange = async (e) => {
        const target = e.target;
        if (!target.files || target.files.length === 0) return;

        const file = target.files[0];
        const text = await file.text();

        try {
          const json = JSON.parse(text);

          if (!json.markers || !Array.isArray(json.markers)) {
            alert("Invalid JSON file or markers missing!");
            return;
          }

          // Rebuild markers with proper Leaflet LatLng
          const rebuiltMarkers = json.markers.map((m) => ({
            ...m,
            latLng: L.latLng(m.latLng.lat, m.latLng.lng),
          }));

          setMarkers(rebuiltMarkers);

          // Center map on first marker
          if (mapInstance && rebuiltMarkers.length > 0) {
            const first = rebuiltMarkers[0];
            mapInstance.setView(first.latLng, 13, { animate: true });
          }
        } catch (err) {
          console.error(err);
          alert("Invalid JSON file!");
        }
      };
    } catch (error) {
      console.error("Load failed:", error);
      alert("Load failed!");
    }
  };

  return (
    <button onClick={handleLoad} type="button" className="app-btn app-btn--primary">
      Load
    </button>
  );
};

export default LoadMap;