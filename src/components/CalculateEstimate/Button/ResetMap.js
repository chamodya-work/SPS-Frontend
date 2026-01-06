// src/Components/ResetMap.js
import React from "react";

const ResetMap = ({
  setMarkers,
  setMaterials,
  setSearchText,
  setSearchLatLng,
  mapInstance,
  setEstimates,
  setStatusMessage,
}) => {
  const handleReset = () => {
    setMarkers([]);
    setMaterials([]);
    setSearchText("");
    setSearchLatLng(null);
    if (setEstimates) setEstimates([]);
    if (setStatusMessage) setStatusMessage("");
    if (mapInstance) mapInstance.setView([7.8731, 80.7718], 7);
    // notify any listeners (e.g., EstimationTable) to clear their state
    try {
      window.dispatchEvent(new Event("reset-estimates"));
    } catch (e) {
      /* noop for non-browser contexts */
    }
  };

  return (
    <button onClick={handleReset} type="button" className="app-btn app-btn--primary">
      Reset
    </button>
  );
};

export default ResetMap;