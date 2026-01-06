// Components/DeleteSelected.js
import React from "react";

const DeleteSelected = ({
  markers,
  setMarkers,
  selectedMarkerId,
  setSelectedMarkerId,
}) => {
  const handleDelete = () => {
    if (selectedMarkerId == null) {
      alert("No marker selected!");
      return;
    }
    setMarkers(markers.filter((m) => m.id !== selectedMarkerId));
    setSelectedMarkerId(null);
  };

  return (
    <button onClick={handleDelete} type="button" className="app-btn app-btn--primary">
      Delete
    </button>
  );
};

export default DeleteSelected;